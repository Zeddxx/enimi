import axios from "axios";
import "dotenv/config";
import { IAnimeInfo, IRecommendations, ITrending } from "../types";

const baseUrl: string = (process.env.BACKEND_URL as string) || "";

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
    return data;
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
    return data;
  } catch (error) {
    console.log(error);
    throw Error;
  }
};

export const getAnimeEpisodesStream = async (id: string) => {
  try {
    const { data } = await axios.get(baseUrl + `/stream/${id}`, {
      headers: { Accept: "application/json" },
    });
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

export const scrapeEpisodes = async (title: string): Promise<Episode[]> => {
    try {
      const { data: searchedAnime } = await axios.get("http://127.0.0.1:3000/search/" + title);
  
      if (!searchedAnime) {
        return [];
      }
  
      const { data: scrappedEpisodes } = await axios.get("http://127.0.0.1:3000/getAnime/" + searchedAnime[0]?.anime_id);
  
      if (!scrappedEpisodes || !scrappedEpisodes.episode_id) {
        return [];
      }
  
      // Extract episode IDs array from scrappedEpisodes object
      const episodeIds: string[] = scrappedEpisodes.episode_id;
  
      // Construct array of episode objects with episode number
      const episodes: Episode[] = episodeIds.map((episodeId: string, index: number) => {
        return {
          episodeNumber: index + 1,
          episodeId
        };
      });
  
      return episodes;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };