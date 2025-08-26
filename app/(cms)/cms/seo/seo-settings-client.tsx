"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Save, 
  Search, 
  Globe, 
  BarChart3, 
  FileText,
  ExternalLink,
  Copy,
  CheckCircle
} from "lucide-react"

interface SeoSettings {
  id?: string
  siteName?: string
  siteDescription?: string
  defaultOgImage?: string
  googleAnalyticsId?: string
  googleTagManagerId?: string
  facebookPixelId?: string
  twitterHandle?: string
  facebookUrl?: string
  linkedinUrl?: string
  instagramUrl?: string
  robotsTxt?: string
  customHead?: string
  updatedAt?: string
  updatedByUser?: {
    username: string
    firstName?: string
  }
}

interface PublishedPage {
  id: string
  title: string
  slug: string
  updatedAt: string
  metaTitle?: string
  metaDescription?: string
}

interface SeoSettingsClientProps {
  initialSettings: SeoSettings | null
  publishedPages: PublishedPage[]
}

export function SeoSettingsClient({ initialSettings, publishedPages }: SeoSettingsClientProps) {
  const [settings, setSettings] = useState<SeoSettings>(initialSettings || {})
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("general")
  const [copied, setCopied] = useState<string | null>(null)

  const updateSetting = (field: keyof SeoSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    
    try {
      const response = await fetch('/api/cms/seo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        // Show success message
        console.log('SEO settings saved successfully')
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error saving SEO settings:', error)
      alert('Failed to save SEO settings')
    } finally {
      setIsSaving(false)
    }
  }

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const generateSitemap = () => {
    const baseUrl = window.location.origin
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
${publishedPages.map(page => `  <url>
    <loc>${baseUrl}/${page.slug}</loc>
    <lastmod>${new Date(page.updatedAt).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`
    
    return sitemap
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SEO Settings</h1>
          <p className="text-gray-600">Manage your website's search engine optimization</p>
        </div>
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center space-x-2"
        >
          <Save className="h-4 w-4" />
          <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
        </Button>
      </div>

      {/* SEO Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published Pages</p>
                <p className="text-2xl font-bold text-gray-900">{publishedPages.length}</p>
              </div>
              <Globe className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Analytics Setup</p>
                <p className="text-2xl font-bold text-gray-900">
                  {settings.googleAnalyticsId ? '✓' : '✗'}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Social Media</p>
                <p className="text-2xl font-bold text-gray-900">
                  {[settings.twitterHandle, settings.facebookUrl, settings.linkedinUrl].filter(Boolean).length}/3
                </p>
              </div>
              <Search className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Robots.txt</p>
                <p className="text-2xl font-bold text-gray-900">
                  {settings.robotsTxt ? '✓' : '✗'}
                </p>
              </div>
              <FileText className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="sitemap">Sitemap</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Site Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={settings.siteName || ''}
                  onChange={(e) => updateSetting('siteName', e.target.value)}
                  placeholder="Your Company Name"
                />
              </div>
              
              <div>
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={settings.siteDescription || ''}
                  onChange={(e) => updateSetting('siteDescription', e.target.value)}
                  placeholder="A brief description of your website"
                  rows={3}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Used as default meta description for pages without custom descriptions
                </p>
              </div>
              
              <div>
                <Label htmlFor="defaultOgImage">Default Open Graph Image</Label>
                <Input
                  id="defaultOgImage"
                  value={settings.defaultOgImage || ''}
                  onChange={(e) => updateSetting('defaultOgImage', e.target.value)}
                  placeholder="https://yoursite.com/og-image.jpg"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Default image for social media sharing (1200x630px recommended)
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Settings */}
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analytics & Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="googleAnalyticsId">Google Analytics ID</Label>
                <Input
                  id="googleAnalyticsId"
                  value={settings.googleAnalyticsId || ''}
                  onChange={(e) => updateSetting('googleAnalyticsId', e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                />
              </div>
              
              <div>
                <Label htmlFor="googleTagManagerId">Google Tag Manager ID</Label>
                <Input
                  id="googleTagManagerId"
                  value={settings.googleTagManagerId || ''}
                  onChange={(e) => updateSetting('googleTagManagerId', e.target.value)}
                  placeholder="GTM-XXXXXXX"
                />
              </div>
              
              <div>
                <Label htmlFor="facebookPixelId">Facebook Pixel ID</Label>
                <Input
                  id="facebookPixelId"
                  value={settings.facebookPixelId || ''}
                  onChange={(e) => updateSetting('facebookPixelId', e.target.value)}
                  placeholder="123456789012345"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Media Settings */}
        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Profiles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="twitterHandle">Twitter Handle</Label>
                <Input
                  id="twitterHandle"
                  value={settings.twitterHandle || ''}
                  onChange={(e) => updateSetting('twitterHandle', e.target.value)}
                  placeholder="@yourcompany"
                />
              </div>
              
              <div>
                <Label htmlFor="facebookUrl">Facebook URL</Label>
                <Input
                  id="facebookUrl"
                  value={settings.facebookUrl || ''}
                  onChange={(e) => updateSetting('facebookUrl', e.target.value)}
                  placeholder="https://facebook.com/yourcompany"
                />
              </div>
              
              <div>
                <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                <Input
                  id="linkedinUrl"
                  value={settings.linkedinUrl || ''}
                  onChange={(e) => updateSetting('linkedinUrl', e.target.value)}
                  placeholder="https://linkedin.com/company/yourcompany"
                />
              </div>
              
              <div>
                <Label htmlFor="instagramUrl">Instagram URL</Label>
                <Input
                  id="instagramUrl"
                  value={settings.instagramUrl || ''}
                  onChange={(e) => updateSetting('instagramUrl', e.target.value)}
                  placeholder="https://instagram.com/yourcompany"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Technical Settings */}
        <TabsContent value="technical" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Technical SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="robotsTxt">Robots.txt Content</Label>
                <Textarea
                  id="robotsTxt"
                  value={settings.robotsTxt || ''}
                  onChange={(e) => updateSetting('robotsTxt', e.target.value)}
                  placeholder="User-agent: *&#10;Allow: /&#10;&#10;Sitemap: /sitemap.xml"
                  rows={6}
                />
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-500">
                    Controls how search engines crawl your site
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('/robots.txt', '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View Current
                  </Button>
                </div>
              </div>
              
              <div>
                <Label htmlFor="customHead">Custom Head HTML</Label>
                <Textarea
                  id="customHead"
                  value={settings.customHead || ''}
                  onChange={(e) => updateSetting('customHead', e.target.value)}
                  placeholder="<meta name=&quot;custom&quot; content=&quot;value&quot;>"
                  rows={4}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Additional HTML to include in the &lt;head&gt; section
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sitemap */}
        <TabsContent value="sitemap" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>XML Sitemap</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Published Pages ({publishedPages.length})</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {publishedPages.map((page) => (
                    <div key={page.id} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">/{page.slug}</span>
                      <span className="text-gray-500">
                        {new Date(page.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => copyToClipboard(generateSitemap(), 'sitemap')}
                >
                  {copied === 'sitemap' ? (
                    <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4 mr-2" />
                  )}
                  Copy Sitemap XML
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => window.open('/sitemap.xml', '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Sitemap
                </Button>
              </div>
              
              <p className="text-xs text-gray-500">
                The sitemap is automatically generated from your published pages and updated when you publish new content.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
