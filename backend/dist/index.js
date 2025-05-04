"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
// './routes/userRoutes'; // Импортируем маршруты пользователей
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
// "../src/routes/postRoutes";
const db_1 = require("./db/db"); // Импортируем Pool из pg
// Загружаем переменные окружения
dotenv_1.default.config();
db_1.pool
    .connect()
    .then(() => console.log("✅ Подключено к базе данных"))
    .catch((err) => console.error("❌ Ошибка подключения к базе данных", err));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // именно твой frontend адрес
    credentials: true, // разрешает отправку куки, токенов и т.п.
}));
app.use(express_1.default.json());
app.use("/api/posts", postRoutes_1.default);
app.use("/api/users", userRoutes_1.default); // Подключаем маршруты пользователей
// Пример базового маршрута
app.get("/", (_req, res) => {
    res.send("Сервер работает!");
});
// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
