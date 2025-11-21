// server/controllers/analyzeController.js
import fs from "fs";
import path from "path";
import { googleVisionCheck } from "../utils/googleVision.js";
import { hiveCheck } from "../utils/hiveAPI.js";
import { sightengineCheck } from "../utils/sightengineAPI.js";
import { extractMetadata } from "../utils/metadataReader.js";
import { logEvent } from "../utils/logger.js";

/**
 * ==========================================================
 *  PHASE 3: SAFETY CHECK (NSFW Check Using 3 APIs)
 *  Route: POST /api/analyze/safety
 * ==========================================================
 */
export const analyzeSafety = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: "No file uploaded." });

    const filePath = req.file.path;
    logEvent("Safety Check Started: " + req.file.originalname);

    // ---- Run NSFW Checks ----
    const google = await googleVisionCheck(filePath);
    const hive = await hiveCheck(filePath);
    const sightengine = await sightengineCheck(filePath);

    // Determine final NSFW decision
    const isNSFW =
      google.is_nsfw || hive.is_nsfw || sightengine.is_nsfw;

    const result = {
      nsfw: isNSFW,
      sources: {
        google,
        hive,
        sightengine,
      },
    };

    // Remove temp file
    fs.unlinkSync(filePath);

    if (isNSFW) {
      logEvent("NSFW Detected — Analysis Stopped");
      return res.json({
        category: "NSFW",
        nsfw_analysis: result,
      });
    }

    logEvent("Safety Passed — File is Safe");
    return res.json({
      category: "SAFE",
      nsfw_analysis: result,
    });

  } catch (error) {
    logEvent("Safety Check Error: " + error.message);
    return res.status(500).json({ error: "Safety check failed", details: error.message });
  }
};

/**
 * ==========================================================
 *  PHASE 3: FULL AI ANALYSIS (Authenticity + Watermark + Metadata)
 *  Route: POST /api/analyze/full
 * ==========================================================
 */
export const analyzeFull = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ error: "No file uploaded." });

    const filePath = req.file.path;
    logEvent("Full Analysis Started: " + req.file.originalname);

    // Run AI Checks
    const google = await googleVisionCheck(filePath);
    const hive = await hiveCheck(filePath);
    const sightengine = await sightengineCheck(filePath);

    // Metadata
    const metadata = await extractMetadata(filePath);

    // Combined result
    const result = {
      authenticity: {
        ai_generated:
          hive.ai_generated || sightengine.ai_generated,
        tampering:
          hive.tampering || sightengine.tampering,
      },
      watermark_analysis: {
        detected: sightengine.watermark_detected,
      },
      metadata,
      enhancements: google.enhancements,
      raw: { google, hive, sightengine },
    };

    fs.unlinkSync(filePath);

    logEvent("✔ Full Analysis Complete");
    return res.json(result);

  } catch (error) {
    logEvent("Full Analysis Error: " + error.message);
    return res.status(500).json({ error: "Full analysis failed", details: error.message });
  }
};
