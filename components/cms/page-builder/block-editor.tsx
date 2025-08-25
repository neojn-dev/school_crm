"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { X, Save } from "lucide-react"

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

export function BlockEditor({ block, onSave, onClose }: BlockEditorProps) {
  const [content, setContent] = useState(block.content || {})
  const [settings, setSettings] = useState(block.settings || {})

  // Update content field
  const updateContent = (field: string, value: any) => {
    setContent(prev => ({
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

  const handleSave = () => {
    onSave(content, settings)
  }

  // Render form field based on type
  const renderField = (fieldName: string, fieldConfig: any, value: any) => {
    switch (fieldConfig.type) {
      case 'text':
        return (
          <Input
            value={value || ''}
            onChange={(e) => updateContent(fieldName, e.target.value)}
            placeholder={fieldConfig.placeholder}
          />
        )
      
      case 'textarea':
        return (
          <Textarea
            value={value || ''}
            onChange={(e) => updateContent(fieldName, e.target.value)}
            placeholder={fieldConfig.placeholder}
            rows={3}
          />
        )
      
      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => updateContent(fieldName, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select...</option>
            {fieldConfig.options?.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      
      case 'boolean':
        return (
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => updateContent(fieldName, e.target.checked)}
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
              onChange={(e) => updateContent(fieldName, e.target.value)}
              className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
            />
            <Input
              value={value || ''}
              onChange={(e) => updateContent(fieldName, e.target.value)}
              placeholder="#000000"
            />
          </div>
        )
      
      case 'number':
        return (
          <Input
            type="number"
            value={value || ''}
            onChange={(e) => updateContent(fieldName, Number(e.target.value))}
            min={fieldConfig.min}
            max={fieldConfig.max}
          />
        )
      
      default:
        return (
          <Input
            value={value || ''}
            onChange={(e) => updateContent(fieldName, e.target.value)}
          />
        )
    }
  }

  // Get block configuration (simplified for now)
  const getBlockConfig = () => {
    switch (block.component) {
      case 'HeroBlock':
        return {
          title: { type: 'text', label: 'Title', required: true },
          subtitle: { type: 'text', label: 'Subtitle' },
          description: { type: 'textarea', label: 'Description' },
          textAlign: {
            type: 'select',
            label: 'Text Alignment',
            options: [
              { value: 'left', label: 'Left' },
              { value: 'center', label: 'Center' },
              { value: 'right', label: 'Right' }
            ]
          },
          backgroundType: {
            type: 'select',
            label: 'Background Type',
            options: [
              { value: 'gradient', label: 'Gradient' },
              { value: 'image', label: 'Image' },
              { value: 'solid', label: 'Solid Color' }
            ]
          }
        }
      
      case 'FeaturesBlock':
        return {
          title: { type: 'text', label: 'Title' },
          subtitle: { type: 'text', label: 'Subtitle' },
          description: { type: 'textarea', label: 'Description' },
          layout: {
            type: 'select',
            label: 'Layout',
            options: [
              { value: 'grid-2', label: '2 Columns' },
              { value: 'grid-3', label: '3 Columns' },
              { value: 'grid-4', label: '4 Columns' },
              { value: 'list', label: 'List View' }
            ]
          },
          showIcons: { type: 'boolean', label: 'Show Icons' }
        }
      
      case 'TestimonialsBlock':
        return {
          title: { type: 'text', label: 'Title' },
          subtitle: { type: 'text', label: 'Subtitle' },
          description: { type: 'textarea', label: 'Description' },
          layout: {
            type: 'select',
            label: 'Layout',
            options: [
              { value: 'grid', label: 'Grid' },
              { value: 'carousel', label: 'Carousel' },
              { value: 'single', label: 'Single' }
            ]
          },
          showRatings: { type: 'boolean', label: 'Show Ratings' }
        }
      
      default:
        return {}
    }
  }

  const blockConfig = getBlockConfig()

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit {block.type} Block</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {Object.entries(blockConfig).map(([fieldName, fieldConfig]: [string, any]) => (
            <div key={fieldName} className="space-y-2">
              <Label htmlFor={fieldName}>
                {fieldConfig.label}
                {fieldConfig.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
              {renderField(fieldName, fieldConfig, content[fieldName])}
            </div>
          ))}

          {/* Special handling for button fields in Hero block */}
          {block.component === 'HeroBlock' && (
            <>
              <div className="space-y-4">
                <Label>Primary Button</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="primaryButtonText">Button Text</Label>
                    <Input
                      id="primaryButtonText"
                      value={content.primaryButton?.text || ''}
                      onChange={(e) => updateNestedContent('primaryButton', 'text', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="primaryButtonHref">Button Link</Label>
                    <Input
                      id="primaryButtonHref"
                      value={content.primaryButton?.href || ''}
                      onChange={(e) => updateNestedContent('primaryButton', 'href', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Secondary Button</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="secondaryButtonText">Button Text</Label>
                    <Input
                      id="secondaryButtonText"
                      value={content.secondaryButton?.text || ''}
                      onChange={(e) => updateNestedContent('secondaryButton', 'text', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="secondaryButtonHref">Button Link</Label>
                    <Input
                      id="secondaryButtonHref"
                      value={content.secondaryButton?.href || ''}
                      onChange={(e) => updateNestedContent('secondaryButton', 'href', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
