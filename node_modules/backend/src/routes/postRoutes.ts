// src/routes/postRoutes.ts
import express from "express";
import { createNewPost, fetchAllPosts, fetchPostById, fetchUserPosts } from "../controllers/postController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", fetchAllPosts);                // публичный список
router.get("/me", authMiddleware, fetchUserPosts); // посты текущего пользователя
router.get("/:id", fetchPostById);             // пост по id
router.post("/", authMiddleware, createNewPost);   // создать пост

export default router;
