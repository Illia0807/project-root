// src/models/postModel.ts
import { pool } from "../db/db";

export interface Post {
  id: number;
  user_id: number;
  title: string;
  content: string;
  created_at: Date;
}

export const createPost = async (
  userId: number,
  title: string,
  content: string
): Promise<Post> => {
  const result = await pool.query(
    "INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3) RETURNING *",
    [userId, title, content]
  );
  return result.rows[0];
};

export const getAllPosts = async (): Promise<Post[]> => {
  const result = await pool.query(
    "SELECT * FROM posts ORDER BY created_at DESC"
  );
  return result.rows;
};

export const getPostById = async (id: number): Promise<Post | null> => {
  const result = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
  return result.rows[0] || null;
};

export const getPostsByUser = async (userId: number): Promise<Post[]> => {
  const result = await pool.query(
    "SELECT * FROM posts WHERE user_id = $1 ORDER BY created_at DESC",
    [userId]
  );
  return result.rows;
};
export const updatePost = async (
  postId: number,
  updateData: { title?: string; content: string }
): Promise<Post> => {
  const result = await pool.query(
    `UPDATE posts 
     SET title = COALESCE($1, title), 
         content = $2,
         updated_at = NOW()
     WHERE id = $3
     RETURNING *`,
    [updateData.title, updateData.content, postId]
  );

  return result.rows[0];
};
