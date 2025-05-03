"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/postRoutes.ts
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.get("/", postController_1.fetchAllPosts); // публичный список
router.get("/me", authMiddleware_1.authMiddleware, postController_1.fetchUserPosts); // посты текущего пользователя
router.get("/:id", postController_1.fetchPostById); // пост по id
router.post("/", authMiddleware_1.authMiddleware, postController_1.createNewPost); // создать пост
exports.default = router;
