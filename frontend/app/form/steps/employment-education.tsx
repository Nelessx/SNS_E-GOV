"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"

interface EmploymentEducationProps {
  formData: any
  updateFormData: (data: any) => void
  validateStep: (stepIndex: number, isValid: boolean) => void
  stepIndex: number
}

export default function EmploymentEducation({
  formData,
  updateFormData,
  validateStep,
  stepIndex,
}: EmploymentEducationProps) {
  const [employmentHistory, setEmploymentHistory] = useState(
    formData.employmentHistory || [],
  )

  const [education, setEducation] = useState(
    formData.education || [],
  )

  const addEmployment = () => {
    setEmploymentHistory([...employmentHistory, {
      employer: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    }])
  }

  const updateEmployment = (index: number, field: string, value: string) => {
    const updated = [...employmentHistory]
    updated[index][field] = value
    setEmploymentHistory(updated)
  }

  const removeEmployment = (index: number) => {
    const updated = [...employmentHistory]
    updated.splice(index, 1)
    setEmploymentHistory(updated)
  }

  const addEducation = () => {
    setEducation([...education, {
      institution: "",
      degree: "",
      field: "",
      graduationDate: "",
    }])
  }

  const updateEducation = (index: number, field: string, value: string) => {
    const updated = [...education]
    updated[index][field] = value
    setEducation(updated)
  }

  const removeEducation = (index: number) => {
    const updated = [...education]
    updated.splice(index, 1)
    setEducation(updated)
  }

  const handleSkip = () => {
    validateStep(stepIndex, true)  // Proceed to the next step even if no data is added
  }

  useEffect(() => {
    updateFormData({ employmentHistory, education })

    const hasAnyEmployment = employmentHistory.length === 0 || employmentHistory.some(job =>
      Object.values(job).some(val => val.trim?.() !== "")
    )

    const hasAnyEducation = education.length === 0 || education.some(edu =>
      Object.values(edu).some(val => val.trim?.() !== "")
    )

    // Validate the step as valid if either employment or education is filled or skipped
    validateStep(stepIndex, hasAnyEmployment || hasAnyEducation)
  }, [employmentHistory, education])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Employment & Education History</h2>
        <p className="text-muted-foreground">You may skip this step if not applicable.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Employment History</CardTitle>
          <CardDescription>List any past or current jobs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {employmentHistory.map((job, index) => (
            <div key={index} className="space-y-4">
              {index > 0 && <Separator />}
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Job {index + 1}</h4>
                <Button variant="ghost" size="sm" onClick={() => removeEmployment(index)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Employer</Label>
                  <Input value={job.employer} onChange={e => updateEmployment(index, "employer", e.target.value)} />
                </div>
                <div>
                  <Label>Position</Label>
                  <Input value={job.position} onChange={e => updateEmployment(index, "position", e.target.value)} />
                </div>
                <div>
                  <Label>Start Date</Label>
                  <Input type="date" value={job.startDate} onChange={e => updateEmployment(index, "startDate", e.target.value)} />
                </div>
                <div>
                  <Label>End Date</Label>
                  <Input type="date" value={job.endDate} onChange={e => updateEmployment(index, "endDate", e.target.value)} />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea value={job.description} onChange={e => updateEmployment(index, "description", e.target.value)} />
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full" onClick={addEmployment}>
            <Plus className="h-4 w-4 mr-2" /> Add Employment
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
          <CardDescription>List any completed education</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {education.map((edu, index) => (
            <div key={index} className="space-y-4">
              {index > 0 && <Separator />}
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Education {index + 1}</h4>
                <Button variant="ghost" size="sm" onClick={() => removeEducation(index)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>
              <div>
                <Label>Institution</Label>
                <Input value={edu.institution} onChange={e => updateEducation(index, "institution", e.target.value)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Degree</Label>
                  <Input value={edu.degree} onChange={e => updateEducation(index, "degree", e.target.value)} />
                </div>
                <div>
                  <Label>Field of Study</Label>
                  <Input value={edu.field} onChange={e => updateEducation(index, "field", e.target.value)} />
                </div>
              </div>
              <div>
                <Label>Graduation Date</Label>
                <Input type="date" value={edu.graduationDate} onChange={e => updateEducation(index, "graduationDate", e.target.value)} />
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full" onClick={addEducation}>
            <Plus className="h-4 w-4 mr-2" /> Add Education
          </Button>
        </CardContent>
      </Card>

      <Button variant="outline" className="w-full" onClick={handleSkip}>
        Skip & Proceed
      </Button>
    </div>
  )
}
