// server/utils/validateFile.js
import fs from "fs";

/**
 * ===========================================================
 * 🔍 validateUploadedFile(file)
 * - Ensures the uploaded file is valid, safe & processable
 * ===========================================================
 */
export function validateUploadedFile(file) {
  if (!file) {
    return { valid: false, error: "No file uploaded." };
  }

  // -----------------------------
  // 1️⃣ Allowed MIME types
  // -----------------------------
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "video/mp4",
    "video/quicktime",
    "video/x-msvideo",
  ];

  if (!allowedTypes.includes(file.mimetype)) {
    return {
      valid: false,
      error: `Unsupported file type: ${file.mimetype}`,
    };
  }

  // -----------------------------
  // 2️⃣ Max size check (200MB)
  // -----------------------------
  const maxSize = 200 * 1024 * 1024; // 200MB
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Max allowed is 200MB.`,
    };
  }

  // -----------------------------
  // 3️⃣ Check if file exists
  // -----------------------------
  if (!fs.existsSync(file.path)) {
    return { valid: false, error: "Uploaded file not found on server." };
  }

  // -----------------------------
  // 4️⃣ Basic corruption check
  // -----------------------------
  try {
    const stats = fs.statSync(file.path);
    if (!stats || stats.size <= 0) {
      return { valid: false, error: "File seems corrupted or empty." };
    }
  } catch (err) {
    return { valid: false, error: "Unable to access uploaded file." };
  }

  // -----------------------------
  // 5️⃣ Additional metadata rules (optional)
  // -----------------------------
  if (!file.originalname || file.originalname.trim() === "") {
    return { valid: false, error: "Invalid file name." };
  }

  return { valid: true, error: null };
}
