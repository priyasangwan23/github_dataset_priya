const Dataset = require("../models/dataset.model");

/**
 * Get total count of active datasets
 * @returns {Promise<number>} Total count of datasets
 */
const getDatasetCount = async () => {
  // Exclude soft-deleted items if applicable, matching existing query design
  const count = await Dataset.countDocuments({ isDeleted: { $ne: true } });
  return count;
};

module.exports = {
  getDatasetCount,
};
