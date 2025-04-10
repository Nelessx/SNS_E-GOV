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
      passport: null,
      residencyProof: null,
      financialDocuments: null,
      idPhotos: null,
    },
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
    // Check if at least three required documents are uploaded
    const requiredDocuments = ["birthCertificate", "passport", "residencyProof"]
    const uploadedRequiredCount = requiredDocuments.filter((doc) => localDocuments[doc] !== null).length
    const isValid = uploadedRequiredCount >= 3

    // Update form data
    updateFormData({ documents: localDocuments })

    // Validate step
    validateStep(stepIndex, isValid)
  }, [localDocuments, updateFormData, validateStep, stepIndex])

  const renderUploadCard = (title, description, documentType, required = true) => {
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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Document Upload</h2>
        <p className="text-muted-foreground">Please upload the required documents for your application.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderUploadCard("Birth Certificate", "Upload a copy of your birth certificate", "birthCertificate", true)}

        {renderUploadCard("Passport", "Upload a copy of your passport", "passport", true)}

        {renderUploadCard(
          "Proof of Residency",
          "Upload a document proving your current address",
          "residencyProof",
          true,
        )}

        {renderUploadCard(
          "Financial Documentation",
          "Upload bank statements or proof of income",
          "financialDocuments",
          false,
        )}

        {renderUploadCard("ID Photos", "Upload recent passport-style photos", "idPhotos", false)}
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
              <li>• Maximum file size is 10MB per document</li>
              <li>• Documents marked with * are required</li>
              <li>• At least three required documents must be uploaded to proceed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
