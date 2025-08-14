"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/contexts/translation-context"

const prospectingStrategies = [
  { title: "page.prospecting.strategy.fsbo.title", href: "/prospecting-hub/fsbo", description: "page.prospecting.strategy.fsbo.description" },
  {
    title: "page.prospecting.strategy.absenteeOwners.title",
    href: "/prospecting-hub/absentee-owners",
    description: "page.prospecting.strategy.absenteeOwners.description",
  },
  {
    title: "page.prospecting.strategy.expiredListings.title",
    href: "/prospecting-hub/expired-listings",
    description: "page.prospecting.strategy.expiredListings.description",
  },
  { title: "page.prospecting.strategy.probate.title", href: "/prospecting-hub/probate", description: "page.prospecting.strategy.probate.description" },
  { title: "page.prospecting.strategy.soi.title", href: "/prospecting-hub/soi", description: "page.prospecting.strategy.soi.description" },
  {
    title: "page.prospecting.strategy.preForeclosure.title",
    href: "/prospecting-hub/pre-foreclosure",
    description: "page.prospecting.strategy.preForeclosure.description",
  },
  {
    title: "page.prospecting.strategy.firstTimeBuyers.title",
    href: "/prospecting-hub/first-time-buyers",
    description: "page.prospecting.strategy.firstTimeBuyers.description",
  },
  { title: "page.prospecting.strategy.investors.title", href: "/prospecting-hub/investors", description: "page.prospecting.strategy.investors.description" },
  { title: "page.prospecting.strategy.divorce.title", href: "/prospecting-hub/divorce", description: "page.prospecting.strategy.divorce.description" },
]

export default function ProspectingHubPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-600 to-yellow-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Target className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-black mb-4">{t('page.prospecting.title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('page.prospecting.description')}
          </p>
        </div>

        {/* Prospecting Hub Overview Video */}
        <div className="mb-16">
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/dB9Y2fu_o6E?autoplay=0&rel=0&modestbranding=1"
                title="Prospecting Hub Overview"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* Strategies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {prospectingStrategies.map((strategy, index) => (
            <Link key={index} href={strategy.href} className="group">
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg group-hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-black group-hover:text-orange-600 transition-colors flex items-center justify-between">
                    {t(strategy.title)}
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
                  </CardTitle>
                  <CardDescription className="text-gray-600">{t(strategy.description)}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
