const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

/**
 * Middleware to authenticate requests via JWT
 */
const authMiddleware = async (req, res, next) => {
  try {
    let token;

    // Check for authorization header with Bearer token
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      const error = new Error("Not authorized, no token provided");
      error.statusCode = 401; // Unauthorized
      throw error;
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      const error = new Error("Not authorized, token validation failed");
      error.statusCode = 401;
      throw error;
    }

    // Check if the user still exists in the database
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      const error = new Error("Not authorized, user no longer exists");
      error.statusCode = 401;
      throw error;
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authMiddleware;
