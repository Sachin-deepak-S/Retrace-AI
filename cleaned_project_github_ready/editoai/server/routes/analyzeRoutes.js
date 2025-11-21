// server/routes/analyzeRoutes.js
import express from "express";
import multer from "multer";
import { authenticateToken } from "../middleware/auth.js";
import {
  analyzeSafety,
  analyzeFull
} from "../controllers/analyzeController.js";

const router = express.Router();

/**
 * =======================================
 * Multer File Storage — Save to /server/uploads
 * =======================================
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "server/uploads/");   // correct folder path
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + "-" + file.originalname);
  },
});

/**
 * =======================================
 * Multer File Upload Validation
 * =======================================
 */
const upload = multer({
  storage,
  limits: {
    fileSize: 200 * 1024 * 1024, // 200MB max
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "video/mp4",
      "video/quicktime", // .mov
      "video/x-msvideo"  // .avi
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("❌ Unsupported file type"));
    }
  },
});

/**
 * =======================================
 * PHASE 3 — ROUTES
 * =======================================
 */

// 1️⃣ NSFW Safety Check route (Phase 1)
router.post(
  "/safety",
  authenticateToken,
  upload.single("file"),
  analyzeSafety
);

// 2️⃣ Full Analysis route (Phase 2)
router.post(
  "/full",
  authenticateToken,
  upload.single("file"),
  analyzeFull
);

// 3️⃣ Simple GET route for testing
router.get("/", (req, res) => {
  res.send("ReTrace AI Analysis API is running ⚡");
});

export default router;
