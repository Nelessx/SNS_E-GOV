"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"

interface EligibilityCheckProps {
  formData: any
  updateFormData: (data: any) => void
  validateStep: (stepIndex: number, isValid: boolean) => void
  stepIndex: number
}

export default function EligibilityCheck({ formData, updateFormData, validateStep, stepIndex }: EligibilityCheckProps) {
  const [citizenshipStatus, setCitizenshipStatus] = useState(formData.citizenshipStatus || "")
  const [ageCheck, setAgeCheck] = useState(formData.ageCheck || "")
  const [criminalRecord, setCriminalRecord] = useState(formData.criminalRecord || "")
  const [isEligible, setIsEligible] = useState(formData.isEligible || false)

  useEffect(() => {
    // Check if all questions are answered
    const allAnswered = citizenshipStatus !== "" && ageCheck !== "" && criminalRecord !== ""

    // Check eligibility criteria
    const eligible = ageCheck === "yes" && criminalRecord === "no"

    setIsEligible(eligible)

    // Update form data
    updateFormData({
      citizenshipStatus,
      ageCheck,
      criminalRecord,
      isEligible: eligible,
    })

    // Validate step - user can proceed even if not eligible, but they need to answer all questions
    validateStep(stepIndex, allAnswered)
  }, [citizenshipStatus, ageCheck, criminalRecord, updateFormData, validateStep, stepIndex])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Eligibility Check</h2>
        <p className="text-muted-foreground">Please answer the following questions to determine your eligibility.</p>
      </div>
    
      <Card>
        <CardHeader>
          <CardTitle>Citizenship Status</CardTitle>
          <CardDescription>Please select your current citizenship status</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={citizenshipStatus} onValueChange={setCitizenshipStatus} className="space-y-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="citizen" id="citizen" />
              <Label htmlFor="citizen">Citizen</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="permanent-resident" id="permanent-resident" />
              <Label htmlFor="permanent-resident">Permanent Resident</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="visa-holder" id="visa-holder" />
              <Label htmlFor="visa-holder">Visa Holder</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other">Other</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Age Requirement</CardTitle>
          <CardDescription>Are you 18 years of age or older?</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={ageCheck} onValueChange={setAgeCheck} className="space-y-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="age-yes" />
              <Label htmlFor="age-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="age-no" />
              <Label htmlFor="age-no">No</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Criminal Record</CardTitle>
          <CardDescription>Do you have any criminal convictions?</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={criminalRecord} onValueChange={setCriminalRecord} className="space-y-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="criminal-yes" />
              <Label htmlFor="criminal-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="criminal-no" />
              <Label htmlFor="criminal-no">No</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {citizenshipStatus && ageCheck && criminalRecord && (
        <Alert variant={isEligible ? "default" : "destructive"}>
          {isEligible ? (
            <>
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Eligible</AlertTitle>
              <AlertDescription>
                Based on your responses, you are eligible to proceed with the application.
              </AlertDescription>
            </>
          ) : (
            <>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Not Eligible</AlertTitle>
              <AlertDescription>
                Based on your responses, you do not meet the eligibility criteria for this application. You may still
                proceed to review the requirements, but your application may not be accepted.
              </AlertDescription>
            </>
          )}
        </Alert>
      )}
    </div>
  )
}
