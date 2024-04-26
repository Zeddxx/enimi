import { Request, Response } from "express";
import {
  fetchRecentAnimes,
  getAnimeEpisodesById,
  getAnimeEpisodesStream,
  getAnimeInfoById,
  getAnimeRecommendationById,
  getPopularAnime,
  getSearchedAnime,
  getTrendingAnime,
  mergeAnilistIdFromTitle,
  scrapeEpisodes,
} from "../helpers/helper";

export const trending = async (req: Request, res: Response) => {
  try {
    const { limit, page } = req.query;
    const animeLimit = Number(limit) || 8;
    const animePage = Number(page) || 1;
    const anime = await getTrendingAnime(animeLimit, animePage);

    if (!anime) {
      return res.status(404).json({ message: "Not found!" });
    }

    const trending = anime.results.map((result) => {
      const animeId =
        result.title.english.toLowerCase().split(" ").join("-") +
        "-" +
        result.id;
      return { ...result, animeId: animeId };
    });

    return res.status(200).json({
      code: 200,
      message: "success",
      page: anime.page,
      results: trending,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export const popular = async (req: Request, res: Response) => {
  try {
    const { limit, page } = req.query;
    const animeLimit = Number(limit) || 15;
    const animePage = Number(page) || 1;

    const anime = await getPopularAnime(animeLimit, animePage);

    if (!anime) {
      return res.status(404).json({ message: "Not found!" });
    }

    const popular = anime.results.map((result) => {
      const animeId =
        result.title.english.toLowerCase().split(" ").join("-") +
        "-" +
        result.id;
      return { ...result, animeId: animeId };
    });

    return res.status(200).json({
      code: 200,
      message: "success",
      page: anime.page,
      results: popular,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export const info = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(401).json({ message: "anime id must needed!" });
    }

    const animeInfo = await getAnimeInfoById(id as string);

    if (!animeInfo) {
      return res.status(404).json({ message: "Info not found!" });
    }

    const animeId = animeInfo.title.english
      ? animeInfo.title.english.toLowerCase().split(" ").join("-") +
        "-" +
        animeInfo.id
      : animeInfo.title.userPreferred.toLowerCase().split(" ").join("-") +
        "-" +
        animeInfo.id;

    const episodes = await scrapeEpisodes(animeInfo.id_provider.idGogo);

    return res
      .status(200)
      .json({ ...animeInfo, animeId, anime_episodes: episodes.reverse() });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export const searched = async (req: Request, res: Response) => {
  try {
    const { query, page, limit } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Please provide a query!" });
    }

    const q = query as string;
    const p = Number(page) || 1;
    const l = Number(limit) || 14;

    const searchAnime = await getSearchedAnime(q, p, l);

    if(!searchAnime) {
      return res.status(404).json({ message: "No searched query found!" })
    }

    const anime = searchAnime.results.map((anime) => {
      const animeId = anime.title.userPreferred.toLowerCase().split(" ").join("-") + "-" + anime.id;
      return { ...anime, animeId }
    })

    return res.status(200).json({
      code: 200,
      message: "success",
      page: searchAnime.pageInfo,
      results: anime,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export const episode = async (req: Request, res: Response) => {
  try {
    const { id, dub } = req.query;
    const animeDub = dub ? (dub as string) : "false";
    const animeId = id as string;

    const animeEpisode = await getAnimeEpisodesById(animeId, animeDub);

    return res.status(200).json(animeEpisode);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export const stream = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Please provide a valid id!" });
    }

    const streamingLinks = await getAnimeEpisodesStream(id as string);

    if (!streamingLinks) {
      return res.status(404).json({ message: "Not a streaming episode" });
    }

    return res.status(200).json(streamingLinks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

export const recommendations = async (req: Request, res: Response) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Invalid Id!" });
    }

    const recommendations = await getAnimeRecommendationById(id as string);

    const animes = recommendations.results.map((anime) => {
      const animeId = anime.title.english
        ? anime.title.english.toLowerCase().split(" ").join("-") +
          "-" +
          anime.id
        : anime.title.userPreferred.toLowerCase().split(" ").join("-") +
          "-" +
          anime.id;
      return { ...anime, animeId };
    });

    return res.status(200).json({ results: animes });
  } catch (error) {}
};

export const recents = async (req: Request, res: Response) => {
  try {
    const recentsAnimeWithoutAnilistId = await fetchRecentAnimes();

    if (!recentsAnimeWithoutAnilistId) {
      return res.status(400).json({ message: "no recent anime found!" });
    }

    const promises = recentsAnimeWithoutAnilistId.results.map(async (anime) => {
      try {
        const anilistSearch = await mergeAnilistIdFromTitle(anime.title);

        if (!anilistSearch) return null;
        const anilistId = anilistSearch[0].id;
        const animeId = anime.id + "-" + anilistId;
        return { ...anime, animeId, anilistId };
      } catch (error) {
        console.error("Error merging Anilist ID:", error);
        return null;
      }
    });

    const mergedAnimeData = await Promise.all(promises);

    // Filter out null values (errors)
    const validMergedAnimeData = mergedAnimeData.filter((anime) => anime !== null);

    return res.status(200).json(validMergedAnimeData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "something went wrong!" });
  }
};