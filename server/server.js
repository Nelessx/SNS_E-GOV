import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import "dotenv/config";
import { connectDB } from "./config/dbconnection.js";
import formRoute from "./routes/formRoute.js";

const upload = multer({ dest: "uploads/" });
const app = express();

app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("Welcome to Sajilo Nagarik Sewa Backend!");
});

app.use("/api/forms",formRoute);





app.listen(process.env.PORT, () => {
    connectDB();
  console.log(`🚀 Server is running on port ${process.env.PORT}`);
});
