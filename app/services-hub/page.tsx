"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Wrench, ArrowRight, Palette, Building } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/contexts/translation-context"

const serviceOptions = [
  {
    title: "page.services.tool.moxiDesign.title",
    href: "/services-hub/moxi-design",
    description: "page.services.tool.moxiDesign.description",
    icon: Palette,
    color: "bg-gradient-to-br from-green-500 to-teal-500",
  },
  {
    title: "page.services.tool.brokerageConsulting.title",
    href: "/services-hub/brokerage-consulting",
    description: "page.services.tool.brokerageConsulting.description",
    icon: Building,
    color: "bg-gradient-to-br from-blue-500 to-cyan-500",
  },
]

export default function ServicesHubPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Wrench className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-black mb-4">{t('page.services.title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('page.services.description')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {serviceOptions.map((service, index) => (
            <Link key={index} href={service.href} className="group">
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg group-hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="text-center">
                    <div
                      className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-black mb-3 group-hover:text-green-600 transition-colors">
                      {t(service.title)}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{t(service.description)}</p>
                    <div className="flex items-center justify-center text-green-600 font-medium">
                      <span>{t('page.services.learnMore')}</span>
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
