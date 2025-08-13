import { defaultTenantConfig } from "@/lib/tenants/default"
import { brokeragePrivateConfig } from "@/lib/tenants/brokerage-private"
import { internationalConfig } from "@/lib/tenants/international"
import { century21BegginsConfig } from "@/lib/tenants/century21-beggins"
import { century21CanadaConfig } from "@/lib/tenants/century21-canada"
import { empowerAiConfig } from "@/lib/tenants/empower-ai"
import { empowerBetaConfig } from "@/lib/tenants/empower-beta"
import type { TenantConfig } from "@/lib/types"

const tenantConfigs: Record<string, TenantConfig> = {
  default: defaultTenantConfig,
  "brokerage-private": brokeragePrivateConfig,
  international: internationalConfig,
  "century21-beggins": century21BegginsConfig,
  "century21-canada": century21CanadaConfig,
  "empower-ai": empowerAiConfig,
  "empower-beta": empowerBetaConfig,
}

export function getTenantConfig(): TenantConfig {
  if (typeof window === "undefined") {
    // Server-side: Use Empower AI as default
    return empowerAiConfig
  }

  // Client-side: All existing methods preserved in exact same order
  // 1. Check for preview tenant override (existing)
  const previewTenant = localStorage.getItem("preview-tenant")
  if (previewTenant && tenantConfigs[previewTenant]) {
    return tenantConfigs[previewTenant]
  }

  // 2. Check URL parameter (existing)
  const urlParams = new URLSearchParams(window.location.search)
  const tenantParam = urlParams.get("tenant")
  if (tenantParam && tenantConfigs[tenantParam]) {
    return tenantConfigs[tenantParam]
  }

  // 3. Check domain detection (additive - doesn't break existing)
  const hostname = window.location.hostname

  // Check for exact subdomain matches first
  if (hostname === "beggins.thenextlevelu.com") {
    return century21BegginsConfig
  }
  if (hostname === "brokerage.thenextlevelu.com") {
    return brokeragePrivateConfig
  }
  if (hostname === "international.thenextlevelu.com") {
    return internationalConfig
  }
  if (hostname === "century21canada.thenextlevelu.com") {
    return century21CanadaConfig
  }

  // Check for Empower AI domains (sample domains to prevent interference with live platform)
  if (hostname === "sample-empower-ai.com" || hostname === "www.sample-empower-ai.com") {
    return empowerAiConfig
  }
  if (hostname === "sample-empoweraibeta.com" || hostname === "www.sample-empoweraibeta.com") {
    return empowerBetaConfig
  }
  if (hostname === "empowerc21canada.com" || hostname === "www.empowerc21canada.com") {
    return century21CanadaConfig
  }

  // Fallback to partial matches (existing logic)
  if (hostname.includes("sample-beggins") || hostname.includes("century21-beggins")) {
    return century21BegginsConfig
  }
  if (hostname.includes("brokerage1") || hostname.includes("brokerage-private")) {
    return brokeragePrivateConfig
  }
  if (hostname.includes("international")) {
    return internationalConfig
  }
  if (hostname.includes("sample-empower-ai") || hostname.includes("empower-ai")) {
    return empowerAiConfig
  }
  if (hostname.includes("sample-empoweraibeta") || hostname.includes("empower-beta")) {
    return empowerBetaConfig
  }
  if (hostname.includes("empowerc21canada") || hostname.includes("century21-canada")) {
    return century21CanadaConfig
  }

  // 4. Fallback to Empower AI as default (changed from defaultTenantConfig)
  return empowerAiConfig
}

export function getAllTenants() {
  return [
    { id: "empower-ai", name: "Empower AI" },
    { id: "empower-beta", name: "Empower Beta" },
    { id: "century21-beggins", name: "Beggins University" },
    { id: "century21-canada", name: "Century 21 Canada" },
    { id: "brokerage-private", name: "Private Brokerage" },
    { id: "international", name: "International Platform" },
    { id: "default", name: "The Next Level U (Legacy)" },
  ]
}

export function getTenantById(id: string): TenantConfig | undefined {
  return tenantConfigs[id]
}

// Utility functions for feature checking
export function isToolEnabled(toolId: string, config: TenantConfig): boolean {
  return config.features.enabledTools?.includes(toolId) || false
}

export function isFeatureHidden(featureId: string, config: TenantConfig): boolean {
  return config.features.hiddenFeatures?.includes(featureId) || false
}

export function getTranslation(key: string, config: TenantConfig): string {
  return config.localization?.translations?.[key] || key
}
