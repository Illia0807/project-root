import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "../src/routes/userRoutes";
// './routes/userRoutes'; // Импортируем маршруты пользователей
import postRoutes from '../src/routes/postRoutes'
// "../src/routes/postRoutes";

import { pool } from "../src/db/db"; // Импортируем Pool из pg

// Загружаем переменные окружения
dotenv.config();

pool
  .connect()
  .then(() => console.log("✅ Подключено к базе данных"))
  .catch((err) => console.error("❌ Ошибка подключения к базе данных", err));

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // именно твой frontend адрес
    credentials: true, // разрешает отправку куки, токенов и т.п.
  })
);
app.use(express.json());
app.use("/api/posts", postRoutes);

app.use("/api/users", userRoutes); // Подключаем маршруты пользователей

// Пример базового маршрута
app.get("/", (_req, res) => {
  res.send("Сервер работает!");
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
