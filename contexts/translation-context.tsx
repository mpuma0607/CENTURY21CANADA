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
  const [currentLanguage, setCurrentLanguage] = useState("en")

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferred-language")
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "fr")) {
      setCurrentLanguage(savedLanguage)
    }
  }, [])

  const translate = (key: string, params?: Record<string, string | number>): string => {
    const translation = translations[currentLanguage as keyof typeof translations]?.[key] || key
    
    if (params) {
      return Object.entries(params).reduce((result, [param, value]) => {
        return result.replace(new RegExp(`{${param}}`, 'g'), String(value))
      }, translation)
    }
    
    return translation
  }

  const setLanguage = (language: string) => {
    if (language === "en" || language === "fr") {
      setCurrentLanguage(language)
      localStorage.setItem("preferred-language", language)
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
