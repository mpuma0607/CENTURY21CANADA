"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { frenchTranslations } from "@/lib/translations/fr"
import { englishTranslations } from "@/lib/translations/en"

interface TranslationContextType {
  translate: (key: string, params?: Record<string, string | number>) => string
  currentLanguage: string
  setLanguage: (language: string) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

const translations = {
  en: englishTranslations,
  fr: frenchTranslations,
}

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState("fr") // Default to French
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side before accessing localStorage
  useEffect(() => {
    setIsClient(true)
    
    try {
      const savedLanguage = localStorage.getItem("preferred-language")
      if (savedLanguage && (savedLanguage === "en" || savedLanguage === "fr")) {
        setCurrentLanguage(savedLanguage)
      }
    } catch (error) {
      console.warn("Could not access localStorage:", error)
      // Keep default language (French)
    }
  }, [])

  const translate = (key: string, params?: Record<string, string | number>): string => {
    try {
      const translation = translations[currentLanguage as keyof typeof translations]?.[key] || key
      
      if (params) {
        return Object.entries(params).reduce((result, [param, value]) => {
          return result.replace(new RegExp(`{${param}}`, 'g'), String(value))
        }, translation)
      }
      
      return translation
    } catch (error) {
      console.warn("Translation error:", error)
      return key // Fallback to the key if translation fails
    }
  }

  const setLanguage = (language: string) => {
    if (language === "en" || language === "fr") {
      setCurrentLanguage(language)
      
      if (isClient) {
        try {
          localStorage.setItem("preferred-language", language)
        } catch (error) {
          console.warn("Could not save language preference:", error)
        }
      }
    }
  }

  // Alias for translate function
  const t = translate

  return (
    <TranslationContext.Provider value={{ translate, currentLanguage, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}
