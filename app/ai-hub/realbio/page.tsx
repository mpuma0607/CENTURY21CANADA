"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, FileText, Heart, Target } from "lucide-react"
import RealBioForm from "@/components/realbio-form"
import { useTranslation } from "@/contexts/translation-context"

export default function RealBioPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <User className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-black mb-4">{t('page.realbio.title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {t('page.realbio.description')}
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <FileText className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <CardTitle className="text-black">{t('page.realbio.feature.professionalCopy.title')}</CardTitle>
              <CardDescription>{t('page.realbio.feature.professionalCopy.description')}</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <Heart className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <CardTitle className="text-black">{t('page.realbio.feature.emotionallyResonant.title')}</CardTitle>
              <CardDescription>{t('page.realbio.feature.emotionallyResonant.description')}</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <Target className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <CardTitle className="text-black">{t('page.realbio.feature.uniquePositioning.title')}</CardTitle>
              <CardDescription>{t('page.realbio.feature.uniquePositioning.description')}</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Tool Interface */}
        <Card className="max-w-4xl mx-auto border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-black text-center">{t('page.realbio.tool.title')}</CardTitle>
            <CardDescription className="text-center">
              {t('page.realbio.tool.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RealBioForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
