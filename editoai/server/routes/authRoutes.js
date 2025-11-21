// server/routes/authRoutes.js
import express from "express";
import {
  registerUser,
  loginUser
} from "../controllers/authController.js";

import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

/**
 * =====================================================
 * USER AUTH ROUTES
 * =====================================================
 */

// 1️⃣ User Registration
router.post("/signup", registerUser);

// 2️⃣ User Login
router.post("/login", loginUser);



// 4️⃣ Protected Route (optional, for dashboard validation)
router.get("/me", authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: "Authenticated user",
    user: req.user
  });
});



// 6️⃣ Default test route
router.get("/", (req, res) => {
  res.send("ReTrace AI Auth API is running 🔐");
});

export default router;
