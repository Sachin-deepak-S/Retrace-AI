// server/utils/metadataReader.js
import fs from "fs";
import path from "path";

/**
 * Extract metadata from a file
 * @param {string} filePath - Path to the file
 * @returns {Promise<Object>} Metadata object
 */
export const extractMetadata = async (filePath) => {
  try {
    const stats = fs.statSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    
    const metadata = {
      filename: path.basename(filePath),
      extension: ext,
      size: stats.size,
      created: stats.birthtime,
      modified: stats.mtime,
      type: getFileType(ext),
    };

    // Add image-specific metadata if it's an image
    if (isImage(ext)) {
      metadata.image = {
        width: null, // Could be extracted with image libraries
        height: null,
        format: ext.replace('.', '').toUpperCase(),
      };
    }

    return metadata;
  } catch (error) {
    console.error("Error extracting metadata:", error);
    return {
      filename: path.basename(filePath),
      error: error.message,
    };
  }
};

/**
 * Determine file type from extension
 */
const getFileType = (ext) => {
  if (isImage(ext)) return "image";
  if (isVideo(ext)) return "video";
  if (isAudio(ext)) return "audio";
  return "unknown";
};

/**
 * Check if file is an image
 */
const isImage = (ext) => {
  return [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp", ".svg"].includes(ext);
};

/**
 * Check if file is a video
 */
const isVideo = (ext) => {
  return [".mp4", ".avi", ".mov", ".wmv", ".flv", ".webm", ".mkv"].includes(ext);
};

/**
 * Check if file is audio
 */
const isAudio = (ext) => {
  return [".mp3", ".wav", ".flac", ".aac", ".ogg", ".m4a"].includes(ext);
};

