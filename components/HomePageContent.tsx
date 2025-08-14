"use client"

import { useEffect } from "react"
import { useTenantConfig } from "@/contexts/tenant-context"
import { useTracking } from "@/hooks/use-tracking"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { Brain, Users, TrendingUp, FileText, Zap, Target, Star, CheckCircle, ArrowRight, Play, X, Building2 } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import TenantSwitcher from "@/components/tenant-switcher"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTranslation } from "@/contexts/translation-context"

export default function HomePageContent() {
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [selectedDemo, setSelectedDemo] = useState<string | null>(null)
  const [showContactModal, setShowContactModal] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    agentCount: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const tenantConfig = useTenantConfig()
  const router = useRouter()
  const { trackEvent } = useTracking()
  const { t } = useTranslation()

  // Redirect to custom home page if tenant has one
  useEffect(() => {
    if (tenantConfig.features.customHomePage) {
      router.push(tenantConfig.features.customHomePage)
    }
  }, [tenantConfig, router])

  // If tenant has custom home page, don't render this component
  if (tenantConfig.features.customHomePage) {
    return null
  }

  const handleLogin = () => {
    trackEvent("button_click", { button: "sign_in", location: "header" })
    console.log("Sign In clicked - redirecting to Century 21 Canada portal")
    
    // Always redirect to Century 21 Canada portal
    const portalUrl = "https://empowerc21canada.com/portal"
    
    console.log("Redirecting to portal:", portalUrl)
    window.location.href = portalUrl
  }

  const handleSignup = () => {
    trackEvent("button_click", { button: "get_started", location: "header" })
    console.log("Signup clicked - redirecting to Century 21 Canada plans page")
    
    // Always redirect to Century 21 Canada plans page
    const plansUrl = "https://empowerc21canada.com?msopen=/member/plans/aovbmu4gxb"
    
    console.log("Redirecting to plans:", plansUrl)
    window.location.href = plansUrl
  }

  const handlePricing = () => {
    trackEvent("button_click", { button: "pricing", location: "pricing_section" })
    console.log("Pricing clicked - redirecting to Century 21 Canada plans page")
    
    // Always redirect to Century 21 Canada plans page
    const plansUrl = "https://empowerc21canada.com?msopen=/member/plans/aovbmu4gxb"
    
    console.log("Redirecting to plans:", plansUrl)
    window.location.href = plansUrl
  }

  const handleAnnualPricing = () => {
    trackEvent("button_click", { button: "annual_pricing", location: "pricing_section" })
    console.log("Annual pricing clicked - redirecting to Century 21 Canada annual plan")
    
    // Always redirect to Century 21 Canada annual plans page
    const annualPlansUrl = "https://empowerc21canada.com?msopen=/member/plans/dkophgnbcp"
    
    console.log("Redirecting to annual plans:", annualPlansUrl)
    window.location.href = annualPlansUrl
  }

  const handleBrokerageContact = () => {
    trackEvent("button_click", { button: "brokerage_contact", location: "pricing_section" })
    setShowContactModal(true)
  }

  const handleContactFormChange = (field: string, value: string) => {
    setContactForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleContactFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/brokerage-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactForm),
      })

      const result = await response.json()

      if (result.success) {
        alert('Thank you! Your inquiry has been sent. We\'ll contact you soon.')
        setShowContactModal(false)
        setContactForm({
          name: '',
          email: '',
          phone: '',
          agentCount: '',
          message: ''
        })
      } else {
        alert('There was an error sending your inquiry. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error sending your inquiry. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleWatchDemo = (toolName: string) => {
    trackEvent("video_demo_opened", { tool: toolName })
    setSelectedDemo(toolName)
    setShowVideoModal(true)
  }

  const handleMainDemo = () => {
    trackEvent("video_demo_opened", { tool: "platform_overview" })
    setShowVideoModal(true)
  }

  // Add this function to get the YouTube embed URL for each tool
  const getVideoUrl = (toolName: string) => {
    const videoMap: { [key: string]: string } = {
      "Who's Who AI": "https://www.youtube.com/embed/nw-EiAXFxAw?autoplay=0&rel=0&modestbranding=1",
      "ScriptIT AI": "https://www.youtube.com/embed/GDqP7eQAsPk?autoplay=0&rel=0&modestbranding=1",
      "IdeaHub AI": "https://www.youtube.com/embed/silQHa755P8?autoplay=0&rel=0&modestbranding=1",
      "RolePlay AI": "https://www.youtube.com/embed/UHMl9DWcB-U?autoplay=0&rel=0&modestbranding=1",
      "RealDeal AI": "https://www.youtube.com/embed/QKsQz_EfBpc?autoplay=0&rel=0&modestbranding=1",
      "RealCoach AI": "https://www.youtube.com/embed/Kc51M_x5g1M?autoplay=0&rel=0&modestbranding=1",
      "RealBio AI": "https://www.youtube.com/embed/Fodk2XZ7vPs?autoplay=0&rel=0&modestbranding=1",
      "QuickCMA AI": "https://www.youtube.com/embed/R0aHu3p8hgs?autoplay=0&rel=0&modestbranding=1",
      "PropBot AI": "https://www.youtube.com/embed/jn1zDrKUpDk?autoplay=0&rel=0&modestbranding=1",
      "ListIT AI": "https://www.youtube.com/embed/vexraBWRtpk?autoplay=0&rel=0&modestbranding=1",
      "GoalScreen AI": "https://www.youtube.com/embed/cLSgyoFffUs?autoplay=0&rel=0&modestbranding=1",
      "BizPlan AI": "https://www.youtube.com/embed/xL5lKqLB7KM?autoplay=0&rel=0&modestbranding=1",
      "Action AI": "https://www.youtube.com/embed/Uv57em2H8Jc?autoplay=0&rel=0&modestbranding=1",
      "MyMarket AI": "https://www.youtube.com/embed/OOZSFrk3jJo?autoplay=0&rel=0&modestbranding=1",
      "DynamicBrand AI": "https://www.youtube.com/embed/lOcBX_AgBAQ?autoplay=0&rel=0&modestbranding=1",
    }

    return videoMap[toolName] || "https://www.youtube.com/embed/qF050toaVYU?autoplay=0&rel=0&modestbranding=1"
  }

  // Function to scroll to pricing section
  const scrollToPricing = () => {
    console.log("Scrolling to pricing section...")
    const pricingSection = document.getElementById('pricing')
    if (pricingSection) {
      console.log("Found pricing section, scrolling...")
      // Add a small offset to account for any fixed headers
      const offset = 80 // Adjust this value based on your header height
      const elementPosition = pricingSection.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    } else {
      console.log("Pricing section not found!")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-yellow-900">
      <TenantSwitcher />

      {/* Consumer Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src={tenantConfig.branding.logo || "/images/empower-ai-logo.png"}
              alt={tenantConfig.branding.name}
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
                     <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-[#b6a888] transition-colors">
              {t('navigation.features')}
            </a>
            <a href="#about" className="text-gray-300 hover:text-[#b6a888] transition-colors">
              {t('navigation.about')}
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-[#b6a888] transition-colors">
              {t('navigation.pricing')}
            </a>
            <a href="#testimonials" className="text-gray-300 hover:text-[#b6a888] transition-colors">
              {t('navigation.testimonials')}
            </a>
           <div className="flex items-center space-x-4">
             <LanguageSwitcher />
             <button
               onClick={handleLogin}
               type="button"
               className="text-gray-300 hover:text-[#b6a888] transition-colors font-medium cursor-pointer"
             >
               {t('button.signIn')}
             </button>
             <Button onClick={scrollToPricing} className="bg-[#b6a888] hover:bg-[#a39577] text-black font-semibold">
               {t('button.getStarted')}
             </Button>
           </div>
         </nav>

         {/* Mobile menu */}
         <div className="md:hidden flex items-center space-x-2">
           <LanguageSwitcher />
           <button
             onClick={handleLogin}
             type="button"
             className="text-gray-300 hover:text-[#b6a888] transition-colors font-medium text-sm cursor-pointer"
           >
             {t('button.signIn')}
           </button>
           <Button onClick={scrollToPricing} className="bg-[#b6a888] hover:bg-[#a39577] text-black font-semibold">
             {t('button.getStarted')}
           </Button>
         </div>
       </div>
     </header>

     {/* Hero Section */}
     <section className="py-20 px-4">
       <div className="container mx-auto text-center">
         <Badge className="mb-6 bg-[#b6a888]/20 text-[#b6a888] border-[#b6a888]/30">
           🚀 {t('hero.badge')}
         </Badge>
         <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
           {tenantConfig.branding.name}
           <span className="block text-[#b6a888]">{t('hero.subtitle')}</span>
         </h1>
         <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
           {t('hero.description')}
         </p>
         <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <Button
             size="lg"
             onClick={scrollToPricing}
             className="bg-[#b6a888] hover:bg-[#a39577] text-black font-semibold text-lg px-8 py-4"
           >
             {t('hero.startJourney')}
             <ArrowRight className="ml-2 h-5 w-5" />
           </Button>
           <Button
             size="lg"
             variant="outline"
             onClick={handleMainDemo}
             className="border-[#b6a888] text-[#b6a888] hover:bg-[#b6a888] hover:text-black text-lg px-8 py-4 bg-transparent"
           >
             <Play className="mr-2 h-5 w-5" />
             {t('hero.watchDemo')}
           </Button>
         </div>
       </div>
     </section>

     {/* Features Section */}
     <section id="features" className="py-20 px-4 bg-black/30">
       <div className="container mx-auto">
         <div className="text-center mb-16">
           <h2 className="text-4xl font-bold text-white mb-4">{t('hero.everythingYouNeed')}</h2>
           <p className="text-xl text-gray-300 max-w-2xl mx-auto">
             {t('hero.platformDescription')}
           </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {/* AI Hub */}
           <Card className="bg-gray-900/50 border-gray-700 hover:border-[#b6a888]/50 transition-all duration-300">
             <CardHeader>
               <Brain className="h-12 w-12 text-[#b6a888] mb-4" />
               <CardTitle className="text-white">AI Hub</CardTitle>
               <CardDescription className="text-gray-300">
                 AI tools including ListIt, ScriptIt, RealBio, ActionAI, and more
               </CardDescription>
             </CardHeader>
             <CardContent>
               <p className="text-sm text-gray-300 mb-4">For a demo of each tool, click it below:</p>
               <div className="grid grid-cols-2 gap-2 text-xs">
                 <div className="space-y-1">
                   <button
                     onClick={() => handleWatchDemo("IdeaHub AI")}
                     className="text-[#b6a888] hover:text-[#a39577] text-left block"
                   >
                     IdeaHub AI Demo
                   </button>
                   <button
                     onClick={() => handleWatchDemo("ListIT AI")}
                     className="text-[#b6a888] hover:text-[#a39577] text-left block"
                   >
                     ListIT AI Demo
                   </button>
                   <button
                     onClick={() => handleWatchDemo("ScriptIT AI")}
                     className="text-[#b6a888] hover:text-[#a39577] text-left block"
                   >
                     ScriptIT AI Demo
                   </button>
                   <button
                     onClick={() => handleWatchDemo("RealBio AI")}
                     className="text-[#b6a888] hover:text-[#a39577] text-left block"
                   >
                     RealBio AI Demo
                   </button>
                   <button
                     onClick={() => handleWatchDemo("RolePlay AI")}
                     className="text-[#b6a888] hover:text-[#a39577] text-left block"
                   >
                     RolePlay AI Demo
                   </button>
                   <button
                     onClick={() => handleWatchDemo("Action AI")}
                     className="text-[#b6a888] hover:text-[#a39577] text-left block"
                   >
                     Action AI Demo
                   </button>
                   <button
                     onClick={() => handleWatchDemo("BizPlan AI")}
                     className="text-[#b6a888] hover:text-[#a39577] text-left block"
                   >
                     BizPlan AI Demo
                   </button>
                 </div>
                 <div className="space-y-1">
                   <button
                     onClick={() => handleWatchDemo("RealCoach AI")}
                     className="text-[#b6a888] hover:text-[#a39577] text-left block"
                   >
                     RealCoach AI Demo
                   </button>
                   <button
                     onClick={() => handleWatchDemo("RealDeal AI")}
                     className="text-[#b6a888] hover:text-[#a39577] text-left block"
                   >
                     RealDeal AI Demo
                   </button>
                   <button
                     onClick={() => handleWatchDemo("QuickCMA AI")}
                     className="text-[#b6a888] hover:text-[#a39577] text-left block"
                   >
                     QuickCMA AI Demo
                   </button>
                   <button
                     onClick={() => handleWatchDemo("Who's Who AI")}
                     className="text-[#b6a888] hover:text-[#a39577] text-left block"
                   >
                     Who's Who AI Demo
                   </button>
                   <button
                     onClick={() => handleWatchDemo("PropBot AI")}
                     className="text-[#b6a888] hover:text-[#a39577] text-left block"
                   >
                     PropBot AI Demo
                   </button>
                   <button
                     onClick={() => handleWatchDemo("GoalScreen AI")}
                     className="text-[#b6a888] hover:text-[#a39577] text-left block"
                   >
                     GoalScreen AI Demo
                   </button>
                   <button
                     onClick={() => handleWatchDemo("MyMarket AI")}
                     className="text-[#b6a888] hover:text-[#a39577] text-left block"
                   >
                     MyMarket AI Demo
                   </button>
                 </div>
               </div>
             </CardContent>
           </Card>

           {/* Prospecting Hub */}
           <Card className="bg-gray-900/50 border-gray-700 hover:border-[#b6a888]/50 transition-all duration-300">
             <CardHeader>
               <Target className="h-12 w-12 text-[#b6a888] mb-4" />
               <CardTitle className="text-white">Prospecting Hub</CardTitle>
               <CardDescription className="text-gray-300">
                 Complete prospecting strategies for every lead type
               </CardDescription>
             </CardHeader>
             <CardContent>
               <ul className="space-y-2 text-sm text-gray-400">
                 <li className="flex items-center gap-2">
                   <CheckCircle className="h-4 w-4 text-green-500" />
                   FSBO & Expired Listings
                 </li>
                 <li className="flex items-center gap-2">
                   <CheckCircle className="h-4 w-4 text-green-500" />
                   Sphere of Influence
                 </li>
                 <li className="flex items-center gap-2">
                   <CheckCircle className="h-4 w-4 text-green-500" />
                   Probate & Divorce Leads
                 </li>
                 <li className="flex items-center gap-2">
                   <CheckCircle className="h-4 w-4 text-green-500" />
                   Investor Strategies
                 </li>
               </ul>
             </CardContent>
           </Card>

           {/* Marketing Hub */}
           <Card className="bg-gray-900/50 border-gray-700 hover:border-[#b6a888]/50 transition-all duration-300">
             <CardHeader>
               <TrendingUp className="h-12 w-12 text-[#b6a888] mb-4" />
               <CardTitle className="text-white">Marketing Hub</CardTitle>
               <CardDescription className="text-gray-300">
                 Professional marketing content and social media resources
               </CardDescription>
             </CardHeader>
             <CardContent>
               <ul className="space-y-2 text-sm text-gray-400">
                 <li className="flex items-center gap-2">
                   <CheckCircle className="h-4 w-4 text-green-500" />
                   Branded social content
                 </li>
                 <li className="flex items-center gap-2">
                   <CheckCircle className="h-4 w-4 text-green-500" />
                   Market hot takes
                 </li>
                 <li className="flex items-center gap-2">
                   <CheckCircle className="h-4 w-4 text-green-500" />
                   Professional templates
                 </li>
                 <li className="flex items-center gap-2">
                   <CheckCircle className="h-4 w-4 text-green-500" />
                   Campaign strategies
                 </li>
                 <li className="flex items-center gap-2">
                   <CheckCircle className="h-4 w-4 text-green-500" />
                   Branding on demand
                 </li>
               </ul>
               <div className="mt-4">
                 <button
                   onClick={() => handleWatchDemo("DynamicBrand AI")}
                   className="text-[#b6a888] hover:text-[#a39577] text-sm font-medium"
                 >
                   DynamicBrand AI Demo
                 </button>
               </div>
             </CardContent>
           </Card>

           {/* Training Hub */}
           <Card className="bg-gray-900/50 border-gray-700 hover:border-[#b6a888]/50 transition-all duration-300">
             <CardHeader>
               <FileText className="h-12 w-12 text-[#b6a888] mb-4" />
               <CardTitle className="text-white">Training Hub</CardTitle>
               <CardDescription className="text-gray-300">
                 Comprehensive training programs and skill development
               </CardDescription>
             </CardHeader>
             <CardContent>
               <ul className="space-y-2 text-sm text-gray-400">
                 <li className="flex items-center gap-2">
                   <CheckCircle className="h-4 w-4 text-green-500" />
                   Script mastery training
                 </li>
                 <li className="flex items-center gap-2">
                   <CheckCircle className="h-4 w-4 text-green-500" />
                   DISC & VAK personality
                 </li>
                 <li className="flex items-center gap-2">
                   <CheckCircle className="h-4 w-4 text-green-500" />
                   Process optimization
                 </li>
                 <li className="flex items-center gap-2">
                   <CheckCircle className="h-4 w-4 text-green-500" />
                   Moxi Works integration
                 </li>
               </ul>
             </CardContent>
           </Card>

           {/* Networking Hub */}
           <Card className="bg-gray-900/50 border-gray-700 hover:border-[#b6a888]/50 transition-all duration-300">
             <CardHeader>
               <Users className="h-12 w-12 text-[#b6a888] mb-4" />
               <CardTitle className="text-white">Networking Hub</CardTitle>
               <CardDescription className="text-gray-300">
                 Connect with other professionals and build relationships
               </CardDescription>
             </CardHeader>
             <CardContent>
               <ul className="space-y-2 text-sm text-gray-400">
                 <li className="flex items-center gap-2">
                   <CheckCircle className="h-4 w-4 text-green-500" />
                   Community chat
                 </li>
                 <li className="flex items-center gap-2">
                   <CheckCircle className="h-4 w-4 text-green-500" />
                   Collaboration tools
                 </li>
                 <li className="flex items-center gap-2">
                   <CheckCircle className="h-4 w-4 text-green-500" />
                   Professional networking
                 </li>
                 <li className="flex items-center gap-2">
                   <CheckCircle className="h-4 w-4 text-green-500" />
                   Industry connections
                 </li>
               </ul>
             </CardContent>
           </Card>

           {/* Services Hub */}
           <Card className="bg-gray-900/50 border-gray-700 hover:border-[#b6a888]/50 transition-all duration-300">
             <CardHeader>
               <Zap className="h-12 w-12 text-[#b6a888] mb-4" />
               <CardTitle className="text-white">Services Hub</CardTitle>
               <CardDescription className="text-gray-300">Professional design and consulting services</CardDescription>
             </CardHeader>
             <CardContent>
               <ul className="space-y-2 text-sm text-gray-400">
                 <li className="flex items-center gap-2">
                   <CheckCircle className="h-4 w-4 text-green-500" />
                   Website design
                 </li>
                 <li className="flex items-center gap-2">
                   <CheckCircle className="h-4 w-4 text-green-500" />
                   Marketing materials
                 </li>
                 <li className="flex items-center gap-2">
                   <CheckCircle className="h-4 w-4 text-green-500" />
                   Brokerage consulting
                 </li>
                 <li className="flex items-center gap-2">
                   <CheckCircle className="h-4 w-4 text-green-500" />
                   Custom solutions
                 </li>
               </ul>
             </CardContent>
           </Card>
         </div>
       </div>
     </section>

     {/* Video Modal */}
     <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
       <DialogContent className="max-w-4xl w-full p-0 bg-black border-gray-700">
         <DialogHeader className="p-6 pb-0">
           <div className="flex items-center justify-between">
             <DialogTitle className="text-white text-xl">
               {selectedDemo ? `${selectedDemo} Demo` : "Platform Demo"}
             </DialogTitle>
             <Button
               variant="ghost"
               size="sm"
               onClick={() => setShowVideoModal(false)}
               className="text-gray-400 hover:text-white"
             >
               <X className="h-4 w-4" />
             </Button>
           </div>
         </DialogHeader>
         <div className="aspect-video w-full">
           <iframe
             width="100%"
             height="100%"
             src={
               selectedDemo
                 ? getVideoUrl(selectedDemo)
                 : "https://www.youtube.com/embed/cZRDOpKickM?autoplay=0&rel=0&modestbranding=1"
             }
             title={selectedDemo ? `${selectedDemo} Demo` : "NLU Full Platform Demo"}
             frameBorder="0"
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
             allowFullScreen
             className="rounded-b-lg"
           ></iframe>
         </div>
       </DialogContent>
     </Dialog>

     {/* Contact Form Modal */}
     <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
       <DialogContent className="max-w-md w-full p-6 bg-gray-900 border-gray-700">
         <DialogHeader>
           <div className="flex items-center justify-between">
             <DialogTitle className="text-white text-xl flex items-center gap-2">
               <Building2 className="h-5 w-5 text-[#b6a888]" />
               Brokerage/Team Plan Inquiry
             </DialogTitle>
             <Button
               variant="ghost"
               size="sm"
               onClick={() => setShowContactModal(false)}
               className="text-gray-400 hover:text-white"
             >
               <X className="h-4 w-4" />
             </Button>
           </div>
         </DialogHeader>
         <form onSubmit={handleContactFormSubmit} className="space-y-4">
           <div>
             <Label htmlFor="name" className="text-white">Name *</Label>
             <Input
               id="name"
               type="text"
               value={contactForm.name}
               onChange={(e) => handleContactFormChange('name', e.target.value)}
               required
               className="bg-gray-800 border-gray-600 text-white"
               placeholder="Your full name"
             />
           </div>
           <div>
             <Label htmlFor="email" className="text-white">Email *</Label>
             <Input
               id="email"
               type="email"
               value={contactForm.email}
               onChange={(e) => handleContactFormChange('email', e.target.value)}
               required
               className="bg-gray-800 border-gray-600 text-white"
               placeholder="your.email@example.com"
             />
           </div>
           <div>
             <Label htmlFor="phone" className="text-white">Phone Number *</Label>
             <Input
               id="phone"
               type="tel"
               value={contactForm.phone}
               onChange={(e) => handleContactFormChange('phone', e.target.value)}
               required
               className="bg-gray-800 border-gray-600 text-white"
               placeholder="(555) 123-4567"
             />
           </div>
           <div>
             <Label htmlFor="agentCount" className="text-white">Number of Agents *</Label>
             <Input
               id="agentCount"
               type="number"
               value={contactForm.agentCount}
               onChange={(e) => handleContactFormChange('agentCount', e.target.value)}
               required
               min="1"
               className="bg-gray-800 border-gray-600 text-white"
               placeholder="5"
             />
           </div>
           <div>
             <Label htmlFor="message" className="text-white">Message (Optional)</Label>
             <Textarea
               id="message"
               value={contactForm.message}
               onChange={(e) => handleContactFormChange('message', e.target.value)}
               className="bg-gray-800 border-gray-600 text-white min-h-[100px]"
               placeholder="Tell us about your brokerage and any specific needs..."
             />
           </div>
           <Button
             type="submit"
             disabled={isSubmitting}
             className="w-full bg-[#b6a888] hover:bg-[#a39577] text-black font-semibold py-3 px-6 rounded-md transition-colors disabled:opacity-50"
           >
             {isSubmitting ? 'Sending...' : 'Send Inquiry'}
           </Button>
         </form>
       </DialogContent>
     </Dialog>

     {/* Pricing Section */}
     <section id="pricing" className="py-20 px-4">
       <div className="container mx-auto">
         <div className="text-center mb-16">
           <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
           <p className="text-xl text-gray-300 max-w-2xl mx-auto">
             Choose the plan that works best for you. All plans include access to every tool and resource.
           </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
           {/* Monthly Plan */}
           <Card className="bg-gray-900/50 border-gray-700 hover:border-[#b6a888]/50 transition-all duration-300">
             <CardHeader className="text-center">
               <CardTitle className="text-2xl text-white">Monthly</CardTitle>
               <div className="text-4xl font-bold text-[#b6a888] mt-4">
                 {tenantConfig.id === "century21-canada" ? "C$39.99" : "$29.99"}
                 <span className="text-lg text-gray-400 font-normal">/month</span>
               </div>
               <CardDescription className="text-gray-300">Perfect for getting started</CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
               <ul className="space-y-3">
                 <li className="flex items-center gap-2 text-gray-300">
                   <CheckCircle className="h-5 w-5 text-green-500" />
                   Access to all 11 AI tools
                 </li>
                 <li className="flex items-center gap-2 text-gray-300">
                   <CheckCircle className="h-5 w-5 text-green-500" />
                   Complete training library
                 </li>
                 <li className="flex items-center gap-2 text-gray-300">
                   <CheckCircle className="h-5 w-5 text-green-500" />
                   Marketing resources
                 </li>
                 <li className="flex items-center gap-2 text-gray-300">
                   <CheckCircle className="h-5 w-5 text-green-500" />
                   Community access
                 </li>
                 <li className="flex items-center gap-2 text-gray-300">
                   <CheckCircle className="h-5 w-5 text-green-500" />
                   24/7 platform access
                 </li>
               </ul>

               <Button
                 onClick={handlePricing}
                 className="w-full bg-[#b6a888] hover:bg-[#a39577] text-black font-semibold py-3 px-6 rounded-md transition-colors"
               >
                 {t('button.getStartedMonthly')}
               </Button>
             </CardContent>
           </Card>

           {/* Annual Plan */}
           <Card className="bg-gray-900/50 border-[#b6a888] hover:border-[#b6a888] transition-all duration-300 relative">
             <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
               <Badge className="bg-[#b6a888] text-black font-semibold px-4 py-1">BEST VALUE</Badge>
             </div>
             <CardHeader className="text-center">
               <CardTitle className="text-2xl text-white">Annual</CardTitle>
               <div className="text-4xl font-bold text-[#b6a888] mt-4">
                 {tenantConfig.id === "century21-canada" ? "C$399" : "$252"}
                 <span className="text-lg text-gray-400 font-normal">/year</span>
               </div>
               <div className="text-green-400 font-medium">
                 {tenantConfig.id === "century21-canada" ? "Only C$33/month - Save C$80!" : "Only $21/month - Save $108!"}
               </div>
               <CardDescription className="text-gray-300">Best value for serious agents</CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
               <ul className="space-y-3">
                 <li className="flex items-center gap-2 text-gray-300">
                   <CheckCircle className="h-5 w-5 text-green-500" />
                   Access to all 11 AI tools
                 </li>
                 <li className="flex items-center gap-2 text-gray-300">
                   <CheckCircle className="h-5 w-5 text-green-500" />
                   Complete training library
                 </li>
                 <li className="flex items-center gap-2 text-gray-300">
                   <CheckCircle className="h-5 w-5 text-green-500" />
                   Marketing resources
                 </li>
                 <li className="flex items-center gap-2 text-gray-300">
                   <CheckCircle className="h-5 w-5 text-green-500" />
                   Community access
                 </li>
                 <li className="flex items-center gap-2 text-gray-300">
                   <CheckCircle className="h-5 w-5 text-green-500" />
                   24/7 platform access
                 </li>
                 <li className="flex items-center gap-2 text-green-400">
                   <Star className="h-5 w-5 text-green-500" />
                   Save $108 per year
                 </li>
               </ul>

               <Button
                 onClick={handleAnnualPricing}
                 className="w-full bg-[#b6a888] hover:bg-[#a39577] text-black font-semibold py-3 px-6 rounded-md transition-colors"
               >
                 {t('button.getStartedAnnual')}
               </Button>
             </CardContent>
           </Card>

           {/* Brokerage/Team Plan */}
           <Card className="bg-gray-900/50 border-gray-700 hover:border-[#b6a888]/50 transition-all duration-300">
             <CardHeader className="text-center">
               <CardTitle className="text-2xl text-white flex items-center justify-center gap-2">
                 <Building2 className="h-6 w-6 text-[#b6a888]" />
                 Brokerage/Team
               </CardTitle>
               <div className="text-4xl font-bold text-[#b6a888] mt-4">
                 Contact Us
                 <span className="text-lg text-gray-400 font-normal">for Pricing</span>
               </div>
               <CardDescription className="text-gray-300">Perfect for brokerages and teams</CardDescription>
             </CardHeader>
             <CardContent className="space-y-4">
               <ul className="space-y-3">
                 <li className="flex items-center gap-2 text-gray-300">
                   <CheckCircle className="h-5 w-5 text-green-500" />
                   All individual plan features
                 </li>
                 <li className="flex items-center gap-2 text-gray-300">
                   <CheckCircle className="h-5 w-5 text-green-500" />
                   Bulk licensing options
                 </li>
                 <li className="flex items-center gap-2 text-gray-300">
                   <CheckCircle className="h-5 w-5 text-green-500" />
                   Team management tools
                 </li>
                 <li className="flex items-center gap-2 text-gray-300">
                   <CheckCircle className="h-5 w-5 text-green-500" />
                   Custom branding options
                 </li>
                 <li className="flex items-center gap-2 text-gray-300">
                   <CheckCircle className="h-5 w-5 text-green-500" />
                   Dedicated support
                 </li>
                 <li className="flex items-center gap-2 text-green-400">
                   <Star className="h-5 w-5 text-green-500" />
                   Volume discounts available
                 </li>
               </ul>

               <Button
                 onClick={handleBrokerageContact}
                 className="w-full bg-[#b6a888] hover:bg-[#a39577] text-black font-semibold py-3 px-6 rounded-md transition-colors"
               >
                 Contact Us for Price
               </Button>
             </CardContent>
           </Card>
         </div>
       </div>
     </section>
   </div>
  )
}
