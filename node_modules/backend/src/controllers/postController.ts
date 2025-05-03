// src/controllers/postController.ts
import { Request, Response } from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  getPostsByUser,
} from "../models/postModel";
import { log } from "console";

export const createNewPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = Number(req.user?.userId); // Преобразуем userId в number
  console.log(userId);

  const { title, content } = req.body;

  if (!userId || !title || !content) {
    res.status(400).json({ message: "Все поля обязательны" });
    return;
  }

  const post = await createPost(userId, title, content);
  res.status(201).json({ message: "Пост создан", post });
};

export const fetchAllPosts = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const posts = await getAllPosts();
  res.json(posts);
};

export const fetchUserPosts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = Number(req.user?.userId); // Преобразуем userId в number
  if (!userId) {
    res.status(401).json({ message: "Неавторизованный пользователь" });
    return;
  }
  const posts = await getPostsByUser(userId);
  res.json(posts);
};

export const fetchPostById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const id = parseInt(req.params.id);
  const post = await getPostById(id);
  if (!post) {
    res.status(404).json({ message: "Пост не найден" });
    return;
  }
  res.json(post);
};
