/**
 * API Configuration
 */
export const API_BASE_URL = "http://localhost:5104";

/**
 * Creates a full API endpoint URL
 * @param {string} endpoint - The API endpoint (e.g., "/api/posts")
 * @returns {string} - Full URL
 */
export const getApiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};

