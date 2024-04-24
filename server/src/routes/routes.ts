import { IRouter, Router } from "express";
import animeRoutes from "./animes/anime.routes";

const router: IRouter = Router();

export default (): IRouter => {
  animeRoutes(router);
  return router;
};
