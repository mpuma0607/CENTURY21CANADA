"use client"

import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, ArrowRight, Monitor, BookOpen, Users, Target, Video, FileText, Settings } from "lucide-react"
import Link from "next/link"
import { useTenantConfig } from "@/contexts/tenant-context"
import { useTranslation } from "@/contexts/translation-context"

const trainingModules = [
  {
    title: "page.training.tool.moxiWorks.title",
    href: "/training-hub/moxi-works",
    description: "page.training.tool.moxiWorks.description",
    icon: Monitor,
    color: "bg-gradient-to-br from-blue-500 to-cyan-500",
  },
  {
    title: "page.training.tool.scriptMastery.title",
    href: "/training-hub/script-mastery",
    description: "page.training.tool.scriptMastery.description",
    icon: BookOpen,
    color: "bg-gradient-to-br from-purple-500 to-indigo-500",
  },
  {
    title: "page.training.tool.buyerProcess.title",
    href: "/training-hub/buyer-process",
    description: "page.training.tool.buyerProcess.description",
    icon: Target,
    color: "bg-gradient-to-br from-orange-500 to-yellow-500",
  },
  {
    title: "page.training.tool.listingProcess.title",
    href: "/training-hub/listing-process",
    description: "page.training.tool.listingProcess.description",
    icon: Target,
    color: "bg-gradient-to-br from-green-500 to-emerald-500",
  },
  {
    title: "page.training.tool.discVak.title",
    href: "/training-hub/disc-vak",
    description: "page.training.tool.discVak.description",
    icon: Users,
    color: "bg-gradient-to-br from-pink-500 to-red-500",
  },
]

const begginsTenantModules = [
  {
    title: "page.training.tool.dailyHuddles.title",
    href: "/training-hub/daily-morning-huddles",
    description: "page.training.tool.dailyHuddles.description",
    icon: Video,
    color: "bg-gradient-to-br from-yellow-500 to-orange-500",
    tenants: ["century21-beggins"],
  },
  {
    title: "page.training.tool.buyerBrokerAgreement.title",
    href: "/training-hub/buyer-broker-agreement-training",
    description: "page.training.tool.buyerBrokerAgreement.description",
    icon: FileText,
    color: "bg-gradient-to-br from-blue-600 to-indigo-600",
    tenants: ["century21-beggins"],
  },
  {
    title: "page.training.tool.dotloop.title",
    href: "/training-hub/dotloop-training",
    description: "page.training.tool.dotloop.description",
    icon: Settings,
    color: "bg-gradient-to-br from-indigo-600 to-purple-600",
    tenants: ["century21-beggins"],
  },
]

export default function TrainingHubPage() {
  const { t } = useTranslation()
  const tenantConfig = useTenantConfig()

  const filteredBegginsTenantModules = begginsTenantModules.filter(
    (module) => !module.tenants || module.tenants.includes(tenantConfig.id),
  )

  const allModules = [...filteredBegginsTenantModules, ...trainingModules]

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <GraduationCap className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-black mb-4">{t('page.training.title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('page.training.description')}
          </p>
        </div>

        {/* Training Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {allModules.map((module, index) => (
            <Link key={index} href={module.href} className="group">
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg group-hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="text-center">
                    <div
                      className={`w-16 h-16 ${module.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <module.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-black mb-3 group-hover:text-blue-600 transition-colors">
                      {t(module.title)}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{t(module.description)}</p>
                    <div className="flex items-center justify-center text-blue-600 font-medium">
                      <span>{t('page.training.startTraining')}</span>
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
