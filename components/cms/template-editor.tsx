"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
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
import { 
  Plus, 
  Trash2, 
  Edit, 
  Eye, 
  Save,
  Undo,
  Redo,
  Settings,
  Layers,
  ArrowLeft,
  Copy,
  Download,
  Upload
} from "lucide-react"
import { BlockLibrary } from "./page-builder/block-library"
import { BlockRenderer } from "./page-builder/block-renderer"
import { EnhancedBlockEditor } from "./enhanced-block-editor"
import { TemplateLibrary } from "./template-library"
import { TemplateInheritance } from "./template-inheritance"

interface PageBlock {
  id: string
  type: string
  component: string
  content: any
  settings: any
}

interface Template {
  id?: string
  name: string
  description?: string
  category: 'business' | 'government' | 'blog' | 'portfolio' | 'ecommerce'
  structure: string
  previewImage?: string
  isActive: boolean
  parentTemplateId?: string
  isSystem?: boolean
}

interface TemplateEditorProps {
  template?: Template
}

export function TemplateEditor({ template }: TemplateEditorProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false)
  
  // Template metadata
  const [templateName, setTemplateName] = useState(template?.name || '')
  const [templateDescription, setTemplateDescription] = useState(template?.description || '')
  const [templateCategory, setTemplateCategory] = useState<Template['category']>(template?.category || 'business')
  
  // Template structure (blocks)
  const [blocks, setBlocks] = useState<PageBlock[]>(() => {
    if (template?.structure) {
      try {
        return JSON.parse(template.structure)
      } catch (e) {
        console.error('Error parsing template structure:', e)
        return []
      }
    }
    return []
  })
  
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null)
  const [editingBlock, setEditingBlock] = useState<string | null>(null)
  const [showLibrary, setShowLibrary] = useState(false)
  const [history, setHistory] = useState<PageBlock[][]>([blocks])
  const [historyIndex, setHistoryIndex] = useState(0)

  // Add to history for undo/redo
  const addToHistory = useCallback((newBlocks: PageBlock[]) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push([...newBlocks])
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }, [history, historyIndex])

  // Handle drag and drop
  const handleDragEnd = useCallback((result: any) => {
    if (!result.destination) return

    const items = Array.from(blocks)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setBlocks(items)
    addToHistory(items)
  }, [blocks, addToHistory])

  // Add new block
  const addBlock = useCallback((blockConfig: any) => {
    const newBlock: PageBlock = {
      id: `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: blockConfig.type,
      component: blockConfig.component,
      content: blockConfig.defaultContent || {},
      settings: {}
    }

    const newBlocks = [...blocks, newBlock]
    setBlocks(newBlocks)
    addToHistory(newBlocks)
    setShowLibrary(false)
  }, [blocks, addToHistory])

  // Delete block
  const deleteBlock = useCallback((blockId: string) => {
    const newBlocks = blocks.filter(block => block.id !== blockId)
    setBlocks(newBlocks)
    addToHistory(newBlocks)
    setSelectedBlock(null)
    setEditingBlock(null)
  }, [blocks, addToHistory])

  // Update block content
  const updateBlock = useCallback((blockId: string, content: any, settings?: any) => {
    const newBlocks = blocks.map(block => 
      block.id === blockId 
        ? { ...block, content, ...(settings && { settings }) }
        : block
    )
    setBlocks(newBlocks)
    addToHistory(newBlocks)
  }, [blocks, addToHistory])

  // Undo/Redo
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setBlocks(history[newIndex])
      setHistoryIndex(newIndex)
    }
  }, [history, historyIndex])

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setBlocks(history[newIndex])
      setHistoryIndex(newIndex)
    }
  }, [history, historyIndex])

  // Save template
  const handleSave = useCallback(async () => {
    if (!templateName.trim()) {
      alert('Please enter a template name')
      return
    }

    setIsLoading(true)
    try {
      const templateData = {
        name: templateName,
        description: templateDescription,
        category: templateCategory,
        structure: JSON.stringify(blocks),
        isActive: true
      }

      const url = template?.id 
        ? `/api/cms/templates/${template.id}`
        : '/api/cms/templates'
      
      const method = template?.id ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(templateData)
      })

      if (!response.ok) {
        throw new Error('Failed to save template')
      }

      const savedTemplate = await response.json()
      
      // Redirect to templates list or edit page
      if (!template?.id) {
        router.push(`/cms/templates/${savedTemplate.id}/edit`)
      } else {
        router.push('/cms/templates')
      }
    } catch (error) {
      console.error('Error saving template:', error)
      alert('Failed to save template. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [templateName, templateDescription, templateCategory, blocks, template, router])

  // Export template as JSON
  const exportTemplate = useCallback(() => {
    const templateData = {
      name: templateName,
      description: templateDescription,
      category: templateCategory,
      structure: blocks,
      exportedAt: new Date().toISOString()
    }

    const blob = new Blob([JSON.stringify(templateData, null, 2)], {
      type: 'application/json'
    })
    
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${templateName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_template.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, [templateName, templateDescription, templateCategory, blocks])

  // Import template from JSON
  const importTemplate = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const templateData = JSON.parse(e.target?.result as string)
        
        if (templateData.structure && Array.isArray(templateData.structure)) {
          setBlocks(templateData.structure)
          addToHistory(templateData.structure)
          
          if (templateData.name) setTemplateName(templateData.name)
          if (templateData.description) setTemplateDescription(templateData.description)
          if (templateData.category) setTemplateCategory(templateData.category)
        }
      } catch (error) {
        console.error('Error importing template:', error)
        alert('Invalid template file format')
      }
    }
    reader.readAsText(file)
    
    // Reset file input
    event.target.value = ''
  }, [addToHistory])

  // Load template from library
  const loadTemplateFromLibrary = useCallback((templateData: any) => {
    try {
      const structure = typeof templateData.structure === 'string' 
        ? JSON.parse(templateData.structure) 
        : templateData.structure

      setBlocks(structure)
      addToHistory(structure)
      
      if (templateData.name) setTemplateName(templateData.name)
      if (templateData.description) setTemplateDescription(templateData.description)
      if (templateData.category) setTemplateCategory(templateData.category)
    } catch (error) {
      console.error('Error loading template:', error)
      alert('Invalid template format')
    }
  }, [addToHistory])

  // Handle inheritance update
  const handleInheritanceUpdate = useCallback(async (parentTemplateId: string | null) => {
    if (!template?.id) return

    try {
      const response = await fetch(`/api/cms/templates/${template.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ parentTemplateId })
      })

      if (!response.ok) {
        throw new Error('Failed to update inheritance')
      }

      // If we have a parent template, merge its structure
      if (parentTemplateId) {
        const parentResponse = await fetch(`/api/cms/templates/${parentTemplateId}`)
        if (parentResponse.ok) {
          const parentTemplate = await parentResponse.json()
          const parentStructure = JSON.parse(parentTemplate.structure)
          
          // Merge parent structure with current blocks
          // Parent blocks come first, then current blocks override
          const mergedBlocks = [...parentStructure, ...blocks]
          setBlocks(mergedBlocks)
          addToHistory(mergedBlocks)
        }
      }

      alert('Template inheritance updated successfully!')
    } catch (error) {
      console.error('Error updating inheritance:', error)
      alert('Failed to update template inheritance')
    }
  }, [template, blocks, addToHistory])

  if (showPreview) {
    return (
      <div className="min-h-screen bg-white">
        {/* Preview Header */}
        <div className="bg-gray-900 text-white p-4">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setShowPreview(false)}
                variant="outline"
                size="sm"
                className="text-white border-white hover:bg-white hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Editor
              </Button>
              <h1 className="text-lg font-semibold">Preview: {templateName || 'Untitled Template'}</h1>
            </div>
            <div className="text-sm text-gray-300">
              {blocks.length} block{blocks.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <div className="min-h-screen">
          {blocks.map((block) => (
            <BlockRenderer
              key={block.id}
              block={block}
              isEditing={false}
            />
          ))}
          
          {blocks.length === 0 && (
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <Layers className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No blocks in template
                </h3>
                <p className="text-gray-600">
                  Add some blocks to see the preview
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Block Library & Template Management */}
      <div className={`${showLibrary ? 'w-80' : 'w-16'} bg-white border-r border-gray-200 shadow-lg transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <Button
            onClick={() => setShowLibrary(!showLibrary)}
            variant="outline"
            size="sm"
            className="w-full flex items-center justify-center hover:bg-blue-100 border-blue-200"
          >
            <Layers className="h-4 w-4 text-blue-600" />
            {showLibrary && <span className="ml-2 text-blue-700 font-medium">Hide Panel</span>}
          </Button>
        </div>
        
        {showLibrary && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Block Library */}
            <div className="flex-1 overflow-y-auto">
              <BlockLibrary onAddBlock={addBlock} />
            </div>
            
            {/* Template Inheritance - Only show for existing templates */}
            {template?.id && (
              <div className="border-t border-gray-200 p-4">
                <TemplateInheritance
                  template={template}
                  onUpdateInheritance={handleInheritanceUpdate}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => router.push('/cms/templates')}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Templates</span>
                </Button>
                
                <div className="w-px h-6 bg-gray-300" />
                
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={undo}
                    disabled={historyIndex === 0}
                    variant="outline"
                    size="sm"
                    title="Undo"
                  >
                    <Undo className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    onClick={redo}
                    disabled={historyIndex === history.length - 1}
                    variant="outline"
                    size="sm"
                    title="Redo"
                  >
                    <Redo className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="w-px h-6 bg-gray-300" />
                
                <Button
                  onClick={() => setShowLibrary(true)}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Block</span>
                </Button>

                {/* Template Info */}
                {templateName && (
                  <div className="flex items-center space-x-3 ml-4">
                    <div className="w-px h-6 bg-gray-300" />
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-gray-700">{templateName}</span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded capitalize">{templateCategory}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => setShowTemplateLibrary(true)}
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <Layers className="h-4 w-4" />
                    <span>Templates</span>
                  </Button>
                  
                  <Button
                    onClick={() => setShowSettings(true)}
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Button>
                </div>

                <div className="w-px h-6 bg-gray-300" />
                
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={exportTemplate}
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </Button>
                  
                  <label className="cursor-pointer">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex items-center space-x-2"
                    >
                      <span>
                        <Upload className="h-4 w-4" />
                        <span>Import</span>
                      </span>
                    </Button>
                    <input
                      type="file"
                      accept=".json"
                      onChange={importTemplate}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="w-px h-6 bg-gray-300" />
                
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => setShowPreview(true)}
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2"
                  >
                    <Eye className="h-4 w-4" />
                    <span>Preview</span>
                  </Button>
                  
                  <Button 
                    onClick={handleSave} 
                    size="sm"
                    disabled={isLoading}
                    className="px-6"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isLoading ? 'Saving...' : 'Save Template'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-y-auto bg-gray-100">
          <div className="max-w-6xl mx-auto p-8">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="template-blocks">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-6"
                  >
                    {blocks.length === 0 ? (
                      <div className="text-center py-20 border-2 border-dashed border-gray-300 rounded-xl bg-white">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Layers className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          Start Building Your Template
                        </h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                          Add blocks from the library to create your template structure. 
                          You can drag and drop to reorder them later.
                        </p>
                        <Button
                          onClick={() => setShowLibrary(true)}
                          className="flex items-center space-x-2 px-6 py-3"
                          size="lg"
                        >
                          <Plus className="h-5 w-5" />
                          <span>Add Your First Block</span>
                        </Button>
                      </div>
                    ) : (
                      blocks.map((block, index) => (
                        <Draggable
                          key={block.id}
                          draggableId={block.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`relative group bg-white rounded-lg shadow-sm border-2 transition-all duration-200 ${
                                snapshot.isDragging ? 'opacity-50 shadow-lg scale-105' : 'hover:shadow-md'
                              } ${
                                selectedBlock === block.id 
                                  ? 'border-blue-500 shadow-lg ring-2 ring-blue-200' 
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              onClick={() => setSelectedBlock(block.id)}
                            >
                              {/* Block Header */}
                              <div className="flex items-center justify-between p-3 border-b border-gray-100 bg-gray-50 rounded-t-lg">
                                <div className="flex items-center space-x-2">
                                  <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                                    <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                                  </div>
                                  <span className="text-sm font-medium text-gray-700">{block.type} Block</span>
                                </div>
                                
                                {/* Block Controls */}
                                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button
                                    {...provided.dragHandleProps}
                                    variant="ghost"
                                    size="sm"
                                    className="cursor-move p-1 h-7 w-7"
                                    title="Drag to reorder"
                                  >
                                    <Settings className="h-3 w-3" />
                                  </Button>
                                  
                                  <Button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setEditingBlock(block.id)
                                    }}
                                    variant="ghost"
                                    size="sm"
                                    className="p-1 h-7 w-7"
                                    title="Edit block"
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  
                                  <Button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      deleteBlock(block.id)
                                    }}
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 p-1 h-7 w-7"
                                    title="Delete block"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>

                              {/* Block Content */}
                              <div className="p-4">
                                <BlockRenderer
                                  block={block}
                                  isEditing={selectedBlock === block.id}
                                  onEdit={() => setEditingBlock(block.id)}
                                />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>

      {/* Template Settings Modal */}
      {showSettings && (
        <Dialog open={showSettings} onOpenChange={setShowSettings}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Template Settings</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="templateName">
                  Template Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="templateName"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="Enter template name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="templateDescription">Description</Label>
                <Textarea
                  id="templateDescription"
                  value={templateDescription}
                  onChange={(e) => setTemplateDescription(e.target.value)}
                  placeholder="Describe this template"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="templateCategory">Category</Label>
                <select
                  id="templateCategory"
                  value={templateCategory}
                  onChange={(e) => setTemplateCategory(e.target.value as Template['category'])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="business">Business</option>
                  <option value="government">Government</option>
                  <option value="blog">Blog</option>
                  <option value="portfolio">Portfolio</option>
                  <option value="ecommerce">E-commerce</option>
                </select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowSettings(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowSettings(false)}>
                Save Settings
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Template Library Modal */}
      <TemplateLibrary
        isOpen={showTemplateLibrary}
        onClose={() => setShowTemplateLibrary(false)}
        onSelectTemplate={loadTemplateFromLibrary}
      />

      {/* Enhanced Block Editor Modal */}
      {editingBlock && (
        <EnhancedBlockEditor
          block={blocks.find(b => b.id === editingBlock)!}
          onSave={(content, settings) => {
            updateBlock(editingBlock, content, settings)
            setEditingBlock(null)
          }}
          onClose={() => setEditingBlock(null)}
        />
      )}
    </div>
  )
}
