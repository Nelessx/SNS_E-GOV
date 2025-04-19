import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register new user
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ 
        message: 'All fields (firstName, lastName, email, password) are required' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      role: 'user',
      status: 'pending'
    });

    await user.save();

    res.status(201).json({ 
      message: 'User registered successfully. Waiting for admin approval.',
      userId: user.userId
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for:', email);

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User found:', {
      email: user.email,
      role: user.role,
      status: user.status,
      userId: user.userId
    });

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    console.log('Password validation result:', isPasswordValid);
    
    if (!isPasswordValid) {
      return res.status(401).json({ 
        message: 'Invalid credentials'
      });
    }

    // Reset login attempts on successful login
    user.loginAttempts = 0;
    user.lockUntil = null;
    user.lastLogin = new Date();
    await user.save();

    // Check if user is approved (skip for admin users)
    if (user.role !== 'admin' && user.status !== 'approved') {
      console.log('User not approved:', { email, status: user.status });
      return res.status(403).json({ message: 'Account pending approval' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.userId,
        role: user.role,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('Login successful:', { 
      email, 
      role: user.role,
      userId: user.userId
    });

    res.json({
      token,
      user: {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// Get all pending users (admin only)
export const getPendingUsers = async (req, res) => {
  try {
    const users = await User.find({ status: 'pending' })
      .select('userId name email createdAt')
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending users', error: error.message });
  }
};

// Approve user (admin only)
export const approveUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOneAndUpdate(
      { userId },
      { status: 'approved' },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ 
      message: 'User approved successfully',
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        status: user.status
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error approving user', error: error.message });
  }
};

// Reject user (admin only)
export const rejectUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { status: 'rejected' },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ 
      message: 'User rejected successfully',
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        status: user.status
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting user', error: error.message });
  }
};

// Get all users (admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select('-password') // Exclude password from response
      .sort({ createdAt: -1 }); // Sort by newest first

    res.json({
      count: users.length,
      users: users.map(user => ({
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }))
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
}; 