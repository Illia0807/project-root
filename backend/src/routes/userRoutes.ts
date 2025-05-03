import express from "express";
import { registerUser, loginUser, getMe } from "../controllers/userController"; // Импортируем контроллеры для регистрации и логина
// import { registerUser, loginUser } from "../controllers/userController";
import { authMiddleware as protect } from "../middlewares/authMiddleware"; // Импортируем middleware для защиты маршрутов

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.get("/profile", protect, (req, res) => {
  res.json({ message: "Доступ к профилю разрешен", user: req.user });
});

export default router;
