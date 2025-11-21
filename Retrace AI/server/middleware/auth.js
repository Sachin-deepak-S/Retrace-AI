// server/middleware/auth.js
import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    // Check if header exists
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No authorization header provided",
      });
    }

    // Check "Bearer token" format
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format",
      });
    }

    const token = parts[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    // Check JWT Secret exists
    if (!process.env.JWT_SECRET) {
      console.error("❌ ERROR: JWT_SECRET missing in .env");
      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }

    // Verify token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: "Invalid or expired token",
        });
      }

      req.user = user; // attach decoded user data
      next();
    });

  } catch (error) {
    console.error("❌ Auth Middleware Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Authentication error",
    });
  }
};
