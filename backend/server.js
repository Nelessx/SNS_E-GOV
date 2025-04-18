import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import multer from "multer";

const upload = multer({ dest: "uploads/" });
const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("✅ Database connected"))
  .catch((error) => console.log("❌ Database couldn't connect", error));

app.get("/", (req, res) => {
  res.send("Welcome to Sajilo Nagarik Sewa Backend!");
}); 

// Define Schema
const personSchema = new mongoose.Schema({
  eligibility: {
    citizenshipStatus: { type: String },
    ageCheck: { type: String }
  },
  personalInformation: {
    firstName: String,
    lastName: String,
    dateOfBirth: Date,
    placeOfBirth: String,
    email: String,
    phone: String,
    fathersName: String,
    mothersName: String,
    familyMembers: [
      {
        name: String,
        relationship: String,
        dateOfBirth: Date
      }
    ]
  },
  residentialHistory: {
    addresses: [
      {
        address: String,
        city: String,
        country: String,
        startDate: Date,
        endDate: Date
      }
    ],
    previousCountries: [String]
  },
  employmentAndEducation: {
    employmentHistory: [
      {
        employer: String,
        position: String,
        startDate: Date,
        endDate: Date,
        description: String
      }
    ],
    education: [
      {
        institution: String,
        degree: String,
        field: String,
        graduationDate: Date
      }
    ]
  },
  documents: {
    birthCertificate: Object,
    parentCitizenship: Object,
    wardRecommendation: Object,
    applicantPhoto: Object,
    parentsMarriageCertificate: Object,
    schoolCertificate: Object,
    hospitalBirth: Object,
    migrationCertificate: Object,
    fathersMigration: Object,
    marriageCertificate: Object,
    spouseCitizenship: Object,
    spouseMigration: Object
  },
  legalDeclarations: {
    criminalHistory: Boolean,
    financialObligations: Boolean,
    legalProceedings: Boolean
  },
  consentGiven: Boolean,
  isEligible: Boolean
});

// Create Model
const PersonInformation = mongoose.model("PersonInformation", personSchema);

// POST: Create a new form submission
app.post("/personinformation", async (req, res) => {
  try {
    const newPersonInformation = new PersonInformation(req.body);
    await newPersonInformation.save();
    res.status(201).json({
      message: "Form created successfully",
      data: newPersonInformation
    });
  } catch (error) {
    console.log("Error while saving:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
});

// GET: Fetch all submitted forms
app.get("/personinformation", async (req, res) => {
  try {
    const allPersonInformation = await PersonInformation.find();
    res.status(200).json(allPersonInformation);
  } catch (error) {
    console.log("Error fetching data:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
});

// PATCH: Update a form by ID
app.patch("/personinformation/:id", async (req, res) => {
  try {
    const updatedPersonInformation = await PersonInformation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedPersonInformation);
  } catch (error) {
    console.log("Error updating:", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
});









 

app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server is running on port ${process.env.PORT || 5000}`);
});
