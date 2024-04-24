import { IAnimeInfo, IEpisodeId, IRecommendations, ITrending } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL: string = "http://localhost:4000/api" || "";

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
    getPopular: builder.query<unknown, void>({
      query: () => ({
        url: "/popularity",
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
    getEpisodeLinks: builder.query<unknown, { id: string }>({
      query: ({ id }: { id: string }) => ({
        url: `/episode-streaming?id=${id}`,
        method: "GET",
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
  useGetEpisodeLinksQuery
} = api;
