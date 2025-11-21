// server/utils/hiveAPI.js
import axios from "axios";
import fs from "fs";

const HIVE_API_KEY = process.env.HIVE_API_KEY;

/**
 * ================================================================
 *   HIVE MODERATION API — AI/NSFW/Violence/Forgery/Deepfake
 * ================================================================
 *
 * Models used:
 *  - NSFW
 *  - Violence
 *  - Content Manipulation (AI generated / deepfake / tampering)
 *
 * Output normalized for combineResults.js
 */

export const hiveCheck = async (filePath) => {
  if (!HIVE_API_KEY) {
    console.error("❌ HIVE_API_KEY missing in .env");
    return {
      provider: "hive",
      error: "HIVE_API_KEY missing",
      is_nsfw: false,
    };
  }

  try {
    const fileStream = fs.createReadStream(filePath);

    const formData = new FormData();
    formData.append("media", fileStream);
    formData.append("models", "nsfw,violence,manipulation");
    formData.append("api_key", HIVE_API_KEY);

    const response = await axios.post(
      "https://api.hivemoderation.com/v1/vision/predict",
      formData,
      { headers: formData.getHeaders(), maxBodyLength: Infinity }
    );

    const data = response.data || {};

    // Extract model predictions safely
    const nsfw =
      data.output?.nsfw?.predictions?.[0]?.label === "porn" ||
      data.output?.nsfw?.predictions?.[0]?.label === "sexual";

    const nsfwScore =
      data.output?.nsfw?.predictions?.[0]?.score || 0;

    const violence =
      data.output?.violence?.predictions?.[0]?.score > 0.8;

    const manipulation = data.output?.manipulation || {};

    const aiGenerated =
      manipulation.ai_generated === true ||
      manipulation.fake === true;

    const deepfake =
      manipulation.deepfake === true ||
      manipulation.face_swap === true;

    const tampering =
      manipulation.tampering === true ||
      manipulation.edited === true;

    /** =======================================================
     * FINAL RETURN FORMAT (normalized)
     * ======================================================= */
    return {
      provider: "hive",
      is_nsfw: nsfw,
      nsfw_score: Number(nsfwScore.toFixed(2)),
      violence_detected: violence,

      ai_generated: aiGenerated,
      deepfake: deepfake,
      tampering: tampering,

      // Extra enhancements from manipulation model
      enhancements: manipulation.enhancements || [],

      raw: data,
    };
  } catch (err) {
    console.error("❌ Hive API Error:", err.message);

    return {
      provider: "hive",
      error: err.message,
      is_nsfw: false,
      nsfw_score: 0,
      ai_generated: false,
      deepfake: false,
      tampering: false,
      enhancements: [],
    };
  }
};
