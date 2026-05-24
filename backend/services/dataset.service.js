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

// Service function to get all datasets
const getAllDatasets = async () => {
  // Fetch all datasets, excluding soft-deleted ones (if isDeleted field exists)
  // Sort by newest first using createdAt timestamp
  return await Dataset.find({ isDeleted: { $ne: true } }).sort({ createdAt: -1 });
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
