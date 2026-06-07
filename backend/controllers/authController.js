import asyncHandler from "../utils/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import User from "../models/User.js";

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    res.status(409);
    throw new Error("An account with that email already exists");
  }

  const user = await User.create({ name, email, password });

  res.status(201).json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
    token: generateToken(user._id),
  });
});

/**
 * @desc    Authenticate a user and return a token
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // password has select:false, so explicitly include it for comparison
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.matchPassword(password))) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.json({
    success: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
    token: generateToken(user._id),
  });
});

/**
 * @desc    Get the current authenticated user's profile
 * @route   GET /api/auth/profile
 * @access  Private
 */
export const getProfile = asyncHandler(async (req, res) => {
  const { _id, name, email, createdAt } = req.user;
  res.json({ success: true, user: { id: _id, name, email, createdAt } });
});
