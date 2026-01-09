/**
 * Utility functions for handling image URLs
 */

import { API_BASE_URL } from "../config/api";

/**
 * Normalizes an image URL by prepending the API base URL if it's a relative path
 * @param {string|object} imageUrl - The image URL (string) or image object with imageUrl property
 * @returns {string|null} - The normalized image URL or null if invalid
 */
export const normalizeImageUrl = (imageUrl) => {
  if (!imageUrl) return null;

  // If it's an object, extract the imageUrl property
  let url = typeof imageUrl === "object" 
    ? (imageUrl.imageUrl || imageUrl.imageURL || imageUrl.url || imageUrl.path || imageUrl.imagePath || null)
    : imageUrl;

  if (!url || typeof url !== "string") return null;

  // If it's already an absolute URL (http/https), return as is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // If it's a relative path, prepend the API base URL
  // Handle both "/uploads/..." and "uploads/..." formats
  const normalizedPath = url.startsWith("/") ? url : `/${url}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

/**
 * Normalizes an array of images
 * @param {Array} images - Array of image objects or strings
 * @returns {Array} - Array of normalized image objects with imageUrl property
 */
export const normalizeImages = (images) => {
  if (!Array.isArray(images)) return [];

  return images
    .map((img) => {
      if (!img) return null;

      // If it's already a string, convert to object
      if (typeof img === "string") {
        const url = normalizeImageUrl(img);
        return url ? { imageUrl: url } : null;
      }

      // If it's an object, normalize the URL
      const url = normalizeImageUrl(img);
      return url ? { ...img, imageUrl: url } : null;
    })
    .filter(Boolean);
};

/**
 * Gets the first image URL from an array of images
 * @param {Array} images - Array of image objects or strings
 * @returns {string|null} - The first image URL or null
 */
export const getFirstImageUrl = (images) => {
  if (!images || !Array.isArray(images) || images.length === 0) {
    return null;
  }

  const firstImage = images[0];
  return normalizeImageUrl(firstImage);
};

