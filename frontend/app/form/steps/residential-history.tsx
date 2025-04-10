"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus, Trash2 } from "lucide-react"

interface ResidentialHistoryProps {
  formData: any
  updateFormData: (data: any) => void
  validateStep: (stepIndex: number, isValid: boolean) => void
  stepIndex: number
}

export default function ResidentialHistory({
  formData,
  updateFormData,
  validateStep,
  stepIndex,
}: ResidentialHistoryProps) {
  const [addresses, setAddresses] = useState(
    formData.addresses || [
      {
        address: "",
        city: "",
        country: "",
        startDate: "",
        endDate: "",
      },
    ],
  )

  const [previousCountries, setPreviousCountries] = useState(formData.previousCountries || [])
  const [newCountry, setNewCountry] = useState("")

  const addAddress = () => {
    setAddresses([
      ...addresses,
      {
        address: "",
        city: "",
        country: "",
        startDate: "",
        endDate: "",
      },
    ])
  }

  const updateAddress = (index, field, value) => {
    const updatedAddresses = [...addresses]
    updatedAddresses[index] = { ...updatedAddresses[index], [field]: value }
    setAddresses(updatedAddresses)
  }

  const removeAddress = (index) => {
    if (addresses.length > 1) {
      const updatedAddresses = [...addresses]
      updatedAddresses.splice(index, 1)
      setAddresses(updatedAddresses)
    }
  }

  const addCountry = () => {
    if (newCountry.trim() !== "" && !previousCountries.includes(newCountry.trim())) {
      setPreviousCountries([...previousCountries, newCountry.trim()])
      setNewCountry("")
    }
  }

  const removeCountry = (index) => {
    const updatedCountries = [...previousCountries]
    updatedCountries.splice(index, 1)
    setPreviousCountries(updatedCountries)
  }

  useEffect(() => {
    // Check if at least one address is complete
    const isValid = addresses.some(
      (addr) =>
        addr.address.trim() !== "" && addr.city.trim() !== "" && addr.country.trim() !== "" && addr.startDate !== "",
    )

    // Update form data
    updateFormData({
      addresses,
      previousCountries,
    })

    // Validate step
    validateStep(stepIndex, isValid)
  }, [addresses, previousCountries, updateFormData, validateStep, stepIndex])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Residential History</h2>
        <p className="text-muted-foreground">Please provide your address history with date ranges.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Address History</CardTitle>
          <CardDescription>List your current and previous addresses</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {addresses.map((address, index) => (
            <div key={index} className="space-y-4">
              {index > 0 && <Separator className="my-4" />}
              <div className="flex justify-between items-center">
                <h4 className="font-medium">{index === 0 ? "Current Address" : `Previous Address ${index}`}</h4>
                {addresses.length > 1 && (
                  <Button variant="ghost" size="sm" onClick={() => removeAddress(index)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                )}
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`address-${index}`}>
                    Street Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id={`address-${index}`}
                    value={address.address}
                    onChange={(e) => updateAddress(index, "address", e.target.value)}
                    placeholder="123 Main St, Apt 4B"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`city-${index}`}>
                      City <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id={`city-${index}`}
                      value={address.city}
                      onChange={(e) => updateAddress(index, "city", e.target.value)}
                      placeholder="City"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`country-${index}`}>
                      Country <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id={`country-${index}`}
                      value={address.country}
                      onChange={(e) => updateAddress(index, "country", e.target.value)}
                      placeholder="Country"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`start-date-${index}`}>
                      Start Date <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id={`start-date-${index}`}
                      type="date"
                      value={address.startDate}
                      onChange={(e) => updateAddress(index, "startDate", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`end-date-${index}`}>
                      End Date {index > 0 && <span className="text-red-500">*</span>}
                    </Label>
                    <Input
                      id={`end-date-${index}`}
                      type="date"
                      value={address.endDate}
                      onChange={(e) => updateAddress(index, "endDate", e.target.value)}
                      placeholder={index === 0 ? "Leave blank if current address" : ""}
                      required={index > 0}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" onClick={addAddress} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Previous Address
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Previous Countries of Residence</CardTitle>
          <CardDescription>List any other countries you have lived in</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              value={newCountry}
              onChange={(e) => setNewCountry(e.target.value)}
              placeholder="Enter country name"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addCountry()
                }
              }}
            />
            <Button onClick={addCountry}>Add</Button>
          </div>

          {previousCountries.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Added Countries:</h4>
              <div className="flex flex-wrap gap-2">
                {previousCountries.map((country, index) => (
                  <div key={index} className="flex items-center bg-muted px-3 py-1 rounded-full">
                    <span>{country}</span>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-1" onClick={() => removeCountry(index)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
