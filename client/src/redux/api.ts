import { IAnimeInfo, IEpisodeId, IRecommendations, ISearchedAnime, IStreamingLinks, ITrending } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL: string = "";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getTrending: builder.query<ITrending, void>({
      query: () => ({
        url: "/trending",
        method: "GET",
      }),
    }),
    getPopular: builder.query<ITrending, void>({
      query: () => ({
        url: "/popular",
        method: "GET",
      }),
    }),
    getAnimeInfoById: builder.query<IAnimeInfo, { id: string }>({
      query: ({ id }: { id: string }) => ({
        url: `/info?id=${id}`,
        method: "GET",
      }),
    }),
    getRecommendationById: builder.query<IRecommendations, { id: string }>({
      query: ({ id }: { id: string }) => ({
        url: `/recommendations?id=${id}`,
        method: "GET",
      }),
    }),
    getAnimeEpisodeDetails: builder.query<IEpisodeId, { id: string }>({
      query: ({ id }: { id: string }) => ({
        url: `/episode?id=${id}`,
        method: "GET",
      }),
    }),
    getEpisodeLinks: builder.query<IStreamingLinks, { id: string }>({
      query: ({ id }: { id: string }) => ({
        url: `/episode-streaming?id=${id}`,
        method: "GET",
      }),
    }),
    getSearchedAnime: builder.query<ISearchedAnime, { query: string, page: number }>({
      query: ({ query, page }: { query: string, page: number }) => ({
        url: `/search?query=${query}&page=${page}`,
        method: "GET",
      })
    })
  }),
});

export const {
  useGetTrendingQuery,
  useGetPopularQuery,
  useGetAnimeInfoByIdQuery,
  useGetRecommendationByIdQuery,
  useGetAnimeEpisodeDetailsQuery,
  useGetEpisodeLinksQuery,
  useGetSearchedAnimeQuery
} = api;
