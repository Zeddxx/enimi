import { configureStore } from "@reduxjs/toolkit/react";

// redux api queries and mutations!
import { api } from "@/redux/api";
import { auth } from "@/redux/auth";

// redux utilites
import setUtilites from "@/redux/utilities/utils.redux"

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [auth.reducerPath]: auth.reducer,
    setUtility: setUtilites
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware).concat(auth.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
