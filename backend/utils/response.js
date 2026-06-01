// utils/response.js
/**
 * Send a standardized success response.
 * @param {Object} res Express response object
 * @param {any} data Payload data (object, array, etc.)
 * @param {string} [message=''] Human‑readable message
 * @param {number} [count] Optional count for list endpoints
 */
function sendSuccess(res, data, message = "", count) {
  const payload = {
    success: true,
    message,
    data,
  };
  if (typeof count === "number") payload.count = count;
  return res.status(200).json(payload);
}

/**
 * Send a standardized error response (used by error middleware).
 * @param {Object} res Express response object
 * @param {number} status HTTP status code
 * @param {string} message Error description
 */
function sendError(res, status, message) {
  return res.status(status).json({ success: false, message });
}

module.exports = { sendSuccess, sendError };
