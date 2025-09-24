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
import { Separator } from "@/components/ui/separator"
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
  BarChart3
} from "lucide-react"

interface BlogFormData {
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string
  headerImage: string
  layout: string
  status: string
  featured: boolean
  category: string
  tags: string[]
  publishedAt: string
  scheduledAt: string
  
  // SEO
  metaTitle: string
  metaDescription: string
  metaKeywords: string
  canonicalUrl: string
  
  // Social Media
  ogTitle: string
  ogDescription: string
  ogImage: string
  twitterCard: string
}

const layoutOptions = [
  { value: 'default', label: 'Default', description: 'Standard content layout' },
  { value: 'featured', label: 'Featured', description: 'Prominent display with large header' },
  { value: 'sidebar', label: 'Sidebar', description: 'Content with right sidebar' },
  { value: 'full-width', label: 'Full Width', description: 'Content spans entire width' },
  { value: 'centered', label: 'Centered', description: 'Content centered with max-width' },
  { value: 'magazine', label: 'Magazine', description: 'Multi-column magazine style' }
]

const categoryOptions = [
  'Technology', 'Business', 'Health', 'Education', 'Entertainment', 
  'Sports', 'Politics', 'Science', 'Travel', 'Food', 'Fashion', 'Other'
]

const statusOptions = [
  { value: 'draft', label: 'Draft', description: 'Work in progress' },
  { value: 'published', label: 'Published', description: 'Live on website' },
  { value: 'archived', label: 'Archived', description: 'Hidden from public' }
]

export default function NewBlogPostPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('content')
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    headerImage: '',
    layout: 'default',
    status: 'draft',
    featured: false,
    category: '',
    tags: [],
    publishedAt: '',
    scheduledAt: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    canonicalUrl: '',
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    twitterCard: 'summary'
  })
  const [imageMetadata, setImageMetadata] = useState({
    coverImage: null as any,
    headerImage: null as any,
    ogImage: null as any
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
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          authorId: session?.user?.id,
          createdBy: session?.user?.id,
          tags: JSON.stringify(formData.tags),
          metaKeywords: JSON.stringify(formData.metaKeywords.split(',').map(k => k.trim())),
          publishedAt: formData.status === 'published' ? new Date().toISOString() : null
        })
      })
      
      if (res.ok) {
        router.push('/cms/blogs')
      } else {
        console.error('Failed to save blog post')
      }
    } catch (error) {
      console.error('Error saving blog post:', error)
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
          <h1 className="text-3xl font-bold">Create New Blog Post</h1>
          <p className="text-gray-600">Write and publish engaging content with our enhanced editor.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push('/cms/blogs')}>
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
                    placeholder="Enter blog post title"
                    className="text-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="blog-post-url-slug"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  placeholder="Brief summary of the blog post"
                  rows={3}
                  maxLength={500}
                />
                <div className="text-xs text-gray-500 text-right">
                  {formData.excerpt.length}/500 characters
                </div>
              </div>

              <div className="space-y-2">
                <Label>Content *</Label>
                <WysiwygEditor
                  value={formData.content}
                  onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                  placeholder="Start writing your blog post content..."
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
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <ImageSelector
                  value={formData.coverImage}
                  onChange={(url, metadata) => {
                    setFormData(prev => ({ ...prev, coverImage: url }))
                    setImageMetadata(prev => ({ ...prev, coverImage: metadata }))
                  }}
                  label="Cover Image"
                  description="Main image displayed in blog listings and social media previews"
                  placeholder="Select a cover image for your blog post"
                  allowUpload={true}
                  allowCrop={true}
                />
                
                <ImageSelector
                  value={formData.headerImage}
                  onChange={(url, metadata) => {
                    setFormData(prev => ({ ...prev, headerImage: url }))
                    setImageMetadata(prev => ({ ...prev, headerImage: metadata }))
                  }}
                  label="Header Image"
                  description="Large image displayed at the top of the blog post"
                  placeholder="Select a header image for your blog post"
                  allowUpload={true}
                  allowCrop={true}
                />
              </div>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="metaKeywords">Meta Keywords</Label>
                  <Input
                    id="metaKeywords"
                    value={formData.metaKeywords}
                    onChange={(e) => setFormData(prev => ({ ...prev, metaKeywords: e.target.value }))}
                    placeholder="Keywords separated by commas"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="canonicalUrl">Canonical URL</Label>
                  <Input
                    id="canonicalUrl"
                    value={formData.canonicalUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, canonicalUrl: e.target.value }))}
                    placeholder="https://example.com/blog/post"
                  />
                </div>
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

              <div className="space-y-4">
                <ImageSelector
                  value={formData.ogImage}
                  onChange={(url, metadata) => {
                    setFormData(prev => ({ ...prev, ogImage: url }))
                    setImageMetadata(prev => ({ ...prev, ogImage: metadata }))
                  }}
                  label="Open Graph Image"
                  description="Image displayed when sharing on social media platforms"
                  placeholder="Select an image for social media sharing"
                  allowUpload={true}
                  allowCrop={true}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="space-y-2">
                  <Label htmlFor="twitterCard">Twitter Card Type</Label>
                  <Select
                    value={formData.twitterCard}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, twitterCard: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="summary">Summary</SelectItem>
                      <SelectItem value="summary_large_image">Summary Large Image</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publishing Settings</CardTitle>
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
                  <Label htmlFor="layout">Layout</Label>
                  <Select
                    value={formData.layout}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, layout: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {layoutOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="publishedAt">Publish Date</Label>
                  <Input
                    id="publishedAt"
                    type="datetime-local"
                    value={formData.publishedAt}
                    onChange={(e) => setFormData(prev => ({ ...prev, publishedAt: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="scheduledAt">Schedule Date</Label>
                  <Input
                    id="scheduledAt"
                    type="datetime-local"
                    value={formData.scheduledAt}
                    onChange={(e) => setFormData(prev => ({ ...prev, scheduledAt: e.target.value }))}
                  />
                </div>
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
                <Label htmlFor="featured">Feature this blog post</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


