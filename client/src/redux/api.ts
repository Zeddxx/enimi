import { IAnimeInfo, IEpisodeId, IRecents, IRecommendations, ISearchedAnime, IStreamingLinks, ITrending } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL: string = "http://localhost:4000";
// const BASE_URL: string = "";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  refetchOnFocus: false,
  endpoints: (builder) => ({
    getTrending: builder.query<ITrending, void>({
      query: () => ({
        url: "/api/trending",
        method: "GET",
      }),
    }),
    getPopular: builder.query<ITrending, void>({
      query: () => ({
        url: "/api/popular",
        method: "GET",
      }),
    }),
    getAnimeInfoById: builder.query<IAnimeInfo, { id: string }>({
      query: ({ id }: { id: string }) => ({
        url: `/api/info?id=${id}`,
        method: "GET",
      }),
    }),
    getRecommendationById: builder.query<IRecommendations, { id: string }>({
      query: ({ id }: { id: string }) => ({
        url: `/api/recommendations?id=${id}`,
        method: "GET",
      }),
    }),
    getAnimeEpisodeDetails: builder.query<IEpisodeId, { id: string }>({
      query: ({ id }: { id: string }) => ({
        url: `/api/episode?id=${id}`,
        method: "GET",
      }),
    }),
    getEpisodeLinks: builder.query<IStreamingLinks, { id: string }>({
      query: ({ id }: { id: string }) => ({
        url: `/api/episode-streaming?id=${id}`,
        method: "GET",
      }),
    }),
    getSearchedAnime: builder.query<ISearchedAnime, { query: string, page: number }>({
      query: ({ query, page }: { query: string, page: number }) => ({
        url: `/api/search?query=${query}&page=${page}`,
        method: "GET",
      })
    }),
    getRecentAnimes: builder.query<IRecents[], void>({
      query: () => ({
        url: "/api/recents",
        method: "GET"
      }),
    }),
  }),
});

export const {
  useGetTrendingQuery,
  useGetPopularQuery,
  useGetAnimeInfoByIdQuery,
  useGetRecommendationByIdQuery,
  useGetAnimeEpisodeDetailsQuery,
  useGetEpisodeLinksQuery,
  useGetSearchedAnimeQuery,
  useGetRecentAnimesQuery
} = api;
