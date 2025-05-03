"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController"); // Импортируем контроллеры для регистрации и логина
// import { registerUser, loginUser } from "../controllers/userController";
const authMiddleware_1 = require("../middlewares/authMiddleware"); // Импортируем middleware для защиты маршрутов
const router = express_1.default.Router();
router.post("/register", userController_1.registerUser);
router.post("/login", userController_1.loginUser);
router.get("/me", authMiddleware_1.authMiddleware, userController_1.getMe);
router.get("/profile", authMiddleware_1.authMiddleware, (req, res) => {
    res.json({ message: "Доступ к профилю разрешен", user: req.user });
});
exports.default = router;
