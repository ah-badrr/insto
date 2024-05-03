import express from "express";
import { getProfiles,getProfileByUser, createProfile, getProfileById, updateProfile, deleteProfile } from "../controllers/ProfileController.js";

const router=express.Router();

router.get("/profiles", getProfiles);
router.get("/profiles/:id", getProfileById);
router.get("/profiles/user/:user", getProfileByUser);
router.post("/profiles", createProfile);
router.patch("/profiles/:id", updateProfile);
router.delete("/profiles/:id", deleteProfile);

export default router;
