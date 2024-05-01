import { configureStore } from "@reduxjs/toolkit/react";
import { api } from "./api";
import { auth } from "./auth";
import { user } from "./user";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [auth.reducerPath]: auth.reducer,
    [user.reducerPath]: user.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(auth.middleware).concat(user.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
