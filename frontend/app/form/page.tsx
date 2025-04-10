"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ProgressIndicator from "./progress-indicator"
import EligibilityCheck from "./steps/eligibility-check"
import PersonalInformation from "./steps/personal-information"
import ResidentialHistory from "./steps/residential-history"
import EmploymentEducation from "./steps/employment-education"
import DocumentUpload from "./steps/document-upload"
import BackgroundCheck from "./steps/background-check"
import ReviewSubmit from "./steps/review-submit"
import SuccessMessage from "./steps/success-message"

const steps = [
  "Eligibility Check",
  "Personal Information",
  "Residential History",
  "Employment/Education",
  "Document Upload",
  "Background Check",
  "Review & Submit",
]

export default function Page() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    // Eligibility
    isEligible: false,
    citizenshipStatus: "",
    ageCheck: "",
    criminalRecord: "",

    // Personal Information
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    familyMembers: [],

    // Residential History
    addresses: [{ address: "", city: "", country: "", startDate: "", endDate: "" }],
    previousCountries: [],

    // Employment/Education
    employmentHistory: [{ employer: "", position: "", startDate: "", endDate: "", description: "" }],
    education: [{ institution: "", degree: "", field: "", graduationDate: "" }],

    // Document Upload
    documents: {
      birthCertificate: null,
      passport: null,
      residencyProof: null,
      financialDocuments: null,
      idPhotos: null,
    },

    // Background Check
    legalDeclarations: {
      criminalHistory: false,
      financialObligations: false,
      legalProceedings: false,
    },
    consentGiven: false,
  })

  const [stepValidation, setStepValidation] = useState({
    0: false, // Eligibility
    1: false, // Personal Information
    2: false, // Residential History
    3: false, // Employment/Education
    4: false, // Document Upload
    5: false, // Background Check
    6: false, // Review & Submit
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const updateFormData = useCallback((stepData) => {
    setFormData((prev) => ({ ...prev, ...stepData }))
  }, [])

  const validateStep = useCallback((stepIndex, isValid) => {
    setStepValidation((prev) => ({ ...prev, [stepIndex]: isValid }))
  }, [])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData)
    setIsSubmitted(true)
  }

  const renderStep = () => {
    if (isSubmitted) {
      return <SuccessMessage />
    }

    switch (currentStep) {
      case 0:
        return (
          <EligibilityCheck
            formData={formData}
            updateFormData={updateFormData}
            validateStep={validateStep}
            stepIndex={0}
          />
        )
      case 1:
        return (
          <PersonalInformation
            formData={formData}
            updateFormData={updateFormData}
            validateStep={validateStep}
            stepIndex={1}
          />
        )
      case 2:
        return (
          <ResidentialHistory
            formData={formData}
            updateFormData={updateFormData}
            validateStep={validateStep}
            stepIndex={2}
          />
        )
      case 3:
        return (
          <EmploymentEducation
            formData={formData}
            updateFormData={updateFormData}
            validateStep={validateStep}
            stepIndex={3}
          />
        )
      case 4:
        return (
          <DocumentUpload
            formData={formData}
            updateFormData={updateFormData}
            validateStep={validateStep}
            stepIndex={4}
          />
        )
      case 5:
        return (
          <BackgroundCheck
            formData={formData}
            updateFormData={updateFormData}
            validateStep={validateStep}
            stepIndex={5}
          />
        )
      case 6:
        return <ReviewSubmit formData={formData} validateStep={validateStep} stepIndex={6} />
      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto my-10">
      <ProgressIndicator steps={steps} currentStep={currentStep} validSteps={stepValidation} />

      <Card className="mt-6">
        <CardContent className="pt-6">
          {renderStep()}

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
              Previous
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext} disabled={!stepValidation[currentStep]}>
                Next
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={!stepValidation[currentStep]}>
                Submit Application
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
