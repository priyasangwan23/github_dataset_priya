const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

/**
 * Register a new user in the database
 * @param {Object} userData - User details
 * @returns {Promise<Object>} The registered user details (excluding password)
 */
const registerUser = async ({ name, email, password }) => {
  // Input validation
  if (!name || !email || !password) {
    const error = new Error("Please provide name, email, and password.");
    error.statusCode = 400;
    throw error;
  }

  // Check if email format is basic valid (additional regex validation is run by Mongoose)
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegex.test(email)) {
    const error = new Error("Please provide a valid email address.");
    error.statusCode = 400;
    throw error;
  }

  // Check if password length is valid (e.g., at least 6 characters)
  if (password.length < 6) {
    const error = new Error("Password must be at least 6 characters long.");
    error.statusCode = 400;
    throw error;
  }

  // Check if email is already in use
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("Email already in use.");
    error.statusCode = 409; // 409 Conflict
    throw error;
  }

  // Create new user (password will be hashed in userSchema pre-save hook)
  const newUser = new User({ name, email, password });
  await newUser.save();

  // Convert to object and omit password
  const userObj = newUser.toObject();
  delete userObj.password;

  return userObj;
};

/**
 * Log in a user and generate a JWT token
 * @param {Object} credentials - Email and password
 * @returns {Promise<Object>} User details (excluding password) and JWT token
 */
const loginUser = async ({ email, password }) => {
  // Input validation
  if (!email || !password) {
    const error = new Error("Please provide email and password.");
    error.statusCode = 400;
    throw error;
  }

  // Check if user exists (we lowercase email to match lowercase index logic in DB)
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    const error = new Error("Invalid email or password.");
    error.statusCode = 401; // 401 Unauthorized
    throw error;
  }

  // Verify password using model method
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const error = new Error("Invalid email or password.");
    error.statusCode = 401; // 401 Unauthorized
    throw error;
  }

  // Generate JWT token
  const payload = {
    id: user._id,
    email: user.email,
  };

  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || "1d";

  const token = jwt.sign(payload, secret, { expiresIn });

  // Omit password from return object
  const userObj = user.toObject();
  delete userObj.password;

  return {
    user: userObj,
    token,
  };
};

module.exports = {
  registerUser,
  loginUser,
};
