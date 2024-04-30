import { IRouter } from "express";
import { login, logout, register, verifyEmail } from "../../controllers/auth.controller";

export default (router: IRouter) => {
    router.post("/api/auth/register", register);
    router.get("/api/auth/verify/:userId/:token", verifyEmail)
    router.post("/api/auth/login", login)
    router.post("/api/auth/logout", logout)
}