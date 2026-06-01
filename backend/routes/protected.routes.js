const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const datasetController = require("../controllers/dataset.controller");

// GET /protected/datasets - Protected route
router.get("/datasets", authMiddleware, datasetController.getAllDatasets);

module.exports = router;
