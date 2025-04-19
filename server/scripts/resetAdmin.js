import mongoose from 'mongoose';
import User from '../models/User.js';
import { connectDB } from '../config/dbconnection.js';

const resetAdmin = async () => {
  try {
    await connectDB();
    
    const admin = await User.findOne({ email: 'admin@sns.com' });
    if (!admin) {
      console.log('Admin user not found');
      process.exit(1);
    }

    // Reset login attempts and lock status
    admin.loginAttempts = 0;
    admin.lockUntil = null;
    await admin.save();

    console.log('Admin user reset successfully:', {
      email: admin.email,
      loginAttempts: admin.loginAttempts,
      lockUntil: admin.lockUntil
    });
    process.exit(0);
  } catch (error) {
    console.error('Error resetting admin:', error);
    process.exit(1);
  }
};

resetAdmin(); 