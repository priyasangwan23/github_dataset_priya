const mongoose = require("mongoose");
const Dataset = require("../models/dataset.model");

// Service function to create a new dataset
const createDataset = async (datasetData) => {
  // Check if a dataset with the same ID already exists
  const existingDataset = await Dataset.findOne({ id: datasetData.id });

  if (existingDataset) {
    // Throw an error that will be caught by the controller
    const error = new Error(`Dataset with ID '${datasetData.id}' already exists.`);
    error.statusCode = 409; // 409 Conflict
    throw error;
  }

  // Create a new instance using the model
  const newDataset = new Dataset(datasetData);

  // Save the dataset to the MongoDB database and return it
  return await newDataset.save();
};

// Service function to get all datasets with optional filtering, search, pagination, and sorting
const getAllDatasets = async (options = {}) => {
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
    task
  } = options;

  // Build a dynamic MongoDB query object
  const query = { isDeleted: { $ne: true } };

  // Support both flattened and nested formats for metadata filters
  const typeVal = type || options["metadata.type"];
  const repoNameVal = repo_name || options["metadata.repo_name"];
  const sourceTypeVal = source_type || options["metadata.source_type"];
  const codeElementVal = code_element || options["metadata.code_element"];

  // Filter by metadata
  if (typeVal) {
    query["metadata.type"] = typeVal;
  }
  if (repoNameVal) {
    query["metadata.repo_name"] = repoNameVal;
  }
  if (sourceTypeVal) {
    query["metadata.source_type"] = sourceTypeVal;
  }
  if (codeElementVal) {
    query["metadata.code_element"] = codeElementVal;
  }

  // Advanced Filters
  if (language) {
    query.language = language;
  }
  if (framework) {
    query.framework = framework;
  }
  if (category) {
    query.category = category;
  }
  if (task) {
    query.task = task;
  }

  // Search logic
  if (search) {
    const searchRegex = { $regex: search, $options: "i" };
    query.$or = [
      { instruction: searchRegex },
      { input: searchRegex },
      { output: searchRegex },
      { "metadata.repo_name": searchRegex }
    ];
  }

  // Parse and validate pagination parameters
  let parsedPage = 1;
  if (page !== undefined && page !== "") {
    parsedPage = Number(page);
    if (!Number.isInteger(parsedPage) || parsedPage <= 0) {
      const error = new Error("Invalid page parameter. Must be a positive integer.");
      error.statusCode = 400; // 400 Bad Request
      throw error;
    }
  }

  let parsedLimit = 10;
  if (limit !== undefined && limit !== "") {
    parsedLimit = Number(limit);
    if (!Number.isInteger(parsedLimit) || parsedLimit <= 0) {
      const error = new Error("Invalid limit parameter. Must be a positive integer.");
      error.statusCode = 400; // 400 Bad Request
      throw error;
    }
  }

  const skip = (parsedPage - 1) * parsedLimit;

  // Build and validate sorting object
  const sortObj = {};
  if (sort) {
    const allowedSortFields = [
      "id",
      "instruction",
      "input",
      "output",
      "createdAt",
      "updatedAt",
      "language",
      "framework",
      "category",
      "task",
      "metadata.type",
      "metadata.code_element",
      "metadata.repo_name",
      "metadata.file_path",
      "metadata.source_type"
    ];

    if (!allowedSortFields.includes(sort)) {
      const error = new Error(`Invalid sort field: '${sort}'`);
      error.statusCode = 400; // 400 Bad Request
      throw error;
    }

    const sortOrder = order === "desc" ? -1 : 1;
    sortObj[sort] = sortOrder;
  } else {
    // Default sort is createdAt desc (newest first)
    sortObj.createdAt = -1;
  }

  // Get total count matching the query for totalPages calculation
  const totalCount = await Dataset.countDocuments(query);
  const totalPages = Math.ceil(totalCount / parsedLimit);

  // Fetch paginated, sorted, and filtered results
  const data = await Dataset.find(query)
    .sort(sortObj)
    .skip(skip)
    .limit(parsedLimit);

  return {
    data,
    count: totalCount,
    page: parsedPage,
    totalPages
  };
};

// Service function to get a single dataset by its MongoDB ObjectId
const getDatasetById = async (id) => {
  // Validate that the provided id is a valid MongoDB ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error(`Invalid dataset ID: '${id}'`);
    error.statusCode = 400; // 400 Bad Request
    throw error;
  }

  // Query the database for the document with the matching _id
  const dataset = await Dataset.findById(id);

  // If no document was found, throw a 404 error
  if (!dataset) {
    const error = new Error("Dataset not found");
    error.statusCode = 404; // 404 Not Found
    throw error;
  }

  return dataset;
};

// Service function to update a dataset by its custom 'id' string field
const updateDatasetById = async (id, updateData) => {
  // Reject empty update bodies — nothing to update
  if (!updateData || Object.keys(updateData).length === 0) {
    const error = new Error("No update fields provided");
    error.statusCode = 400; // 400 Bad Request
    throw error;
  }

  // Find the document by the custom 'id' string field and apply partial update.
  // runValidators ensures schema validations (type, required) are applied.
  // new: true returns the document after the update is applied.
  const updatedDataset = await Dataset.findOneAndUpdate(
    { id },                   // filter: match by custom string id
    { $set: updateData },     // update: set only the provided fields
    { new: true, runValidators: true }
  );

  // If no document matched the filter, the dataset does not exist
  if (!updatedDataset) {
    const error = new Error("Dataset not found");
    error.statusCode = 404; // 404 Not Found
    throw error;
  }

  return updatedDataset;
};

// Service function to delete a dataset by its custom 'id' string field
const deleteDatasetById = async (id) => {
  // Atomically find and delete in a single query using the custom string id
  const deletedDataset = await Dataset.findOneAndDelete({ id });

  // If no document matched the filter, the dataset does not exist
  if (!deletedDataset) {
    const error = new Error("Dataset not found");
    error.statusCode = 404; // 404 Not Found
    throw error;
  }

  // Return the deleted document (useful for logging / confirmation)
  return deletedDataset;
};

module.exports = {
  createDataset,
  getAllDatasets,
  getDatasetById,
  updateDatasetById,
  deleteDatasetById,
};
