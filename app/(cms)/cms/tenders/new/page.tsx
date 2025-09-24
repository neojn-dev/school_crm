"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { WysiwygEditor } from "@/components/cms/wysiwyg-editor"
import { ImageSelector } from "@/components/cms/image-selector"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  Save, 
  Eye, 
  Calendar, 
  Tag, 
  Image as ImageIcon, 
  Settings,
  FileText,
  Globe,
  Share2,
  Building2,
  DollarSign,
  Clock,
  Award,
  Gavel
} from "lucide-react"

interface TenderFormData {
  title: string
  slug: string
  excerpt: string
  description: string
  headerImage: string
  layout: string
  status: string
  featured: boolean
  category: string
  sector: string
  tenderType: string
  referenceNo: string
  estimatedValue: string
  currency: string
  tags: string[]
  publishedAt: string
  closingAt: string
  isActive: boolean
  
  // SEO
  metaTitle: string
  metaDescription: string
  metaKeywords: string
  
  // Social Media
  ogTitle: string
  ogDescription: string
  ogImage: string
}

const layoutOptions = [
  { value: 'default', label: 'Default', description: 'Standard tender layout' },
  { value: 'featured', label: 'Featured', description: 'Prominent display with large header' },
  { value: 'urgent', label: 'Urgent', description: 'High-priority urgent style' },
  { value: 'standard', label: 'Standard', description: 'Professional standard format' },
  { value: 'compact', label: 'Compact', description: 'Space-efficient layout' },
  { value: 'detailed', label: 'Detailed', description: 'Comprehensive information display' }
]

const categoryOptions = [
  'Government', 'Private', 'International', 'Local', 'Federal', 'State', 'Municipal', 'Corporate'
]

const sectorOptions = [
  'Healthcare', 'Education', 'Infrastructure', 'Technology', 'Construction', 'Manufacturing',
  'Finance', 'Transportation', 'Energy', 'Agriculture', 'Tourism', 'Real Estate', 'Other'
]

const tenderTypeOptions = [
  { value: 'supply', label: 'Supply', description: 'Goods and materials' },
  { value: 'service', label: 'Service', description: 'Professional services' },
  { value: 'construction', label: 'Construction', description: 'Building and infrastructure' },
  { value: 'consultancy', label: 'Consultancy', description: 'Expert advice and consulting' },
  { value: 'maintenance', label: 'Maintenance', description: 'Ongoing maintenance services' },
  { value: 'research', label: 'Research', description: 'Research and development' }
]

const statusOptions = [
  { value: 'draft', label: 'Draft', description: 'Work in progress' },
  { value: 'published', label: 'Published', description: 'Live and accepting bids' },
  { value: 'closed', label: 'Closed', description: 'No longer accepting bids' },
  { value: 'awarded', label: 'Awarded', description: 'Contract awarded' },
  { value: 'cancelled', label: 'Cancelled', description: 'Tender cancelled' }
]

const currencyOptions = [
  'USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR', 'BRL', 'MXN', 'KRW'
]

