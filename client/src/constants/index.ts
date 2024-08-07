// --> in local machine uncomment this out!
export const BASE_URL = process.env.NODE_ENV === "production" ? "" : "http://localhost:4000";

export const NAVBAR_ITEMS = [
  { name: "Home", path: "/home" },
  { name: "Popular", path: "/popular" },
  { name: "Trending", path: "/trending" },
  { name: "Watch List", path: "/watch-later" },
  { name: "Movies", path: "/movies" },
];
