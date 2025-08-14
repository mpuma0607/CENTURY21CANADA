"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useTenant } from "@/contexts/tenant-context"
import { useTranslation } from "@/contexts/translation-context"
import {
  FileText,
  Lightbulb,
  User,
  Home,
  MessageSquare,
  Mic,
  Target,
  GraduationCap,
  TrendingUp,
  Calculator,
  Search,
} from "lucide-react"

const aiTools = {
  "page.aiHub.category.marketingProspecting": [
    {
      title: "IdeaHub AI",
      href: (config: any) => (config.id === "century21-beggins" ? "/ai-hub/ideahub-beggins" : "/ai-hub/ideahub-ai"),
      description: "Social Media Content Generation",
      icon: Lightbulb,
      color: "yellow",
      toolId: "ideahub-ai",
      keywords: [
        "social media",
        "content",
        "posts",
        "marketing",
        "ideas",
        "creative",
        "engagement",
        "write",
        "create",
        "generate",
        "facebook",
        "instagram",
        "linkedin",
        "twitter",
        "social content",
        "social posts",
        "content creation",
        "marketing content",
        "write posts",
        "create content",
        "generate ideas",
        "social media posts",
        "content ideas",
        "marketing ideas",
        "creative content",
        "social strategy",
      ],
    },
    {
      title: "IdeaHub V2",
      href: "/ai-hub/ideahub-v2",
      description: "Advanced Social Media Content Generation",
      icon: Lightbulb,
      color: "yellow",
      toolId: "ideahub-v2",
      keywords: [
        "social media",
        "content",
        "posts",
        "marketing",
        "ideas",
        "creative",
        "engagement",
        "write",
        "create",
        "generate",
        "facebook",
        "instagram",
        "linkedin",
        "twitter",
        "social content",
        "social posts",
        "content creation",
        "marketing content",
        "write posts",
        "create content",
        "generate ideas",
        "social media posts",
        "content ideas",
        "marketing ideas",
        "creative content",
        "social strategy",
        "advanced",
        "v2",
        "branding",
        "custom image",
        "personalized",
      ],
    },
    {
      title: "IdeaHub Empower",
      href: "/ai-hub/ideahub-empower",
      description: "Multi-Brand Social Media Content Generation",
      icon: Lightbulb,
      color: "yellow",
      toolId: "ideahub-empower",
      keywords: [
        "social media",
        "content",
        "posts",
        "marketing",
        "ideas",
        "creative",
        "engagement",
        "write",
        "create",
        "generate",
        "facebook",
        "instagram",
        "linkedin",
        "twitter",
        "social content",
        "social posts",
        "content creation",
        "marketing content",
        "write posts",
        "create content",
        "generate ideas",
        "social media posts",
        "content ideas",
        "marketing ideas",
        "creative content",
        "social strategy",
        "multi-brand",
        "empower",
        "brand selection",
        "multiple brands",
        "brand options",
      ],
    },
    {
      title: "RealBio",
      href: "/ai-hub/realbio",
      description: "Professional Agent Bio Creation",
      icon: User,
      color: "green",
      toolId: "realbio",
      keywords: [
        "bio",
        "biography",
        "profile",
        "about me",
        "agent bio",
        "professional",
        "introduction",
        "write",
        "create",
        "generate",
        "personal",
        "agent profile",
        "about section",
        "write bio",
        "create bio",
        "generate bio",
        "write about me",
        "create profile",
        "generate profile",
        "professional bio",
        "agent introduction",
        "personal bio",
        "write profile",
        "create about me",
        "generate profile",
        "bio writing",
        "profile writing",
      ],
    },
    {
      title: "ListIT",
      href: "/ai-hub/listit-ai",
      description: "Property Listing Descriptions",
      icon: Home,
      color: "purple",
      toolId: "listit-ai",
      keywords: [
        "listing",
        "description",
        "property",
        "home",
        "sell",
        "marketing copy",
        "features",
        "write",
        "create",
        "generate",
        "listing description",
        "property description",
        "write listing",
        "create listing",
        "generate listing",
        "listing copy",
        "property copy",
        "home description",
        "listing text",
        "property text",
        "write description",
        "create description",
        "generate description",
        "listing content",
        "property content",
        "home listing",
        "property listing",
      ],
    },
    {
      title: "ScriptIT",
      href: "/ai-hub/scriptit-ai",
      description: "Custom Real Estate Scripts",
      icon: MessageSquare,
      color: "red",
      toolId: "scriptit",
      keywords: [
        "script",
        "calling",
        "phone",
        "conversation",
        "prospecting",
        "objections",
        "dialogue",
        "write",
        "create",
        "generate",
        "phone script",
        "call script",
        "talking points",
        "write script",
        "create script",
        "generate script",
        "phone calls",
        "cold calling",
        "prospecting script",
        "objection handling",
        "conversation script",
        "call dialogue",
        "phone dialogue",
        "script writing",
        "call preparation",
        "talking script",
      ],
    },
    {
      title: "QuickCMA AI",
      href: "/ai-hub/quickcma-ai",
      description: "Comparative Market Analysis Tool",
      icon: Calculator,
      color: "slate",
      toolId: "quickcma-ai",
      keywords: [
        "cma",
        "market analysis",
        "comparable",
        "pricing",
        "valuation",
        "property value",
        "comps",
        "create",
        "generate",
        "analyze",
        "market report",
        "property analysis",
        "home value",
        "create cma",
        "generate cma",
        "market comparison",
        "property comparison",
        "comparable sales",
        "market data",
        "pricing analysis",
        "value analysis",
        "home analysis",
        "property report",
        "market study",
        "valuation report",
      ],
    },
    {
      title: "MyMarket AI",
      href: "/ai-hub/mymarket-ai",
      description: "Housing & Rental Market Analysis",
      icon: TrendingUp,
      color: "emerald",
      toolId: "mymarket-ai",
      keywords: [
        "market analysis",
        "housing market",
        "rental market",
        "market trends",
        "market data",
        "housing trends",
        "rental trends",
        "market research",
        "housing analysis",
        "rental analysis",
        "market insights",
        "housing insights",
        "rental insights",
        "market report",
        "housing report",
        "rental report",
        "market statistics",
        "housing statistics",
        "rental statistics",
        "market overview",
        "housing overview",
        "rental overview",
        "market conditions",
        "housing conditions",
        "rental conditions",
        "market analysis tool",
        "housing market tool",
        "rental market tool",
      ],
    },
    {
      title: "RolePlay AI",
      href: "/ai-hub/roleplay-ai",
      description: "Voice Conversation Practice",
      icon: Mic,
      color: "indigo",
      toolId: "roleplay-ai",
      keywords: [
        "practice",
        "roleplay",
        "voice",
        "conversation",
        "training",
        "rehearse",
        "mock calls",
        "role play",
        "practice calls",
        "conversation practice",
        "voice practice",
        "mock conversations",
        "training calls",
        "practice scripts",
        "rehearse calls",
        "conversation training",
        "call practice",
        "voice training",
        "speaking practice",
        "dialogue practice",
        "communication practice",
        "phone practice",
      ],
    },
    {
      title: "PropBot AI",
      href: "/ai-hub/propbot-ai",
      description: "Intelligent Property Search & Analysis",
      icon: Search,
      color: "cyan",
      toolId: "propbot-ai",
      keywords: [
        "property search",
        "find homes",
        "listings",
        "search properties",
        "home finder",
        "real estate search",
        "find",
        "search",
        "locate",
        "discover",
        "property finder",
        "home search",
        "find properties",
        "search homes",
        "locate homes",
        "discover properties",
        "property lookup",
        "home lookup",
        "real estate finder",
        "listing search",
        "property database",
        "home database",
        "search listings",
        "find listings",
      ],
    },
    {
      title: "Who's Who AI",
      href: "/ai-hub/whos-who-ai",
      description: "Property Owner Skip Tracing",
      icon: User,
      color: "violet",
      toolId: "whos-who-ai",
      keywords: [
        "owner info",
        "skip trace",
        "property owner",
        "contact info",
        "find owner",
        "owner details",
        "find",
        "locate",
        "discover",
        "owner information",
        "property information",
        "find owner info",
        "locate owner",
        "discover owner",
        "owner lookup",
        "property owner info",
        "contact information",
        "owner contact",
        "skip tracing",
        "owner research",
        "property research",
        "find contact",
        "locate contact",
      ],
    },
    {
      title: "GoalScreen AI",
      href: "/ai-hub/goalscreen-ai",
      description: "Custom Goal Wallpaper Generator",
      icon: Target,
      color: "pink",
      toolId: "goalscreen",
      keywords: [
        "goals",
        "wallpaper",
        "motivation",
        "targets",
        "daily goals",
        "visual goals",
        "screensaver",
        "create",
        "generate",
        "design",
        "goal wallpaper",
        "motivational wallpaper",
        "create wallpaper",
        "generate wallpaper",
        "design wallpaper",
        "goal screen",
        "motivational screen",
        "daily targets",
        "goal tracker",
        "visual motivation",
        "goal reminder",
        "target wallpaper",
        "achievement wallpaper",
        "success wallpaper",
      ],
    },
  ],
  "page.aiHub.category.planningCoaching": [
    {
      title: "Action AI",
      href: "/ai-hub/action-ai",
      description: "Daily Prospecting Action Plans",
      icon: Target,
      color: "orange",
      toolId: "action-ai",
      keywords: [
        "action plan",
        "daily plan",
        "prospecting plan",
        "tasks",
        "activities",
        "daily actions",
        "plan",
        "create",
        "generate",
        "build",
        "make",
        "daily planning",
        "action planning",
        "create plan",
        "generate plan",
        "build plan",
        "make plan",
        "daily tasks",
        "prospecting activities",
        "daily activities",
        "action items",
        "to-do list",
        "daily schedule",
        "work plan",
        "business plan",
        "activity plan",
        "task plan",
      ],
    },
    {
      title: "RealCoach AI",
      href: "/ai-hub/realcoach-ai",
      description: "Personalized Business Coaching",
      icon: GraduationCap,
      color: "teal",
      toolId: "realcoach-ai",
      keywords: [
        "coaching",
        "business coach",
        "advice",
        "guidance",
        "mentor",
        "business help",
        "strategy",
        "get",
        "receive",
        "need",
        "want",
        "business coaching",
        "professional coaching",
        "get advice",
        "receive coaching",
        "need help",
        "want guidance",
        "business guidance",
        "professional advice",
        "business mentor",
        "coaching session",
        "business support",
        "strategic advice",
        "business strategy",
        "professional help",
        "expert advice",
      ],
    },
    {
      title: "BizPlan AI",
      href: "/ai-hub/bizplan-ai",
      description: "90-Day Business Plan Generator",
      icon: TrendingUp,
      color: "emerald",
      toolId: "bizplan-ai",
      keywords: [
        "business plan",
        "90 day plan",
        "planning",
        "strategy",
        "goals",
        "business strategy",
        "plan",
        "create",
        "generate",
        "build",
        "make",
        "develop",
        "business planning",
        "create business plan",
        "generate business plan",
        "build business plan",
        "make business plan",
        "90-day plan",
        "quarterly plan",
        "business goals",
        "strategic plan",
        "growth plan",
        "business development",
        "planning strategy",
        "business roadmap",
        "success plan",
      ],
    },
  ],
  "page.aiHub.category.analysisContract": [
    {
      title: "RealDeal AI",
      href: "/ai-hub/realdeal-ai",
      description: "Contract Analysis & Summarization",
      icon: FileText,
      color: "blue",
      toolId: "realdeal-ai",
      keywords: [
        "contract",
        "analysis",
        "legal",
        "document",
        "review",
        "contract review",
        "summarize",
        "analyze",
        "review",
        "examine",
        "check",
        "study",
        "contract analysis",
        "analyze contract",
        "review contract",
        "examine contract",
        "check contract",
        "contract summary",
        "document analysis",
        "legal analysis",
        "contract help",
        "contract assistance",
        "contract support",
        "legal document",
        "contract document",
        "document review",
        "legal review",
      ],
    },
  ],
}

