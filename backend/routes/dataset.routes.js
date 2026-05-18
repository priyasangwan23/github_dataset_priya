const express = require("express");
const router = express.Router();
const datasetController = require("../controllers/dataset.controller");

// Route: POST /datasets
// Because this router is mounted on '/datasets' in app.js, 
// the endpoint here is just '/'
router.post("/", datasetController.createDataset);

module.exports = router;
