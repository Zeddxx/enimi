import { Request, Response, Router } from "express";
import { verifyToken } from "../../middleware/token.middleware";
import { currentUser } from "../../controllers/user.controller";

export default (router: Router) => {
    router.get("/api/auth/verify-token", verifyToken, (req: Request, res: Response) => {
        return res.status(200).send({ userId: req.userId });
    });
    router.get("/api/auth/current-user", verifyToken, currentUser);
}