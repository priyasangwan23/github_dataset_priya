const statsService = require("../services/stats.service");

// @desc    Get total datasets count
// @route   GET /stats/datasets/count
const getDatasetCount = async (req, res, next) => {
  try {
    const count = await statsService.getDatasetCount();

    res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDatasetCount,
};
