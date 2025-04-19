import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, termsAccepted } = req.body;

  // Check if the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create a new user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    termsAccepted,
  });

  if (user) {
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,  // Use a secret key (must be set in .env)
      { expiresIn: '1h' }     // Set the token expiration (e.g., 1 hour)
    );

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      token, // Send the token back to the client
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

export { registerUser };
