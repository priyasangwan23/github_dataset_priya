const analyticsService = require("../services/analytics.service");

// @desc    Get dataset count type analysis
// @route   GET /analytics/datasets/type-analysis
const getTypeAnalysis = async (req, res, next) => {
  try {
    const analysis = await analyticsService.getTypeAnalysis();
    
    // Return the dictionary format directly as specified in the example output
    res.status(200).json(analysis);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTypeAnalysis,
};
