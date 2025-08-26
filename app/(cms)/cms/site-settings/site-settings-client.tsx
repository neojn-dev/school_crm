"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { 
  Save, 
  Home, 
  Image, 
  Settings, 
  Mail, 
  Phone, 
  MapPin,
  Upload
} from "lucide-react"
import { toast } from "react-toastify"

interface SiteSettings {
  id?: string
  homepageId?: string
  siteLogo?: string
  siteLogoAlt?: string
  headerStyle?: string
  showSearch?: boolean
  footerText?: string
  copyrightText?: string
  showSocialLinks?: boolean
  contactEmail?: string
  contactPhone?: string
  contactAddress?: string
}

interface CmsPage {
  id: string
  title: string
  slug: string
  isPublished: boolean
}

export function SiteSettingsClient() {
  const [settings, setSettings] = useState<SiteSettings>({})
  const [pages, setPages] = useState<CmsPage[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchSiteSettings()
    fetchPages()
  }, [])

  const fetchSiteSettings = async () => {
    try {
      const response = await fetch('/api/cms/site-settings')
      if (response.ok) {
        const data = await response.json()
        setSettings(data || {})
      } else {
        console.log('No site settings found, using defaults')
      }
    } catch (error) {
      console.error('Error fetching site settings:', error)
      toast.error('Failed to load site settings')
    } finally {
      setLoading(false)
    }
  }

  const fetchPages = async () => {
    try {
      const response = await fetch('/api/cms/pages')
      if (response.ok) {
        const data = await response.json()
        setPages(data.pages || [])
      }
    } catch (error) {
      console.error('Error fetching pages:', error)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/cms/site-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })

      if (response.ok) {
        toast.success('Site settings saved successfully')
        fetchSiteSettings() // Refresh to get updated data
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to save site settings')
      }
    } catch (error) {
      console.error('Error saving site settings:', error)
      toast.error('Failed to save site settings')
    } finally {
      setSaving(false)
    }
  }

  const updateSetting = (key: keyof SiteSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="homepage" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="homepage">Homepage</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="homepage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Home className="h-5 w-5" />
                <span>Homepage Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="homepage">Select Homepage</Label>
                <Select
                  value={settings.homepageId || ''}
                  onValueChange={(value) => updateSetting('homepageId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a page to use as homepage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No specific homepage (show default)</SelectItem>
                    {pages.filter(p => p.isPublished).map(page => (
                      <SelectItem key={page.id} value={page.id}>
                        {page.title} (/{page.slug})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500 mt-1">
                  Select which CMS page should be displayed as your website's homepage.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Image className="h-5 w-5" />
                <span>Branding & Logo</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="siteLogo">Site Logo URL</Label>
                <div className="flex space-x-2">
                  <Input
                    id="siteLogo"
                    value={settings.siteLogo || ''}
                    onChange={(e) => updateSetting('siteLogo', e.target.value)}
                    placeholder="https://example.com/logo.png"
                  />
                  <Button variant="outline" size="sm">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Upload or enter the URL for your site logo. Leave empty to use default.
                </p>
              </div>

              <div>
                <Label htmlFor="siteLogoAlt">Logo Alt Text</Label>
                <Input
                  id="siteLogoAlt"
                  value={settings.siteLogoAlt || ''}
                  onChange={(e) => updateSetting('siteLogoAlt', e.target.value)}
                  placeholder="Your company name"
                />
              </div>

              <div>
                <Label htmlFor="headerStyle">Header Style</Label>
                <Select
                  value={settings.headerStyle || 'full'}
                  onValueChange={(value) => updateSetting('headerStyle', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="full">Full Featured</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="showSearch"
                  checked={settings.showSearch || false}
                  onCheckedChange={(checked) => updateSetting('showSearch', checked)}
                />
                <Label htmlFor="showSearch">Show search in header</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="footer" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Footer Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="footerText">Footer Text</Label>
                <Textarea
                  id="footerText"
                  value={settings.footerText || ''}
                  onChange={(e) => updateSetting('footerText', e.target.value)}
                  placeholder="Additional footer content..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="copyrightText">Copyright Text</Label>
                <Input
                  id="copyrightText"
                  value={settings.copyrightText || ''}
                  onChange={(e) => updateSetting('copyrightText', e.target.value)}
                  placeholder="© 2024 Your Company Name. All rights reserved."
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="showSocialLinks"
                  checked={settings.showSocialLinks !== false}
                  onCheckedChange={(checked) => updateSetting('showSocialLinks', checked)}
                />
                <Label htmlFor="showSocialLinks">Show social media links</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Contact Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contactEmail" className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Contact Email</span>
                </Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={settings.contactEmail || ''}
                  onChange={(e) => updateSetting('contactEmail', e.target.value)}
                  placeholder="contact@yourcompany.com"
                />
              </div>

              <div>
                <Label htmlFor="contactPhone" className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Contact Phone</span>
                </Label>
                <Input
                  id="contactPhone"
                  value={settings.contactPhone || ''}
                  onChange={(e) => updateSetting('contactPhone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <Label htmlFor="contactAddress" className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Contact Address</span>
                </Label>
                <Textarea
                  id="contactAddress"
                  value={settings.contactAddress || ''}
                  onChange={(e) => updateSetting('contactAddress', e.target.value)}
                  placeholder="123 Main St, City, State 12345"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSave} 
          disabled={saving}
          className="flex items-center space-x-2"
        >
          <Save className="h-4 w-4" />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </Button>
      </div>
    </div>
  )
}
