"use client"

import { useState, useEffect } from "react"
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
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  X, 
  Save, 
  Plus, 
  Trash2, 
  Eye, 
  Settings, 
  Palette, 
  Layout, 
  Type,
  Image as ImageIcon,
  Link as LinkIcon,
  Zap
} from "lucide-react"
import { LiveBlockPreview } from "./live-block-preview"
import { validateBlock, hasFieldErrors } from "@/lib/block-validation"

interface PageBlock {
  id: string
  type: string
  component: string
  content: any
  settings: any
}

interface BlockEditorProps {
  block: PageBlock
  onSave: (content: any, settings?: any) => void
  onClose: () => void
}

interface FieldConfig {
  type: string
  label: string
  placeholder?: string
  required?: boolean
  options?: Array<{ value: string; label: string }>
  min?: number
  max?: number
  description?: string
  category?: string
}

export function EnhancedBlockEditor({ block, onSave, onClose }: BlockEditorProps) {
  const [content, setContent] = useState(block.content || {})
  const [settings, setSettings] = useState(block.settings || {})
  const [activeTab, setActiveTab] = useState('content')
  const [showPreview, setShowPreview] = useState(false)
  const [validationErrors, setValidationErrors] = useState<any[]>([])
  const [validationWarnings, setValidationWarnings] = useState<any[]>([])

  // Update content field
  const updateContent = (field: string, value: any) => {
    setContent(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Update settings field
  const updateSettings = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Update nested content field (for objects like buttons)
  const updateNestedContent = (parentField: string, childField: string, value: any) => {
    setContent(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [childField]: value
      }
    }))
  }

  // Update array content (for features, testimonials, etc.)
  const updateArrayContent = (field: string, index: number, itemField: string, value: any) => {
    setContent(prev => ({
      ...prev,
      [field]: prev[field]?.map((item: any, i: number) => 
        i === index ? { ...item, [itemField]: value } : item
      ) || []
    }))
  }

  // Add array item
  const addArrayItem = (field: string, defaultItem: any) => {
    setContent(prev => ({
      ...prev,
      [field]: [...(prev[field] || []), defaultItem]
    }))
  }

  // Remove array item
  const removeArrayItem = (field: string, index: number) => {
    setContent(prev => ({
      ...prev,
      [field]: prev[field]?.filter((_: any, i: number) => i !== index) || []
    }))
  }

  // Validate content and settings whenever they change
  useEffect(() => {
    const validation = validateBlock(block.component, content, settings)
    setValidationErrors(validation.errors)
    setValidationWarnings(validation.warnings)
  }, [content, settings, block.component])

  const handleSave = () => {
    const validation = validateBlock(block.component, content, settings)
    
    if (validation.errors.length > 0) {
      // Show validation errors but allow saving with warnings
      alert(`Please fix the following errors:\n${validation.errors.map(e => `• ${e.message}`).join('\n')}`)
      return
    }
    
    onSave(content, settings)
  }

  // Get comprehensive block configuration
  const getBlockConfig = (): { content: Record<string, FieldConfig>; settings: Record<string, FieldConfig> } => {
    switch (block.component) {
      case 'HeroBlock':
        return {
          content: {
            title: { type: 'text', label: 'Title', required: true, category: 'content' },
            subtitle: { type: 'text', label: 'Subtitle', category: 'content' },
            description: { type: 'textarea', label: 'Description', category: 'content' },
            textAlign: {
              type: 'select',
              label: 'Text Alignment',
              category: 'layout',
              options: [
                { value: 'left', label: 'Left' },
                { value: 'center', label: 'Center' },
                { value: 'right', label: 'Right' }
              ]
            },
            backgroundType: {
              type: 'select',
              label: 'Background Type',
              category: 'style',
              options: [
                { value: 'gradient', label: 'Gradient' },
                { value: 'image', label: 'Image' },
                { value: 'solid', label: 'Solid Color' },
                { value: 'video', label: 'Video Background' }
              ]
            },
            backgroundColor: { type: 'color', label: 'Background Color', category: 'style' },
            backgroundImage: { type: 'image', label: 'Background Image', category: 'style' },
            overlayOpacity: { type: 'range', label: 'Overlay Opacity', min: 0, max: 100, category: 'style' }
          },
          settings: {
            fullHeight: { type: 'boolean', label: 'Full Screen Height', category: 'layout' },
            parallax: { type: 'boolean', label: 'Parallax Effect', category: 'animation' },
            animation: {
              type: 'select',
              label: 'Animation',
              category: 'animation',
              options: [
                { value: 'none', label: 'None' },
                { value: 'fade', label: 'Fade In' },
                { value: 'slide', label: 'Slide Up' },
                { value: 'zoom', label: 'Zoom In' }
              ]
            },
            padding: {
              type: 'select',
              label: 'Padding',
              category: 'layout',
              options: [
                { value: 'sm', label: 'Small' },
                { value: 'md', label: 'Medium' },
                { value: 'lg', label: 'Large' },
                { value: 'xl', label: 'Extra Large' }
              ]
            }
          }
        }

      case 'FeaturesBlock':
        return {
          content: {
            title: { type: 'text', label: 'Title', category: 'content' },
            subtitle: { type: 'text', label: 'Subtitle', category: 'content' },
            description: { type: 'textarea', label: 'Description', category: 'content' },
            layout: {
              type: 'select',
              label: 'Layout',
              category: 'layout',
              options: [
                { value: 'grid-2', label: '2 Columns' },
                { value: 'grid-3', label: '3 Columns' },
                { value: 'grid-4', label: '4 Columns' },
                { value: 'list', label: 'List View' },
                { value: 'masonry', label: 'Masonry' }
              ]
            },
            showIcons: { type: 'boolean', label: 'Show Icons', category: 'display' },
            iconStyle: {
              type: 'select',
              label: 'Icon Style',
              category: 'style',
              options: [
                { value: 'outline', label: 'Outline' },
                { value: 'filled', label: 'Filled' },
                { value: 'duotone', label: 'Duotone' }
              ]
            }
          },
          settings: {
            gap: {
              type: 'select',
              label: 'Grid Gap',
              category: 'layout',
              options: [
                { value: 'sm', label: 'Small' },
                { value: 'md', label: 'Medium' },
                { value: 'lg', label: 'Large' }
              ]
            },
            hover: { type: 'boolean', label: 'Hover Effects', category: 'animation' },
            border: { type: 'boolean', label: 'Show Borders', category: 'style' },
            shadow: { type: 'boolean', label: 'Drop Shadow', category: 'style' }
          }
        }

      case 'TestimonialsBlock':
        return {
          content: {
            title: { type: 'text', label: 'Title', category: 'content' },
            subtitle: { type: 'text', label: 'Subtitle', category: 'content' },
            description: { type: 'textarea', label: 'Description', category: 'content' },
            layout: {
              type: 'select',
              label: 'Layout',
              category: 'layout',
              options: [
                { value: 'grid', label: 'Grid' },
                { value: 'carousel', label: 'Carousel' },
                { value: 'single', label: 'Single' },
                { value: 'masonry', label: 'Masonry' }
              ]
            },
            showRatings: { type: 'boolean', label: 'Show Ratings', category: 'display' },
            showAvatars: { type: 'boolean', label: 'Show Avatars', category: 'display' },
            showCompany: { type: 'boolean', label: 'Show Company', category: 'display' }
          },
          settings: {
            autoplay: { type: 'boolean', label: 'Auto Play (Carousel)', category: 'animation' },
            interval: { type: 'number', label: 'Interval (ms)', min: 1000, max: 10000, category: 'animation' },
            showDots: { type: 'boolean', label: 'Show Dots', category: 'navigation' },
            showArrows: { type: 'boolean', label: 'Show Arrows', category: 'navigation' }
          }
        }

      case 'ImageBlock':
        return {
          content: {
            src: { type: 'image', label: 'Image Source', required: true, category: 'content' },
            alt: { type: 'text', label: 'Alt Text', required: true, category: 'accessibility' },
            caption: { type: 'text', label: 'Caption', category: 'content' },
            link: { type: 'url', label: 'Link URL', category: 'navigation' },
            objectFit: {
              type: 'select',
              label: 'Object Fit',
              category: 'layout',
              options: [
                { value: 'cover', label: 'Cover' },
                { value: 'contain', label: 'Contain' },
                { value: 'fill', label: 'Fill' },
                { value: 'none', label: 'None' }
              ]
            }
          },
          settings: {
            alignment: {
              type: 'select',
              label: 'Alignment',
              category: 'layout',
              options: [
                { value: 'left', label: 'Left' },
                { value: 'center', label: 'Center' },
                { value: 'right', label: 'Right' }
              ]
            },
            rounded: {
              type: 'select',
              label: 'Border Radius',
              category: 'style',
              options: [
                { value: 'none', label: 'None' },
                { value: 'sm', label: 'Small' },
                { value: 'md', label: 'Medium' },
                { value: 'lg', label: 'Large' },
                { value: 'full', label: 'Full (Circle)' }
              ]
            },
            shadow: {
              type: 'select',
              label: 'Shadow',
              category: 'style',
              options: [
                { value: 'none', label: 'None' },
                { value: 'sm', label: 'Small' },
                { value: 'md', label: 'Medium' },
                { value: 'lg', label: 'Large' }
              ]
            },
            hover: {
              type: 'select',
              label: 'Hover Effect',
              category: 'animation',
              options: [
                { value: 'none', label: 'None' },
                { value: 'zoom', label: 'Zoom' },
                { value: 'fade', label: 'Fade' },
                { value: 'lift', label: 'Lift' }
              ]
            },
            lazyLoad: { type: 'boolean', label: 'Lazy Loading', category: 'performance' }
          }
        }

      case 'ButtonBlock':
        return {
          content: {
            text: { type: 'text', label: 'Button Text', required: true, category: 'content' },
            href: { type: 'url', label: 'Link URL', category: 'navigation' },
            icon: { type: 'icon', label: 'Icon', category: 'style' },
            iconPosition: {
              type: 'select',
              label: 'Icon Position',
              category: 'layout',
              options: [
                { value: 'left', label: 'Left' },
                { value: 'right', label: 'Right' }
              ]
            }
          },
          settings: {
            type: {
              type: 'select',
              label: 'Button Type',
              category: 'style',
              options: [
                { value: 'primary', label: 'Primary' },
                { value: 'secondary', label: 'Secondary' },
                { value: 'outline', label: 'Outline' },
                { value: 'ghost', label: 'Ghost' },
                { value: 'link', label: 'Link' }
              ]
            },
            size: {
              type: 'select',
              label: 'Size',
              category: 'layout',
              options: [
                { value: 'sm', label: 'Small' },
                { value: 'md', label: 'Medium' },
                { value: 'lg', label: 'Large' }
              ]
            },
            fullWidth: { type: 'boolean', label: 'Full Width', category: 'layout' },
            disabled: { type: 'boolean', label: 'Disabled', category: 'state' },
            target: {
              type: 'select',
              label: 'Link Target',
              category: 'navigation',
              options: [
                { value: '_self', label: 'Same Window' },
                { value: '_blank', label: 'New Window' }
              ]
            }
          }
        }

      default:
        return {
          content: {
            title: { type: 'text', label: 'Title', category: 'content' },
            description: { type: 'textarea', label: 'Description', category: 'content' }
          },
          settings: {}
        }
    }
  }

  // Get field validation errors
  const getFieldErrors = (fieldName: string, isSettings = false) => {
    return hasFieldErrors(block.component, fieldName, isSettings ? settings[fieldName] : content[fieldName], isSettings)
  }

  // Render form field based on type
  const renderField = (fieldName: string, fieldConfig: FieldConfig, value: any, isSettings = false) => {
    const updateFunction = isSettings ? updateSettings : updateContent
    const fieldErrors = getFieldErrors(fieldName, isSettings)
    const hasError = fieldErrors.length > 0

    switch (fieldConfig.type) {
      case 'text':
        return (
          <div className="space-y-1">
            <Input
              value={value || ''}
              onChange={(e) => updateFunction(fieldName, e.target.value)}
              placeholder={fieldConfig.placeholder}
              className={hasError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
            />
            {hasError && (
              <div className="text-xs text-red-600">
                {fieldErrors.map((error, index) => (
                  <div key={index}>{error.message}</div>
                ))}
              </div>
            )}
          </div>
        )
      
      case 'textarea':
        return (
          <div className="space-y-1">
            <Textarea
              value={value || ''}
              onChange={(e) => updateFunction(fieldName, e.target.value)}
              placeholder={fieldConfig.placeholder}
              rows={3}
              className={hasError ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
            />
            {hasError && (
              <div className="text-xs text-red-600">
                {fieldErrors.map((error, index) => (
                  <div key={index}>{error.message}</div>
                ))}
              </div>
            )}
          </div>
        )
      
      case 'select':
        return (
          <Select value={value || ''} onValueChange={(val) => updateFunction(fieldName, val)}>
            <SelectTrigger>
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {fieldConfig.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      
      case 'boolean':
        return (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => updateFunction(fieldName, e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{fieldConfig.label}</span>
          </label>
        )
      
      case 'color':
        return (
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={value || '#000000'}
              onChange={(e) => updateFunction(fieldName, e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <Input
              value={value || ''}
              onChange={(e) => updateFunction(fieldName, e.target.value)}
              placeholder="#000000"
            />
          </div>
        )
      
      case 'number':
        return (
          <Input
            type="number"
            value={value || ''}
            onChange={(e) => updateFunction(fieldName, Number(e.target.value))}
            min={fieldConfig.min}
            max={fieldConfig.max}
          />
        )

      case 'range':
        return (
          <div className="space-y-2">
            <input
              type="range"
              value={value || 0}
              onChange={(e) => updateFunction(fieldName, Number(e.target.value))}
              min={fieldConfig.min || 0}
              max={fieldConfig.max || 100}
              className="w-full"
            />
            <div className="text-sm text-gray-500 text-center">{value || 0}</div>
          </div>
        )

      case 'url':
        return (
          <Input
            type="url"
            value={value || ''}
            onChange={(e) => updateFunction(fieldName, e.target.value)}
            placeholder="https://example.com"
          />
        )

      case 'image':
        return (
          <div className="space-y-2">
            <Input
              value={value || ''}
              onChange={(e) => updateFunction(fieldName, e.target.value)}
              placeholder="Image URL or upload"
            />
            <Button variant="outline" size="sm" className="w-full">
              <ImageIcon className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          </div>
        )

      case 'icon':
        return (
          <Input
            value={value || ''}
            onChange={(e) => updateFunction(fieldName, e.target.value)}
            placeholder="Icon name or emoji"
          />
        )
      
      default:
        return (
          <Input
            value={value || ''}
            onChange={(e) => updateFunction(fieldName, e.target.value)}
          />
        )
    }
  }

  // Group fields by category
  const groupFieldsByCategory = (fields: Record<string, FieldConfig>) => {
    const grouped: Record<string, Array<[string, FieldConfig]>> = {}
    
    Object.entries(fields).forEach(([key, config]) => {
      const category = config.category || 'general'
      if (!grouped[category]) {
        grouped[category] = []
      }
      grouped[category].push([key, config])
    })
    
    return grouped
  }

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'content': return Type
      case 'layout': return Layout
      case 'style': return Palette
      case 'animation': return Zap
      case 'navigation': return LinkIcon
      case 'display': return Eye
      case 'accessibility': return Settings
      case 'performance': return Settings
      case 'state': return Settings
      default: return Settings
    }
  }

  const blockConfig = getBlockConfig()
  const contentGroups = groupFieldsByCategory(blockConfig.content)
  const settingsGroups = groupFieldsByCategory(blockConfig.settings)

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden p-0" role="dialog" aria-labelledby="block-editor-title" aria-describedby="block-editor-description">
        <DialogHeader className="cms-card-header bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200">
          <DialogTitle id="block-editor-title" className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Edit {block.type} Block</h2>
              <p id="block-editor-description" className="text-sm text-gray-600 mt-1">Configure content, styling, and behavior settings</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="cms-card-header bg-white">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full" role="tablist" aria-label="Block editor sections">
            <TabsList className="grid w-full max-w-2xl grid-cols-3 h-14 bg-gray-100 p-1 rounded-xl">
              <TabsTrigger 
                value="content" 
                className="flex items-center justify-center space-x-3 h-12 px-6 text-sm font-semibold rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200"
                role="tab"
                aria-selected={activeTab === 'content'}
                aria-controls="content-panel"
              >
                <Type className="h-5 w-5" />
                <span>Content</span>
                {validationErrors.filter(e => e.type === 'content').length > 0 && (
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" aria-label="Content validation errors"></div>
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="flex items-center justify-center space-x-3 h-12 px-6 text-sm font-semibold rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200"
                role="tab"
                aria-selected={activeTab === 'settings'}
                aria-controls="settings-panel"
              >
                <Settings className="h-5 w-5" />
                <span>Settings</span>
                {validationErrors.filter(e => e.type === 'settings').length > 0 && (
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" aria-label="Settings validation errors"></div>
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="preview" 
                className="flex items-center justify-center space-x-3 h-12 px-6 text-sm font-semibold rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all duration-200"
                role="tab"
                aria-selected={activeTab === 'preview'}
                aria-controls="preview-panel"
              >
                <Eye className="h-5 w-5" />
                <span>Preview</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto scrollbar-thin">
            <div className="p-8">
              {activeTab === 'content' && (
                <div id="content-panel" role="tabpanel" aria-labelledby="content-tab" className="cms-form-section">
                  {Object.entries(contentGroups).map(([category, fields]) => {
                    const Icon = getCategoryIcon(category)
                    return (
                      <div key={category} className="cms-form-section">
                        <div className="flex items-center space-x-4 pb-4 mb-6 border-b border-gray-200">
                          <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                            <Icon className="h-5 w-5 text-gray-700" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 capitalize">{category}</h3>
                            <p className="text-sm text-gray-600">Configure {category.toLowerCase()} settings</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          {fields.map(([fieldName, fieldConfig]) => (
                            <div key={fieldName} className="cms-form-group">
                              <Label 
                                htmlFor={`content-${fieldName}`} 
                                className="text-sm font-semibold text-gray-800 flex items-center"
                              >
                                {fieldConfig.label}
                                {fieldConfig.required && (
                                  <span className="text-red-500 ml-1" aria-label="Required field">*</span>
                                )}
                              </Label>
                              {fieldConfig.description && (
                                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{fieldConfig.description}</p>
                              )}
                              <div className="mt-2">
                                {renderField(fieldName, fieldConfig, content[fieldName])}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}

                  {/* Special handling for complex fields */}
                  {block.component === 'HeroBlock' && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 pb-3 border-b border-gray-100">
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          <LinkIcon className="h-4 w-4 text-gray-600" />
                        </div>
                        <h3 className="text-base font-semibold text-gray-900">Call-to-Action Buttons</h3>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <Label className="text-sm font-medium text-blue-900 mb-3 block">Primary Button</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="primaryButtonText" className="text-xs text-blue-700">Button Text</Label>
                              <Input
                                id="primaryButtonText"
                                value={content.primaryButton?.text || ''}
                                onChange={(e) => updateNestedContent('primaryButton', 'text', e.target.value)}
                                placeholder="Get Started"
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="primaryButtonHref" className="text-xs text-blue-700">Button Link</Label>
                              <Input
                                id="primaryButtonHref"
                                value={content.primaryButton?.href || ''}
                                onChange={(e) => updateNestedContent('primaryButton', 'href', e.target.value)}
                                placeholder="/signup"
                                className="mt-1"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <Label className="text-sm font-medium text-gray-700 mb-3 block">Secondary Button</Label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="secondaryButtonText" className="text-xs text-gray-600">Button Text</Label>
                              <Input
                                id="secondaryButtonText"
                                value={content.secondaryButton?.text || ''}
                                onChange={(e) => updateNestedContent('secondaryButton', 'text', e.target.value)}
                                placeholder="Learn More"
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <Label htmlFor="secondaryButtonHref" className="text-xs text-gray-600">Button Link</Label>
                              <Input
                                id="secondaryButtonHref"
                                value={content.secondaryButton?.href || ''}
                                onChange={(e) => updateNestedContent('secondaryButton', 'href', e.target.value)}
                                placeholder="/about"
                                className="mt-1"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'settings' && (
                <div id="settings-panel" role="tabpanel" aria-labelledby="settings-tab" className="cms-form-section">
                  {Object.entries(settingsGroups).map(([category, fields]) => {
                    const Icon = getCategoryIcon(category)
                    return (
                      <div key={category} className="cms-form-section">
                        <div className="flex items-center space-x-4 pb-4 mb-6 border-b border-gray-200">
                          <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                            <Icon className="h-5 w-5 text-gray-700" />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 capitalize">{category}</h3>
                            <p className="text-sm text-gray-600">Configure {category.toLowerCase()} options</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          {fields.map(([fieldName, fieldConfig]) => (
                            <div key={fieldName} className="cms-form-group">
                              <Label 
                                htmlFor={`settings-${fieldName}`} 
                                className="text-sm font-semibold text-gray-800 flex items-center"
                              >
                                {fieldConfig.label}
                                {fieldConfig.required && (
                                  <span className="text-red-500 ml-1" aria-label="Required field">*</span>
                                )}
                              </Label>
                              {fieldConfig.description && (
                                <p className="text-sm text-gray-600 mt-1 leading-relaxed">{fieldConfig.description}</p>
                              )}
                              <div className="mt-2">
                                {renderField(fieldName, fieldConfig, settings[fieldName], true)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {activeTab === 'preview' && (
                <div id="preview-panel" role="tabpanel" aria-labelledby="preview-tab" className="cms-content-section">
                  <div className="cms-card">
                    <div className="cms-card-header">
                      <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
                      <p className="text-sm text-gray-600">See how your block will appear on the website</p>
                    </div>
                    <div className="cms-card-body bg-gray-50 min-h-[400px] rounded-lg border-2 border-dashed border-gray-300">
                      <LiveBlockPreview 
                        block={{ ...block, content, settings }}
                        isVisible={true}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="cms-card-footer bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
          {/* Validation Summary */}
          {(validationErrors.length > 0 || validationWarnings.length > 0) && (
            <div className="mb-6 space-y-4">
              {validationErrors.length > 0 && (
                <div className="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg" role="alert" aria-live="polite">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <X className="h-4 w-4 text-white" />
                    </div>
                    <h4 className="text-base font-bold text-red-800">Validation Errors</h4>
                  </div>
                  <ul className="text-sm text-red-700 space-y-2 ml-9">
                    {validationErrors.map((error, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-red-400 mt-1 font-bold">•</span>
                        <span>{error.message}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {validationWarnings.length > 0 && (
                <div className="p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg" role="alert" aria-live="polite">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                    <h4 className="text-base font-bold text-amber-800">Recommendations</h4>
                  </div>
                  <ul className="text-sm text-amber-700 space-y-2 ml-9">
                    {validationWarnings.map((warning, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-amber-400 mt-1 font-bold">•</span>
                        <span>{warning.message}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">
              {validationErrors.length === 0 && validationWarnings.length === 0 && (
                <span className="flex items-center space-x-3 text-green-700">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>All validations passed - Ready to save</span>
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                onClick={onClose} 
                className="cms-button-secondary px-8"
                type="button"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                disabled={validationErrors.length > 0}
                className="cms-button-primary px-8"
                type="button"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
