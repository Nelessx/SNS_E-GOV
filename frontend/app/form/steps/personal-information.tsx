"use client"

import { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash2 } from "lucide-react"

interface PersonalInformationProps {
  formData: any
  updateFormData: (data: any) => void
  validateStep: (stepIndex: number, isValid: boolean) => void
  stepIndex: number
}

export default function PersonalInformation({
  formData,
  updateFormData,
  validateStep,
  stepIndex,
}: PersonalInformationProps) {
  const [firstName, setFirstName] = useState(formData.firstName || "")
  const [lastName, setLastName] = useState(formData.lastName || "")
  const [dateOfBirth, setDateOfBirth] = useState(formData.dateOfBirth || "")
  const [email, setEmail] = useState(formData.email || "")
  const [phone, setPhone] = useState(formData.phone || "")
  const [familyMembers, setFamilyMembers] = useState(formData.familyMembers || [])
  const [isDobValid, setIsDobValid] = useState(true)

  const addFamilyMember = () => {
    setFamilyMembers([...familyMembers, { name: "", relationship: "", dateOfBirth: "" }])
  }

  const updateFamilyMember = (index, field, value) => {
    const updatedMembers = [...familyMembers]
    updatedMembers[index] = { ...updatedMembers[index], [field]: value }
    setFamilyMembers(updatedMembers)
  }

  const removeFamilyMember = (index) => {
    const updatedMembers = [...familyMembers]
    updatedMembers.splice(index, 1)
    setFamilyMembers(updatedMembers)
  }

  const isAtLeast18 = (dob: string) => {
    const birthDate = new Date(dob)
    const today = new Date()
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
    return birthDate <= eighteenYearsAgo
  }

  useEffect(() => {
    const dobValid = dateOfBirth !== "" && isAtLeast18(dateOfBirth)
    setIsDobValid(dobValid)

    const isValid =
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      dobValid &&
      email.trim() !== "" &&
      phone.trim() !== ""

    updateFormData({
      firstName,
      lastName,
      dateOfBirth,
      email,
      phone,
      familyMembers,
    })

    validateStep(stepIndex, isValid)
  }, [firstName, lastName, dateOfBirth, email, phone, familyMembers, updateFormData, validateStep, stepIndex])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Personal Information</h2>
        <p className="text-muted-foreground">Please provide your basic personal information.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Enter your biographical data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">
              Date of Birth <span className="text-red-500">*</span>
            </Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
            {!isDobValid && (
              <p className="text-red-500 text-sm">You must be at least 18 years old.</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>How can we reach you?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(123) 456-7890"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Family Information</CardTitle>
          <CardDescription>Add information about your family members (optional)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {familyMembers.map((member, index) => (
            <div key={index} className="space-y-4">
              {index > 0 && <Separator className="my-4" />}
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Family Member {index + 1}</h4>
                <Button variant="ghost" size="sm" onClick={() => removeFamilyMember(index)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`family-name-${index}`}>Name</Label>
                  <Input
                    id={`family-name-${index}`}
                    value={member.name}
                    onChange={(e) => updateFamilyMember(index, "name", e.target.value)}
                    placeholder="Full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`family-relationship-${index}`}>Relationship</Label>
                  <Input
                    id={`family-relationship-${index}`}
                    value={member.relationship}
                    onChange={(e) => updateFamilyMember(index, "relationship", e.target.value)}
                    placeholder="e.g., Spouse, Child, Parent"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`family-dob-${index}`}>Date of Birth</Label>
                <Input
                  id={`family-dob-${index}`}
                  type="date"
                  value={member.dateOfBirth}
                  onChange={(e) => updateFamilyMember(index, "dateOfBirth", e.target.value)}
                />
              </div>
            </div>
          ))}
          <Button variant="outline" onClick={addFamilyMember} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Family Member
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
