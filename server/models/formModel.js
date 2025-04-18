import mongoose from "mongoose";

const formSchema = new mongoose.Schema(
  {
    eligibility: {
      citizenshipStatus: { type: String },
      ageCheck: { type: String },
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
          dateOfBirth: Date,
        },
      ],
    },
    residentialHistory: {
      addresses: [
        {
          address: String,
          city: String,
          country: String,
          startDate: Date,
          endDate: Date,
        },
      ],
      previousCountries: [String],
    },
    employmentAndEducation: {
      employmentHistory: [
        {
          employer: String,
          position: String,
          startDate: Date,
          endDate: Date,
          description: String,
        },
      ],
      education: [
        {
          institution: String,
          degree: String,
          field: String,
          graduationDate: Date,
        },
      ],
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
      spouseMigration: Object,
    },
    legalDeclarations: {
      criminalHistory: Boolean,
      financialObligations: Boolean,
      legalProceedings: Boolean,
    },
    consentGiven: Boolean,
    isEligible: Boolean,
  },
  {
    timestamps: true,
  }
);

const Form = mongoose.model("Form", formSchema);

export default Form;
