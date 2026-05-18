const express = require("express");
const router = express.Router();
const datasetController = require("../controllers/dataset.controller");

// Routes mounted on '/datasets' in app.js

// GET  /datasets  → Fetch all datasets
router.get("/", datasetController.getAllDatasets);

// POST /datasets  → Create a new dataset
router.post("/", datasetController.createDataset);

module.exports = router;
