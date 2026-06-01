const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { errorHandler, notFound } = require("./middlewares/error.middleware");
const logger = require("./middlewares/logger.middleware");
const rateLimiter = require("./middlewares/rateLimiter.middleware");
const datasetRoutes = require("./routes/dataset.routes");
const authRoutes = require("./routes/auth.routes");
const protectedRoutes = require("./routes/protected.routes");
const statsRoutes = require("./routes/stats.routes");
const analyticsRoutes = require("./routes/analytics.routes");

const app = express();

// Core middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);
app.use(rateLimiter); // Global rate limiting

// Root route – Render pings GET / and HEAD / by default
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "GitHub Dataset API is running." });
});
app.head("/", (req, res) => {
  res.status(200).end();
});

// Health check route (set this as Health Check Path in Render)
app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "OK" });
});
app.head("/health", (req, res) => {
  res.status(200).end();
});

// API routes
app.use("/datasets", datasetRoutes);
app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);
app.use("/stats", statsRoutes);
app.use("/analytics", analyticsRoutes);

// 404 & error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
