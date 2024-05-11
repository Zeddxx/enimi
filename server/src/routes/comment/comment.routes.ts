import { Router } from "express"
import { verifyToken } from "../../middleware/token.middleware"
import { addReply, comment, getComment, toggleLikeComment } from "../../controllers/comment.controller"

export default (router: Router) => {
    router.post("/api/comment", verifyToken, comment)
    router.get("/api/comment", getComment)
    router.put("/api/comment", verifyToken, toggleLikeComment)
    router.post("/api/comment/reply", verifyToken, addReply)
}