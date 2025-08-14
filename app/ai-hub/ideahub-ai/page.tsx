"use client"

import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Sparkles, ImageIcon, MessageSquare, Zap, Target } from "lucide-react"
import IdeaHubEmpowerForm from "../ideahub-empower/idea-hub-empower-form"
import { useTranslation } from "@/contexts/translation-context"

export default function IdeaHubAIPage() {
  const { t } = useTranslation()

  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl">
            <Lightbulb className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            {t('page.ideahub.title')}
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {t('page.ideahub.description')}
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <Card className="border-yellow-200 hover:border-yellow-400 transition-colors">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-2">
              <Sparkles className="h-6 w-6 text-yellow-600" />
            </div>
            <CardTitle className="text-lg">{t('page.ideahub.feature.creative.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              {t('page.ideahub.feature.creative.description')}
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="border-blue-200 hover:border-blue-400 transition-colors">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
              <ImageIcon className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-lg">{t('page.ideahub.feature.branding.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              {t('page.ideahub.feature.branding.description')}
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="border-green-200 hover:border-green-400 transition-colors">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-2">
              <Target className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-lg">{t('page.ideahub.feature.formats.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-center">
              {t('page.ideahub.feature.formats.description')}
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      {/* Main Form */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center border-b">
          <CardTitle className="flex items-center justify-center gap-2">
            <MessageSquare className="h-5 w-5" />
            {t('page.ideahub.tool.title')}
          </CardTitle>
          <CardDescription>
            {t('page.ideahub.tool.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
              </div>
            }
          >
            <IdeaHubEmpowerForm />
          </Suspense>
        </CardContent>
      </Card>

      {/* Benefits Section */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-8">{t('page.ideahub.benefits.title')}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Zap className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">{t('page.ideahub.benefits.saveTime.title')}</h3>
            <p className="text-sm text-muted-foreground">{t('page.ideahub.benefits.saveTime.description')}</p>
          </div>
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Target className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">{t('page.ideahub.benefits.consistency.title')}</h3>
            <p className="text-sm text-muted-foreground">{t('page.ideahub.benefits.consistency.description')}</p>
          </div>
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">{t('page.ideahub.benefits.engagement.title')}</h3>
            <p className="text-sm text-muted-foreground">{t('page.ideahub.benefits.engagement.description')}</p>
          </div>
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <ImageIcon className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="font-semibold mb-2">{t('page.ideahub.benefits.design.title')}</h3>
            <p className="text-sm text-muted-foreground">{t('page.ideahub.benefits.design.description')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
