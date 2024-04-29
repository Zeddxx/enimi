import { IRouter } from "express";
import { register } from "../../controllers/auth.controller";

export default (router: IRouter) => {
    router.post("/api/auth/register", register);
}