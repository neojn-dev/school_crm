"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { 
  Layers,
  Eye,
  Download,
  Building2,
  BookOpen,
  User,
  ShoppingCart
} from "lucide-react"

interface Template {
  id: string
  name: string
  description?: string
  category: string
  structure: string
  previewImage?: string
  isActive: boolean
}

interface TemplateSelectorProps {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (template: Template) => void
  selectedTemplateId?: string
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'business': return Building2
    case 'blog': return BookOpen
    case 'portfolio': return User
    case 'ecommerce': return ShoppingCart
    default: return Layers
  }
}

export function TemplateSelector({ 
  isOpen, 
  onClose, 
  onSelectTemplate, 
  selectedTemplateId 
}: TemplateSelectorProps) {
  const [templates, setTemplates] = useState<Template[]>([])
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(false)
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null)

  // Fetch templates
  useEffect(() => {
    if (isOpen) {
      fetchTemplates()
    }
  }, [isOpen])

  // Filter templates by category
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredTemplates(templates)
    } else {
      setFilteredTemplates(templates.filter(t => t.category === selectedCategory))
    }
  }, [templates, selectedCategory])

  const fetchTemplates = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/cms/templates?isActive=true')
      if (response.ok) {
        const data = await response.json()
        setTemplates(data)
      }
    } catch (error) {
      console.error('Error fetching templates:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const categories = [
    { id: 'all', name: 'All Templates', icon: Layers },
    { id: 'business', name: 'Business', icon: Building2 },
    { id: 'blog', name: 'Blog', icon: BookOpen },
    { id: 'portfolio', name: 'Portfolio', icon: User },
    { id: 'ecommerce', name: 'E-commerce', icon: ShoppingCart }
  ]

  const handleSelectTemplate = (template: Template) => {
    onSelectTemplate(template)
    onClose()
  }

  const previewStructure = (template: Template) => {
    try {
      return JSON.parse(template.structure)
    } catch (e) {
      return []
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Layers className="h-5 w-5" />
              <span>Choose a Template</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Category Filter */}
            <div className="flex items-center space-x-4">
              <Label htmlFor="category">Category:</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => {
                    const Icon = category.icon
                    return (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center space-x-2">
                          <Icon className="h-4 w-4" />
                          <span>{category.name}</span>
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Templates Grid */}
            <div className="max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <Layers className="mx-auto h-8 w-8 text-gray-400 animate-spin mb-2" />
                    <p className="text-gray-600">Loading templates...</p>
                  </div>
                </div>
              ) : filteredTemplates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredTemplates.map((template) => {
                    const Icon = getCategoryIcon(template.category)
                    const isSelected = selectedTemplateId === template.id
                    
                    return (
                      <div
                        key={template.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                          isSelected 
                            ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleSelectTemplate(template)}
                      >
                        {/* Template Preview */}
                        <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-md mb-3 flex items-center justify-center relative">
                          {template.previewImage ? (
                            <img 
                              src={template.previewImage} 
                              alt={template.name}
                              className="w-full h-full object-cover rounded-md"
                            />
                          ) : (
                            <Icon className="h-8 w-8 text-gray-400" />
                          )}
                          
                          {isSelected && (
                            <div className="absolute inset-0 bg-blue-500 bg-opacity-20 rounded-md flex items-center justify-center">
                              <div className="bg-blue-500 text-white rounded-full p-2">
                                <Download className="h-4 w-4" />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Template Info */}
                        <div className="space-y-2">
                          <h3 className="font-semibold text-gray-900">{template.name}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {template.description}
                          </p>
                          
                          <div className="flex items-center justify-between pt-2">
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded capitalize">
                              {template.category}
                            </span>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                setPreviewTemplate(template)
                              }}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Layers className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No templates found
                  </h3>
                  <p className="text-gray-600">
                    {selectedCategory === 'all' 
                      ? 'No templates are available yet.'
                      : `No templates found in the ${selectedCategory} category.`
                    }
                  </p>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={onClose}
              disabled={!selectedTemplateId}
            >
              Continue without Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Template Preview Modal */}
      {previewTemplate && (
        <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Preview: {previewTemplate.name}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <p className="text-gray-600">{previewTemplate.description}</p>
              
              {/* Template Structure Preview */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h4 className="font-medium text-gray-900 mb-3">Template Structure:</h4>
                <div className="space-y-2">
                  {previewStructure(previewTemplate).map((block: any, index: number) => (
                    <div key={block.id || index} className="flex items-center space-x-3 text-sm">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </span>
                      <span className="font-medium">{block.type} Block</span>
                      <span className="text-gray-500">({block.component})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setPreviewTemplate(null)}>
                Close
              </Button>
              <Button onClick={() => handleSelectTemplate(previewTemplate)}>
                <Download className="h-4 w-4 mr-2" />
                Use This Template
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
