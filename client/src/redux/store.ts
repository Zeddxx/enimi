import { configureStore } from "@reduxjs/toolkit/react";
import { api } from "./api";
import { auth } from "./auth";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [auth.reducerPath]: auth.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(auth.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
