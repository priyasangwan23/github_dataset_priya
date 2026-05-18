const Repository = require("../models/repository.model");

// Get all repositories
const getAllRepositories = async () => {
  return await Repository.find().sort({ createdAt: -1 });
};

// Get a single repository by ID
const getRepositoryById = async (id) => {
  return await Repository.findById(id);
};

// Create a new repository
const createRepository = async (data) => {
  const repository = new Repository(data);
  return await repository.save();
};

// Update a repository by ID
const updateRepository = async (id, data) => {
  return await Repository.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// Delete a repository by ID
const deleteRepository = async (id) => {
  return await Repository.findByIdAndDelete(id);
};

module.exports = {
  getAllRepositories,
  getRepositoryById,
  createRepository,
  updateRepository,
  deleteRepository,
};
