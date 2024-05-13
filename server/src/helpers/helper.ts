import axios from "axios";
import "dotenv/config";
import {
  IAnime,
  IAnimeInfo,
  IRecentAnime,
  IRecommendations,
  ISearchedAnime,
  ITrending,
} from "../types/anime.types";

const baseUrl: string =
  process.env.NODE_ENV === "production"
    ? (process.env.BACKEND_URL as string)
    : "http://localhost:8080/api/v2";
const BASE_BACKEND_URL = process.env.BASE_BACKEND_URL as string;

export const getTrendingAnime = async (limit: number, page: number) => {
  try {
    const { data } = await axios.get(
      baseUrl + `/trending?limit=${limit}&p=${page}`,
      {
        headers: { Accept: "application/json" },
      }
    );
    return data as ITrending;
  } catch (error) {
    console.log(error);
    throw Error;
  }
};

export const getPopularAnime = async (limit: number, page: number) => {
  try {
    const { data } = await axios.get(
      baseUrl + `/popular?limit=${limit}&p=${page}`,
      {
        headers: { Accept: "application/json" },
      }
    );
    return data as ITrending;
  } catch (error) {
    console.log(error);
    throw Error;
  }
};

export const getAnimeInfoById = async (id: string) => {
  try {
    const { data } = await axios.get(baseUrl + `/info/${id}`, {
      headers: { Accept: "application/json" },
    });
    return data as IAnimeInfo;
  } catch (error) {
    console.log(error);
    throw Error;
  }
};

export const getAnimeEpisodesById = async (id: string, isDub: string) => {
  try {
    const { data } = await axios.get(baseUrl + `/episode/${id}?dub=${isDub}`, {
      headers: { Accept: "application/json" },
    });
    return data;
  } catch (error) {
    console.log(error);
    throw Error;
  }
};

export const getSearchedAnime = async (
  query: string,
  page: number,
  limit: number
) => {
  try {
    const { data } = await axios.get(
      baseUrl + `/search?q=${query}&p=${page}&limit=${limit}`,
      {
        headers: { Accept: "application/json" },
      }
    );
    return data as ISearchedAnime;
  } catch (error) {
    console.log(error);
    throw Error;
  }
};

export const getAnimeEpisodesStream = async (id: string) => {
  try {
    const streamUrl: string = process.env.CONSUMET_URL as string;
    // const { data } = await axios.get(baseUrl + `/stream/${id}`, {
    //   headers: { Accept: "application/json" },
    // });
    const { data } = await axios.get(
      streamUrl + `/anime/gogoanime/watch/${id}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
    throw Error;
  }
};

export const getAnimeRecommendationById = async (id: string) => {
  try {
    const { data } = await axios.get(baseUrl + `/recommendations/${id}`);
    return data as IRecommendations;
  } catch (error) {
    console.log(error);
    throw Error;
  }
};

interface Episode {
  episodeNumber: number;
  episodeId: string;
}

export const scrapeEpisodes = async (id: string): Promise<Episode[]> => {
  try {
    const { data } = await axios.get(
      `${BASE_BACKEND_URL}/api/v1/episode/${id}`
    );
    return data.episodes;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchRecentAnimes = async () => {
  try {
    const { data } = await axios.get(
      BASE_BACKEND_URL + "/api/v1/recentepisode/all"
    );

    if (!data) return;

    return data as IRecentAnime;
  } catch (error) {
    console.log(error);
    throw Error;
  }
};

export const mergeAnilistIdFromTitle = async (title: string) => {
  const CONSUMET_URL = process.env.CONSUMET_URL as string;
  try {
    const { data } = await axios.get(CONSUMET_URL + `/meta/anilist/${title}`);

    if (!data) return;

    return data.results as IAnime[];
  } catch (error) {
    console.log(error);
    throw Error;
  }
};

export const getAnimeMovies = async () => {
  try {
    const { data } = await axios.get(BASE_BACKEND_URL + "/api/v1/movies/1");
    return data as IRecentAnime;
  } catch (error) {
    console.log(error);
    throw Error;
  }
};
