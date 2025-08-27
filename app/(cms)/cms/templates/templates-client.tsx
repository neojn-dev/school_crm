"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  PlusCircle, 
  Search, 
  Filter,
  Eye,
  Edit,
  Trash2,
  Copy,
  Layers
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog"
import { LoadingOverlay, TemplateGridSkeleton } from "@/components/cms/loading-states"

interface Template {
  id: string
  name: string
  description?: string
  category: string
  isActive: boolean
  isSystem: boolean
  previewImage?: string
  updatedAt: string
  createdByUser: { username: string; firstName?: string }
  updatedByUser: { username: string; firstName?: string }
  _count: { pages: number }
}

interface TemplatesClientProps {
  templates: Template[]
}

export function TemplatesClient({ templates: initialTemplates }: TemplatesClientProps) {
  const router = useRouter()
  const [templates, setTemplates] = useState(initialTemplates)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; template?: Template }>({ open: false })
  const [isLoading, setIsLoading] = useState(false)

  const templateCategories = [
    { id: '', name: 'All Categories', count: templates.length },
    { id: 'business', name: 'Business', count: templates.filter(t => t.category === 'business').length },
    { id: 'government', name: 'Government', count: templates.filter(t => t.category === 'government').length },
    { id: 'blog', name: 'Blog', count: templates.filter(t => t.category === 'blog').length },
    { id: 'portfolio', name: 'Portfolio', count: templates.filter(t => t.category === 'portfolio').length },
    { id: 'ecommerce', name: 'E-commerce', count: templates.filter(t => t.category === 'ecommerce').length }
  ]

  // Filter templates
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Clone template
  const handleClone = async (templateId: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/cms/templates/${templateId}/clone`, {
        method: 'POST'
      })

      if (!response.ok) {
        throw new Error('Failed to clone template')
      }

      const clonedTemplate = await response.json()
      
      // Add to templates list
      setTemplates(prev => [clonedTemplate, ...prev])
      
      // Navigate to edit the cloned template
      router.push(`/cms/templates/${clonedTemplate.id}/edit`)
    } catch (error) {
      console.error('Error cloning template:', error)
      alert('Failed to clone template. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  // Delete template
  const handleDelete = async (template: Template) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/cms/templates/${template.id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        throw new Error('Failed to delete template')
      }

      // Remove from templates list
      setTemplates(prev => prev.filter(t => t.id !== template.id))
      setDeleteDialog({ open: false })
    } catch (error) {
      console.error('Error deleting template:', error)
      alert('Failed to delete template. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="cms-card">
        <div className="cms-card-header">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Templates</h1>
              <p className="text-gray-600">Manage page templates and layouts</p>
            </div>
            <Link href="/cms/templates/new">
              <Button className="cms-button-primary">
                <PlusCircle className="h-4 w-4 mr-2" />
                <span>New Template</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="cms-card">
        <div className="cms-card-body">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search templates by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="cms-input pl-10"
              />
            </div>
            <div className="flex items-center space-x-3">
              {selectedCategory && (
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedCategory('')}
                  className="cms-button-secondary"
                >
                  <Filter className="h-4 w-4" />
                  <span>Clear Filter</span>
                </Button>
              )}
              <div className="text-sm text-gray-500">
                {filteredTemplates.length} of {templates.length} templates
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="cms-content-section">
        {isLoading ? (
          <TemplateGridSkeleton />
        ) : (
          <div className="cms-card-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="cms-card group overflow-hidden">
                {/* Preview Image */}
                <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center relative overflow-hidden">
                  {template.previewImage ? (
                    <img 
                      src={template.previewImage} 
                      alt={template.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Layers className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-500">No Preview Available</p>
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium shadow-sm ${
                      template.isActive 
                        ? 'bg-green-100 text-green-800 border border-green-200' 
                        : 'bg-gray-100 text-gray-800 border border-gray-200'
                    }`}>
                      {template.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                
                {/* Template Info */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                      {template.description || 'No description available'}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize">
                      {template.category}
                    </span>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <span>{template._count.pages}</span>
                      <span>pages</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                          {(template.updatedByUser.firstName || template.updatedByUser.username).charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span>Updated by {template.updatedByUser.firstName || template.updatedByUser.username}</span>
                      <span>•</span>
                      <span>{new Date(template.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <Link href={`/cms/templates/${template.id}/edit`}>
                      <Button variant="outline" size="sm" className="cms-button-secondary">
                        <Edit className="h-3 w-3 mr-1" />
                        <span>Edit</span>
                      </Button>
                    </Link>
                    
                    <div className="flex items-center space-x-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="p-2"
                        title="Preview Template"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="p-2"
                        onClick={() => handleClone(template.id)}
                        disabled={isLoading}
                        title="Clone Template"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      
                      {!template.isSystem && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => setDeleteDialog({ open: true, template })}
                          disabled={isLoading}
                          title="Delete Template"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="col-span-full">
            <div className="cms-card">
              <div className="cms-card-body text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Layers className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {searchTerm || selectedCategory ? 'No templates found' : 'No templates yet'}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {searchTerm || selectedCategory 
                      ? 'Try adjusting your search terms or clear the filters to see all templates.'
                      : 'Get started by creating your first template to establish consistent page layouts.'
                    }
                  </p>
                  {!searchTerm && !selectedCategory && (
                    <Link href="/cms/templates/new">
                      <Button className="cms-button-primary">
                        <PlusCircle className="h-4 w-4" />
                        <span>Create Your First Template</span>
                      </Button>
                    </Link>
                  )}
                  {(searchTerm || selectedCategory) && (
                    <div className="flex justify-center space-x-3">
                      {searchTerm && (
                        <Button 
                          variant="outline" 
                          onClick={() => setSearchTerm('')}
                          className="cms-button-secondary"
                        >
                          Clear Search
                        </Button>
                      )}
                      {selectedCategory && (
                        <Button 
                          variant="outline" 
                          onClick={() => setSelectedCategory('')}
                          className="cms-button-secondary"
                        >
                          Clear Filter
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Loading Overlay */}
      <LoadingOverlay 
        isVisible={isLoading} 
        message={deleteDialog.template ? "Deleting template..." : "Loading templates..."} 
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onOpenChange={(open) => setDeleteDialog({ open })}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Template</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{deleteDialog.template?.name}"? This action cannot be undone.
              {deleteDialog.template?._count.pages > 0 && (
                <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                  Warning: This template is currently being used by {deleteDialog.template._count.pages} page(s).
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDeleteDialog({ open: false })}
              disabled={isLoading}
              className="cms-button-secondary"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={() => deleteDialog.template && handleDelete(deleteDialog.template)}
              disabled={isLoading}
              className="cms-button-danger"
            >
              {isLoading ? 'Deleting...' : 'Delete Template'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
