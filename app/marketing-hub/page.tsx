"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Megaphone, ArrowRight, TrendingUp, Building2, Waves } from "lucide-react"
import Link from "next/link"
import { useTenantConfig } from "@/contexts/tenant-context"
import { useTranslation } from "@/contexts/translation-context"

const marketingTools = [
  {
    title: "page.marketing.tool.hotTakes.title",
    href: "/marketing-hub/hot-takes",
    description: "page.marketing.tool.hotTakes.description",
    icon: TrendingUp,
    color: "bg-gradient-to-br from-blue-500 to-cyan-500",
  },
]

const empowerMarketingTools = [
  {
    title: "page.marketing.tool.dynamicBrandedContent.title",
    href: "/marketing-hub/dynamic-branded-content",
    description: "page.marketing.tool.dynamicBrandedContent.description",
    icon: Megaphone,
    color: "bg-gradient-to-br from-purple-500 to-indigo-500",
  },
  {
    title: "page.marketing.tool.hotTakes.title",
    href: "/marketing-hub/hot-takes",
    description: "page.marketing.tool.hotTakes.description",
    icon: TrendingUp,
    color: "bg-gradient-to-br from-blue-500 to-cyan-500",
  },
]

const century21CanadaMarketingTools = [
  {
    title: "page.marketing.tool.dynamicBrandedContent.title",
    href: "/marketing-hub/dynamic-branded-content",
    description: "page.marketing.tool.dynamicBrandedContent.description",
    icon: Megaphone,
    color: "bg-gradient-to-br from-purple-500 to-indigo-500",
  },
  {
    title: "page.marketing.tool.hotTakes.title",
    href: "/marketing-hub/hot-takes",
    description: "page.marketing.tool.hotTakes.description",
    icon: TrendingUp,
    color: "bg-gradient-to-br from-blue-500 to-cyan-500",
  },
]

const begginsMarketingTools = [
  {
    title: "page.marketing.tool.dynamicBrandedContent.title",
    href: "/marketing-hub/dynamic-branded-content",
    description: "page.marketing.tool.dynamicBrandedContent.description",
    icon: Megaphone,
    color: "bg-gradient-to-br from-purple-500 to-indigo-500",
  },
  {
    title: "page.marketing.tool.hotTakes.title",
    href: "/marketing-hub/hot-takes",
    description: "page.marketing.tool.hotTakes.description",
    icon: TrendingUp,
    color: "bg-gradient-to-br from-blue-500 to-cyan-500",
  },
  {
    title: "page.marketing.tool.brokerageLogos.title",
    href: "/marketing-hub/brokerage-logos",
    description: "page.marketing.tool.brokerageLogos.description",
    icon: Building2,
    color: "bg-gradient-to-br from-black to-gray-700",
  },
  {
    title: "page.marketing.tool.beachProjectToolkits.title",
    href: "/marketing-hub/beach-project-toolkits",
    description: "page.marketing.tool.beachProjectToolkits.description",
    icon: Waves,
    color: "bg-gradient-to-br from-blue-600 to-cyan-600",
  },
]

export default function MarketingHubPage() {
  const { t } = useTranslation()
  const tenantConfig = useTenantConfig()
  const toolsToShow =
    tenantConfig?.id === "century21-beggins"
      ? begginsMarketingTools
      : tenantConfig?.id === "empower-ai" || tenantConfig?.id === "empower-beta"
        ? empowerMarketingTools
        : tenantConfig?.id === "century21-canada"
          ? century21CanadaMarketingTools
          : marketingTools

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-600 to-red-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Megaphone className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-black mb-4">{t('page.marketing.title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('page.marketing.description')}
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {toolsToShow.map((tool, index) => (
            <Link key={index} href={tool.href} className="group">
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg group-hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="text-center">
                    <div
                      className={`w-16 h-16 ${tool.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <tool.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-black mb-3 group-hover:text-pink-600 transition-colors">
                      {t(tool.title)}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{t(tool.description)}</p>
                    <div className="flex items-center justify-center text-pink-600 font-medium">
                      <span>{t('page.marketing.exploreTool')}</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
