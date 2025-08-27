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
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { ArrowLeft, Save, Eye, Layers, Settings } from "lucide-react"
import { DragDropPageBuilder } from "@/components/cms/page-builder/drag-drop-page-builder"
import { TemplateSelector } from "@/components/cms/template-selector"
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
  templateId?: string
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
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)
  const [showPageSettings, setShowPageSettings] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)

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
          isPublished: !isDraft,
          templateId: selectedTemplate?.id
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

  // Handle template selection
  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template)
    
    // Parse and load template structure
    try {
      const structure = JSON.parse(template.structure)
      setBlocks(structure)
      
      // Update page data with template info
      setPageData(prev => ({
        ...prev,
        templateId: template.id,
        // Optionally inherit template name as page title if not set
        title: prev.title || `Page from ${template.name}`,
        description: prev.description || template.description
      }))
    } catch (error) {
      console.error('Error loading template structure:', error)
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
                onClick={() => setShowPageSettings(true)}
                disabled={isSaving}
              >
                <Settings className="h-4 w-4 mr-2" />
                Page Settings
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setShowTemplateSelector(true)}
                disabled={isSaving}
              >
                <Layers className="h-4 w-4 mr-2" />
                Choose Template
              </Button>
              
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

      {/* Full Width Page Builder */}
      <div className="flex-1 overflow-hidden">
        <DragDropPageBuilder
          initialBlocks={blocks}
          onSave={setBlocks}
        />
      </div>

      {/* Page Settings Modal */}
      <Dialog open={showPageSettings} onOpenChange={setShowPageSettings}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Settings className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Page Settings</h2>
                <p className="text-sm text-gray-600 mt-1">Configure page details, SEO, and publishing options</p>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto">
            <div className="space-y-6 p-1">
              {/* Template Info */}
              {selectedTemplate && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-900">
                        Using Template: {selectedTemplate.name}
                      </p>
                      <p className="text-xs text-blue-700">
                        {selectedTemplate.description}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowTemplateSelector(true)}
                    >
                      Change
                    </Button>
                  </div>
                </div>
              )}

              {/* Tabs */}
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('content')}
                  className={`flex-1 py-3 px-4 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'content'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Content
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`flex-1 py-3 px-4 text-sm font-medium rounded-md transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Settings
                </button>
                <button
                  onClick={() => setActiveTab('seo')}
                  className={`flex-1 py-3 px-4 text-sm font-medium rounded-md transition-colors ${
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
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="title" className="text-sm font-semibold">Page Title *</Label>
                    <Input
                      id="title"
                      value={pageData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="Enter page title"
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="slug" className="text-sm font-semibold">URL Slug *</Label>
                    <Input
                      id="slug"
                      value={pageData.slug}
                      onChange={(e) => setPageData(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="page-url-slug"
                      className="mt-2"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      URL: /{pageData.slug}
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="description" className="text-sm font-semibold">Description</Label>
                    <Textarea
                      id="description"
                      value={pageData.description}
                      onChange={(e) => setPageData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Brief description of the page"
                      rows={3}
                      className="mt-2"
                    />
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="layout" className="text-sm font-semibold">Layout</Label>
                    <Select
                      value={pageData.layout}
                      onValueChange={(value) => setPageData(prev => ({ ...prev, layout: value }))}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public Website</SelectItem>
                        <SelectItem value="app">Application</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="isPublished"
                      checked={pageData.isPublished}
                      onChange={(e) => setPageData(prev => ({ ...prev, isPublished: e.target.checked }))}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Label htmlFor="isPublished" className="text-sm font-medium">Publish immediately</Label>
                  </div>
                </div>
              )}

              {/* SEO Tab */}
              {activeTab === 'seo' && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="metaTitle" className="text-sm font-semibold">Meta Title</Label>
                    <Input
                      id="metaTitle"
                      value={pageData.metaTitle}
                      onChange={(e) => setPageData(prev => ({ ...prev, metaTitle: e.target.value }))}
                      placeholder="SEO title (60 chars max)"
                      maxLength={60}
                      className="mt-2"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      {pageData.metaTitle.length}/60 characters
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="metaDescription" className="text-sm font-semibold">Meta Description</Label>
                    <Textarea
                      id="metaDescription"
                      value={pageData.metaDescription}
                      onChange={(e) => setPageData(prev => ({ ...prev, metaDescription: e.target.value }))}
                      placeholder="SEO description (160 chars max)"
                      maxLength={160}
                      rows={3}
                      className="mt-2"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      {pageData.metaDescription.length}/160 characters
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="metaKeywords" className="text-sm font-semibold">Keywords</Label>
                    <Input
                      id="metaKeywords"
                      value={pageData.metaKeywords}
                      onChange={(e) => setPageData(prev => ({ ...prev, metaKeywords: e.target.value }))}
                      placeholder="keyword1, keyword2, keyword3"
                      className="mt-2"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="border-t pt-4">
            <Button variant="outline" onClick={() => setShowPageSettings(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowPageSettings(false)}>
              Save Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Template Selector Modal */}
      <TemplateSelector
        isOpen={showTemplateSelector}
        onClose={() => setShowTemplateSelector(false)}
        onSelectTemplate={handleTemplateSelect}
        selectedTemplateId={selectedTemplate?.id}
      />
    </div>
  )
}
