"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react"
import { useTenantConfig } from "@/contexts/tenant-context"
import { useTranslation } from "@/contexts/translation-context"
import { isFeatureHidden } from "@/lib/tenant-config"
import { LanguageSwitcher } from "@/components/language-switcher"

const navigationItems = [
  {
    title: "AI Hub",
    href: "/ai-hub",
    submenu: [
      // AI Marketing & Prospecting Tools
      { title: "tool.category.marketing", href: "#", description: "", isHeader: true, translationKey: "tool.category.marketing" },
      {
        title: "tool.ideahub",
        href: "/ai-hub/ideahub-ai",
        description: "tool.ideahub.description",
        begginsHref: "/ai-hub/ideahub-beggins",
        empowerHref: "/ai-hub/ideahub-empower",
        translationKey: "tool.ideahub",
        descriptionKey: "tool.ideahub.description",
      },
      { title: "tool.realbio", href: "/ai-hub/realbio", description: "tool.realbio.description", translationKey: "tool.realbio", descriptionKey: "tool.realbio.description" },
      { title: "tool.listit", href: "/ai-hub/listit-ai", description: "tool.listit.description", translationKey: "tool.listit", descriptionKey: "tool.listit.description" },
      { title: "tool.scriptit", href: "/ai-hub/scriptit-ai", description: "tool.scriptit.description", translationKey: "tool.scriptit", descriptionKey: "tool.scriptit.description" },
      { title: "tool.quickcma", href: "/ai-hub/quickcma-ai", description: "tool.quickcma.description", translationKey: "tool.quickcma", descriptionKey: "tool.quickcma.description" },
      { title: "tool.mymarket", href: "/ai-hub/mymarket-ai", description: "tool.mymarket.description", translationKey: "tool.mymarket", descriptionKey: "tool.mymarket.description" },
      { title: "tool.roleplay", href: "/ai-hub/roleplay-ai", description: "tool.roleplay.description", translationKey: "tool.roleplay", descriptionKey: "tool.roleplay.description" },
      { title: "tool.propbot", href: "/ai-hub/propbot-ai", description: "tool.propbot.description", translationKey: "tool.propbot", descriptionKey: "tool.propbot.description" },
      { title: "tool.whoswho", href: "/ai-hub/whos-who-ai", description: "tool.whoswho.description", translationKey: "tool.whoswho", descriptionKey: "tool.whoswho.description" },
      { title: "tool.goalscreen", href: "/ai-hub/goalscreen-ai", description: "tool.goalscreen.description", translationKey: "tool.goalscreen", descriptionKey: "tool.goalscreen.description" },
      // AI Planning & Coaching Tools
      { title: "tool.category.planning", href: "#", description: "", isHeader: true, translationKey: "tool.category.planning" },
      { title: "tool.action", href: "/ai-hub/action-ai", description: "tool.action.description", translationKey: "tool.action", descriptionKey: "tool.action.description" },
      { title: "tool.realcoach", href: "/ai-hub/realcoach-ai", description: "tool.realcoach.description", translationKey: "tool.realcoach", descriptionKey: "tool.realcoach.description" },
      { title: "tool.bizplan", href: "/ai-hub/bizplan-ai", description: "tool.bizplan.description", translationKey: "tool.bizplan", descriptionKey: "tool.bizplan.description" },
      // AI Analysis & Contract Tools
      { title: "tool.category.analysis", href: "#", description: "", isHeader: true, translationKey: "tool.category.analysis" },
      { title: "tool.realdeal", href: "/ai-hub/realdeal-ai", description: "tool.realdeal.description", translationKey: "tool.realdeal", descriptionKey: "tool.realdeal.description" },
    ],
  },
  {
    title: "Marketing Hub",
    href: "/marketing-hub",
    submenu: [
      {
        title: "submenu.hot-takes",
        href: "/marketing-hub/hot-takes",
        description: "submenu.hot-takes.description",
        translationKey: "submenu.hot-takes",
        descriptionKey: "submenu.hot-takes.description",
      },
      {
        title: "submenu.brokerage-logos",
        href: "/marketing-hub/brokerage-logos",
        description: "submenu.brokerage-logos.description",
        translationKey: "submenu.brokerage-logos",
        descriptionKey: "submenu.brokerage-logos.description",
      },
    ],
  },
  {
    title: "Prospecting Hub",
    href: "/prospecting-hub",
    submenu: [
      { title: "submenu.fsbo", href: "/prospecting-hub/fsbo", description: "submenu.fsbo.description", translationKey: "submenu.fsbo", descriptionKey: "submenu.fsbo.description" },
      {
        title: "submenu.absentee-owners",
        href: "/prospecting-hub/absentee-owners",
        description: "submenu.absentee-owners.description",
        translationKey: "submenu.absentee-owners",
        descriptionKey: "submenu.absentee-owners.description",
      },
      { title: "submenu.expired-listings", href: "/prospecting-hub/expired-listings", description: "submenu.expired-listings.description", translationKey: "submenu.expired-listings", descriptionKey: "submenu.expired-listings.description" },
      { title: "submenu.probate", href: "/prospecting-hub/probate", description: "submenu.probate.description", translationKey: "submenu.probate", descriptionKey: "submenu.probate.description" },
      { title: "submenu.soi", href: "/prospecting-hub/soi", description: "submenu.soi.description", translationKey: "submenu.soi", descriptionKey: "submenu.soi.description" },
      {
        title: "submenu.first-time-buyers",
        href: "/prospecting-hub/first-time-buyers",
        description: "submenu.first-time-buyers.description",
        translationKey: "submenu.first-time-buyers",
        descriptionKey: "submenu.first-time-buyers.description",
      },
      { title: "submenu.investors", href: "/prospecting-hub/investors", description: "submenu.investors.description", translationKey: "submenu.investors", descriptionKey: "submenu.investors.description" },
      { title: "submenu.divorce", href: "/prospecting-hub/divorce", description: "submenu.divorce.description", translationKey: "submenu.divorce", descriptionKey: "submenu.divorce.description" },
    ],
  },
  {
    title: "Training Hub",
    href: "/training-hub",
    submenu: [
      {
        title: "submenu.moxi-works",
        href: "/training-hub/moxi-works",
        description: "submenu.moxi-works.description",
        translationKey: "submenu.moxi-works",
        descriptionKey: "submenu.moxi-works.description",
      },
      { title: "submenu.script-mastery", href: "/training-hub/script-mastery", description: "submenu.script-mastery.description", translationKey: "submenu.script-mastery", descriptionKey: "submenu.script-mastery.description" },
      {
        title: "submenu.buyer-process",
        href: "/training-hub/buyer-process",
        description: "submenu.buyer-process.description",
        translationKey: "submenu.buyer-process",
        descriptionKey: "submenu.buyer-process.description",
      },
      {
        title: "submenu.listing-process",
        href: "/training-hub/listing-process",
        description: "submenu.listing-process.description",
        translationKey: "submenu.listing-process",
        descriptionKey: "submenu.listing-process.description",
      },
      { title: "submenu.disc-vak", href: "/training-hub/disc-vak", description: "submenu.disc-vak.description", translationKey: "submenu.disc-vak", descriptionKey: "submenu.disc-vak.description" },
    ],
  },
  {
    title: "Onboarding Hub",
    href: "/onboarding-hub",
    submenu: [
      {
        title: "Agent Profile & Set Up",
        href: "/onboarding-hub/agent-profile-setup",
        description: "Complete your agent profile and initial setup",
      },
      {
        title: "Moxi Works Set Up",
        href: "/onboarding-hub/moxi-works-setup",
        description: "Configure your Moxi Works platform",
      },
      {
        title: "Dotloop Set Up",
        href: "/onboarding-hub/dotloop-setup",
        description: "Set up your Dotloop transaction management",
      },
      {
        title: "Zoom Set Up",
        href: "/onboarding-hub/zoom-setup",
        description: "Configure Zoom for client meetings",
      },
    ],
  },
  {
    title: "Services Hub",
    href: "/services-hub",
    submenu: [
      {
        title: "submenu.moxi-design",
        href: "/services-hub/moxi-design",
        description: "submenu.moxi-design.description",
        translationKey: "submenu.moxi-design",
        descriptionKey: "submenu.moxi-design.description",
      },
      {
        title: "submenu.brokerage-consulting",
        href: "/services-hub/brokerage-consulting",
        description: "submenu.brokerage-consulting.description",
        translationKey: "submenu.brokerage-consulting",
        descriptionKey: "submenu.brokerage-consulting.description",
      },
    ],
  },
  {
    title: "Zillow Hub",
    href: "/zillow-hub/zillow-showcase",
    submenu: [
      {
        title: "Zillow Showcase",
        href: "/zillow-hub/zillow-showcase",
        description: "Complete Zillow Showcase training and resources",
      },
    ],
  },
  {
    title: "Networking Hub",
    href: "/networking-hub",
    submenu: [
      {
        title: "Community Groups & Chats",
        href: "/networking-hub",
        description: "Connect with real estate professionals",
      },
      {
        title: "Agent Directory",
        href: "/networking-hub/agent-directory",
        description: "Find and connect with other agents",
      },
    ],
  },
  {
    title: "Gear Hub",
    href: "/gear-hub",
    submenu: [],
  },
  {
    title: "Profile",
    href: "/profile",
    submenu: [
      {
        title: "Profile",
        href: "/profile",
        description: "Manage your member profile",
      },
      {
        title: "Creations Dashboard",
        href: "/creations-dashboard",
        description: "View your saved AI creations",
      },
    ],
  },
]

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null)
  const pathname = usePathname()
  const tenantConfig = useTenantConfig()
  const { t } = useTranslation()

  const toggleSubmenu = (title: string) => {
    setActiveSubmenu(activeSubmenu === title ? null : title)
  }

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Filter navigation items based on tenant config
  const filteredNavigationItems = navigationItems
    .map((item) => {
      // Check if this hub is hidden for this tenant
      const hubKey = item.title.toLowerCase().replace(" ", "-")
      if (isFeatureHidden(hubKey, tenantConfig)) {
        return null
      }

      // For Beggins tenant, show Onboarding Hub, for others hide it
      if (item.title === "Onboarding Hub" && tenantConfig.id !== "century21-beggins") {
        return null
      }

      // For Beggins tenant, show Zillow Hub, for others hide it
      if (item.title === "Zillow Hub" && tenantConfig.id !== "century21-beggins") {
        return null
      }

      // For Beggins tenant and Century 21 Canada, hide Networking Hub
      if (item.title === "Networking Hub" && (tenantConfig.id === "century21-beggins" || tenantConfig.id === "century21-canada")) {
        return null
      }

      // Filter submenu items based on tenant
      let filteredSubmenu =
        item.submenu?.filter((subItem) => {
          if (subItem.tenantSpecific && subItem.tenantSpecific !== tenantConfig.id) {
            return false
          }
          // Remove Brokerage Logos for all tenants except Beggins
          if (subItem.title === "Brokerage Logos" && tenantConfig.id !== "century21-beggins") {
            return false
          }
          return true
        }) || []

      // Add Dynamic Branded Content for Empower AI, Beggins, and Century 21 Canada tenants
      if (
        item.title === "Marketing Hub" &&
        (tenantConfig.id === "empower-ai" ||
          tenantConfig.id === "empower-beta" ||
          tenantConfig.id === "century21-beggins" ||
          tenantConfig.id === "century21-canada")
      ) {
        // Add Dynamic Branded Content as the first item
        filteredSubmenu.unshift({
          title: "submenu.dynamic-branded-content",
          href: "/marketing-hub/dynamic-branded-content",
          description: "submenu.dynamic-branded-content.description",
          translationKey: "submenu.dynamic-branded-content",
          descriptionKey: "submenu.dynamic-branded-content.description",
        })
      }

      // For Century 21 Canada, only show Dynamic Branded Content and Real Estate Hot Takes
      if (item.title === "Marketing Hub" && tenantConfig.id === "century21-canada") {
        // Clear existing submenu and only show the two items
        filteredSubmenu = [
          {
            title: "submenu.dynamic-branded-content",
            href: "/marketing-hub/dynamic-branded-content",
            description: "submenu.dynamic-branded-content.description",
            translationKey: "submenu.dynamic-branded-content",
            descriptionKey: "submenu.dynamic-branded-content.description",
          },
          {
            title: "submenu.hot-takes",
            href: "/marketing-hub/hot-takes",
            description: "submenu.hot-takes.description",
            translationKey: "submenu.hot-takes",
            descriptionKey: "submenu.hot-takes.description",
          }
        ]
      }

      // Add Beggins-specific marketing items
      if (item.title === "Marketing Hub" && tenantConfig.id === "century21-beggins") {
        // Add Beach Project Toolkits
        filteredSubmenu.push({
          title: "submenu.beach-project-toolkits",
          href: "/marketing-hub/beach-project-toolkits",
          description: "submenu.beach-project-toolkits.description",
          translationKey: "submenu.beach-project-toolkits",
          descriptionKey: "submenu.beach-project-toolkits.description",
        })
      }

      // Add Beggins-specific training items
      if (item.title === "Training Hub" && tenantConfig.id === "century21-beggins") {
        // Add Daily Morning Huddles as the first item
        filteredSubmenu.unshift({
          title: "Daily Morning Huddles",
          href: "/training-hub/daily-morning-huddles",
          description: "Access daily training session replays Monday-Friday",
        })

        // Add Buyer Broker Agreement Training
        filteredSubmenu.push({
          title: "Buyer Broker Agreement Training",
          href: "/training-hub/buyer-broker-agreement-training",
          description: "Master buyer broker agreement presentations and execution",
        })

        // Add Dotloop Training
        filteredSubmenu.push({
          title: "Dotloop Training",
          href: "/training-hub/dotloop-training",
          description: "Complete Dotloop platform training and best practices",
        })
      }

      // Modify Services Hub for Beggins tenant
      if (item.title === "Services Hub" && tenantConfig.id === "century21-beggins") {
        // Remove Brokerage Consulting and add Referral/Relocation
        filteredSubmenu = filteredSubmenu.filter((subItem) => subItem.title !== "Brokerage Consulting")
        filteredSubmenu.push({
          title: "Referral/Relocation - Refer A Client",
          href: "/services-hub/referral-relocation",
          description: "Submit client referrals and relocation requests",
        })
      }

      // Add Beggins-specific profile links
      if (item.title === "Profile" && tenantConfig.id === "century21-beggins") {
        // Add Branding Profile as the first item
        filteredSubmenu.unshift({
          title: "Branding Profile",
          href: "/profile/branding",
          description: "Manage your personal branding and logo preferences",
        })

        filteredSubmenu.push(
          {
            title: "Pay Beggins Onboarding Fee",
            href: "https://buy.stripe.com/7sYeVecOM29m53Q4vq9ws00",
            description: "Complete your onboarding payment",
            external: true,
          },
          {
            title: "Manage BE3 Membership",
            href: "https://joinc21be3.com/pages/membership-portal",
            description: "Access your BE3 membership portal",
            external: true,
          },
        )
      }

      // Add Empower AI and Century 21 Canada profile links
      if (item.title === "Profile" && (tenantConfig.id === "empower-ai" || tenantConfig.id === "empower-beta" || tenantConfig.id === "century21-canada")) {
        // Add Branding Profile as the first item
        filteredSubmenu.unshift({
          title: "Branding Profile",
          href: "/profile/branding",
          description: "Manage your personal branding and logo preferences",
        })
      }

      // Add custom sections for Training Hub if they exist, but exclude onboarding for Beggins
      if (item.title === "Training Hub" && tenantConfig.features.customSections.length > 0) {
        const customTrainingSections = tenantConfig.features.customSections.filter((section) => {
          // For Beggins tenant, exclude onboarding from Training Hub since it's now its own hub
          if (tenantConfig.id === "century21-beggins" && section.id === "onboarding") {
            return false
          }
          return section.href.startsWith("/training-hub/")
        })
        filteredSubmenu = [...filteredSubmenu, ...customTrainingSections]
      }

      // Get translated title, fallback to original if no translation
      let translatedTitle = item.title
      if (item.title === "AI Hub") {
        translatedTitle = t('nav.ai-hub')
      } else if (item.title === "Marketing Hub") {
        translatedTitle = t('nav.marketing-hub')
      } else if (item.title === "Prospecting Hub") {
        translatedTitle = t('nav.prospecting-hub')
      } else if (item.title === "Training Hub") {
        translatedTitle = t('nav.training-hub')
      } else if (item.title === "Services Hub") {
        translatedTitle = t('nav.services-hub')
      } else if (item.title === "Networking Hub") {
        translatedTitle = t('nav.networking-hub')
      } else if (item.title === "Gear Hub") {
        translatedTitle = t('nav.gear-hub')
      } else if (item.title === "Profile") {
        translatedTitle = t('nav.profile')
      }
      const displayTitle = translatedTitle

      // Translate submenu items if they have translation keys
      const translatedSubmenu = filteredSubmenu.map(subItem => {
        if (subItem.translationKey) {
          const translatedSubTitle = t(subItem.translationKey)
          const translatedSubDescription = subItem.descriptionKey ? t(subItem.descriptionKey) : subItem.description
          return {
            ...subItem,
            title: translatedSubTitle !== subItem.translationKey ? translatedSubTitle : subItem.title,
            description: translatedSubDescription !== subItem.descriptionKey ? translatedSubDescription : subItem.description,
          }
        }
        return subItem
      })

              return {
          ...item,
          title: displayTitle,
          submenu: translatedSubmenu,
        }
    })
    .filter(Boolean)

  // Get the correct logo for the tenant - use logo (black) for portal navigation (light background)
  const logoSrc = (() => {
    if (tenantConfig.id === "empower-ai") {
      return "/images/empower-ai-portal-logo.png"
    }
    if (tenantConfig.id === "century21-beggins") {
      return "/images/beggins-university-black.png" // Black logo for light background
    }
    if (tenantConfig.id === "century21-canada") {
      return tenantConfig.branding.logo || "/images/century21-logo.png" // Use tenant config logo
    }
    if (tenantConfig.id === "default") {
      return "/images/nlu-logo-dark-new.png"
    }
    return tenantConfig.branding.logo || "/placeholder.svg"
  })()

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/portal" className="flex items-center">
            <Image
              src={logoSrc || "/placeholder.svg"}
              alt={tenantConfig.branding.name}
              width={140}
              height={50}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {filteredNavigationItems.map(
              (item) =>
                item && (
                  <div key={item.title} className="relative group">
                    <div className="flex items-center gap-1">
                      {item.title === "Gear Hub" && tenantConfig.id === "default" ? (
                        <a
                          href="https://nextlevelu.printful.me/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-green-600 font-medium transition-colors"
                        >
                          {item.title}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className="text-gray-700 hover:text-green-600 font-medium transition-colors"
                        >
                          {item.title}
                        </Link>
                      )}
                      {item.submenu && item.submenu.length > 0 && (
                        <ChevronDown className="h-4 w-4 text-gray-500 group-hover:text-green-600 transition-colors" />
                      )}
                    </div>

                    {/* Desktop Submenu */}
                    {item.submenu && item.submenu.length > 0 && (
                      <div
                        className={`absolute left-0 mt-2 w-80 bg-white shadow-lg rounded-md border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 ${
                          item.submenu.length > 8 ? "max-h-96 overflow-y-auto" : ""
                        }`}
                      >
                        <div className="py-2">
                          {item.submenu.map((subItem) =>
                            subItem.isHeader ? (
                              <div
                                key={subItem.title}
                                className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100"
                              >
                                {subItem.title.replace(/──/g, "").trim()}
                              </div>
                            ) : subItem.external ? (
                              <a
                                key={subItem.href}
                                href={subItem.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block px-4 py-3 text-sm hover:bg-gray-50 hover:text-green-600 border-b border-gray-50 last:border-b-0"
                              >
                                <div className="font-medium text-gray-900">{subItem.title}</div>
                                {subItem.description && (
                                  <div className="text-xs text-gray-500 mt-1">{subItem.description}</div>
                                )}
                              </a>
                            ) : (
                              <Link
                                key={subItem.href}
                                href={
                                  subItem.title === "IdeaHub AI" && tenantConfig.id === "century21-beggins"
                                    ? subItem.begginsHref || subItem.href
                                    : subItem.title === "IdeaHub AI" &&
                                        (tenantConfig.id === "empower-ai" || tenantConfig.id === "empower-beta")
                                      ? subItem.empowerHref || subItem.href
                                      : subItem.href
                                }
                                className="block px-4 py-3 text-sm hover:bg-gray-50 hover:text-green-600 border-b border-gray-50 last:border-b-0"
                              >
                                <div className="font-medium text-gray-900">{subItem.title}</div>
                                {subItem.description && (
                                  <div className="text-xs text-gray-500 mt-1">{subItem.description}</div>
                                )}
                              </Link>
                            ),
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ),
            )}

            {/* Get Support Link */}
            <div className="flex items-center gap-4">
              <Link href="/support" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
                {t('navigation.support')}
              </Link>
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <div className="space-y-2">
              {filteredNavigationItems.map(
                (item) =>
                  item && (
                    <div key={item.title} className="border-b border-gray-100 pb-2">
                      <div
                        className="flex items-center justify-between py-2"
                        onClick={item.submenu && item.submenu.length > 0 ? () => toggleSubmenu(item.title) : undefined}
                      >
                        {item.title === "Gear Hub" && tenantConfig.id === "default" ? (
                          <a
                            href="https://nextlevelu.printful.me/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-gray-700 hover:text-green-600 font-medium"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.title}
                          </a>
                        ) : (
                          <Link
                            href={item.href}
                            className="block text-gray-700 hover:text-green-600 font-medium"
                            onClick={(e) => {
                              if (item.submenu && item.submenu.length > 0) {
                                e.preventDefault()
                              } else {
                                setMobileMenuOpen(false)
                              }
                            }}
                          >
                            {item.title}
                          </Link>
                        )}
                        {item.submenu && item.submenu.length > 0 && (
                          <Button variant="ghost" size="sm" className="p-1">
                            {activeSubmenu === item.title ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        )}
                      </div>

                      {/* Mobile Submenu */}
                      {activeSubmenu === item.title && item.submenu && item.submenu.length > 0 && (
                        <div
                          className={`pl-4 space-y-1 mt-1 ${item.submenu.length > 8 ? "max-h-80 overflow-y-auto" : ""}`}
                        >
                          {item.submenu.map((subItem) =>
                            subItem.isHeader ? (
                              <div
                                key={subItem.title}
                                className="py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider"
                              >
                                {subItem.title.replace(/──/g, "").trim()}
                              </div>
                            ) : subItem.external ? (
                              <a
                                key={subItem.href}
                                href={subItem.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block py-2 text-sm hover:text-green-600"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                <div className="font-medium text-gray-700">{subItem.title}</div>
                                {subItem.description && (
                                  <div className="text-xs text-gray-500 mt-1">{subItem.description}</div>
                                )}
                              </a>
                            ) : (
                              <Link
                                key={subItem.href}
                                href={
                                  subItem.title === "IdeaHub AI" && tenantConfig.id === "century21-beggins"
                                    ? subItem.begginsHref || subItem.href
                                    : subItem.title === "IdeaHub AI" &&
                                        (tenantConfig.id === "empower-ai" || tenantConfig.id === "empower-beta")
                                      ? subItem.empowerHref || subItem.href
                                      : subItem.href
                                }
                                className="block py-2 text-sm hover:text-green-600"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                <div className="font-medium text-gray-700">{subItem.title}</div>
                                {subItem.description && (
                                  <div className="text-xs text-gray-500 mt-1">{subItem.description}</div>
                                )}
                              </Link>
                            ),
                          )}
                        </div>
                      )}
                    </div>
                  ),
              )}

              {/* Mobile Get Support Link */}
              <Link
                href="/support"
                className="flex items-center gap-2 py-2 text-gray-700 hover:text-green-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Support
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
