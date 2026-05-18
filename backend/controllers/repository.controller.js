const repositoryService = require("../services/repository.service");

// @desc  Get all repositories
// @route GET /api/repositories
const getAll = async (req, res, next) => {
  try {
    const repositories = await repositoryService.getAllRepositories();
    res.status(200).json({ success: true, count: repositories.length, data: repositories });
  } catch (error) {
    next(error);
  }
};

// @desc  Get single repository
// @route GET /api/repositories/:id
const getOne = async (req, res, next) => {
  try {
    const repository = await repositoryService.getRepositoryById(req.params.id);
    if (!repository) {
      const error = new Error("Repository not found");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({ success: true, data: repository });
  } catch (error) {
    next(error);
  }
};

// @desc  Create a repository
// @route POST /api/repositories
const create = async (req, res, next) => {
  try {
    const repository = await repositoryService.createRepository(req.body);
    res.status(201).json({ success: true, data: repository });
  } catch (error) {
    next(error);
  }
};

// @desc  Update a repository
// @route PUT /api/repositories/:id
const update = async (req, res, next) => {
  try {
    const repository = await repositoryService.updateRepository(req.params.id, req.body);
    if (!repository) {
      const error = new Error("Repository not found");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({ success: true, data: repository });
  } catch (error) {
    next(error);
  }
};

// @desc  Delete a repository
// @route DELETE /api/repositories/:id
const remove = async (req, res, next) => {
  try {
    const repository = await repositoryService.deleteRepository(req.params.id);
    if (!repository) {
      const error = new Error("Repository not found");
      error.statusCode = 404;
      return next(error);
    }
    res.status(200).json({ success: true, message: "Repository deleted successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getOne, create, update, remove };
