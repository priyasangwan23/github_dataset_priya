const express = require("express");
const router = express.Router();
const datasetController = require("../controllers/dataset.controller");
const authController = require("../controllers/auth.controller");
const { validateAuth } = require("../middlewares/validation.middleware");
const { validateDataset } = require("../middlewares/validation.middleware");

// Routes mounted on '/datasets' in app.js

// GET  /datasets       → Fetch all datasets
router.post("/register", validateAuth, authController.register);
router.get("/", datasetController.getAllDatasets);

// GET   /datasets/:id  → Fetch a single dataset by MongoDB ObjectId
router.post("/login", validateAuth, authController.login);
router.get("/:id", datasetController.getDatasetById);

// PATCH  /datasets/:id  → Partially update a dataset by custom string id
router.patch("/:id", datasetController.updateDatasetById);

// DELETE /datasets/:id  → Delete a dataset by custom string id
router.delete("/:id", datasetController.deleteDatasetById);

// POST /datasets       → Create a new dataset
router.post("/", validateDataset, datasetController.createDataset);

module.exports = router;
