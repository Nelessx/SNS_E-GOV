"use client"

import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, FileText, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ReviewSubmitProps {
  formData: any
  validateStep: (stepIndex: number, isValid: boolean) => void
  stepIndex: number
}

export default function ReviewSubmit({ formData, validateStep, stepIndex }: ReviewSubmitProps) {
  useEffect(() => {
    // Always valid if they've reached this step
    validateStep(stepIndex, true)
  }, [validateStep, stepIndex])

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  // Group documents by category
  const getDocumentsByCategory = () => {
    const docs = formData.documents || {};
    
    const requiredDocs = {
      birthCertificate: docs.birthCertificate,
      parentCitizenship: docs.parentCitizenship,
      wardRecommendation: docs.wardRecommendation,
      applicantPhoto: docs.applicantPhoto,
      parentsMarriageCertificate: docs.parentsMarriageCertificate,
    };
    
    const additionalDocs = {
      schoolCertificate: docs.schoolCertificate,
      hospitalBirth: docs.hospitalBirth,
      migrationCertificate: docs.migrationCertificate,
      fathersMigration: docs.fathersMigration,
    };
    
    const marriageDocs = {
      marriageCertificate: docs.marriageCertificate,
      spouseCitizenship: docs.spouseCitizenship,
      spouseMigration: docs.spouseMigration,
    };
    
    return { requiredDocs, additionalDocs, marriageDocs };
  };
  
  const { requiredDocs, additionalDocs, marriageDocs } = getDocumentsByCategory();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Review & Submit</h2>
        <p className="text-muted-foreground">Please review your application before final submission.</p>
      </div>

      {!formData.isEligible && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Eligibility Warning</AlertTitle>
          <AlertDescription>
            Based on your eligibility responses, your application may not be accepted. Please review your eligibility
            answers before submitting.
          </AlertDescription>
        </Alert>
      )}

      <Card>    
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-primary" />
            Eligibility Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Citizenship Status:</p>
              <p className="text-sm text-muted-foreground capitalize">
                {formData.citizenshipStatus?.replace("-", " ") || "Not provided"}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Age Requirement:</p>
              <p className="text-sm text-muted-foreground">
                {formData.ageCheck === "yes" ? "18 or older" : "Under 18"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-primary" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Full Name:</p>
              <p className="text-sm text-muted-foreground">
                {formData.firstName} {formData.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Date of Birth:</p>
              <p className="text-sm text-muted-foreground">{formatDate(formData.dateOfBirth)}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Place of Birth:</p>
              <p className="text-sm text-muted-foreground">{formData.placeOfBirth || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Email:</p>
              <p className="text-sm text-muted-foreground">{formData.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Phone:</p>
              <p className="text-sm text-muted-foreground">{formData.phone}</p>
            </div>
          </div>

          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Father's Name:</p>
              <p className="text-sm text-muted-foreground">{formData.fathersName || "Not provided"}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Mother's Name:</p>
              <p className="text-sm text-muted-foreground">{formData.mothersName || "Not provided"}</p>
            </div>
          </div>

          {formData.familyMembers && formData.familyMembers.length > 0 && (
            <>
              <Separator />
              <div>
                <p className="text-sm font-medium mb-2">Family Members:</p>
                {formData.familyMembers.map((member, index) => (
                  <div key={index} className="pl-4 border-l-2 border-muted-foreground/20 mb-2">
                    <p className="text-sm">
                      <span className="font-medium">{member.name}</span>
                      {member.relationship && ` (${member.relationship})`}
                      {member.dateOfBirth && ` - Born: ${formatDate(member.dateOfBirth)}`}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-primary" />
            Residential History
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.addresses &&
            formData.addresses.map((address, index) => (
              <div key={index}>
                {index > 0 && <Separator className="my-3" />}
                <p className="text-sm font-medium">{index === 0 ? "Current Address:" : `Previous Address ${index}:`}</p>
                <p className="text-sm text-muted-foreground">
                  {address.address}, {address.city}, {address.country}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(address.startDate)} - {address.endDate ? formatDate(address.endDate) : "Present"}
                </p>
              </div>
            ))}

          {formData.previousCountries && formData.previousCountries.length > 0 && (
            <>
              <Separator />
              <div>
                <p className="text-sm font-medium mb-1">Previous Countries of Residence:</p>
                <div className="flex flex-wrap gap-2">
                  {formData.previousCountries.map((country, index) => (
                    <span key={index} className="text-sm bg-muted px-2 py-1 rounded-full">
                      {country}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-primary" />
            Employment & Education
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm font-medium">Employment History:</p>
          {formData.employmentHistory &&
            formData.employmentHistory.map((job, index) => (
              <div key={index} className="pl-4 border-l-2 border-muted-foreground/20 mb-3">
                <p className="text-sm font-medium">
                  {job.employer} - {job.position}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(job.startDate)} - {job.endDate ? formatDate(job.endDate) : "Present"}
                </p>
                {job.description && <p className="text-sm text-muted-foreground mt-1">{job.description}</p>}
              </div>
            ))}

          <Separator />

          <p className="text-sm font-medium">Education:</p>
          {formData.education &&
            formData.education.map((edu, index) => (
              <div key={index} className="pl-4 border-l-2 border-muted-foreground/20 mb-3">
                <p className="text-sm font-medium">{edu.institution}</p>
                <p className="text-sm text-muted-foreground">
                  {edu.degree} in {edu.field}
                  {edu.graduationDate && ` (Graduated: ${formatDate(edu.graduationDate)})`}
                </p>
              </div>
            ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-primary" />
            Documents & Consent
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Basic Required Documents:</p>
            <div className="space-y-2">
              {Object.entries(requiredDocs).map(
                ([key, value]) => (
                  <div key={key} className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-primary" />
                    <p className="text-sm text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}: {value ? value.name : "Not uploaded"}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-sm font-medium mb-2">Additional Documents:</p>
            <div className="space-y-2">
              {Object.entries(additionalDocs).map(
                ([key, value]) => (
                  <div key={key} className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}: {value ? value.name : "Not uploaded"}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-sm font-medium mb-2">Marriage Documents:</p>
            <div className="space-y-2">
              {Object.entries(marriageDocs).map(
                ([key, value]) => (
                  <div key={key} className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}: {value ? value.name : "Not uploaded"}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-sm font-medium mb-2">Legal Declarations:</p>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                Criminal History: {formData.legalDeclarations?.criminalHistory ? "Yes" : "No"}
              </p>
              <p className="text-sm text-muted-foreground">
                Financial Obligations: {formData.legalDeclarations?.financialObligations ? "Yes" : "No"}
              </p>
              <p className="text-sm text-muted-foreground">
                Legal Proceedings: {formData.legalDeclarations?.legalProceedings ? "Yes" : "No"}
              </p>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-sm font-medium">Background Check Consent:</p>
            <p className="text-sm text-muted-foreground">
              {formData.consentGiven ? "Consent provided" : "Consent not provided"}
            </p>
          </div>
        </CardContent>
      </Card>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Before You Submit</AlertTitle>
        <AlertDescription>
          Please ensure all information is accurate and complete. Once submitted, you may not be able to make changes to
          your application.
        </AlertDescription>
      </Alert>
    </div>
  )
}