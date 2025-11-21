// server/utils/googleVision.js
import path from "path";

let vision = null;
let client = null;
let visionInitialized = false;

/**
 * Initialize Google Vision client (lazy loading)
 */
const initGoogleVision = async () => {
  if (visionInitialized) return client !== null;
  
  try {
    const visionModule = await import("@google-cloud/vision");
    vision = visionModule.default || visionModule;
    // Initialize Google Vision Client
    client = new vision.ImageAnnotatorClient({
      keyFilename: path.join("server", "config", "google-key.json"), // service account key
    });
    visionInitialized = true;
    return true;
  } catch (err) {
    console.warn("⚠️ Google Cloud Vision not available:", err.message);
    visionInitialized = true;
    return false;
  }
};

/**
 * ==========================================================
 *  GOOGLE VISION ANALYSIS
 *  SafeSearch + Labels + ImageProperties + Enhancement Guess
 * ==========================================================
 */
export const googleVisionCheck = async (filePath) => {
  // Initialize if not already done
  const isAvailable = await initGoogleVision();
  
  if (!isAvailable || !client) {
    return {
      provider: "google_vision",
      error: "Google Cloud Vision not configured",
      is_nsfw: false,
      nsfw_score: 0,
      enhancements: [],
      labels: [],
    };
  }

  try {
    /** =============================
     * 1️⃣ SAFE SEARCH (NSFW detection)
     * ============================= */
    const [safeSearchResult] = await client.safeSearchDetection(filePath);
    const safe = safeSearchResult.safeSearchAnnotation || {};

    const nsfw =
      safe.adult === "LIKELY" ||
      safe.adult === "VERY_LIKELY" ||
      safe.racy === "LIKELY" ||
      safe.racy === "VERY_LIKELY";

    const nsfwScore =
      ["VERY_UNLIKELY", "UNLIKELY", "POSSIBLE", "LIKELY", "VERY_LIKELY"].indexOf(
        safe.adult
      ) / 4;

    /** =============================
     * 2️⃣ LABEL DETECTION (enhancement clues)
     * ============================= */
    const [labelResult] = await client.labelDetection(filePath);
    const labels = labelResult.labelAnnotations || [];

    const enhancementKeywords = [
      "blur",
      "contrast",
      "edited",
      "filter",
      "retouching",
      "photoshop",
      "manipulated",
      "lighting",
      "exposure",
    ];

    const enhancements = labels
      .filter((x) =>
        enhancementKeywords.some((key) =>
          x.description.toLowerCase().includes(key.toLowerCase())
        )
      )
      .map((x) => x.description);

    /** =============================
     * 3️⃣ IMAGE PROPERTIES (color edits)
     * ============================= */
    const [propertiesResult] = await client.imageProperties(filePath);
    const properties = propertiesResult.imagePropertiesAnnotation || {};

    let colorEnhancement = false;

    if (properties?.dominantColors?.colors) {
      const colors = properties.dominantColors.colors;

      // High saturation + low contrast = filter-likely
      const avgSaturation =
        colors.reduce((sum, col) => sum + (col.score || 0), 0) /
        colors.length;

      if (avgSaturation > 0.5) colorEnhancement = true;
    }

    if (colorEnhancement) enhancements.push("Color Enhancement / Filters Applied");

    /** =============================
     * FINAL RETURN FORMAT (for combineResults.js)
     * ============================= */
    return {
      provider: "google_vision",
      is_nsfw: nsfw,
      nsfw_score: Number(nsfwScore.toFixed(2)),
      enhancements,
      labels: labels.map((l) => l.description),
      raw_safeSearch: safe,
    };
  } catch (err) {
    console.error("❌ Google Vision API Error:", err.message);
    return {
      provider: "google_vision",
      error: err.message,
      is_nsfw: false,
      nsfw_score: 0,
      enhancements: [],
      labels: [],
    };
  }
};
