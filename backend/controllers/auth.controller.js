const authService = require("../services/auth.service");

// @desc    Register a new user
// @route   POST /auth/register
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const newUser = await authService.registerUser({ name, email, password });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    // If it's a Mongoose validation error, set status code to 400
    if (error.name === "ValidationError") {
      error.statusCode = 400;
    }
    next(error);
  }
};

// @desc    Log in an existing user
// @route   POST /auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await authService.loginUser({ email, password });

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
