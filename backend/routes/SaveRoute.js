import express from "express";
import { getSaves, getSaveByPost, getSaveByUser, createSave, getSaveByPostUser, getSaveById, updateSave, deleteSave } from "../controllers/SaveController.js";

const router = express.Router();

router.get("/saves", getSaves);
router.get("/saves/:id", getSaveById);
router.get("/saves/post/:post", getSaveByPost);
router.get("/saves/user/:user", getSaveByUser);
router.get("/saves/postus/:post&&:user", getSaveByPostUser);
router.post("/saves", createSave);
router.patch("/saves/:id", updateSave);
router.delete("/saves/:post&&:user", deleteSave);

export default router;
