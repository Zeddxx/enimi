import { IRouter, Router } from "express";
import animeRoutes from "./animes/anime.routes";
import authRoutes from "./authentication/auth.routes";

const router: IRouter = Router();

export default (): IRouter => {
  authRoutes(router);
  animeRoutes(router);
  return router;
};
