import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import "dotenv/config";
import { connectDB } from "./config/dbconnection.js";
import formRoute from "./routes/formRoute.js";
import authRoutes from "./routes/authRoutes.js"; // Import auth routes
import errorHandler from "./utils/errorHandler.js"; // Import error handler middleware

const upload = multer({ dest: "uploads/" });
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Sajilo Nagarik Sewa Backend!");
});

// User authentication routes
app.use("/api/auth", authRoutes); // This handles the register/login routes

// Form routes
app.use("/api/forms", formRoute);

// Error handling middleware should be added after routes
app.use(errorHandler);

// Server
app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`🚀 Server is running on port ${process.env.PORT}`);
});
