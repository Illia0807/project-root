import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Типы данных для авторизации
interface JwtPayload {
  id: number;
  
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "Токен не предоставлен" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Неверный токен" });
  }
};

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
