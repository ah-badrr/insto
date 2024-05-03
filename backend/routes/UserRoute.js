import express from "express";
import { getUsers,getUserByName, userLogin, getUserById, createUser, updateUser, deleteUser } from "../controllers/UserController.js";

const router = express.Router();

router.get("/users", getUsers);
// router.get("/users/:name", getUserByName);
router.get("/users/login/:username&&:password", userLogin);
// router.patch("/users/login/", userLogin);
router.get("/users/:id", getUserById);
router.get("/users/name/:name", getUserByName);
router.post("/users", createUser);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
