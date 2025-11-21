// server/controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* =======================================================
   REGISTER USER  (SIGN UP)
   Route: POST /api/auth/register
======================================================= */
export const registerUser = async (req, res) => {
  try {
    const { fullName, mobile, email, password } = req.body;

    // Basic validation
    if (!fullName || !mobile || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered." });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      fullName,
      mobile,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      message: "✅ User registered successfully.",
    });
  } catch (error) {
    console.error("Signup error:", error);
    res
      .status(500)
      .json({ message: "⚠️ Something went wrong. Try again later." });
  }
};



/* =======================================================
   USER LOGIN
   Route: POST /api/auth/login
======================================================= */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required." });
    }

    const user = await User.findOne({ email });

    console.log("Login attempt:", email, "Found:", !!user);

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Check password FIRST
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }



    // Generate token
    const secret = process.env.JWT_SECRET || "DEFAULT_SECRET_KEY";
    const token = jwt.sign(
      { id: user._id, email: user.email },
      secret,
      { expiresIn: "1h" }
    );

    // Send response
    res.status(200).json({
      message: "✅ Login successful!",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        mobile: user.mobile,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "⚠️ Server error during login",
      error: error.message,
    });
  }
};
