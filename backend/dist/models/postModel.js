"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePost = exports.getPostsByUser = exports.getPostById = exports.getAllPosts = exports.createPost = void 0;
// src/models/postModel.ts
const db_1 = require("../db/db");
const createPost = async (userId, title, content) => {
    const result = await db_1.pool.query("INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3) RETURNING *", [userId, title, content]);
    return result.rows[0];
};
exports.createPost = createPost;
const getAllPosts = async () => {
    const result = await db_1.pool.query("SELECT * FROM posts ORDER BY created_at DESC");
    return result.rows;
};
exports.getAllPosts = getAllPosts;
const getPostById = async (id) => {
    const result = await db_1.pool.query("SELECT * FROM posts WHERE id = $1", [id]);
    return result.rows[0] || null;
};
exports.getPostById = getPostById;
const getPostsByUser = async (userId) => {
    const result = await db_1.pool.query("SELECT * FROM posts WHERE user_id = $1 ORDER BY created_at DESC", [userId]);
    return result.rows;
};
exports.getPostsByUser = getPostsByUser;
const updatePost = async (postId, updateData) => {
    const result = await db_1.pool.query(`UPDATE posts 
     SET title = COALESCE($1, title), 
         content = $2,
         updated_at = NOW()
     WHERE id = $3
     RETURNING *`, [updateData.title, updateData.content, postId]);
    return result.rows[0];
};
exports.updatePost = updatePost;
