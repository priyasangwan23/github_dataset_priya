// middlewares/error.middleware.js
const { sendError } = require("../utils/response");

// Global error handling middleware
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  console.error(`[ERROR] ${req.method} ${req.originalUrl} → ${message}`);
  sendError(res, statusCode, message);
}

// 404 Not Found middleware
function notFound(req, res, next) {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

module.exports = { errorHandler, notFound };
