"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPostById = exports.fetchUserPosts = exports.fetchAllPosts = exports.createNewPost = void 0;
const postModel_1 = require("../models/postModel");
const createNewPost = async (req, res) => {
    const userId = Number(req.user?.userId); // Преобразуем userId в number
    console.log(userId);
    const { title, content } = req.body;
    if (!userId || !title || !content) {
        res.status(400).json({ message: "Все поля обязательны" });
        return;
    }
    const post = await (0, postModel_1.createPost)(userId, title, content);
    res.status(201).json({ message: "Пост создан", post });
};
exports.createNewPost = createNewPost;
const fetchAllPosts = async (_req, res) => {
    const posts = await (0, postModel_1.getAllPosts)();
    res.json(posts);
};
exports.fetchAllPosts = fetchAllPosts;
const fetchUserPosts = async (req, res) => {
    const userId = Number(req.user?.userId); // Преобразуем userId в number
    if (!userId) {
        res.status(401).json({ message: "Неавторизованный пользователь" });
        return;
    }
    const posts = await (0, postModel_1.getPostsByUser)(userId);
    res.json(posts);
};
exports.fetchUserPosts = fetchUserPosts;
const fetchPostById = async (req, res) => {
    const id = parseInt(req.params.id);
    const post = await (0, postModel_1.getPostById)(id);
    if (!post) {
        res.status(404).json({ message: "Пост не найден" });
        return;
    }
    res.json(post);
};
exports.fetchPostById = fetchPostById;
