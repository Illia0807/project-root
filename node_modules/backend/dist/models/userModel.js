"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getUserByUsername = exports.createUser = void 0;
// Подключение к базе данных
const db_1 = require("../db/db");
// Функция для создания пользователя
const createUser = async (username, hashedPassword) => {
    const result = await db_1.pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username, password', [username, hashedPassword]);
    return result.rows[0];
};
exports.createUser = createUser;
// Функция для поиска пользователя по имени
const getUserByUsername = async (username) => {
    const result = await db_1.pool.query('SELECT id, username, password FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) {
        return null;
    }
    return result.rows[0];
};
exports.getUserByUsername = getUserByUsername;
// Функция для поиска пользователя по ID
const getUserById = async (id) => {
    const result = await db_1.pool.query('SELECT id, username, password FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
        return null;
    }
    return result.rows[0];
};
exports.getUserById = getUserById;
