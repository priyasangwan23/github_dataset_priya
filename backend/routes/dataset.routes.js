const express = require("express");
const router = express.Router();
const datasetController = require("../controllers/dataset.controller");

// Routes mounted on '/datasets' in app.js

// GET  /datasets       → Fetch all datasets
router.get("/", datasetController.getAllDatasets);

// GET  /datasets/:id   → Fetch a single dataset by MongoDB ObjectId
router.get("/:id", datasetController.getDatasetById);

// POST /datasets       → Create a new dataset
router.post("/", datasetController.createDataset);

module.exports = router;
