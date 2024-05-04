import { Request, Response, Router } from "express";
import { verifyToken } from "../../middleware/token.middleware";
import {
  addCurrentlyWatching,
  addWatchLater,
  currentUser,
  deleteWatchLater,
  getCurrentlyWatching,
  getWatchLater,
} from "../../controllers/user.controller";

export default (router: Router) => {
  router.get(
    "/api/auth/verify-token",
    verifyToken,
    (req: Request, res: Response) => {
      return res.status(200).send({ userId: req.userId });
    }
  );
  router.get("/api/auth/current-user", verifyToken, currentUser);
  router.post("/api/watch-later", verifyToken, addWatchLater);
  router.get("/api/get-watch-later", verifyToken, getWatchLater);
  router.delete("/api/delete-watch-later", verifyToken, deleteWatchLater);
  router.post("/api/watching", verifyToken, addCurrentlyWatching);
  router.get("/api/get-watching", verifyToken,getCurrentlyWatching);
};
