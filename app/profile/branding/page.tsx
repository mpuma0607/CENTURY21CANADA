"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Upload, User, Building2, ImageIcon } from "lucide-react"
import { useMemberSpaceUser } from "@/hooks/use-memberspace-user"
import { useTenantConfig } from "@/contexts/tenant-context"
import { getBrandOptionsForTenant } from "@/lib/tenant-brand-options"
import { useTranslation } from "@/contexts/translation-context"
import {
  getUserBrandingProfile,
  saveUserBrandingProfile,
  uploadBrandingLogo,
  deleteUserBrandingProfile,
  type UserBrandingProfile,
} from "./actions"

export default function BrandingProfilePage() {
  const { t } = useTranslation()
  const { user, loading: userLoading } = useMemberSpaceUser()
  const tenantConfig = useTenantConfig()
  const { toast } = useToast()

  const [profile, setProfile] = useState<UserBrandingProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    brand: "",
    brokerage: "",
  })

  // Get tenant-aware brand options
  const brandOptions = tenantConfig ? getBrandOptionsForTenant(tenantConfig) : []
  const showOtherInput = formData.brand === "other"

  // Debug tenant config
  useEffect(() => {
    console.log("=== TENANT CONFIG DEBUG ===")
    console.log("tenantConfig:", tenantConfig)
    console.log("tenantConfig type:", typeof tenantConfig)
    console.log("tenantConfig keys:", tenantConfig ? Object.keys(tenantConfig) : "none")
  }, [tenantConfig])

  useEffect(() => {
    async function loadProfile() {
      console.log("=== LOADING PROFILE DEBUG ===")
      console.log("userLoading:", userLoading)
      console.log("user:", user)
      console.log("tenantConfig:", tenantConfig)

      if (userLoading) return

      // Try to proceed even if tenantConfig is undefined for now
      if (!user?.id) {
        console.log("Missing user, setting loading false")
        setLoading(false)
        return
      }

      // Use a default tenant ID if tenantConfig is undefined
      const tenantId = tenantConfig?.id || "century21-beggins"
      console.log("Using tenant ID:", tenantId)

      try {
        console.log("Calling getUserBrandingProfile with:", user.id, tenantId)
        const existingProfile = await getUserBrandingProfile(user.id, tenantId)
        console.log("Loaded profile:", existingProfile)

        if (existingProfile) {
          setProfile(existingProfile)
          setFormData({
            brand: existingProfile.brand,
            brokerage: existingProfile.brokerage,
          })
          console.log("Set form data to:", {
            brand: existingProfile.brand,
            brokerage: existingProfile.brokerage,
          })
        } else {
          console.log("No existing profile found")
          // Set default brand for Beggins tenant
          if (tenantConfig?.id === "century21-beggins") {
            setFormData((prev) => ({ ...prev, brand: "century21" }))
          }
        }
      } catch (error) {
        console.error("Error loading profile:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [user, tenantConfig, userLoading])

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast({
        title: t('page.branding.error.invalidFile.title'),
        description: t('page.branding.error.invalidFile.description'),
        variant: "destructive",
      })
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: t('page.branding.error.fileTooLarge.title'),
        description: t('page.branding.error.fileTooLarge.description'),
        variant: "destructive",
      })
      return
    }

    setUploading(true)
    try {
      const uploadFormData = new FormData()
      uploadFormData.append("logo", file)

      const result = await uploadBrandingLogo(uploadFormData)

      if (result.success && result.data) {
        // Just store the logo data - don't create full profile yet
        setProfile(
          (prev) =>
            ({
              ...prev,
              custom_logo_url: result.data.url,
              logo_public_id: result.data.public_id,
            }) as UserBrandingProfile,
        )

        toast({
          title: t('page.branding.message.logoUploaded.title'),
          description: t('page.branding.message.logoUploaded.description'),
        })
      } else {
        throw new Error(result.error || "Upload failed")
      }
    } catch (error) {
      console.error("Error uploading logo:", error)
      toast({
        title: t('page.branding.error.uploadFailed.title'),
        description: error instanceof Error ? error.message : t('page.branding.error.uploadFailed.description'),
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    console.log("=== SAVE BUTTON CLICKED ===")
    console.log("user:", user)
    console.log("tenantConfig:", tenantConfig)
    console.log("formData:", formData)
    console.log("profile:", profile)

    if (!user?.id) {
      console.log("Missing user - cannot save")
      toast({
        title: t('page.branding.error.missingUser.title'),
        description: t('page.branding.error.missingUser.description'),
        variant: "destructive",
      })
      return
    }

    // Use default tenant ID if tenantConfig is undefined
    const tenantId = tenantConfig?.id || "century21-beggins"
    console.log("Using tenant ID for save:", tenantId)

    setSaving(true)
    try {
      const profileData: UserBrandingProfile = {
        user_id: user.id,
        user_email: user.email,
        brand: formData.brand,
        brokerage: formData.brokerage,
        custom_logo_url: profile?.custom_logo_url || null,
        logo_public_id: profile?.logo_public_id || null,
        preferences: { auto_brand: true },
        tenant_id: tenantId,
      }

      console.log("Saving profile data:", profileData)
      const result = await saveUserBrandingProfile(profileData)
      console.log("Save result:", result)

      if (result.success) {
        setProfile(result.data)
        toast({
          title: t('page.branding.message.profileSaved.title'),
          description: t('page.branding.message.profileSaved.description'),
        })
        console.log("Profile saved successfully")
      } else {
        throw new Error(result.error || "Save failed")
      }
    } catch (error) {
      console.error("Error saving profile:", error)
      toast({
        title: t('page.branding.error.saveFailed.title'),
        description: error instanceof Error ? error.message : t('page.branding.error.saveFailed.description'),
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteProfile = async () => {
    if (!user?.id) return

    if (!confirm(t('page.branding.confirm.delete'))) {
      return
    }

    const tenantId = tenantConfig?.id || "century21-beggins"

    try {
      const result = await deleteUserBrandingProfile(user.id, tenantId)

      if (result.success) {
        setProfile(null)
        setFormData({
          brand: tenantConfig?.id === "century21-beggins" ? "century21" : "",
          brokerage: "",
        })
        toast({
          title: t('page.branding.message.profileDeleted.title'),
          description: t('page.branding.message.profileDeleted.description'),
        })
      } else {
        throw new Error(result.error || "Delete failed")
      }
    } catch (error) {
      console.error("Error deleting profile:", error)
      toast({
        title: t('page.branding.error.deleteFailed.title'),
        description: error instanceof Error ? error.message : t('page.branding.error.deleteFailed.description'),
        variant: "destructive",
      })
    }
  }

  if (userLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('page.branding.loading')}</p>
        </div>
      </div>
    )
  }

  console.log("Current formData:", formData)
  console.log("Current profile:", profile)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {t('page.branding.title')}
            </CardTitle>
            <CardDescription>{t('page.branding.description')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="brand" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  {t('page.branding.field.brand.label')}
                </Label>
                <Select value={formData.brand} onValueChange={(value) => setFormData({ ...formData, brand: value })}>
                  <SelectTrigger id="brand">
                    <SelectValue placeholder={t('page.branding.field.brand.placeholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    {brandOptions.map((brand) => (
                      <SelectItem key={brand.value} value={brand.value}>
                        {brand.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {showOtherInput && (
                  <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      {t('page.branding.other.instructions')}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="brokerage" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  {t('page.branding.field.brokerage.label')}
                </Label>
                <Input
                  id="brokerage"
                  value={formData.brokerage}
                  onChange={(e) => setFormData({ ...formData, brokerage: e.target.value })}
                  placeholder={t('page.branding.field.brokerage.placeholder')}
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                {t('page.branding.logo.title')}
              </Label>

              {profile?.custom_logo_url ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 border rounded-lg bg-gray-50">
                    <img
                      src={profile.custom_logo_url || "/placeholder.svg"}
                      alt="Current logo"
                      className="h-16 w-16 object-contain rounded border bg-white"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{t('page.branding.logo.current.title')}</p>
                      <p className="text-sm text-gray-600">{t('page.branding.logo.current.description')}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById("logo-upload")?.click()}
                        disabled={uploading}
                      >
                        {uploading ? t('page.branding.logo.uploading') : t('page.branding.logo.change')}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
                    onClick={() => document.getElementById("logo-upload")?.click()}
                  >
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-1">{t('page.branding.logo.upload.click')}</p>
                    <p className="text-sm text-gray-500">{t('page.branding.logo.upload.formats')}</p>
                  </div>
                </div>
              )}

              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
                disabled={uploading}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSave} disabled={saving || !formData.brand || !formData.brokerage}>
                {saving ? t('page.branding.action.saving') : t('page.branding.action.save')}
              </Button>
              {profile && (
                <Button variant="outline" onClick={handleDeleteProfile}>
                  {t('page.branding.action.delete')}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
