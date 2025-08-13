import { frenchTranslations } from "./translations/fr"
import { englishTranslations } from "./translations/en"

export class TranslationService {
  private translations = {
    en: englishTranslations,
    fr: frenchTranslations,
  }

  async translateText(text: string, targetLanguage: string): Promise<string> {
    if (targetLanguage === "en" || targetLanguage === "fr") {
      // Try to find a translation key that matches the text
      const translationKey = this.findTranslationKey(text, targetLanguage)
      return translationKey || text
    }
    return text
  }

  getSupportedLanguages(): string[] {
    return ["en", "fr"]
  }

  detectLanguage(text: string): string {
    // Simple language detection based on common French words
    const frenchWords = ["le", "la", "les", "de", "du", "des", "et", "ou", "avec", "pour", "sur", "dans"]
    const hasFrenchWords = frenchWords.some(word => 
      text.toLowerCase().includes(word.toLowerCase())
    )
    
    return hasFrenchWords ? "fr" : "en"
  }

  getTranslation(key: string, language: string): string {
    if (language === "en" || language === "fr") {
      return this.translations[language][key] || key
    }
    return key
  }

  private findTranslationKey(text: string, targetLanguage: string): string | null {
    const sourceLanguage = targetLanguage === "en" ? "fr" : "en"
    const sourceTranslations = this.translations[sourceLanguage]
    
    for (const [key, value] of Object.entries(sourceTranslations)) {
      if (value.toLowerCase() === text.toLowerCase()) {
        return this.translations[targetLanguage][key] || null
      }
    }
    
    return null
  }

  // Get all translations for a specific language
  getAllTranslations(language: string): Record<string, string> {
    if (language === "en" || language === "fr") {
      return this.translations[language]
    }
    return {}
  }

  // Check if a translation key exists
  hasTranslation(key: string, language: string): boolean {
    if (language === "en" || language === "fr") {
      return key in this.translations[language]
    }
    return false
  }
}

export const translationService = new TranslationService()
