import express from "express";
import mongoose from "mongoose"; //an Object Data Modeling (ODM) library for MongoDB.
import cors from "cors"; //cross origin resource sharing
import "dotenv/config";
import multer from "multer";
const upload = multer({ dest: "uploads/" });
// import { v2 as cloudinary } from "cloudinary";

//app config
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//exception handeling or error handeleing
try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log("Database connected");
} catch (error) {
  console.log("Database couldn't connect", error);
}

app.get("/", (req, res) => {
  res.send("Welcome to Sajilo Nagarik Sewa Backend!");
});

//configure schema for citizenship Form
const personainformationSchema = new mongoose.Schema({
  basicInformation: [
    {
      firstName: String,
      lastName: String,
      placeofBirth: String,
      dateOfBirth: Date,
      fathersName: String,
      mothersName: String,
    },
  ],
  contactInformtion: [
    {
        email: String,
        phone: String,             
    },
  ],
  familyInformation: [
    {
        name: String,   
        relationship: String,
        dateOfBirth: Date,
    },
  ],
  
});

//construct table
const Personalinformation = mongoose.model(
  "personainformation",
  personainformationSchema
);

//form rout CRUD
app.post("/personalinformation", async (req, res) => {
  try {
    const newPersonalinformation = await new Personalinformation(req.body).save();
    return res.status(201).json({
      message: "form created sucessfully",
      newPersonalinformation: newPersonalinformation,
    });
  } catch (error ) {
    console.log("Something went wrong", error);
  }
})


app.get("/personalinformation", async (req, res) => {
    try {
        const allPersonalinformation = await Personalinformation.find();
        return res.status(200).json(allPersonalinformation);
    } catch (error) {
        console.log("Something went wrong", error);
    }
})

app.patch("/personalinformation/:id", async (req, res) => {
    try {
        const updatedPersonalinformation = await Personalinformation.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        return res.status(200).json(updatedPersonalinformation);
    } catch (error) {
        console.log("Something went wrong", error);
    }
})





































app.listen(process.env.PORT, () => {
  console.log("server is running on port", process.env.PORT);
});
