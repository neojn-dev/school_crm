"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Settings, 
  Palette, 
  Layout, 
  Type,
  Eye,
  Sliders,
  Zap,
  Link as LinkIcon
} from "lucide-react"

interface PageBlock {
  id: string
  type: string
  component: string
  content: any
  settings: any
  children?: PageBlock[]
}

interface BlockCustomizationPanelProps {
  block: PageBlock | null
  onUpdate: (content: any, settings: any) => void
}

export function BlockCustomizationPanel({ block, onUpdate }: BlockCustomizationPanelProps) {
  const [content, setContent] = useState(block?.content || {})
  const [settings, setSettings] = useState(block?.settings || {})
  const [activeTab, setActiveTab] = useState('content')

  useEffect(() => {
    if (block) {
      setContent(block.content || {})
      setSettings(block.settings || {})
    }
  }, [block])

  if (!block) {
    return (
      <div className="p-4 text-center text-gray-500">
        <Settings className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">Select a block to customize</p>
      </div>
    )
  }

  const updateContent = (field: string, value: any) => {
    const newContent = { ...content, [field]: value }
    setContent(newContent)
    onUpdate(newContent, settings)
  }

  const updateSettings = (field: string, value: any) => {
    const newSettings = { ...settings, [field]: value }
    setSettings(newSettings)
    onUpdate(content, newSettings)
  }

  const renderQuickControls = () => {
    const quickControls = []

    // Common quick controls based on block type
    if (block.component.includes('Text') || block.component.includes('Heading') || block.component.includes('Paragraph')) {
      quickControls.push(
        <div key="text-align" className="space-y-2">
          <Label className="text-xs font-medium text-gray-700">Text Alignment</Label>
          <div className="flex space-x-1">
            {['left', 'center', 'right'].map((align) => (
              <Button
                key={align}
                onClick={() => updateContent('align', align)}
                variant={content.align === align ? 'default' : 'outline'}
                size="sm"
                className="flex-1 text-xs"
              >
                {align}
              </Button>
            ))}
          </div>
        </div>
      )
    }

    if (block.component.includes('Button')) {
      quickControls.push(
        <div key="button-style" className="space-y-2">
          <Label className="text-xs font-medium text-gray-700">Button Style</Label>
          <Select value={settings.type || 'primary'} onValueChange={(value) => updateSettings('type', value)}>
            <SelectTrigger className="text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="primary">Primary</SelectItem>
              <SelectItem value="secondary">Secondary</SelectItem>
              <SelectItem value="outline">Outline</SelectItem>
              <SelectItem value="ghost">Ghost</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )
    }

    if (block.component.includes('Image')) {
      quickControls.push(
        <div key="image-fit" className="space-y-2">
          <Label className="text-xs font-medium text-gray-700">Image Fit</Label>
          <Select value={content.objectFit || 'cover'} onValueChange={(value) => updateContent('objectFit', value)}>
            <SelectTrigger className="text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cover">Cover</SelectItem>
              <SelectItem value="contain">Contain</SelectItem>
              <SelectItem value="fill">Fill</SelectItem>
              <SelectItem value="none">None</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )
    }

    return quickControls
  }

  const renderContentFields = () => {
    const fields = []

    // Common content fields
    if (content.hasOwnProperty('title') || block.component.includes('Hero') || block.component.includes('Features')) {
      fields.push(
        <div key="title" className="space-y-2">
          <Label className="text-xs font-medium text-gray-700">Title</Label>
          <Input
            value={content.title || ''}
            onChange={(e) => updateContent('title', e.target.value)}
            placeholder="Enter title..."
            className="text-xs"
          />
        </div>
      )
    }

    if (content.hasOwnProperty('subtitle')) {
      fields.push(
        <div key="subtitle" className="space-y-2">
          <Label className="text-xs font-medium text-gray-700">Subtitle</Label>
          <Input
            value={content.subtitle || ''}
            onChange={(e) => updateContent('subtitle', e.target.value)}
            placeholder="Enter subtitle..."
            className="text-xs"
          />
        </div>
      )
    }

    if (content.hasOwnProperty('description')) {
      fields.push(
        <div key="description" className="space-y-2">
          <Label className="text-xs font-medium text-gray-700">Description</Label>
          <Textarea
            value={content.description || ''}
            onChange={(e) => updateContent('description', e.target.value)}
            placeholder="Enter description..."
            rows={3}
            className="text-xs"
          />
        </div>
      )
    }

    if (content.hasOwnProperty('text')) {
      fields.push(
        <div key="text" className="space-y-2">
          <Label className="text-xs font-medium text-gray-700">Text</Label>
          <Textarea
            value={content.text || ''}
            onChange={(e) => updateContent('text', e.target.value)}
            placeholder="Enter text..."
            rows={4}
            className="text-xs"
          />
        </div>
      )
    }

    if (content.hasOwnProperty('src')) {
      fields.push(
        <div key="src" className="space-y-2">
          <Label className="text-xs font-medium text-gray-700">Image URL</Label>
          <Input
            value={content.src || ''}
            onChange={(e) => updateContent('src', e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="text-xs"
          />
        </div>
      )
    }

    if (content.hasOwnProperty('alt')) {
      fields.push(
        <div key="alt" className="space-y-2">
          <Label className="text-xs font-medium text-gray-700">Alt Text</Label>
          <Input
            value={content.alt || ''}
            onChange={(e) => updateContent('alt', e.target.value)}
            placeholder="Describe the image..."
            className="text-xs"
          />
        </div>
      )
    }

    if (content.hasOwnProperty('href')) {
      fields.push(
        <div key="href" className="space-y-2">
          <Label className="text-xs font-medium text-gray-700">Link URL</Label>
          <Input
            value={content.href || ''}
            onChange={(e) => updateContent('href', e.target.value)}
            placeholder="https://example.com"
            className="text-xs"
          />
        </div>
      )
    }

    return fields
  }

  const renderStyleFields = () => {
    const fields = []

    // Background color
    fields.push(
      <div key="bg-color" className="space-y-2">
        <Label className="text-xs font-medium text-gray-700">Background</Label>
        <div className="flex space-x-2">
          <input
            type="color"
            value={settings.backgroundColor || '#ffffff'}
            onChange={(e) => updateSettings('backgroundColor', e.target.value)}
            className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
          />
          <Input
            value={settings.backgroundColor || '#ffffff'}
            onChange={(e) => updateSettings('backgroundColor', e.target.value)}
            placeholder="#ffffff"
            className="flex-1 text-xs"
          />
        </div>
      </div>
    )

    // Text color
    fields.push(
      <div key="text-color" className="space-y-2">
        <Label className="text-xs font-medium text-gray-700">Text Color</Label>
        <div className="flex space-x-2">
          <input
            type="color"
            value={settings.textColor || '#000000'}
            onChange={(e) => updateSettings('textColor', e.target.value)}
            className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
          />
          <Input
            value={settings.textColor || '#000000'}
            onChange={(e) => updateSettings('textColor', e.target.value)}
            placeholder="#000000"
            className="flex-1 text-xs"
          />
        </div>
      </div>
    )

    // Padding
    fields.push(
      <div key="padding" className="space-y-2">
        <Label className="text-xs font-medium text-gray-700">Padding</Label>
        <Select value={settings.padding || 'md'} onValueChange={(value) => updateSettings('padding', value)}>
          <SelectTrigger className="text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="sm">Small</SelectItem>
            <SelectItem value="md">Medium</SelectItem>
            <SelectItem value="lg">Large</SelectItem>
            <SelectItem value="xl">Extra Large</SelectItem>
          </SelectContent>
        </Select>
      </div>
    )

    // Border radius
    fields.push(
      <div key="border-radius" className="space-y-2">
        <Label className="text-xs font-medium text-gray-700">Border Radius</Label>
        <Select value={settings.borderRadius || 'md'} onValueChange={(value) => updateSettings('borderRadius', value)}>
          <SelectTrigger className="text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="sm">Small</SelectItem>
            <SelectItem value="md">Medium</SelectItem>
            <SelectItem value="lg">Large</SelectItem>
            <SelectItem value="full">Full</SelectItem>
          </SelectContent>
        </Select>
      </div>
    )

    return fields
  }

  return (
    <div className="border-t border-gray-200">
      <div className="p-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
            <Settings className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">{block.type}</h4>
            <p className="text-xs text-gray-600">Customize this block</p>
          </div>
        </div>
      </div>

      {/* Quick Controls */}
      <div className="p-3 border-b border-gray-200">
        <div className="space-y-3">
          {renderQuickControls()}
        </div>
      </div>

      {/* Detailed Controls */}
      <div className="flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-10 text-xs">
            <TabsTrigger value="content" className="flex items-center space-x-1">
              <Type className="h-3 w-3" />
              <span>Content</span>
            </TabsTrigger>
            <TabsTrigger value="style" className="flex items-center space-x-1">
              <Palette className="h-3 w-3" />
              <span>Style</span>
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex items-center space-x-1">
              <Layout className="h-3 w-3" />
              <span>Layout</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="p-3 space-y-3">
            {renderContentFields()}
          </TabsContent>

          <TabsContent value="style" className="p-3 space-y-3">
            {renderStyleFields()}
          </TabsContent>

          <TabsContent value="layout" className="p-3 space-y-3">
            <div className="space-y-3">
              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-700">Width</Label>
                <Select value={settings.width || 'full'} onValueChange={(value) => updateSettings('width', value)}>
                  <SelectTrigger className="text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto</SelectItem>
                    <SelectItem value="full">Full Width</SelectItem>
                    <SelectItem value="container">Container</SelectItem>
                    <SelectItem value="narrow">Narrow</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-700">Alignment</Label>
                <Select value={settings.alignment || 'center'} onValueChange={(value) => updateSettings('alignment', value)}>
                  <SelectTrigger className="text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium text-gray-700">Margin</Label>
                <Select value={settings.margin || 'md'} onValueChange={(value) => updateSettings('margin', value)}>
                  <SelectTrigger className="text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="sm">Small</SelectItem>
                    <SelectItem value="md">Medium</SelectItem>
                    <SelectItem value="lg">Large</SelectItem>
                    <SelectItem value="xl">Extra Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
