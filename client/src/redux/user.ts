import { BASE_URL } from "@/constants";
import { WatchLaterSchemaTypes } from "@/types/user.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const BASE_URL: string = "http://localhost:4000";
// // const BASE_URL: string = "";

export const user = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["watch-later"],
  endpoints: (builder) => ({
    addWatchLater: builder.mutation({
      query: (body: WatchLaterSchemaTypes) => ({
        url: "/api/watch-later",
        method: "POST",
        credentials: "include",
        body: body,
      }),
      invalidatesTags: (_, error) => (error ? [] : ["watch-later"]),
    }),
    getWatchLater: builder.query<WatchLaterSchemaTypes[], void>({
      query: () => ({
        url: "/api/get-watch-later",
        credentials: "include",
        method: "GET",
      }),
      providesTags: ["watch-later"],
    }),
    removeWatchLater: builder.mutation({
      query: ({ id }: { id: string }) => ({
        url: "/api/delete-watch-later",
        method: "DELETE",
        body: { id },
        credentials: "include",
      }),
      invalidatesTags: (_, error) => (error ? [] : ["watch-later"]),
    }),
  }),
});

export const {
  useAddWatchLaterMutation,
  useGetWatchLaterQuery,
  useRemoveWatchLaterMutation,
} = user;
