"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save, Eye } from "lucide-react"
import { PageBuilder } from "@/components/cms/page-builder/page-builder"
import Link from "next/link"

interface PageData {
  title: string
  slug: string
  description: string
  metaTitle: string
  metaDescription: string
  metaKeywords: string
  layout: string
  isPublished: boolean
}

export default function NewPagePage() {
  const router = useRouter()
  const [pageData, setPageData] = useState<PageData>({
    title: "",
    slug: "",
    description: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    layout: "public",
    isPublished: false
  })
  const [blocks, setBlocks] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<'content' | 'settings' | 'seo'>('content')
  const [isSaving, setIsSaving] = useState(false)

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (title: string) => {
    setPageData(prev => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
      metaTitle: prev.metaTitle || title
    }))
  }

  const handleSave = async (isDraft = true) => {
    setIsSaving(true)
    
    try {
      const response = await fetch('/api/cms/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...pageData,
          content: JSON.stringify(blocks),
          isPublished: !isDraft
        }),
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Page created successfully')
        router.push(`/cms/pages/${result.page.id}/edit`)
      } else {
        const error = await response.json()
        console.error('Create error:', error)
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error saving page:', error)
      alert('Failed to save page')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/cms/pages">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Pages
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Create New Page
                </h1>
                <p className="text-sm text-gray-500">
                  Build your page using the drag-and-drop editor
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => handleSave(true)}
                disabled={!pageData.title || isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              
              <Button
                onClick={() => handleSave(false)}
                disabled={!pageData.title || isSaving}
              >
                <Eye className="h-4 w-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Page Settings */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Page Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Tabs */}
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setActiveTab('content')}
                    className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                      activeTab === 'content'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Content
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                      activeTab === 'settings'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Settings
                  </button>
                  <button
                    onClick={() => setActiveTab('seo')}
                    className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
                      activeTab === 'seo'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    SEO
                  </button>
                </div>

                {/* Content Tab */}
                {activeTab === 'content' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Page Title *</Label>
                      <Input
                        id="title"
                        value={pageData.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="Enter page title"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="slug">URL Slug *</Label>
                      <Input
                        id="slug"
                        value={pageData.slug}
                        onChange={(e) => setPageData(prev => ({ ...prev, slug: e.target.value }))}
                        placeholder="page-url-slug"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        URL: /{pageData.slug}
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={pageData.description}
                        onChange={(e) => setPageData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Brief description of the page"
                        rows={3}
                      />
                    </div>
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="layout">Layout</Label>
                      <Select
                        value={pageData.layout}
                        onValueChange={(value) => setPageData(prev => ({ ...prev, layout: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public Website</SelectItem>
                          <SelectItem value="app">Application</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isPublished"
                        checked={pageData.isPublished}
                        onChange={(e) => setPageData(prev => ({ ...prev, isPublished: e.target.checked }))}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <Label htmlFor="isPublished">Publish immediately</Label>
                    </div>
                  </div>
                )}

                {/* SEO Tab */}
                {activeTab === 'seo' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="metaTitle">Meta Title</Label>
                      <Input
                        id="metaTitle"
                        value={pageData.metaTitle}
                        onChange={(e) => setPageData(prev => ({ ...prev, metaTitle: e.target.value }))}
                        placeholder="SEO title (60 chars max)"
                        maxLength={60}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {pageData.metaTitle.length}/60 characters
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="metaDescription">Meta Description</Label>
                      <Textarea
                        id="metaDescription"
                        value={pageData.metaDescription}
                        onChange={(e) => setPageData(prev => ({ ...prev, metaDescription: e.target.value }))}
                        placeholder="SEO description (160 chars max)"
                        maxLength={160}
                        rows={3}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {pageData.metaDescription.length}/160 characters
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="metaKeywords">Keywords</Label>
                      <Input
                        id="metaKeywords"
                        value={pageData.metaKeywords}
                        onChange={(e) => setPageData(prev => ({ ...prev, metaKeywords: e.target.value }))}
                        placeholder="keyword1, keyword2, keyword3"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Page Builder */}
          <div className="lg:col-span-3">
            <Card className="h-full">
              <CardContent className="p-0 h-full">
                <PageBuilder
                  initialBlocks={blocks}
                  onSave={setBlocks}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
