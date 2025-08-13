# Century 21 Canada - French Translation System & Canadian Address Forms

## 🎯 Overview

This implementation provides a complete French translation system and Canadian address format support for the Century 21 Canada platform. The system automatically detects the tenant and applies appropriate language and address formatting.

## ✨ Features Implemented

### 🌐 French Translation System
- **Bilingual Support**: Full English and French language support
- **Dynamic Translation**: Context-aware translation with 100+ translation keys
- **Language Persistence**: Remembers user's language preference
- **Automatic Detection**: Smart language detection based on content
- **Translation Context**: React context for easy integration throughout the app

### 🗺️ Canadian Address Forms
- **Province Selection**: Dropdown with all 13 Canadian provinces and territories
- **Postal Code Validation**: Automatic validation of Canadian postal code format (A1A 1A1)
- **Bilingual Labels**: All form fields support both English and French
- **Smart Formatting**: Automatic postal code formatting as user types
- **Validation Messages**: Localized error messages in both languages

### 🎨 UI Components
- **Language Switcher**: Dropdown and compact toggle buttons
- **Canadian Address Form**: Reusable form component with validation
- **Demo Page**: Interactive showcase at `/test-canadian-features`

## 🚀 Quick Start

### 1. Language Switching
```tsx
import { useTranslation } from "@/contexts/translation-context"
import { LanguageSwitcher } from "@/components/language-switcher"

function MyComponent() {
  const { t, currentLanguage } = useTranslation()
  
  return (
    <div>
      <LanguageSwitcher />
      <h1>{t("page.title")}</h1>
      <p>Current language: {currentLanguage}</p>
    </div>
  )
}
```

### 2. Canadian Address Form
```tsx
import { CanadianAddressForm } from "@/components/canadian-address-form"

function AddressPage() {
  const handleSubmit = (data) => {
    console.log("Address:", data)
    // data includes: streetNumber, streetName, unit, city, province, postalCode
  }
  
  return (
    <CanadianAddressForm 
      onSubmit={handleSubmit}
      showUnit={true}
    />
  )
}
```

### 3. Translation Usage
```tsx
const { t } = useTranslation()

// Simple translation
<p>{t("action.submit")}</p>

// With parameters
<p>{t("validation.minLength", { min: 8 })}</p>
```

## 📁 File Structure

```
lib/
├── translations/
│   ├── en.ts          # English translations
│   └── fr.ts          # French translations
├── translation-service.ts  # Translation service
└── tenants/
    └── century21-canada.ts # Updated tenant config

contexts/
└── translation-context.tsx # React context for translations

components/
├── canadian-address-form.tsx  # Canadian address form
├── language-switcher.tsx      # Language switcher
└── ui/                       # UI components

app/
└── test-canadian-features/   # Demo page
    └── page.tsx
```

## 🔧 Configuration

### Tenant Configuration
The Century 21 Canada tenant now includes:

```typescript
localization: {
  language: "en",
  supportedLanguages: ["en", "fr"],
  defaultLanguage: "en",
  addressFormat: "canadian",
  postalCodeValidation: true,
  provinceSelection: true,
}
```

### Translation Keys
Key categories include:
- **Navigation**: `nav.ai-hub`, `nav.marketing-hub`, etc.
- **Actions**: `action.submit`, `action.cancel`, etc.
- **Forms**: `form.required`, `form.email`, etc.
- **Address**: `address.street`, `address.province`, etc.
- **Validation**: `validation.required`, `validation.postalCode`, etc.
- **Messages**: `message.success`, `message.error`, etc.

## 🌍 Language Support

### English (en)
- Default language
- Full interface coverage
- US-style address formats (when not using Canadian forms)

### French (fr)
- Complete French translations
- Canadian address formats
- Province names in French
- Validation messages in French

## 🗺️ Canadian Address Format

### Province Codes
- **AB**: Alberta
- **BC**: British Columbia
- **MB**: Manitoba
- **NB**: New Brunswick
- **NL**: Newfoundland and Labrador
- **NS**: Nova Scotia
- **NT**: Northwest Territories
- **NU**: Nunavut
- **ON**: Ontario
- **PE**: Prince Edward Island
- **QC**: Quebec
- **SK**: Saskatchewan
- **YT**: Yukon

### Postal Code Format
- **Pattern**: A1A 1A1 (letter-number-letter space number-letter-number)
- **Validation**: Automatic format checking
- **Formatting**: Auto-formatting as user types
- **Examples**: M5V 3A8, H2Y 1C6, V6B 1A1

## 🔄 Integration

### 1. Wrap Your App
```tsx
// app/layout.tsx
import { TranslationProvider } from "@/contexts/translation-context"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <TranslationProvider>
          {children}
        </TranslationProvider>
      </body>
    </html>
  )
}
```

### 2. Use in Components
```tsx
import { useTranslation } from "@/contexts/translation-context"

export function MyComponent() {
  const { t, currentLanguage, setLanguage } = useTranslation()
  
  return (
    <div>
      <button onClick={() => setLanguage("fr")}>
        {t("action.switchToFrench")}
      </button>
      <h1>{t("page.title")}</h1>
    </div>
  )
}
```

### 3. Replace Existing Forms
```tsx
// Before (US format)
<Input placeholder="ZIP Code" />

// After (Canadian format)
<CanadianAddressForm onSubmit={handleSubmit} />
```

## 🧪 Testing

### Demo Page
Visit `/test-canadian-features` to see:
- Language switching in action
- Canadian address form with validation
- Translation examples
- Feature showcase

### Testing Address Validation
Try these postal codes:
- ✅ Valid: `M5V 3A8`, `H2Y 1C6`, `V6B 1A1`
- ❌ Invalid: `12345`, `ABC123`, `M5V`

## 🚀 Future Enhancements

### Planned Features
- **Auto-detection**: Detect user's preferred language from browser
- **Regional Variants**: Support for Quebec French vs. International French
- **Address Autocomplete**: Integration with Canadian postal service APIs
- **More Languages**: Support for additional languages (Spanish, Mandarin, etc.)

### Extensibility
The system is designed to be easily extensible:
- Add new languages by creating translation files
- Add new address formats by extending the form components
- Add new validation rules by updating the validation logic

## 📝 Notes

### Language Persistence
- Language preference is stored in `localStorage`
- Persists across browser sessions
- Falls back to English if no preference is set

### Performance
- Translations are loaded statically (no API calls)
- Minimal bundle size impact
- Efficient React context usage

### Accessibility
- Language switcher includes proper ARIA labels
- Form validation provides clear error messages
- Support for screen readers in both languages

## 🤝 Contributing

To add new translations:
1. Add keys to both `en.ts` and `fr.ts`
2. Update the translation context if needed
3. Test in both languages
4. Update this documentation

## 📞 Support

For questions or issues with the translation system or Canadian address forms, please refer to the demo page at `/test-canadian-features` or check the component documentation.

---

**Last Updated**: December 2024  
**Version**: 1.0.0  
**Status**: ✅ Complete and Tested
