"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Settings, FileText, Video } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/contexts/translation-context"

export default function OnboardingHubPage() {
  const { t } = useTranslation()
  
  const onboardingResources = [
    {
      title: "page.onboarding.tool.agentProfile.title",
      description: "page.onboarding.tool.agentProfile.description",
      icon: User,
      href: "/onboarding-hub/agent-profile-setup",
      color: "bg-gradient-to-br from-blue-600 to-cyan-600",
    },
    {
      title: "page.onboarding.tool.moxiWorks.title",
      description: "page.onboarding.tool.moxiWorks.description",
      icon: Settings,
      href: "/onboarding-hub/moxi-works-setup",
      color: "bg-gradient-to-br from-green-600 to-teal-600",
    },
    {
      title: "page.onboarding.tool.dotloop.title",
      description: "page.onboarding.tool.dotloop.description",
      icon: FileText,
      href: "/onboarding-hub/dotloop-setup",
      color: "bg-gradient-to-br from-purple-600 to-pink-600",
    },
    {
      title: "page.onboarding.tool.zoom.title",
      description: "page.onboarding.tool.zoom.description",
      icon: Video,
      href: "/onboarding-hub/zoom-setup",
      color: "bg-gradient-to-br from-orange-600 to-red-600",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-black to-indigo-900 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">{t('page.onboarding.title')}</h1>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px bg-[#b6a888] w-16"></div>
            <p className="text-xl text-[#b6a888] font-medium tracking-wide">{t('page.onboarding.subtitle')}</p>
            <div className="h-px bg-[#b6a888] w-16"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('page.onboarding.description')}
          </p>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">{t('page.onboarding.journey.title')}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('page.onboarding.journey.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {onboardingResources.map((resource, index) => (
              <Card
                key={index}
                className="h-full bg-white hover:bg-gray-50 transition-all duration-300 border-0 shadow-lg hover:shadow-2xl group"
              >
                <CardContent className="p-8 h-full">
                  <div className="flex flex-col h-full text-center">
                    <div
                      className={`w-20 h-20 ${resource.color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <resource.icon className="h-10 w-10 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-black mb-3 group-hover:text-[#b6a888] transition-colors">
                      {t(resource.title)}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">{t(resource.description)}</p>

                    <Link href={resource.href} className="w-full mt-auto">
                      <Button className="w-full bg-[#b6a888] hover:bg-[#a39577] text-white">
                        {t('page.onboarding.access')} {t(resource.title)}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