export default function AIHubPage() {
  const { t } = useTranslation()
  const tenant = useTenant()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return aiTools

    const query = searchQuery.toLowerCase()
    const filtered: typeof aiTools = {}

    Object.entries(aiTools).forEach(([category, tools]) => {
      const matchingTools = tools.filter((tool) =>
        tool.keywords.some((keyword) => keyword.toLowerCase().includes(query)) ||
        tool.title.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query)
      )

      if (matchingTools.length > 0) {
        filtered[category] = matchingTools
      }
    })

    return filtered
  }, [searchQuery])

  const renderToolCard = (tool: any, index: number) => {
    const toolHref = typeof tool.href === "function" ? tool.href(tenant) : tool.href
    const buttonColor = `bg-${tool.color}-500 hover:bg-${tool.color}-600`

    return (
      <Card key={index} className="h-full hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 bg-${tool.color}-100 rounded-lg flex items-center justify-center flex-shrink-0`}>
              <tool.icon className={`h-6 w-6 text-${tool.color}-600`} />
            </div>
            <div>
              <CardTitle className="text-xl">{tool.title}</CardTitle>
              <CardDescription>{tool.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground">
            {tool.title === "RealDeal AI" && t('page.aiHub.tool.realdeal.description')}
            {tool.title === "IdeaHub AI" && t('page.aiHub.tool.ideahub.description')}
            {tool.title === "IdeaHub V2" && t('page.aiHub.tool.ideahubV2.description')}
            {tool.title === "IdeaHub Empower" && t('page.aiHub.tool.ideahubEmpower.description')}
            {tool.title === "RealBio" && t('page.aiHub.tool.realbio.description')}
            {tool.title === "ListIT" && t('page.aiHub.tool.listit.description')}
            {tool.title === "ScriptIT" && t('page.aiHub.tool.scriptit.description')}
            {tool.title === "RolePlay AI" && t('page.aiHub.tool.roleplay.description')}
            {tool.title === "Action AI" && t('page.aiHub.tool.action.description')}
            {tool.title === "RealCoach AI" && t('page.aiHub.tool.realcoach.description')}
            {tool.title === "BizPlan AI" && t('page.aiHub.tool.bizplan.description')}
            {tool.title === "QuickCMA AI" && t('page.aiHub.tool.quickcma.description')}
            {tool.title === "MyMarket AI" && t('page.aiHub.tool.mymarket.description')}
            {tool.title === "Who's Who AI" && t('page.aiHub.tool.whoswho.description')}
            {tool.title === "PropBot AI" && t('page.aiHub.tool.propbot.description')}
            {tool.title === "GoalScreen AI" && t('page.aiHub.tool.goalscreen.description')}
          </p>
        </CardContent>
        <CardFooter>
          <Link href={toolHref} className="w-full">
            <Button className={`w-full ${buttonColor}`}>{t('page.aiHub.button.openTool')}</Button>
          </Link>
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">{t('page.aiHub.title')}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          {t('page.aiHub.description')}
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder={t('page.aiHub.search.placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-green-500 rounded-lg"
            />
          </div>
          {searchQuery && <p className="text-sm text-gray-600 mt-2">{t('page.aiHub.search.showing')} "{searchQuery}"</p>}
        </div>
      </div>

      {/* Tool Categories */}
      {Object.entries(filteredTools).map(([category, tools]) => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b-2 border-green-500 pb-2">{t(category)}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{tools.map(renderToolCard)}</div>
        </div>
      ))}

      {Object.keys(filteredTools).length === 0 && searchQuery && (
        <div className="text-center py-12">
          <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">{t('page.aiHub.search.noResults.title')}</h3>
          <p className="text-gray-500 mb-4">{t('page.aiHub.search.noResults.description')}</p>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            <span className="bg-gray-100 px-3 py-1 rounded-full">"{t('page.aiHub.search.suggestions.write')}"</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">"{t('page.aiHub.search.suggestions.create')}"</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">"{t('page.aiHub.search.suggestions.find')}"</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">"{t('page.aiHub.search.suggestions.analyze')}"</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">"{t('page.aiHub.search.suggestions.plan')}"</span>
            <span className="bg-gray-100 px-3 py-1 rounded-full">"{t('page.aiHub.search.suggestions.generate')}"</span>
          </div>
        </div>
      )}
    </div>
  )
}
