import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const createTestUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if test user already exists
    const existingUser = await User.findOne({ email: 'user@test.com' });
    if (existingUser) {
      console.log('Test user already exists');
      process.exit(0);
    }

    // Create test user
    const testUser = new User({
      firstName: 'Test',
      lastName: 'User',
      email: 'user@test.com',
      password: 'test123', // This will be hashed by the User model pre-save middleware
      role: 'user',
      status: 'approved'
    });

    await testUser.save();
    console.log('Test user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating test user:', error);
    process.exit(1);
  }
};

createTestUser(); 