import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

// Подключение к базе данных
import { pool } from '../db/db';

interface User {
  id: number;
  username: string;
  password: string;
}

// Функция для создания пользователя
export const createUser = async (username: string, hashedPassword: string): Promise<User> => {
        const result = await pool.query(
          'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username, password',
          [username, hashedPassword]
        );
      
        return result.rows[0];
      };

// Функция для поиска пользователя по имени
export const getUserByUsername = async (username: string): Promise<User | null> => {
  const result = await pool.query('SELECT id, username, password FROM users WHERE username = $1', [username]);

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
};

// Функция для поиска пользователя по ID
export const getUserById = async (id: number): Promise<User | null> => {
  const result = await pool.query('SELECT id, username, password FROM users WHERE id = $1', [id]);

  if (result.rows.length === 0) {
    return null;
  }

  return result.rows[0];
};
