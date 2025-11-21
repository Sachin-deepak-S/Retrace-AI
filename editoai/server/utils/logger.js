// server/utils/logger.js

import fs from "fs";
import path from "path";

const LOG_DIR = path.resolve("server/logs");

// Ensure directory exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

// Log file path
const LOG_FILE = path.join(LOG_DIR, "analyze.log");

// Max log file size → 5MB
const MAX_LOG_SIZE = 5 * 1024 * 1024;

// Rotate log if too large
function rotateLog() {
  if (fs.existsSync(LOG_FILE)) {
    const stats = fs.statSync(LOG_FILE);
    if (stats.size > MAX_LOG_SIZE) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const backup = `${LOG_FILE}.${timestamp}.backup`;
      fs.renameSync(LOG_FILE, backup);
    }
  }
}

// Core logger method
export function logEvent(type, message, data = null) {
  rotateLog(); // Check log size before writing

  const timestamp = new Date().toISOString();

  const logEntry = `
[${timestamp}] [${type}]
${message}
${data ? "Data: " + JSON.stringify(data) : ""}
--------------------------------------------------
`;

  fs.appendFile(LOG_FILE, logEntry, (err) => {
    if (err) console.error("❌ Log write error:", err);
  });
}

// Helper wrappers

export const logSafetyCheck = (msg, data = null) =>
  logEvent("SAFETY_CHECK", msg, data);

export const logFullAnalysis = (msg, data = null) =>
  logEvent("FULL_ANALYSIS", msg, data);

export const logGoogleVision = (msg, data = null) =>
  logEvent("GOOGLE_VISION_API", msg, data);

export const logHiveAI = (msg, data = null) =>
  logEvent("HIVE_AI_API", msg, data);

export const logSightEngine = (msg, data = null) =>
  logEvent("SIGHTENGINE_API", msg, data);

export const logError = (msg, data = null) =>
  logEvent("ERROR", msg, data);
