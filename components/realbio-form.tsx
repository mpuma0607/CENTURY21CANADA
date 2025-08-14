"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Copy, Mail, User, Download, FileText, Save, UserCheck, Mic, MicOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useMemberSpaceUser } from "@/hooks/use-memberspace-user"
import { saveUserCreation, generateCreationTitle } from "@/lib/auto-save-creation"
import { generateAgentBio } from "../lib/realbio-actions"
import { useTranslation } from "@/contexts/translation-context"

type BioFormState = {
  name: string
  brokerage: string
  timeInIndustry: string
  origin: string
  areasServed: string
  hobbies: string
  email: string
}

type BioResult = {
  bio: string
}

const timeInIndustryOptions = [
  "form.realbio.timeInIndustry.lessThan1",
  "form.realbio.timeInIndustry.1to2",
  "form.realbio.timeInIndustry.3to5",
  "form.realbio.timeInIndustry.6to10",
  "form.realbio.timeInIndustry.11to15",
  "form.realbio.timeInIndustry.16to20",
  "form.realbio.timeInIndustry.over20",
]

export default function RealBioForm() {
  const { t } = useTranslation()
  const { toast } = useToast()
  const [step, setStep] = useState<number>(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSendingEmail, setIsSendingEmail] = useState(false)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isListeningOrigin, setIsListeningOrigin] = useState(false)
  const [isListeningAreas, setIsListeningAreas] = useState(false)
  const [isListeningHobbies, setIsListeningHobbies] = useState(false)
  const [formData, setFormData] = useState<BioFormState>({
    name: "",
    brokerage: "",
    timeInIndustry: "",
    origin: "",
    areasServed: "",
    hobbies: "",
    email: "",
  })
  const [result, setResult] = useState<BioResult | null>(null)
  const { user, loading: userLoading } = useMemberSpaceUser()

  // Auto-populate user data when available
  useEffect(() => {
    if (user && !userLoading) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.name || `${user.firstName || ""} ${user.lastName || ""}`.trim(),
        email: prev.email || user.email || "",
      }))
    }
  }, [user, userLoading])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const startListening = (field: "origin" | "areasServed" | "hobbies") => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognition = new SpeechRecognition()

      // Mobile-optimized settings
      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = "en-US"
      recognition.maxAlternatives = 3

      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        recognition.continuous = false
        recognition.interimResults = true
        recognition.speechTimeoutLength = 10000
        recognition.speechInputPossiblyComplete = 8000
      }

      let finalTranscript = ""
      let interimTranscript = ""

      recognition.onstart = () => {
        if (field === "origin") setIsListeningOrigin(true)
        if (field === "areasServed") setIsListeningAreas(true)
        if (field === "hobbies") setIsListeningHobbies(true)
        console.log("Voice recognition started for", field)
      }

      recognition.onresult = (event: any) => {
        finalTranscript = ""
        interimTranscript = ""

        for (let i = 0; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript
          } else {
            interimTranscript += transcript
          }
        }

        const currentText = (finalTranscript || interimTranscript).trim()
        if (currentText) {
          setFormData((prev) => ({
            ...prev,
            [field]: currentText, // REPLACE instead of append
          }))
        }

        console.log("Voice result:", { final: finalTranscript, interim: interimTranscript })
      }

      recognition.onerror = (event: any) => {
        console.error("Voice recognition error:", event.error)
        setIsListeningOrigin(false)
        setIsListeningAreas(false)
        setIsListeningHobbies(false)

        let errorMessage = t('form.realbio.error.voice.title') + " "
        switch (event.error) {
          case "no-speech":
            errorMessage += t('form.realbio.error.voice.noSpeech')
            break
          case "audio-capture":
            errorMessage += t('form.realbio.error.voice.audioCapture')
            break
          case "not-allowed":
            errorMessage += t('form.realbio.error.voice.notAllowed')
            break
          case "network":
            errorMessage += t('form.realbio.error.voice.network')
            break
          default:
            errorMessage += t('form.realbio.error.voice.default')
        }

        if (event.error !== "aborted") {
          toast({
            title: t('form.realbio.error.voice.title'),
            description: errorMessage,
            variant: "destructive",
          })
        }
      }

      recognition.onend = () => {
        setIsListeningOrigin(false)
        setIsListeningAreas(false)
        setIsListeningHobbies(false)
        console.log("Voice recognition ended")
      }

      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        navigator.mediaDevices
          ?.getUserMedia({ audio: true })
          .then(() => {
            recognition.start()
          })
          .catch((err) => {
            console.error("Microphone permission error:", err)
            toast({
              title: t('form.realbio.error.microphone.title'),
              description: t('form.realbio.error.microphone.description'),
              variant: "destructive",
            })
          })
      } else {
        recognition.start()
      }
    } else {
      toast({
        title: t('form.realbio.error.voice.notSupported.title'),
        description: t('form.realbio.error.voice.notSupported.description'),
        variant: "destructive",
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsGenerating(true)

    try {
      const generatedBio = await generateAgentBio(formData)
      setResult(generatedBio)
      setStep(3)
      toast({
        title: t('form.realbio.toast.bioGenerated.title'),
        description: t('form.realbio.toast.bioGenerated.description'),
      })
    } catch (error) {
      console.error("Error generating bio:", error)
      toast({
        title: t('form.realbio.error.generation.title'),
        description: t('form.realbio.error.generation.description'),
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = () => {
    if (result?.bio) {
      navigator.clipboard.writeText(result.bio)
      toast({
        title: t('form.realbio.toast.copied.title'),
        description: t('form.realbio.toast.copied.description'),
      })
    }
  }

  const downloadPDF = async () => {
    if (result?.bio) {
      setIsGeneratingPDF(true)
      try {
        const response = await fetch("/api/realbio", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "download-pdf",
            formData,
            bio: result.bio,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to generate PDF")
        }

        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `${formData.name.replace(/\s+/g, "_")}_Agent_Bio.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)

        toast({
          title: t('form.realbio.toast.pdfDownloaded.title'),
          description: t('form.realbio.toast.pdfDownloaded.description'),
        })
      } catch (error) {
        console.error("Error generating PDF:", error)
        toast({
          title: t('form.realbio.error.pdf.title'),
          description: error instanceof Error ? error.message : t('form.realbio.error.pdf.description'),
          variant: "destructive",
        })
      } finally {
        setIsGeneratingPDF(false)
      }
    }
  }

  const sendEmail = async () => {
    if (result?.bio) {
      setIsSendingEmail(true)
      try {
        const response = await fetch("/api/realbio", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            action: "send-email",
            formData,
            bio: result.bio,
          }),
        })

        const data = await response.json()
        console.log("Email response:", data) // Add this for debugging

        if (!response.ok) {
          throw new Error(data.error || "Failed to send email")
        }

        if (data.success) {
          toast({
            title: t('form.realbio.toast.emailSent.title'),
            description: t('form.realbio.toast.emailSent.description'),
          })
        } else {
          throw new Error(data.error || "Failed to send email")
        }
      } catch (error) {
        console.error("Error sending email:", error)
        toast({
          title: t('form.realbio.error.email.title'),
          description: error instanceof Error ? error.message : t('form.realbio.error.email.description'),
          variant: "destructive",
        })
      } finally {
        setIsSendingEmail(false)
      }
    }
  }

  const saveToProfile = async () => {
    if (!result?.bio || !user) return

    setIsSaving(true)
    try {
      const title = generateCreationTitle("realbio", { agentName: formData.name })

      const success = await saveUserCreation({
        userId: String(user.id),
        userEmail: user.email || "",
        toolType: "realbio",
        title,
        content: result.bio,
        formData,
        metadata: {
          name: formData.name,
          brokerage: formData.brokerage,
          timeInIndustry: formData.timeInIndustry,
          origin: formData.origin,
          areasServed: formData.areasServed,
          hobbies: formData.hobbies,
          generatedAt: new Date().toISOString(),
        },
      })

      if (success.success) {
        toast({
          title: t('form.realbio.toast.saved.title'),
          description: t('form.realbio.toast.saved.description'),
        })
      } else {
        throw new Error("Save operation returned false")
      }
    } catch (error) {
      console.error("Error saving bio:", error)
      toast({
        title: t('form.realbio.error.save.title'),
        description: t('form.realbio.error.save.description'),
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const renderStepOne = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            {t('form.realbio.field.name.label')}{user && <UserCheck className="h-4 w-4 text-green-600" />}
          </Label>
          <Input
            id="name"
            name="name"
            placeholder={t('form.realbio.field.name.placeholder')}
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          {user && formData.name === (user.name || `${user.firstName || ""} ${user.lastName || ""}`.trim()) && (
            <p className="text-xs text-green-600">{t('form.realbio.field.name.autoFilled')}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="brokerage">{t('form.realbio.field.brokerage.label')}</Label>
          <Input
            id="brokerage"
            name="brokerage"
            placeholder={t('form.realbio.field.brokerage.placeholder')}
            value={formData.brokerage}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="timeInIndustry">{t('form.realbio.field.timeInIndustry.label')}</Label>
        <Select value={formData.timeInIndustry} onValueChange={(value) => handleSelectChange("timeInIndustry", value)}>
          <SelectTrigger id="timeInIndustry">
            <SelectValue placeholder={t('form.realbio.field.timeInIndustry.placeholder')} />
          </SelectTrigger>
          <SelectContent>
            {timeInIndustryOptions.map((option, index) => (
              <SelectItem key={index} value={option}>
                {t(option)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="origin">{t('form.realbio.field.origin.label')}</Label>
        <div className="relative">
          <Textarea
            id="origin"
            name="origin"
            placeholder={t('form.realbio.field.origin.placeholder')}
            value={formData.origin}
            onChange={handleInputChange}
            className="min-h-[100px] pr-12"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2"
            onClick={() => startListening("origin")}
            disabled={isListeningOrigin}
          >
            {isListeningOrigin ? <MicOff className="h-4 w-4 text-red-500" /> : <Mic className="h-4 w-4" />}
          </Button>
        </div>
        {isListeningOrigin && (
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <div className="animate-pulse w-2 h-2 bg-red-500 rounded-full"></div>
            {t('form.realbio.voice.listeningOrigin')}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="areasServed">{t('form.realbio.field.areasServed.label')}</Label>
        <div className="relative">
          <Textarea
            id="areasServed"
            name="areasServed"
            placeholder={t('form.realbio.field.areasServed.placeholder')}
            value={formData.areasServed}
            onChange={handleInputChange}
            className="min-h-[80px] pr-12"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2"
            onClick={() => startListening("areasServed")}
            disabled={isListeningAreas}
          >
            {isListeningAreas ? <MicOff className="h-4 w-4 text-red-500" /> : <Mic className="h-4 w-4" />}
          </Button>
        </div>
        {isListeningAreas && (
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <div className="animate-pulse w-2 h-2 bg-red-500 rounded-full"></div>
            {t('form.realbio.voice.listeningAreas')}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="hobbies">{t('form.realbio.field.hobbies.label')}</Label>
        <div className="relative">
          <Textarea
            id="hobbies"
            name="hobbies"
            placeholder={t('form.realbio.field.hobbies.placeholder')}
            value={formData.hobbies}
            onChange={handleInputChange}
            className="min-h-[80px] pr-12"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2"
            onClick={() => startListening("hobbies")}
            disabled={isListeningHobbies}
          >
            {isListeningHobbies ? <MicOff className="h-4 w-4 text-red-500" /> : <Mic className="h-4 w-4" />}
          </Button>
        </div>
        {isListeningHobbies && (
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <div className="animate-pulse w-2 h-2 bg-red-500 rounded-full"></div>
            {t('form.realbio.voice.listeningHobbies')}
          </div>
        )}
      </div>

      {/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) && (
        <div className="text-xs text-muted-foreground mt-2 p-2 bg-blue-50 rounded">
          <strong>{t('form.realbio.voice.tips.title')}</strong> {t('form.realbio.voice.tips.content')}
        </div>
      )}

      <Button
        onClick={() => setStep(2)}
        disabled={
          !formData.name ||
          !formData.brokerage ||
          !formData.timeInIndustry ||
          !formData.origin ||
          !formData.areasServed ||
          !formData.hobbies
        }
        className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white"
      >
        {t('form.realbio.button.next')}
      </Button>
    </div>
  )

  const renderStepTwo = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center gap-2">
          {t('form.realbio.field.email.label')}
          {user && <UserCheck className="h-4 w-4 text-green-600" />}
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder={t('form.realbio.field.email.placeholder')}
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        {user && formData.email === user.email && (
          <p className="text-xs text-green-600">{t('form.realbio.field.name.autoFilled')}</p>
        )}
      </div>

      {/* Preview of entered information */}
      <Card className="bg-gray-50 border-0">
        <CardContent className="p-6">
          <h4 className="font-semibold text-black mb-4 flex items-center gap-2">
            <User className="h-4 w-4" />
            {t('form.realbio.preview.title')}
          </h4>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium">{t('form.realbio.preview.name')}</span> {formData.name}
            </p>
            <p>
              <span className="font-medium">{t('form.realbio.preview.brokerage')}</span> {formData.brokerage}
            </p>
            <p>
              <span className="font-medium">{t('form.realbio.preview.experience')}</span> {formData.timeInIndustry}
            </p>
            <p>
              <span className="font-medium">{t('form.realbio.preview.areasServed')}</span> {formData.areasServed}
            </p>
            <p>
              <span className="font-medium">{t('form.realbio.preview.background')}</span> {formData.origin.substring(0, 100)}
              {formData.origin.length > 100 && "..."}
            </p>
            <p>
              <span className="font-medium">{t('form.realbio.preview.interests')}</span> {formData.hobbies.substring(0, 100)}
              {formData.hobbies.length > 100 && "..."}
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
          {t('form.realbio.button.back')}
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isGenerating || !formData.email}
          className="flex-1 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t('form.realbio.button.generating')}
            </>
          ) : (
            t('form.realbio.button.generate')
          )}
        </Button>
      </div>
    </div>
  )

  const renderStepThree = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-black">{t('form.realbio.results.title')}</h3>
        <p className="text-gray-600">{t('form.realbio.results.description')}</p>
      </div>

      <Card className="border-0 shadow-md">
        <CardContent className="p-6">
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-black mb-4">{t('form.realbio.results.bioTitle')}</h4>
            <div className="prose prose-gray max-w-none">
              <p className="whitespace-pre-wrap text-gray-800 leading-relaxed">{result?.bio}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Button
          variant="outline"
          onClick={copyToClipboard}
          className="flex items-center justify-center gap-2 bg-transparent"
        >
          <Copy className="h-4 w-4" /> <span className="whitespace-nowrap">{t('form.realbio.action.copy')}</span>
        </Button>
        <Button
          variant="outline"
          onClick={downloadPDF}
          disabled={isGeneratingPDF}
          className="flex items-center justify-center gap-2 bg-transparent"
        >
          {isGeneratingPDF ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          <span className="whitespace-nowrap">{t('form.realbio.action.download')}</span>
        </Button>
        <Button
          variant="outline"
          onClick={sendEmail}
          disabled={isSendingEmail}
          className="flex items-center justify-center gap-2 bg-transparent"
        >
          {isSendingEmail ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
          <span className="whitespace-nowrap">{t('form.realbio.action.email')}</span>
        </Button>
        <Button
          variant="outline"
          onClick={saveToProfile}
          disabled={!user || isSaving}
          className="flex items-center justify-center gap-2 bg-transparent"
        >
          {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          <span className="whitespace-nowrap">{user ? t('form.realbio.action.save') : t('form.realbio.action.loginToSave')}</span>
        </Button>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h5 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
          <FileText className="h-4 w-4" />{t('form.realbio.usage.title')}
        </h5>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>{t('form.realbio.usage.website')}</li>
          <li>{t('form.realbio.usage.social')}</li>
          <li>{t('form.realbio.usage.marketing')}</li>
          <li>{t('form.realbio.usage.signature')}</li>
          <li>{t('form.realbio.usage.networking')}</li>
          <li>{t('form.realbio.usage.pdf')}</li>
        </ul>
      </div>

      <Button
        onClick={() => {
          setStep(1)
          setResult(null)
          setFormData({
            name: user?.name || `${user?.firstName || ""} ${user?.lastName || ""}`.trim() || "",
            brokerage: "",
            timeInIndustry: "",
            origin: "",
            areasServed: "",
            hobbies: "",
            email: user?.email || "",
          })
        }}
        className="w-full bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white"
      >
        {t('form.realbio.button.createAnother')}
      </Button>
    </div>
  )

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-2">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 1 ? "bg-yellow-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            1
          </div>
          <div className={`h-1 w-16 ${step >= 2 ? "bg-yellow-600" : "bg-gray-200"}`}></div>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 2 ? "bg-yellow-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            2
          </div>
          <div className={`h-1 w-16 ${step >= 3 ? "bg-yellow-600" : "bg-gray-200"}`}></div>
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              step >= 3 ? "bg-yellow-600 text-white" : "bg-gray-200 text-gray-600"
            }`}
          >
            3
          </div>
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        {step === 1 && renderStepOne()}
        {step === 2 && renderStepTwo()}
        {step === 3 && renderStepThree()}
      </form>
    </div>
  )
}
