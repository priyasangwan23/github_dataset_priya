const express = require("express");
const router = express.Router();
const analyticsController = require("../controllers/analytics.controller");

// GET /analytics/datasets/type-analysis
router.get("/datasets/type-analysis", analyticsController.getTypeAnalysis);

module.exports = router;
