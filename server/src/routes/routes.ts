import { IRouter, Router } from "express";
import animeRoutes from "./animes/anime.routes";
import authRoutes from "./authentication/auth.routes";
import userRoutes from "./user/user.routes";
import commentRoutes from "./comment/comment.routes";

const router: IRouter = Router();

export default (): IRouter => {
  authRoutes(router);
  animeRoutes(router);
  userRoutes(router);
  commentRoutes(router);
  return router;
};
