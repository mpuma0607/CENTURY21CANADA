import type { TenantConfig } from "../types"

export const century21CanadaConfig: TenantConfig = {
  id: "century21-canada",
  name: "Century 21 Canada",
  domain: [
    "empowerc21canada.com",
    "www.empowerc21canada.com",
    "century21canada.thenextlevelu.com",
  ],
  branding: {
    name: "Century 21 Canada",
    logo: "/images/logo_full_gold_1000X232(1).png",
    logoDark: "/images/logo_full_gold_1000X232(1).png",
    colors: {
      primary: "#B6A888", // Vegas Gold
      secondary: "#000000", // Black
      accent: "#FFFFFF", // White
      background: "#ffffff",
      text: "#000000",
    },
  },
  features: {
    enabledTools: [
      "ideahub-ai",
      "realbio",
      "listit",
      "scriptit",
      "roleplay-ai",
      "action-ai",
      "realcoach-ai",
      "bizplan-ai",
      "realdeal-ai",
      "quickcma-ai",
      "mymarket-ai",
      "whos-who-ai",
      "goalscreen-ai",
      "propbot-ai",
      "dynamic-branded-content",
    ],
    customSections: [],
    hiddenFeatures: [],
    customNavigation: false,
  },
  localization: {
    language: "fr", // Default to French for Century 21 Canada
    currency: "CAD", // Canadian Dollar
    dateFormat: "DD/MM/YYYY", // Canadian date format
    supportedLanguages: ["en", "fr"], // Support both English and French
    defaultLanguage: "fr", // Default to French
    translations: {
      "ai-hub.title": "AI Hub",
      "marketing-hub.title": "Marketing Hub",
      "prospecting-hub.title": "Prospecting Hub",
      "training-hub.title": "Training Hub",
      "services-hub.title": "Services Hub",
      "networking-hub.title": "Networking Hub",
      "gear-hub.title": "Gear Hub",
    },
    addressFormat: "canadian", // Use Canadian address format
    postalCodeValidation: true, // Enable Canadian postal code validation
    provinceSelection: true, // Enable Canadian province selection
  },
  auth: {
    provider: "memberspace",
    settings: {
      memberspace: {
        siteId: "empower21canada", // Correct MemberSpace subdomain
        requireLogin: true,
        allowedPlans: ["monthly", "annual", "brokerage"],
      },
    },
    billing: {
      model: "subscription",
      currency: "CAD",
      plans: [
        {
          id: "monthly",
          name: "Monthly",
          price: 39.99, // Canadian pricing
          interval: "month",
          features: [
            "Access to all AI tools",
            "Complete training library",
            "Marketing resources",
            "Community access",
            "24/7 platform access",
          ],
        },
        {
          id: "annual",
          name: "Annual",
          price: 399, // Canadian pricing
          interval: "year",
          features: [
            "Access to all AI tools",
            "Complete training library",
            "Marketing resources",
            "Community access",
            "24/7 platform access",
            "Save $80 per year",
          ],
        },
        {
          id: "brokerage",
          name: "Brokerage/Team",
          price: 0,
          interval: "month",
          features: [
            "All individual plan features",
            "Bulk licensing options",
            "Team management tools",
            "Custom branding options",
            "Dedicated support",
            "Volume discounts available",
          ],
        },
      ],
    },
  },
  content: {
    customTraining: true,
    onboardingFlow: true,
    privateResources: true,
    customAbout: "Century 21 Canada is the leading real estate platform in Canada, providing AI-powered tools and comprehensive training to help real estate professionals succeed in the Canadian market.",
  },
}