export default function NewTenderPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('content')
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<TenderFormData>({
    title: '',
    slug: '',
    excerpt: '',
    description: '',
    headerImage: '',
    layout: 'default',
    status: 'draft',
    featured: false,
    category: '',
    sector: '',
    tenderType: '',
    referenceNo: '',
    estimatedValue: '',
    currency: 'USD',
    tags: [],
    publishedAt: '',
    closingAt: '',
    isActive: true,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: ''
  })

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
      metaTitle: title.length > 0 ? title : ''
    }))
  }

  const handleTagsChange = (tagsString: string) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    setFormData(prev => ({ ...prev, tags }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/tenders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          authorId: session?.user?.id,
          createdBy: session?.user?.id,
          tags: JSON.stringify(formData.tags),
          metaKeywords: JSON.stringify(formData.metaKeywords.split(',').map(k => k.trim())),
          publishedAt: formData.status === 'published' && formData.publishedAt 
            ? new Date(formData.publishedAt).toISOString() 
            : formData.status === 'published' 
              ? new Date().toISOString() 
              : null,
          closingAt: formData.closingAt ? new Date(formData.closingAt).toISOString() : null
        })
      })
      
      if (res.ok) {
        router.push('/cms/tenders')
      } else {
        console.error('Failed to save tender')
      }
    } catch (error) {
      console.error('Error saving tender:', error)
    } finally {
      setSaving(false)
    }
  }

  const handlePublish = async () => {
    setFormData(prev => ({ ...prev, status: 'published' }))
    await handleSave()
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Create New Tender</h1>
          <p className="text-gray-600">Publish tender opportunities and procurement requirements.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push('/cms/tenders')}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Draft'}
          </Button>
          <Button variant="default" onClick={handlePublish} disabled={saving}>
            <Eye className="h-4 w-4 mr-2" />
            {saving ? 'Publishing...' : 'Publish'}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="content" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Content
          </TabsTrigger>
          <TabsTrigger value="media" className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4" />
            Media
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            SEO
          </TabsTrigger>
          <TabsTrigger value="social" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Social
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter tender title"
                    className="text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="tender-url-slug"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Brief summary of the tender"
                  rows={3}
                  maxLength={500}
                />
                <div className="text-xs text-gray-500 text-right">
                  {formData.excerpt.length}/500 characters
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description *</Label>
                <WysiwygEditor
                  value={formData.description}
                  onChange={(description) => setFormData(prev => ({ ...prev, description }))}
                  placeholder="Write detailed tender description and requirements..."
                  height="400px"
                  showToolbar={true}
                  showPreview={true}
                  showLayoutOptions={false}
                  showSeoOptions={false}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Media Tab */}
        <TabsContent value="media" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Images & Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ImageSelector
                value={formData.headerImage}
                onChange={(url) => setFormData(prev => ({ ...prev, headerImage: url }))}
                label="Header Image"
                description="Large image displayed at the top of the tender"
                placeholder="Select a header image for your tender"
                allowUpload={true}
                allowCrop={true}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Tab */}
        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Search Engine Optimization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    value={formData.metaTitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
                    placeholder="SEO title (max 60 characters)"
                    maxLength={60}
                  />
                  <div className="text-xs text-gray-500">
                    {formData.metaTitle.length}/60 characters
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    value={formData.metaDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                    placeholder="SEO description (max 160 characters)"
                    maxLength={160}
                    rows={3}
                  />
                  <div className="text-xs text-gray-500">
                    {formData.metaDescription.length}/160 characters
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="metaKeywords">Meta Keywords</Label>
                <Input
                  id="metaKeywords"
                  value={formData.metaKeywords}
                  onChange={(e) => setFormData(prev => ({ ...prev, metaKeywords: e.target.value }))}
                  placeholder="Keywords separated by commas"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Tab */}
        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Sharing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ogTitle">Open Graph Title</Label>
                  <Input
                    id="ogTitle"
                    value={formData.ogTitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, ogTitle: e.target.value }))}
                    placeholder="Social media title"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ogDescription">Open Graph Description</Label>
                  <Textarea
                    id="ogDescription"
                    value={formData.ogDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, ogDescription: e.target.value }))}
                    placeholder="Social media description"
                    rows={3}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ogImage">Open Graph Image</Label>
                <Input
                  id="ogImage"
                  value={formData.ogImage}
                  onChange={(e) => setFormData(prev => ({ ...prev, ogImage: e.target.value }))}
                  placeholder="https://example.com/social-image.jpg"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tender Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sector">Sector</Label>
                  <Select
                    value={formData.sector}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, sector: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      {sectorOptions.map(sector => (
                        <SelectItem key={sector} value={sector}>
                          {sector}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tenderType">Tender Type</Label>
                  <Select
                    value={formData.tenderType}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, tenderType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {tenderTypeOptions.map(type => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="referenceNo">Reference Number</Label>
                  <Input
                    id="referenceNo"
                    value={formData.referenceNo}
                    onChange={(e) => setFormData(prev => ({ ...prev, referenceNo: e.target.value }))}
                    placeholder="Tender reference number"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={formData.currency}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencyOptions.map(currency => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="estimatedValue">Estimated Value</Label>
                  <Input
                    id="estimatedValue"
                    value={formData.estimatedValue}
                    onChange={(e) => setFormData(prev => ({ ...prev, estimatedValue: e.target.value }))}
                    placeholder="Estimated contract value"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="publishedAt">Publish Date</Label>
                  <Input
                    id="publishedAt"
                    type="datetime-local"
                    value={formData.publishedAt}
                    onChange={(e) => setFormData(prev => ({ ...prev, publishedAt: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="closingAt">Closing Date *</Label>
                <Input
                  id="closingAt"
                  type="datetime-local"
                  value={formData.closingAt}
                  onChange={(e) => setFormData(prev => ({ ...prev, closingAt: e.target.value }))}
                  required
                />
                <p className="text-xs text-gray-500">When the tender closes for submissions</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={formData.tags.join(', ')}
                  onChange={(e) => handleTagsChange(e.target.value)}
                  placeholder="Enter tags separated by commas"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                  className="rounded"
                />
                <Label htmlFor="featured">Feature this tender</Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="rounded"
                />
                <Label htmlFor="isActive">Active tender</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


