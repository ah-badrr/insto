import express from "express";
import { getRelations, getFollower, getFollowed,getRelationByFF, createRelation, getRelationById, updateRelation, deleteRelation } from "../controllers/RelationController.js";

const router = express.Router();

router.get("/relations", getRelations);
router.get("/relations/:id", getRelationById);
router.get("/relations/follower/:userId", getFollower);
router.get("/relations/followed/:followed", getFollowed);
router.get("/relations/ff/:userId&&:followed", getRelationByFF);
router.post("/relations", createRelation);
router.patch("/relations/:id", updateRelation);
router.delete("/relations/:userId&&:followed", deleteRelation);

export default router;
