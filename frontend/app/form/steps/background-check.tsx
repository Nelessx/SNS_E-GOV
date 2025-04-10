"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

interface BackgroundCheckProps {
  formData: any
  updateFormData: (data: any) => void
  validateStep: (stepIndex: number, isValid: boolean) => void
  stepIndex: number
}

export default function BackgroundCheck({ formData, updateFormData, validateStep, stepIndex }: BackgroundCheckProps) {
  const [legalDeclarations, setLegalDeclarations] = useState(
    formData.legalDeclarations || {
      criminalHistory: false,
      financialObligations: false,
      legalProceedings: false,
    },
  )

  const [consentGiven, setConsentGiven] = useState(formData.consentGiven || false)

  const updateDeclaration = (field, value) => {
    setLegalDeclarations((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  useEffect(() => {
    // Check if consent is given
    const isValid = consentGiven

    // Update form data
    updateFormData({
      legalDeclarations,
      consentGiven,
    })

    // Validate step
    validateStep(stepIndex, isValid)
  }, [legalDeclarations, consentGiven, updateFormData, validateStep, stepIndex])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Background Check Consent</h2>
        <p className="text-muted-foreground">Please review and complete the legal declarations and consent forms.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Legal Declarations</CardTitle>
          <CardDescription>Please answer the following questions truthfully</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="criminal-history"
              checked={legalDeclarations.criminalHistory}
              onCheckedChange={(checked) => updateDeclaration("criminalHistory", checked)}
            />
            <div className="space-y-1">
              <Label htmlFor="criminal-history" className="font-medium">
                Criminal History
              </Label>
              <p className="text-sm text-muted-foreground">
                I have been convicted of a criminal offense in the past 10 years (excluding minor traffic violations).
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="financial-obligations"
              checked={legalDeclarations.financialObligations}
              onCheckedChange={(checked) => updateDeclaration("financialObligations", checked)}
            />
            <div className="space-y-1">
              <Label htmlFor="financial-obligations" className="font-medium">
                Financial Obligations
              </Label>
              <p className="text-sm text-muted-foreground">
                I have outstanding financial obligations or debts that are currently in default or collection.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="legal-proceedings"
              checked={legalDeclarations.legalProceedings}
              onCheckedChange={(checked) => updateDeclaration("legalProceedings", checked)}
            />
            <div className="space-y-1">
              <Label htmlFor="legal-proceedings" className="font-medium">
                Legal Proceedings
              </Label>
              <p className="text-sm text-muted-foreground">
                I am currently involved in ongoing legal proceedings or lawsuits.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Background Check Authorization</CardTitle>
          <CardDescription>Please review and provide your consent</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg text-sm">
            <p className="mb-2">
              I authorize the verification of the information provided in this application. I understand that a
              background check may be conducted, which may include:
            </p>
            <ul className="list-disc pl-5 space-y-1 mb-2">
              <li>Criminal record check</li>
              <li>Credit history check</li>
              <li>Employment verification</li>
              <li>Education verification</li>
              <li>Reference checks</li>
            </ul>
            <p>
              I understand that this information will be used solely for the purpose of evaluating my application and
              will be handled in accordance with applicable privacy laws and regulations.
            </p>
          </div>

          <div className="flex items-start space-x-3 pt-2">
            <Checkbox id="consent" checked={consentGiven} onCheckedChange={(checked) => setConsentGiven(!!checked)} />
            <div className="space-y-1">
              <Label htmlFor="consent" className="font-medium">
                Consent <span className="text-red-500">*</span>
              </Label>
              <p className="text-sm text-muted-foreground">
                I have read and understand the above statement and give my consent for the background check to be
                conducted.
              </p>
            </div>
          </div>

          {!consentGiven && (
            <Alert variant="destructive" className="mt-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>You must provide consent to proceed with the application.</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
