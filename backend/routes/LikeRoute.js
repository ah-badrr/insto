import express from "express";
import { getLikes,getLikeByPost, createLike,getLikeByPostUser, getLikeById, updateLike, deleteLike } from "../controllers/LikeController.js";

const router = express.Router();

router.get("/likes", getLikes);
router.get("/likes/:id", getLikeById);
router.get("/likes/post/:post", getLikeByPost);
router.get("/likes/postus/:post&&:user", getLikeByPostUser);
router.post("/likes", createLike);
router.patch("/likes/:id", updateLike);
router.delete("/likes/:post&&:user", deleteLike);

export default router;
