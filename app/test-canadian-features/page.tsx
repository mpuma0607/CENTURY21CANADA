"use client"

import { useTranslation } from "@/contexts/translation-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { CanadianAddressForm } from "@/components/canadian-address-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Globe, 
  MapPin, 
  Languages, 
  CheckCircle, 
  AlertCircle,
  Building2,
  Mail,
  Phone
} from "lucide-react"

export default function TestCanadianFeaturesPage() {
  const { t, currentLanguage } = useTranslation()

  const handleAddressSubmit = (data: any) => {
    console.log("Canadian Address Submitted:", data)
    alert(`Address submitted: ${data.streetNumber} ${data.streetName}, ${data.city}, ${data.province} ${data.postalCode}`)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Globe className="h-8 w-8 text-[#B6A888]" />
          <h1 className="text-4xl font-bold text-[#B6A888]">
            {currentLanguage === "fr" ? "Century 21 Canada" : "Century 21 Canada"}
          </h1>
        </div>
        <p className="text-xl text-gray-600 mb-4">
          {currentLanguage === "fr" 
            ? "Système de traduction et formulaires d'adresse canadienne"
            : "Translation System and Canadian Address Forms"
          }
        </p>
        
        {/* Language Switcher */}
        <div className="flex justify-center mb-6">
          <LanguageSwitcher />
        </div>

        <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
          <Badge variant="outline" className="gap-1">
            <CheckCircle className="h-3 w-3" />
            {currentLanguage === "fr" ? "Français" : "English"}
          </Badge>
          <Badge variant="outline" className="gap-1">
            <MapPin className="h-3 w-3" />
            {currentLanguage === "fr" ? "Format canadien" : "Canadian Format"}
          </Badge>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Translation System */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="h-5 w-5 text-[#B6A888]" />
              {currentLanguage === "fr" ? "Système de Traduction" : "Translation System"}
            </CardTitle>
            <CardDescription>
              {currentLanguage === "fr" 
                ? "Support complet pour l'anglais et le français"
                : "Full support for English and French"
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">
                {currentLanguage === "fr" ? "Exemples de traduction:" : "Translation examples:"}
              </h4>
              <div className="space-y-1 text-sm">
                <p><strong>Navigation:</strong> {t("nav.ai-hub")}</p>
                <p><strong>Actions:</strong> {t("action.submit")}</p>
                <p><strong>Messages:</strong> {t("message.success")}</p>
                <p><strong>Validation:</strong> {t("validation.required")}</p>
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                onClick={() => console.log("Current language:", currentLanguage)}
                variant="outline"
                className="w-full"
              >
                {currentLanguage === "fr" 
                  ? "Voir la langue actuelle"
                  : "View Current Language"
                }
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Canadian Address Format */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-[#B6A888]" />
              {currentLanguage === "fr" ? "Format d'Adresse Canadien" : "Canadian Address Format"}
            </CardTitle>
            <CardDescription>
              {currentLanguage === "fr" 
                ? "Formulaires avec validation canadienne"
                : "Forms with Canadian validation"
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">
                {currentLanguage === "fr" ? "Fonctionnalités:" : "Features:"}
              </h4>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  {currentLanguage === "fr" ? "Sélection de province" : "Province selection"}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  {currentLanguage === "fr" ? "Validation du code postal" : "Postal code validation"}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  {currentLanguage === "fr" ? "Format A1A 1A1" : "A1A 1A1 format"}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  {currentLanguage === "fr" ? "Traduction automatique" : "Auto-translation"}
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Canadian Address Form Demo */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-[#B6A888]" />
            {currentLanguage === "fr" 
              ? "Formulaire d'Adresse Canadienne - Démo"
              : "Canadian Address Form - Demo"
            }
          </CardTitle>
          <CardDescription>
            {currentLanguage === "fr" 
              ? "Testez le formulaire d'adresse avec validation canadienne et traduction française"
              : "Test the address form with Canadian validation and French translation"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CanadianAddressForm 
            onSubmit={handleAddressSubmit}
            showUnit={true}
          />
        </CardContent>
      </Card>

      {/* Additional Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="text-center">
            <Mail className="h-8 w-8 text-[#B6A888] mx-auto mb-2" />
            <CardTitle className="text-lg">
              {currentLanguage === "fr" ? "Traduction Complète" : "Complete Translation"}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-sm text-gray-600">
            {currentLanguage === "fr" 
              ? "Plus de 100 clés de traduction couvrant tous les aspects de l'interface"
              : "Over 100 translation keys covering all aspects of the interface"
            }
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <MapPin className="h-8 w-8 text-[#B6A888] mx-auto mb-2" />
            <CardTitle className="text-lg">
              {currentLanguage === "fr" ? "Format Canadien" : "Canadian Format"}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-sm text-gray-600">
            {currentLanguage === "fr" 
              ? "Formulaires d'adresse adaptés aux standards canadiens"
              : "Address forms adapted to Canadian standards"
            }
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Phone className="h-8 w-8 text-[#B6A888] mx-auto mb-2" />
            <CardTitle className="text-lg">
              {currentLanguage === "fr" ? "Validation Intelligente" : "Smart Validation"}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center text-sm text-gray-600">
            {currentLanguage === "fr" 
              ? "Validation automatique des codes postaux et sélection des provinces"
              : "Automatic postal code validation and province selection"
            }
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div className="text-center mt-12 pt-8 border-t">
        <p className="text-gray-500">
          {currentLanguage === "fr" 
            ? "Century 21 Canada - Plateforme immobilière alimentée par l'IA"
            : "Century 21 Canada - AI-Powered Real Estate Platform"
          }
        </p>
        <p className="text-sm text-gray-400 mt-2">
          {currentLanguage === "fr" 
            ? "Système de traduction et formulaires d'adresse canadienne implémentés"
            : "Translation system and Canadian address forms implemented"
          }
        </p>
      </div>
    </div>
  )
}
