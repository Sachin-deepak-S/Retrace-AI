// server/utils/sightengineAPI.js

import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import { logSightEngine, logError } from "./logger.js";

const SIGHTENGINE_API_USER = process.env.SIGHTENGINE_API_USER;
const SIGHTENGINE_API_SECRET = process.env.SIGHTENGINE_API_SECRET;

if (!SIGHTENGINE_API_USER || !SIGHTENGINE_API_SECRET) {
  console.warn("⚠️ SightEngine API keys missing in environment variables!");
}

/**
 * ================================================================
 * 🔍 analyzeWithSightEngine(filePath)
 * - Checks NSFW, Nudity, Violence, Weapons, Alcohol, Drugs, etc.
 * ================================================================
 */
export async function analyzeWithSightEngine(filePath) {
  try {
    const form = new FormData();
    form.append("media", fs.createReadStream(filePath));
    form.append("models", "nudity-2.0,weapon,violence,alcohol,drugs");
    form.append("api_user", SIGHTENGINE_API_USER);
    form.append("api_secret", SIGHTENGINE_API_SECRET);

    const response = await axios.post(
      "https://api.sightengine.com/1.0/check.json",
      form,
      { headers: form.getHeaders() }
    );

    const result = response.data;

    // Log raw API response
    logSightEngine("SightEngine API success", result);

    // -----------------------
    // Build Simplified Output
    // -----------------------
    return {
      success: true,

      nsfw: {
        raw: result.nudity?.raw || 0,
        safe: result.nudity?.safe || 0,
        sexual_activity: result.nudity?.sexual_activity || 0,
        sexual_display: result.nudity?.sexual_display || 0,
        erotica: result.nudity?.erotica || 0,
      },

      violence: {
        isViolent: result.violence?.prob > 0.5,
        score: result.violence?.prob || 0,
      },

      weapon: {
        hasWeapon: result.weapon?.prob > 0.5,
        score: result.weapon?.prob || 0,
      },

      alcohol: {
        hasAlcohol: result.alcohol?.prob > 0.5,
        score: result.alcohol?.prob || 0,
      },

      drugs: {
        hasDrugs: result.drugs?.prob > 0.5,
        score: result.drugs?.prob || 0,
      },

      raw_output: result,
    };

  } catch (error) {
    logError("SightEngine API failed", error.message);

    return {
      success: false,
      nsfw: {},
      violence: {},
      weapon: {},
      alcohol: {},
      drugs: {},
      error: error.message || "SightEngine API error",
    };
  }
}

/**
 * Wrapper function for compatibility
 * Converts analyzeWithSightEngine format to expected format
 */
export const sightengineCheck = async (filePath) => {
  const result = await analyzeWithSightEngine(filePath);
  
  if (!result.success) {
    return {
      provider: "sightengine",
      error: result.error,
      is_nsfw: false,
      ai_generated: false,
      tampering: false,
      watermark_detected: false,
    };
  }

  // Convert to expected format
  const isNSFW = 
    result.nsfw?.raw > 0.5 ||
    result.nsfw?.sexual_activity > 0.5 ||
    result.nsfw?.sexual_display > 0.5 ||
    result.nsfw?.erotica > 0.5;

  return {
    provider: "sightengine",
    is_nsfw: isNSFW,
    nsfw_score: result.nsfw?.raw || 0,
    ai_generated: false, // SightEngine doesn't provide this
    tampering: false, // SightEngine doesn't provide this
    watermark_detected: false, // SightEngine doesn't provide this
    violence: result.violence?.isViolent || false,
    weapon: result.weapon?.hasWeapon || false,
    alcohol: result.alcohol?.hasAlcohol || false,
    drugs: result.drugs?.hasDrugs || false,
    raw: result,
  };
}