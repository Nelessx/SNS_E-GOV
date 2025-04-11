"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Upload, X, FileText, Check } from "lucide-react"

interface DocumentUploadProps {
  formData: any
  updateFormData: (data: any) => void
  validateStep: (stepIndex: number, isValid: boolean) => void
  stepIndex: number
}

export default function DocumentUpload({ formData, updateFormData, validateStep, stepIndex }: DocumentUploadProps) {
  const [documents, setDocuments] = useState(
    formData.documents || {
      birthCertificate: null,
      parentCitizenship: null,
      parentsMarriageCertificate: null,
      wardRecommendation: null,
      applicantPhoto: null,
      schoolCertificate: null,
      hospitalBirth: null,
      migrationCertificate: null,
      fathersMigration: null,
      marriageCertificate: null,
      spouseCitizenship: null,
      spouseMigration: null,
    }
  )

  const [localDocuments, setLocalDocuments] = useState(documents)

  const handleFileChange = (documentType, file) => {
    setLocalDocuments((prev) => ({
      ...prev,
      [documentType]: file,
    }))
  }

  const removeFile = (documentType) => {
    setLocalDocuments((prev) => ({
      ...prev,
      [documentType]: null,
    }))
  }

  useEffect(() => {
    const requiredDocs = ["birthCertificate", "parentCitizenship", "wardRecommendation", "applicantPhoto"]
    const uploadedCount = requiredDocs.filter((doc) => localDocuments[doc] !== null).length
    const isValid = uploadedCount >= requiredDocs.length

    updateFormData({ documents: localDocuments })
    validateStep(stepIndex, isValid)
  }, [localDocuments, updateFormData, validateStep, stepIndex])

  const renderUploadCard = (title, description, documentType, required = false) => {
    const file = localDocuments[documentType]
    return (
      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">
            {title} {required && <span className="text-red-500">*</span>}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {!file ? (
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 cursor-pointer hover:bg-muted/50 transition-colors">
              <input
                type="file"
                id={`file-${documentType}`}
                className="sr-only"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileChange(documentType, e.target.files[0])
                  }
                }}
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <Label htmlFor={`file-${documentType}`} className="cursor-pointer text-center">
                <Upload className="h-10 w-10 mb-2 mx-auto text-muted-foreground" />
                <p className="text-sm font-medium mb-1">Click to upload</p>
                <p className="text-xs text-muted-foreground">PDF, JPG or PNG (max. 10MB)</p>
              </Label>
            </div>
          ) : (
            <div className="flex items-center justify-between bg-muted p-3 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-primary" />
                <div className="text-sm">
                  <p className="font-medium truncate max-w-[180px]">{file.name}</p>
                  <p className="text-muted-foreground">{Math.round(file.size / 1024)} KB</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeFile(documentType)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Document Upload</h2>
        <p className="text-muted-foreground">Please upload the documents based on your case.</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Required Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderUploadCard("Birth Certificate", "Upload your birth certificate", "birthCertificate", true)}
          {renderUploadCard("Parent's Citizenship", "Upload father's or mother's citizenship", "parentCitizenship", true)}
          {renderUploadCard("Ward Recommendation", "Upload recommendation letter from Ward Office", "wardRecommendation", true)}
          {renderUploadCard("Applicant Photo", "Upload your passport-sized photo", "applicantPhoto", true)}
          {renderUploadCard("Parents' Marriage Certificate", "Upload if applicable", "parentsMarriageCertificate", false)}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Additional Documents (If Applicable)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderUploadCard("School Certificate (SLC/SEE)", "Upload your SLC/SEE certificate", "schoolCertificate", false)}
          {renderUploadCard("Hospital Birth Registration", "Upload if available", "hospitalBirth", false)}
          {renderUploadCard("Migration Certificate", "If you’ve migrated from another place", "migrationCertificate", false)}
          {renderUploadCard("Father’s Migration Certificate", "If you're born outside father's original district", "fathersMigration", false)}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">For Married Applicants</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderUploadCard("Marriage Certificate", "Upload your marriage certificate", "marriageCertificate", false)}
          {renderUploadCard("Spouse's Citizenship", "Husband’s or Wife’s Citizenship", "spouseCitizenship", false)}
          {renderUploadCard("Spouse’s Migration Certificate", "If changing district after marriage", "spouseMigration", false)}
        </div>
      </div>

      <div className="bg-muted p-4 rounded-lg mt-6">
        <div className="flex items-start space-x-3">
          <div className="mt-0.5">
            <Check className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-medium">Document Requirements</h4>
            <ul className="text-sm text-muted-foreground mt-1 space-y-1">
              <li>• All documents must be clear and legible</li>
              <li>• Files must be in PDF, JPG, or PNG format</li>
              <li>• Max file size: 10MB per document</li>
              <li>• Documents marked with * are required</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
