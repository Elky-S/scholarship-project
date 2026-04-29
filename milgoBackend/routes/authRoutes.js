import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import * as authController from "../controllers/authController.js"; // חובה .js

const router = express.Router();
// כשמישהו שולח בקשת POST לכתובת /register, תפעיל את פונקציית הרישום
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", protect, authController.getMe);
router.get("/refresh-token", protect, authController.refreshToken);
router.post("/logout", authController.logout);

export default router;
