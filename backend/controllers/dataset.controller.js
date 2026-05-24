const datasetService = require("../services/dataset.service");

// @desc    Create a new dataset record
// @route   POST /datasets
const createDataset = async (req, res, next) => {
  try {
    // 1. Receive data from the request body
    const datasetData = req.body;

    // 2. Call the service layer to handle business logic & database save
    const newDataset = await datasetService.createDataset(datasetData);

    // 3. Return the response in the exact format requested
    res.status(201).json({
      success: true,
      message: "Dataset created",
      data: newDataset,
    });
  } catch (error) {
    // Check if the error is a Mongoose Validation Error (e.g. missing required fields)
    if (error.name === "ValidationError") {
      error.statusCode = 400; // 400 Bad Request
    } 
    // Check if the error is a MongoDB native Duplicate Key Error (Code: 11000)
    // This happens if the unique:true constraint on 'id' is violated at the DB level
    else if (error.code === 11000) {
      error.statusCode = 409;
      error.message = "A dataset with this ID already exists.";
    }

    // 4. Pass the error to the global error middleware
    next(error);
  }
};

// @desc    Get all dataset records
// @route   GET /datasets
const getAllDatasets = async (req, res, next) => {
  try {
    // 1. Call the service layer to fetch all datasets
    const datasets = await datasetService.getAllDatasets();

    // 2. Return the response with count and data
    res.status(200).json({
      success: true,
      count: datasets.length,
      data: datasets,
    });
  } catch (error) {
    // Pass the error to the global error middleware
    next(error);
  }
};

// @desc    Get a single dataset by its MongoDB ObjectId
// @route   GET /datasets/:id
const getDatasetById = async (req, res, next) => {
  try {
    // 1. Extract the id from the route parameters
    const { id } = req.params;

    // 2. Call the service layer (handles ObjectId validation & not-found)
    const dataset = await datasetService.getDatasetById(id);

    // 3. Return the found dataset
    res.status(200).json({
      success: true,
      data: dataset,
    });
  } catch (error) {
    // Pass the error (400 / 404 / 500) to the global error middleware
    next(error);
  }
};

// @desc    Update a dataset by its custom 'id' string field
// @route   PATCH /datasets/:id
const updateDatasetById = async (req, res, next) => {
  try {
    // 1. Extract the custom string id from route params
    const { id } = req.params;

    // 2. Extract update fields from request body
    const updateData = req.body;

    // 3. Call the service layer (handles empty body, not-found, & validation)
    const updatedDataset = await datasetService.updateDatasetById(id, updateData);

    // 4. Return the updated document
    res.status(200).json({
      success: true,
      message: "Dataset updated",
      data: updatedDataset,
    });
  } catch (error) {
    // Tag Mongoose validation errors (from runValidators) with 400
    if (error.name === "ValidationError") {
      error.statusCode = 400;
    }

    // Pass all errors to the global error middleware
    next(error);
  }
};

module.exports = {
  createDataset,
  getAllDatasets,
  getDatasetById,
  updateDatasetById,
};
