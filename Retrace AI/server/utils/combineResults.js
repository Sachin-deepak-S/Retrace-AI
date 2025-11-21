// server/utils/combineResults.js

/**
 * ==========================================================
 *  COMBINE RESULT LOGIC (Phase 3 Unified Output)
 * ==========================================================
 *
 *  This utility merges:
 *   - Google Vision SafeSearch + Enhancement data
 *   - Hive Moderation AI/NSFW/Forgery/Tampering results
 *   - Sightengine NSFW/Watermark/Deepfake/Manipulation results
 *   - Metadata (EXIF)
 *
 *  Result is returned in a clean frontend-friendly format.
 */

export const combineResults = (
  google = {},
  hive = {},
  sightengine = {},
  metadata = {}
) => {
  try {
    /**
     * ==========================================================
     * 1️⃣ SAFETY & NSFW RESULT
     * ==========================================================
     */
    const nsfw = {
      google_safe: google?.is_nsfw || false,
      hive_safe: hive?.is_nsfw || false,
      sightengine_safe: sightengine?.is_nsfw || false,

      is_nsfw:
        google?.is_nsfw === true ||
        hive?.is_nsfw === true ||
        sightengine?.is_nsfw === true,

      confidence: {
        google: google?.nsfw_score || 0,
        hive: hive?.nsfw_score || 0,
        sightengine: sightengine?.nsfw_score || 0,
      },
    };

    /**
     * ==========================================================
     * 2️⃣ AUTHENTICITY (AI GENERATED / DEEPFAKE / TAMPERING)
     * ==========================================================
     */
    const authenticity = {
      ai_generated:
        hive?.ai_generated ||
        sightengine?.ai_generated ||
        false,

      tampering:
        hive?.tampering ||
        sightengine?.tampering ||
        false,

      deepfake:
        sightengine?.deepfake ||
        hive?.deepfake ||
        false,

      scores: {
        hive_ai_score: hive?.ai_score || 0,
        sightengine_ai_score: sightengine?.ai_score || 0,
      },
    };

    /**
     * ==========================================================
     * 3️⃣ WATERMARK ANALYSIS
     * ==========================================================
     */
    const watermark = {
      detected: sightengine?.watermark_detected || false,
      type: sightengine?.watermark_type || "none",
      confidence: sightengine?.watermark_confidence || 0,
    };

    /**
     * ==========================================================
     * 4️⃣ ENHANCEMENTS / EDITS / FILTERS (Google + Hive)
     * ==========================================================
     */
    const enhancements = [
      ...(google?.enhancements || []),
      ...(hive?.enhancements || []),
      ...(sightengine?.enhancements || []),
    ];

    /**
     * ==========================================================
     * 5️⃣ METADATA CLEANING
     * ==========================================================
     */
    const cleanedMetadata = {
      camera: metadata?.camera || "Unknown",
      software: metadata?.software || "Unknown",
      created_at: metadata?.created_at || null,
      dimensions: metadata?.dimensions || null,
      colorspace: metadata?.colorspace || null,
    };

    /**
     * ==========================================================
     * 6️⃣ FINAL COMBINED STRUCTURE
     * ==========================================================
     */
    return {
      status: "success",
      nsfw,
      authenticity,
      watermark,
      enhancements,
      metadata: cleanedMetadata,

      // Raw (optional for debugging)
      raw: {
        google,
        hive,
        sightengine,
        metadata,
      },
    };
  } catch (err) {
    return {
      status: "error",
      error: err.message,
    };
  }
};
