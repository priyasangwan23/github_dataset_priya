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

// @desc    Get all dataset records (supports optional filtering, search, pagination, and sorting)
// @route   GET /datasets?type=&repo_name=&source_type=&code_element=&search=&page=&limit=&sort=&order=&language=&framework=&category=&task=
const getAllDatasets = async (req, res, next) => {
  try {
    // 1. Extract query params from the query string
    const {
      type,
      repo_name,
      source_type,
      code_element,
      search,
      page,
      limit,
      sort,
      order,
      language,
      framework,
      category,
      task,
      "metadata.repo_name": nestedRepoName,
      "metadata.type": nestedType,
      "metadata.source_type": nestedSourceType,
      "metadata.code_element": nestedCodeElement
    } = req.query;

    const options = {
      type,
      repo_name,
      source_type,
      code_element,
      search,
      page,
      limit,
      sort,
      order,
      language,
      framework,
      category,
      task,
      "metadata.repo_name": nestedRepoName,
      "metadata.type": nestedType,
      "metadata.source_type": nestedSourceType,
      "metadata.code_element": nestedCodeElement
    };

    // 2. Call the service layer with the options
    const result = await datasetService.getAllDatasets(options);

    // 3. Return the response in the exact format requested
    res.status(200).json({
      success: true,
      count: result.count,
      page: result.page,
      totalPages: result.totalPages,
      data: result.data,
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

// @desc    Delete a dataset by its custom 'id' string field
// @route   DELETE /datasets/:id
const deleteDatasetById = async (req, res, next) => {
  try {
    // 1. Extract the custom string id from route params
    const { id } = req.params;

    // 2. Call the service layer (handles not-found error internally)
    await datasetService.deleteDatasetById(id);

    // 3. Return success — no data body since the document no longer exists
    res.status(200).json({
      success: true,
      message: "Dataset deleted",
    });
  } catch (error) {
    // Pass the error (404 / 500) to the global error middleware
    next(error);
  }
};

module.exports = {
  createDataset,
  getAllDatasets,
  getDatasetById,
  updateDatasetById,
  deleteDatasetById,
};
