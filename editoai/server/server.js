// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import analyzeRoutes from "./routes/analyzeRoutes.js";
import path from "path";
import fs from "fs";

dotenv.config();
const app = express();

// ✅ Middleware
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.use(cors({
  origin: ["http://localhost:3000"], // Allow React frontend
  methods: ["GET", "POST"],
  credentials: true,
}));

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/retrace_ai", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Ensure uploads folder exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// ✅ Routes
app.use("/api/auth", authRoutes);        // User Auth (Login, Signup, etc.)
app.use("/api/analyze", analyzeRoutes);  // File analysis routes (NSFW + full analysis)

// ✅ Health Check Route
app.get("/", (req, res) => {
  res.send("🚀 ReTrace AI Backend is running successfully.");
});

// ✅ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Internal Server Error:", err);
  res.status(500).json({ error: "Internal Server Error", details: err.message });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Express backend running at http://localhost:${PORT}`);
});
