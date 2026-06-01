const express = require("express");
const router = express.Router();
const statsController = require("../controllers/stats.controller");

// GET /stats/datasets/count
router.get("/datasets/count", statsController.getDatasetCount);

module.exports = router;
