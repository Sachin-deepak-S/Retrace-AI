// server/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    mobile: { type: String },

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Track API usage (Phase 3 AI API calls)
    apiUsage: {
      dailyCalls: { type: Number, default: 0 },
      monthlyCalls: { type: Number, default: 0 },
      lastReset: { type: Date, default: Date.now },
    },

  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
