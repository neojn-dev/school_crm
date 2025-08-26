"use client"

import { useState, useCallback } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Button } from "@/components/ui/button"
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
  Type,
  Image,
  Layout,
  MousePointer,
  FileText,
  Zap
} from "lucide-react"
import { BlockLibrary } from "./block-library"
import { BlockRenderer } from "./block-renderer"
import { EnhancedBlockEditor } from "../enhanced-block-editor"

interface PageBlock {
  id: string
  type: string
  component: string
  content: any
  settings: any
}

interface PageBuilderProps {
  initialBlocks?: PageBlock[]
  onSave?: (blocks: PageBlock[]) => void
  isPreview?: boolean
}

export function PageBuilder({ 
  initialBlocks = [], 
  onSave,
  isPreview = false 
}: PageBuilderProps) {
  const [blocks, setBlocks] = useState<PageBlock[]>(initialBlocks)
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null)
  const [editingBlock, setEditingBlock] = useState<string | null>(null)
  const [showLibrary, setShowLibrary] = useState(false)
  const [history, setHistory] = useState<PageBlock[][]>([initialBlocks])
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

  // Save page
  const handleSave = useCallback(() => {
    console.log('PageBuilder: Saving blocks', blocks)
    onSave?.(blocks)
  }, [blocks, onSave])

  if (isPreview) {
    return (
      <div className="min-h-screen bg-white">
        {blocks.map((block) => (
          <BlockRenderer
            key={block.id}
            block={block}
            isEditing={false}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Overlay */}
      {showLibrary && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setShowLibrary(false)}
        />
      )}
      
      {/* Sidebar - Block Library */}
      <div className={`
        ${showLibrary ? 'w-80' : 'w-16'} 
        bg-white border-r border-gray-200 transition-all duration-300 flex-shrink-0
        ${showLibrary ? 'fixed lg:relative z-50 lg:z-auto' : 'relative'}
        ${showLibrary ? 'inset-y-0 left-0 lg:inset-auto' : ''}
        shadow-xl lg:shadow-none
      `}>
        <div className="cms-toolbar">
          <Button
            onClick={() => setShowLibrary(!showLibrary)}
            variant="outline"
            size="sm"
            className="cms-button-secondary w-full flex items-center justify-center"
            aria-label={showLibrary ? "Hide block library" : "Show block library"}
          >
            <Layers className="h-4 w-4 flex-shrink-0" />
            {showLibrary && <span className="ml-2 hidden sm:inline">Hide Library</span>}
          </Button>
        </div>
        
        {showLibrary ? (
          <div className="flex-1 overflow-hidden">
            <BlockLibrary onAddBlock={addBlock} />
          </div>
        ) : (
          <div className="flex-1 flex flex-col pt-6 pb-4">
            {/* Collapsed Category Icons */}
            <div className="space-y-3 px-2">
              {[
                { id: 'layout', icon: Layout, name: 'Layout', color: 'text-blue-600' },
                { id: 'text', icon: Type, name: 'Text', color: 'text-green-600' },
                { id: 'content', icon: FileText, name: 'Content', color: 'text-purple-600' },
                { id: 'media', icon: Image, name: 'Media', color: 'text-orange-600' },
                { id: 'interactive', icon: MousePointer, name: 'Interactive', color: 'text-red-600' },
                { id: 'forms', icon: Zap, name: 'Forms', color: 'text-yellow-600' }
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setShowLibrary(true)}
                  className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors group"
                  title={`${category.name} Blocks`}
                  aria-label={`Show ${category.name} blocks`}
                >
                  <category.icon className={`h-5 w-5 ${category.color} group-hover:scale-110 transition-transform`} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="cms-toolbar bg-white shadow-sm">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2 overflow-x-auto">
              <Button
                onClick={undo}
                disabled={historyIndex === 0}
                variant="outline"
                size="sm"
                className="cms-button-secondary flex-shrink-0"
                title="Undo last action"
              >
                <Undo className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Undo</span>
              </Button>
              
              <Button
                onClick={redo}
                disabled={historyIndex === history.length - 1}
                variant="outline"
                size="sm"
                className="cms-button-secondary flex-shrink-0"
                title="Redo last action"
              >
                <Redo className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Redo</span>
              </Button>
              
              <div className="cms-divider-vertical hidden sm:block" />
              
              <Button
                onClick={() => setShowLibrary(true)}
                variant="outline"
                size="sm"
                className="cms-button-secondary flex-shrink-0 lg:hidden"
                title="Open block library"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Add Block</span>
              </Button>
            </div>

            <div className="flex items-center space-x-2 flex-shrink-0">
              <Button 
                variant="outline" 
                size="sm"
                className="cms-button-secondary"
                title="Preview page"
              >
                <Eye className="h-4 w-4" />
                <span className="hidden md:inline ml-2">Preview</span>
              </Button>
              
              <Button 
                onClick={handleSave} 
                size="sm"
                className="cms-button-primary"
                title="Save page"
              >
                <Save className="h-4 w-4" />
                <span className="hidden md:inline ml-2">Save</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-y-auto scrollbar-thin bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="page-blocks">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-6"
                    role="main"
                    aria-label="Page content editor"
                  >
                    {blocks.length === 0 ? (
                      <div className="cms-card text-center py-20">
                        <div className="max-w-md mx-auto">
                          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Layers className="h-10 w-10 text-blue-600" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            Start Building Your Page
                          </h3>
                          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                            Add blocks from the library to start creating your page content. 
                            Choose from headers, text, images, and more.
                          </p>
                          <Button
                            onClick={() => setShowLibrary(true)}
                            className="cms-button-primary text-lg px-8 py-3"
                          >
                            <Plus className="h-5 w-5" />
                            <span>Add Your First Block</span>
                          </Button>
                        </div>
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
                              className={`
                                relative group cms-card transition-all duration-200
                                ${snapshot.isDragging ? 'opacity-50 rotate-2 scale-105' : ''}
                                ${selectedBlock === block.id 
                                  ? 'ring-2 ring-blue-500 ring-offset-4 shadow-lg' 
                                  : 'hover:shadow-md'
                                }
                              `}
                              onClick={() => setSelectedBlock(block.id)}
                              role="article"
                              aria-label={`${block.type} block`}
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault()
                                  setSelectedBlock(block.id)
                                }
                              }}
                            >
                              {/* Block Controls */}
                              <div className="absolute -top-3 -right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-200 transform group-hover:scale-100 scale-90">
                                <div className="flex items-center space-x-1 bg-white rounded-lg shadow-xl border border-gray-200 p-1">
                                  <Button
                                    {...provided.dragHandleProps}
                                    variant="ghost"
                                    size="sm"
                                    className="cursor-move hover:bg-gray-100 p-2"
                                    title="Drag to reorder"
                                    aria-label="Drag to reorder block"
                                  >
                                    <Settings className="h-4 w-4 text-gray-600" />
                                  </Button>
                                  
                                  <Button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setEditingBlock(block.id)
                                    }}
                                    variant="ghost"
                                    size="sm"
                                    className="hover:bg-blue-50 p-2"
                                    title="Edit block"
                                    aria-label="Edit block"
                                  >
                                    <Edit className="h-4 w-4 text-blue-600" />
                                  </Button>
                                  
                                  <Button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      deleteBlock(block.id)
                                    }}
                                    variant="ghost"
                                    size="sm"
                                    className="hover:bg-red-50 p-2"
                                    title="Delete block"
                                    aria-label="Delete block"
                                  >
                                    <Trash2 className="h-4 w-4 text-red-600" />
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
