import express from "express";
import { getMessages, createMessage, getMessageById, updateMessage, deleteMessage } from "../controllers/MessageController.js";

const router = express.Router();

router.get("/messages", getMessages);
router.get("/messages/:id", getMessageById);
router.post("/messages", createMessage);
router.patch("/messages/:id", updateMessage);
router.delete("/messages/:id", deleteMessage);

export default router;
