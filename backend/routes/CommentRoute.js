import express from "express";
import { getComments, createComment, getCommentById, updateComment, deleteComment } from "../controllers/CommentController.js";

const router = express.Router();

router.get("/comments", getComments);
router.get("/comments/:post", getCommentById);
router.post("/comments", createComment);
router.patch("/comments/:id", updateComment);
router.delete("/comments/:post&&:user", deleteComment);

export default router;
