import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import { connectDB } from "./config/dbconnection.js";
import formRoute from "./routes/formRoute.js";
import authRoutes from "./routes/authRoutes.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";

// Load environment variables
dotenv.config();

// Debug environment variables
console.log('Environment variables loaded:');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Present' : 'Missing');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Present' : 'Missing');
console.log('PORT:', process.env.PORT);

const upload = multer({ dest: "uploads/" });
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Sajilo Nagarik Sewa Backend!");
});

app.use("/api/forms", formRoute);
app.use("/api/auth", authRoutes);

// Create initial admin user when server starts
const initializeAdmin = async () => {
  try {
    console.log('Checking for existing admin user...');
    const adminExists = await User.findOne({ email: 'admin@sns.com' });
    
    if (adminExists) {
      console.log('Admin user already exists:', {
        email: adminExists.email,
        role: adminExists.role,
        userId: adminExists.userId
      });
    } else {
      console.log('Creating new admin user...');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      const admin = new User({
        firstName: 'System',
        lastName: 'Admin',
        email: 'admin@sns.com',
        password: hashedPassword,
        role: 'admin',
        status: 'approved',
        userId: 'ADM001'
      });
      
      await admin.save();
      console.log('Initial admin user created successfully:', {
        email: admin.email,
        role: admin.role,
        userId: admin.userId
      });
    }
  } catch (error) {
    console.error('Failed to initialize admin:', error);
  }
};

// Start server
const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();
    console.log('MongoDB connected successfully');

    // Initialize admin user
    await initializeAdmin();

    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
