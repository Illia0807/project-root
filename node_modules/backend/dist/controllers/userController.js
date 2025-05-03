"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = exports.getMe = void 0;
const userModel_1 = require("../models/userModel"); // Импортируем функции из модели
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Контроллер для регистрации пользователя
// export const registerUser = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   const { username, password } = req.body;
//   console.log(process.env.JWT_SECRET);
//   const existingUser = await getUserByUsername(username);
//   if (existingUser) {
//     res
//       .status(400)
//       .json({ message: "Пользователь с таким именем уже существует" });
//     return;
//   }
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const newUser = await createUser(username, hashedPassword);
//   console.log("Хэшированный пароль:", hashedPassword);
//   const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET!, {
//     expiresIn: "1h",
//   });
//   res
//     .status(201)
//     .json({ message: "Пользователь успешно зарегистрирован", token });
// };
// export const loginUser = async (req: Request, res: Response): Promise<void> => {
//   const { username, password } = req.body;
//   console.log(process.env.JWT_SECRET);
//   const user = await getUserByUsername(username);
//   if (!user) {
//     res.status(400).json({ message: "Неверное имя пользователя или пароль" });
//     return;
//   }
//   console.log('user.password:', user.password);
//   console.log('password:', password);
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     res.status(400).json({ message: "Неверное имя пользователя или пароль" });
//     return;
//   }
//   const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
//     expiresIn: "1h",
//   });
//   res.status(200).json({ message: "Успешный вход", token });
// };
const getMe = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({ message: "Нет авторизации" });
            return;
        }
        const user = await (0, userModel_1.getUserById)(userId);
        if (!user) {
            res.status(404).json({ message: "Пользователь не найден" });
            return;
        }
        const { password, ...safeUser } = user;
        res.json({ message: "Профиль найден", user: safeUser });
    }
    catch (err) {
        res.status(500).json({ message: "Ошибка сервера при получении профиля" });
    }
};
exports.getMe = getMe;
const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("🔐 Регистрация:");
        console.log("Имя пользователя:", username);
        console.log("Пароль:", password);
        console.log("JWT_SECRET:", process.env.JWT_SECRET);
        const existingUser = await (0, userModel_1.getUserByUsername)(username);
        if (existingUser) {
            res
                .status(400)
                .json({ message: "Пользователь с таким именем уже существует" });
            return;
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        console.log("➡️ Хэшированный пароль:", hashedPassword);
        const newUser = await (0, userModel_1.createUser)(username, hashedPassword);
        console.log("✅ Пользователь создан:", newUser);
        const token = jsonwebtoken_1.default.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.status(201).json({
            message: "Пользователь успешно зарегистрирован",
            token,
            userId: newUser.id,
        });
    }
    catch (err) {
        console.error("❌ Ошибка при регистрации:", err);
        res.status(500).json({ message: "Ошибка сервера при регистрации" });
    }
};
exports.registerUser = registerUser;
// Вход пользователя
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("🔐 Вход:");
        console.log("Имя пользователя:", username);
        console.log("Введённый пароль:", password);
        console.log("JWT_SECRET:", process.env.JWT_SECRET);
        const user = await (0, userModel_1.getUserByUsername)(username);
        if (!user) {
            console.warn("⚠️ Пользователь не найден");
            res.status(400).json({ message: "Неверное имя пользователя или пароль" });
            return;
        }
        console.log("🧾 Пароль из базы данных:", user.password);
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        console.log("🔍 Совпадение паролей:", isMatch);
        if (!isMatch) {
            console.warn("❌ Пароли не совпадают");
            res.status(400).json({ message: "Неверное имя пользователя или пароль" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        console.log("✅ Вход успешен, токен создан");
        res.status(200).json({
            message: "Успешный вход",
            token,
            userId: user.id,
        });
    }
    catch (err) {
        console.error("❌ Ошибка при входе:", err);
        res.status(500).json({ message: "Ошибка сервера при входе" });
    }
};
exports.loginUser = loginUser;
