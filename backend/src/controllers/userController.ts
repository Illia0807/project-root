import { Request, Response, RequestHandler, NextFunction } from "express";
import {
  createUser,
  getUserById,
  getUserByUsername,
} from "../models/userModel"; // Импортируем функции из модели
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

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

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user?.userId;

    if (!userId) {
      res.status(401).json({ message: "Нет авторизации" });
      return;
    }

    const user = await getUserById(userId);

    if (!user) {
      res.status(404).json({ message: "Пользователь не найден" });
      return;
    }

    const { password, ...safeUser } = user;
    res.json({ message: "Профиль найден", user: safeUser });
  } catch (err) {
    res.status(500).json({ message: "Ошибка сервера при получении профиля" });
  }
};

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, password } = req.body;
    console.log("🔐 Регистрация:");
    console.log("Имя пользователя:", username);
    console.log("Пароль:", password);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      res
        .status(400)
        .json({ message: "Пользователь с таким именем уже существует" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("➡️ Хэшированный пароль:", hashedPassword);

    const newUser = await createUser(username, hashedPassword);
    console.log("✅ Пользователь создан:", newUser);

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "Пользователь успешно зарегистрирован",
      token,
      userId: newUser.id,
    });
  } catch (err) {
    console.error("❌ Ошибка при регистрации:", err);
    res.status(500).json({ message: "Ошибка сервера при регистрации" });
  }
};

// Вход пользователя
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;
    console.log("🔐 Вход:");
    console.log("Имя пользователя:", username);
    console.log("Введённый пароль:", password);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    const user = await getUserByUsername(username);
    if (!user) {
      console.warn("⚠️ Пользователь не найден");
      res.status(400).json({ message: "Неверное имя пользователя или пароль" });
      return;
    }

    console.log("🧾 Пароль из базы данных:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔍 Совпадение паролей:", isMatch);

    if (!isMatch) {
      console.warn("❌ Пароли не совпадают");
      res.status(400).json({ message: "Неверное имя пользователя или пароль" });
      return;
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    console.log("✅ Вход успешен, токен создан");

    res.status(200).json({
      message: "Успешный вход",
      token,
      userId: user.id,
    });
  } catch (err) {
    console.error("❌ Ошибка при входе:", err);
    res.status(500).json({ message: "Ошибка сервера при входе" });
  }
};
