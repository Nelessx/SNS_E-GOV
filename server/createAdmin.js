import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import { connectDB } from './config/dbconnection.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB');
    
    // Delete existing admin if exists
    await User.deleteMany({ email: 'admin@sns.com' });
    console.log('Deleted existing admin user if any');

    // Create new admin user with plain password
    const admin = new User({
      firstName: 'System',
      lastName: 'Admin',
      email: 'admin@sns.com',
      password: 'admin123', // Set plain password, it will be hashed by the pre-save hook
      role: 'admin',
      status: 'approved',
      userId: 'ADM001'
    });

    // Save the admin user (password will be hashed by pre-save hook)
    await admin.save();

    // Verify the password hash
    const verifyPassword = await bcrypt.compare('admin123', admin.password);
    console.log('Password verification:', verifyPassword);

    console.log('New admin user created successfully:', {
      email: admin.email,
      password: 'admin123', // This is just for reference
      hashedPassword: admin.password // This is the actual stored hash
    });
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin(); 