"use client"

import { useState } from "react"
import { useTranslation } from "@/contexts/translation-context"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, MapPin } from "lucide-react"

interface CanadianAddressFormData {
  streetNumber: string
  streetName: string
  unit?: string
  city: string
  province: string
  postalCode: string
}

interface CanadianAddressFormProps {
  onSubmit: (data: CanadianAddressFormData) => void
  initialData?: Partial<CanadianAddressFormData>
  showUnit?: boolean
  className?: string
}

const CANADIAN_PROVINCES = [
  { code: "AB", name: "Alberta" },
  { code: "BC", name: "British Columbia" },
  { code: "MB", name: "Manitoba" },
  { code: "NB", name: "New Brunswick" },
  { code: "NL", name: "Newfoundland and Labrador" },
  { code: "NS", name: "Nova Scotia" },
  { code: "NT", name: "Northwest Territories" },
  { code: "NU", name: "Nunavut" },
  { code: "ON", name: "Ontario" },
  { code: "PE", name: "Prince Edward Island" },
  { code: "QC", name: "Quebec" },
  { code: "SK", name: "Saskatchewan" },
  { code: "YT", name: "Yukon" },
]

export function CanadianAddressForm({ 
  onSubmit, 
  initialData = {}, 
  showUnit = true,
  className = "" 
}: CanadianAddressFormProps) {
  const { t, currentLanguage } = useTranslation()
  const [formData, setFormData] = useState<CanadianAddressFormData>({
    streetNumber: "",
    streetName: "",
    unit: "",
    city: "",
    province: "",
    postalCode: "",
    ...initialData,
  })
  const [errors, setErrors] = useState<Partial<CanadianAddressFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: Partial<CanadianAddressFormData> = {}

    if (!formData.streetNumber.trim()) {
      newErrors.streetNumber = t("validation.required")
    }

    if (!formData.streetName.trim()) {
      newErrors.streetName = t("validation.required")
    }

    if (!formData.city.trim()) {
      newErrors.city = t("validation.required")
    }

    if (!formData.province) {
      newErrors.province = t("validation.required")
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = t("validation.required")
    } else if (!isValidCanadianPostalCode(formData.postalCode)) {
      newErrors.postalCode = t("validation.postalCode")
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidCanadianPostalCode = (postalCode: string): boolean => {
    // Canadian postal code format: A1A 1A1 (letter-number-letter number-letter-number)
    const postalCodeRegex = /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/
    return postalCodeRegex.test(postalCode)
  }

  const formatPostalCode = (value: string): string => {
    // Remove all non-alphanumeric characters
    const cleaned = value.replace(/[^A-Za-z0-9]/g, "")
    
    // Format as A1A 1A1
    if (cleaned.length >= 6) {
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)}`
    }
    
    return cleaned
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      await onSubmit(formData)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof CanadianAddressFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handlePostalCodeChange = (value: string) => {
    const formatted = formatPostalCode(value)
    handleInputChange("postalCode", formatted)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          {t("address.street")}
        </CardTitle>
        <CardDescription>
          {currentLanguage === "fr" 
            ? "Veuillez entrer l'adresse canadienne complète"
            : "Please enter the complete Canadian address"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="streetNumber">
                {t("address.streetNumber")} *
              </Label>
              <Input
                id="streetNumber"
                value={formData.streetNumber}
                onChange={(e) => handleInputChange("streetNumber", e.target.value)}
                placeholder={currentLanguage === "fr" ? "123" : "123"}
                className={errors.streetNumber ? "border-red-500" : ""}
              />
              {errors.streetNumber && (
                <p className="text-sm text-red-500">{errors.streetNumber}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="streetName">
                {t("address.streetName")} *
              </Label>
              <Input
                id="streetName"
                value={formData.streetName}
                onChange={(e) => handleInputChange("streetName", e.target.value)}
                placeholder={currentLanguage === "fr" ? "Rue Principale" : "Main Street"}
                className={errors.streetName ? "border-red-500" : ""}
              />
              {errors.streetName && (
                <p className="text-sm text-red-500">{errors.streetName}</p>
              )}
            </div>

            {showUnit && (
              <div className="space-y-2">
                <Label htmlFor="unit">
                  {t("address.unit")} ({t("form.optional")})
                </Label>
                <Input
                  id="unit"
                  value={formData.unit}
                  onChange={(e) => handleInputChange("unit", e.target.value)}
                  placeholder={currentLanguage === "fr" ? "Apt 101" : "Apt 101"}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">
                {t("address.city")} *
              </Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                placeholder={currentLanguage === "fr" ? "Toronto" : "Toronto"}
                className={errors.city ? "border-red-500" : ""}
              />
              {errors.city && (
                <p className="text-sm text-red-500">{errors.city}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="province">
                {t("address.province")} *
              </Label>
              <Select
                value={formData.province}
                onValueChange={(value) => handleInputChange("province", value)}
              >
                <SelectTrigger className={errors.province ? "border-red-500" : ""}>
                  <SelectValue placeholder={currentLanguage === "fr" ? "Sélectionner une province" : "Select a province"} />
                </SelectTrigger>
                <SelectContent>
                  {CANADIAN_PROVINCES.map((province) => (
                    <SelectItem key={province.code} value={province.code}>
                      {currentLanguage === "fr" 
                        ? t(`province.${province.code.toLowerCase()}`)
                        : province.name
                      }
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.province && (
                <p className="text-sm text-red-500">{errors.province}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="postalCode">
                {t("address.postalCode")} *
              </Label>
              <Input
                id="postalCode"
                value={formData.postalCode}
                onChange={(e) => handlePostalCodeChange(e.target.value)}
                placeholder={currentLanguage === "fr" ? "M5V 3A8" : "M5V 3A8"}
                maxLength={7}
                className={errors.postalCode ? "border-red-500" : ""}
              />
              {errors.postalCode && (
                <p className="text-sm text-red-500">{errors.postalCode}</p>
              )}
              <p className="text-xs text-gray-500">
                {currentLanguage === "fr" 
                  ? "Format: A1A 1A1"
                  : "Format: A1A 1A1"
                }
              </p>
            </div>
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting 
                ? t("message.loading")
                : t("action.submit")
              }
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
