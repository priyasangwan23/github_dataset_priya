const Dataset = require("../models/dataset.model");

/**
 * Get type analysis stats grouped by metadata.type
 * @returns {Promise<Object>} Dictionary mapping dataset types to their count
 */
const getTypeAnalysis = async () => {
  const analysis = await Dataset.aggregate([
    // 1. Match documents where metadata.type exists and is not null
    {
      $match: {
        "metadata.type": { $exists: true, $ne: null }
      }
    },
    // 2. Group by the metadata.type and count the occurrences
    {
      $group: {
        _id: "$metadata.type",
        count: { $sum: 1 }
      }
    },
    // 3. Project type and count, excluding Mongoose default _id
    {
      $project: {
        _id: 0,
        type: "$_id",
        count: 1
      }
    }
  ]);

  // 4. Format the result array into the requested key-value structure
  const result = {};
  analysis.forEach((item) => {
    if (item.type) {
      result[item.type] = item.count;
    }
  });

  return result;
};

module.exports = {
  getTypeAnalysis,
};
