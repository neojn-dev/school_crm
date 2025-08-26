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
import { ArrowLeft, Save, Eye, Trash2, Layers, Settings } from "lucide-react"
import { PageBuilder } from "@/components/cms/page-builder/page-builder"
import { TemplateSelector } from "@/components/cms/template-selector"
import Link from "next/link"

interface PageEditClientProps {
  page: any
}

export function PageEditClient({ page }: PageEditClientProps) {
  const router = useRouter()
  const [pageData, setPageData] = useState({
    title: page.title || "",
    slug: page.slug || "",
    description: page.description || "",
    metaTitle: page.metaTitle || "",
    metaDescription: page.metaDescription || "",
    metaKeywords: page.metaKeywords || "",
    layout: page.layout || "public",
    isPublished: page.isPublished || false
  })
  const [blocks, setBlocks] = useState(page.parsedBlocks || [])
  const [activeTab, setActiveTab] = useState<'content' | 'settings' | 'seo'>('content')
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<any>(page.template || null)
  const [showPageSettings, setShowPageSettings] = useState(false)

  const handleSave = async (isDraft?: boolean) => {
    setIsSaving(true)
    
    try {
      const response = await fetch(`/api/cms/pages/${page.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...pageData,
          content: JSON.stringify(blocks),
          isPublished: isDraft !== undefined ? !isDraft : pageData.isPublished,
          templateId: selectedTemplate?.id
        }),
      })

      if (response.ok) {
        // Show success message
        console.log('Page saved successfully')
        // You could add a toast notification here
        alert('Page saved successfully!')
      } else {
        const error = await response.json()
        console.error('Save error:', error)
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error saving page:', error)
      alert('Failed to save page')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this page? This action cannot be undone.')) {
      return
    }

    setIsDeleting(true)
    
    try {
      const response = await fetch(`/api/cms/pages/${page.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        router.push('/cms/pages')
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error('Error deleting page:', error)
      alert('Failed to delete page')
    } finally {
      setIsDeleting(false)
    }
  }

  const handlePreview = () => {
    // Open preview in new tab
    window.open(`/${pageData.slug}?preview=true`, '_blank')
  }

  // Handle template selection
  const handleTemplateSelect = (template: any) => {
    if (confirm('Applying a template will replace your current page content. Are you sure?')) {
      setSelectedTemplate(template)
      
      // Parse and load template structure
      try {
        const structure = JSON.parse(template.structure)
        setBlocks(structure)
      } catch (error) {
        console.error('Error loading template structure:', error)
      }
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
                  Edit: {page.title}
                </h1>
                <p className="text-sm text-gray-500">
                  Last updated: {new Date(page.updatedAt).toLocaleDateString()}
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
                Apply Template
              </Button>
              
              <Button
                variant="outline"
                onClick={handlePreview}
                disabled={isSaving}
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              
              <Button
                variant="outline"
                onClick={() => handleSave(true)}
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              
              <Button
                onClick={() => handleSave(false)}
                disabled={isSaving}
              >
                <Save className="h-4 w-4 mr-2" />
                {pageData.isPublished ? 'Update' : 'Publish'}
              </Button>
              
              <Button
                variant="outline"
                onClick={handleDelete}
                disabled={isDeleting}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Full Width Page Builder */}
        <div className="flex-1 overflow-hidden">
          <PageBuilder
            initialBlocks={blocks}
            onSave={setBlocks}
          />
        </div>
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

              {/* Status Badge */}
              <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <span className="text-sm font-medium text-gray-700">Current Status:</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  pageData.isPublished 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {pageData.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>

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
                      onChange={(e) => setPageData(prev => ({ ...prev, title: e.target.value }))}
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
                    <Label htmlFor="isPublished" className="text-sm font-medium">Published</Label>
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
