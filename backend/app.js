const express = require("express");
const cors = require("cors");
const { errorHandler, notFound } = require("./middlewares/error.middleware");
const logger = require("./middlewares/logger.middleware");
const repositoryRoutes = require("./routes/repository.routes");

const app = express();

// ─── Core Middlewares ───────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

// ─── Health Check ───────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 GitHub Dataset API is running",
    version: "1.0.0",
  });
});

// ─── API Routes ─────────────────────────────────────────────────────────────
app.use("/api/repositories", repositoryRoutes);

// ─── Error Handling ─────────────────────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

module.exports = app;
