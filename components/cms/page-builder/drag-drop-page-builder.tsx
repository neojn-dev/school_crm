"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"
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
  Zap,
  Copy,
  Move,
  Grid,
  Palette,
  Monitor,
  Tablet,
  Smartphone,
  ChevronDown,
  ChevronRight,
  Target,
  Box
} from "lucide-react"
import { DraggableBlockLibrary } from "./draggable-block-library"
import { BlockRenderer } from "./block-renderer"
import { EnhancedBlockEditor } from "../enhanced-block-editor"
import { DropZone } from "./drop-zone"
import { BlockCustomizationPanel } from "./block-customization-panel"
import { allBlockConfigs } from "../blocks"

interface PageBlock {
  id: string
  type: string
  component: string
  content: any
  settings: any
  children?: PageBlock[]
  parentId?: string
}

interface PageBuilderProps {
  initialBlocks?: PageBlock[]
  onSave?: (blocks: PageBlock[]) => void
  isPreview?: boolean
}

type ViewportMode = 'desktop' | 'tablet' | 'mobile'

export function DragDropPageBuilder({ 
  initialBlocks = [], 
  onSave,
  isPreview = false 
}: PageBuilderProps) {
  const [blocks, setBlocks] = useState<PageBlock[]>(initialBlocks)
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null)
  const [editingBlock, setEditingBlock] = useState<string | null>(null)
  const [showLibrary, setShowLibrary] = useState(true)
  const [showCustomizationPanel, setShowCustomizationPanel] = useState(false)
  const [history, setHistory] = useState<PageBlock[][]>([initialBlocks])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop')
  const [draggedItem, setDraggedItem] = useState<any>(null)
  const [expandedBlocks, setExpandedBlocks] = useState<Set<string>>(new Set())
  
  const canvasRef = useRef<HTMLDivElement>(null)

  // Add to history for undo/redo
  const addToHistory = useCallback((newBlocks: PageBlock[]) => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push([...newBlocks])
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }, [history, historyIndex])

  // Generate unique block ID
  const generateBlockId = () => `block-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  // Find block by ID recursively
  const findBlockById = useCallback((blocks: PageBlock[], id: string): PageBlock | null => {
    for (const block of blocks) {
      if (block.id === id) return block
      if (block.children) {
        const found = findBlockById(block.children, id)
        if (found) return found
      }
    }
    return null
  }, [])

  // Update blocks recursively
  const updateBlocksRecursively = useCallback((
    blocks: PageBlock[], 
    targetId: string, 
    updater: (block: PageBlock) => PageBlock
  ): PageBlock[] => {
    return blocks.map(block => {
      if (block.id === targetId) {
        return updater(block)
      }
      if (block.children) {
        return {
          ...block,
          children: updateBlocksRecursively(block.children, targetId, updater)
        }
      }
      return block
    })
  }, [])

  // Remove block recursively
  const removeBlockRecursively = useCallback((blocks: PageBlock[], targetId: string): PageBlock[] => {
    return blocks.filter(block => {
      if (block.id === targetId) return false
      if (block.children) {
        block.children = removeBlockRecursively(block.children, targetId)
      }
      return true
    })
  }, [])

  // Handle drag start
  const handleDragStart = useCallback((start: any) => {
    const { draggableId, source } = start
    console.log('Drag started:', { draggableId, source })
    
    // Check if dragging from library
    if (source.droppableId === 'block-library') {
      const blockConfig = allBlockConfigs.find(config => config.component === draggableId)
      console.log('Dragging from library:', blockConfig)
      setDraggedItem({ type: 'new-block', config: blockConfig })
    } else {
      const block = findBlockById(blocks, draggableId)
      console.log('Dragging existing block:', block)
      setDraggedItem({ type: 'existing-block', block })
    }
  }, [blocks, findBlockById])

  // Handle drag end
  const handleDragEnd = useCallback((result: DropResult) => {
    const { destination, source, draggableId } = result
    console.log('Drag ended:', { destination, source, draggableId })
    setDraggedItem(null)

    if (!destination) {
      console.log('No destination - drag cancelled')
      return
    }

    // Handle dropping from library
    if (source.droppableId === 'block-library') {
      const blockConfig = allBlockConfigs.find(config => config.component === draggableId)
      if (!blockConfig) return

      const newBlock: PageBlock = {
        id: generateBlockId(),
        type: blockConfig.type,
        component: blockConfig.component,
        content: { ...blockConfig.defaultContent },
        settings: {},
        children: blockConfig.component.includes('Container') || blockConfig.component.includes('Section') || blockConfig.component.includes('Columns') ? [] : undefined
      }

      let newBlocks = [...blocks]

      // Handle dropping into containers
      if (destination.droppableId.startsWith('container-')) {
        const containerId = destination.droppableId.replace('container-', '')
        newBlocks = updateBlocksRecursively(newBlocks, containerId, (container) => ({
          ...container,
          children: [
            ...(container.children || []).slice(0, destination.index),
            newBlock,
            ...(container.children || []).slice(destination.index)
          ]
        }))
      } else {
        // Drop at root level
        newBlocks.splice(destination.index, 0, newBlock)
      }

      setBlocks(newBlocks)
      addToHistory(newBlocks)
      setSelectedBlock(newBlock.id)
      return
    }

    // Handle reordering existing blocks
    if (source.droppableId === destination.droppableId) {
      // Same container reordering
      if (destination.droppableId === 'page-blocks') {
        const items = Array.from(blocks)
        const [reorderedItem] = items.splice(source.index, 1)
        items.splice(destination.index, 0, reorderedItem)
        setBlocks(items)
        addToHistory(items)
      } else if (destination.droppableId.startsWith('container-')) {
        // Reordering within a container
        const containerId = destination.droppableId.replace('container-', '')
        const newBlocks = updateBlocksRecursively(blocks, containerId, (container) => {
          const children = Array.from(container.children || [])
          const [reorderedItem] = children.splice(source.index, 1)
          children.splice(destination.index, 0, reorderedItem)
          return { ...container, children }
        })
        setBlocks(newBlocks)
        addToHistory(newBlocks)
      }
    } else {
      // Moving between containers
      const sourceBlock = findBlockById(blocks, draggableId)
      if (!sourceBlock) return

      let newBlocks = removeBlockRecursively(blocks, draggableId)

      if (destination.droppableId.startsWith('container-')) {
        const containerId = destination.droppableId.replace('container-', '')
        newBlocks = updateBlocksRecursively(newBlocks, containerId, (container) => ({
          ...container,
          children: [
            ...(container.children || []).slice(0, destination.index),
            sourceBlock,
            ...(container.children || []).slice(destination.index)
          ]
        }))
      } else {
        newBlocks.splice(destination.index, 0, sourceBlock)
      }

      setBlocks(newBlocks)
      addToHistory(newBlocks)
    }
  }, [blocks, addToHistory, findBlockById, updateBlocksRecursively, removeBlockRecursively])

  // Add new block
  const addBlock = useCallback((blockConfig: any, parentId?: string) => {
    const newBlock: PageBlock = {
      id: generateBlockId(),
      type: blockConfig.type,
      component: blockConfig.component,
      content: { ...blockConfig.defaultContent },
      settings: {},
      parentId,
      children: blockConfig.component.includes('Container') || blockConfig.component.includes('Section') || blockConfig.component.includes('Columns') ? [] : undefined
    }

    let newBlocks = [...blocks]

    if (parentId) {
      newBlocks = updateBlocksRecursively(newBlocks, parentId, (parent) => ({
        ...parent,
        children: [...(parent.children || []), newBlock]
      }))
    } else {
      newBlocks.push(newBlock)
    }

    setBlocks(newBlocks)
    addToHistory(newBlocks)
    setSelectedBlock(newBlock.id)
  }, [blocks, addToHistory, updateBlocksRecursively])

  // Delete block
  const deleteBlock = useCallback((blockId: string) => {
    const newBlocks = removeBlockRecursively(blocks, blockId)
    setBlocks(newBlocks)
    addToHistory(newBlocks)
    setSelectedBlock(null)
    setEditingBlock(null)
  }, [blocks, addToHistory, removeBlockRecursively])

  // Duplicate block
  const duplicateBlock = useCallback((blockId: string) => {
    const block = findBlockById(blocks, blockId)
    if (!block) return

    const duplicatedBlock: PageBlock = {
      ...block,
      id: generateBlockId(),
      children: block.children ? block.children.map(child => ({
        ...child,
        id: generateBlockId()
      })) : undefined
    }

    let newBlocks = [...blocks]
    const blockIndex = blocks.findIndex(b => b.id === blockId)
    
    if (blockIndex !== -1) {
      newBlocks.splice(blockIndex + 1, 0, duplicatedBlock)
    } else {
      newBlocks.push(duplicatedBlock)
    }

    setBlocks(newBlocks)
    addToHistory(newBlocks)
    setSelectedBlock(duplicatedBlock.id)
  }, [blocks, addToHistory, findBlockById])

  // Update block content
  const updateBlock = useCallback((blockId: string, content: any, settings?: any) => {
    console.log('updateBlock called:', { blockId, content, settings })
    const newBlocks = updateBlocksRecursively(blocks, blockId, (block) => ({
      ...block,
      content,
      ...(settings && { settings })
    }))
    console.log('New blocks after update:', newBlocks)
    setBlocks(newBlocks)
    addToHistory(newBlocks)
  }, [blocks, addToHistory, updateBlocksRecursively])

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

  // Toggle block expansion in tree view
  const toggleBlockExpansion = useCallback((blockId: string) => {
    const newExpanded = new Set(expandedBlocks)
    if (newExpanded.has(blockId)) {
      newExpanded.delete(blockId)
    } else {
      newExpanded.add(blockId)
    }
    setExpandedBlocks(newExpanded)
  }, [expandedBlocks])

  // Save page
  const handleSave = useCallback(() => {
    console.log('DragDropPageBuilder: Saving blocks', blocks)
    onSave?.(blocks)
  }, [blocks, onSave])

  // Render block tree for structure panel
  const renderBlockTree = useCallback((blocks: PageBlock[], level = 0) => {
    return blocks.map((block) => (
      <div key={block.id} className={`ml-${level * 4}`}>
        <div 
          className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-colors ${
            selectedBlock === block.id ? 'bg-blue-100 text-blue-900' : 'hover:bg-gray-100'
          }`}
          onClick={() => setSelectedBlock(block.id)}
        >
          {block.children && block.children.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleBlockExpansion(block.id)
              }}
              className="p-1 hover:bg-gray-200 rounded"
            >
              {expandedBlocks.has(block.id) ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </button>
          )}
          <Box className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium truncate">{block.type}</span>
          <div className="flex items-center space-x-1 ml-auto">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setEditingBlock(block.id)
              }}
              className="p-1 hover:bg-blue-100 rounded"
              title="Edit block"
            >
              <Edit className="h-3 w-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                duplicateBlock(block.id)
              }}
              className="p-1 hover:bg-green-100 rounded"
              title="Duplicate block"
            >
              <Copy className="h-3 w-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                deleteBlock(block.id)
              }}
              className="p-1 hover:bg-red-100 rounded"
              title="Delete block"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        </div>
        {block.children && expandedBlocks.has(block.id) && (
          <div className="ml-4">
            {renderBlockTree(block.children, level + 1)}
          </div>
        )}
      </div>
    ))
  }, [selectedBlock, expandedBlocks, toggleBlockExpansion, duplicateBlock, deleteBlock])

  // Render blocks with drop zones
  const renderBlocksWithDropZones = useCallback((blocks: PageBlock[], parentId?: string) => {
    return blocks.map((block, index) => (
      <div key={block.id}>
        {/* Drop zone before block */}
        <DropZone
          id={parentId ? `container-${parentId}` : 'page-blocks'}
          index={index}
          isActive={draggedItem !== null}
          onDrop={(item) => {
            // Handle drop logic here if needed
          }}
        />
        
        <Draggable draggableId={block.id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              className={`
                relative group transition-all duration-200
                ${snapshot.isDragging ? 'opacity-50 rotate-1 scale-105 z-50' : ''}
                ${selectedBlock === block.id 
                  ? 'ring-2 ring-blue-500 ring-offset-2 shadow-lg' 
                  : 'hover:shadow-md'
                }
              `}
              onClick={(e) => {
                e.stopPropagation()
                setSelectedBlock(block.id)
              }}
            >
              {/* Block Controls */}
              <div className="absolute -top-3 -right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-200">
                <div className="flex items-center space-x-1 bg-white rounded-lg shadow-xl border border-gray-200 p-1">
                  <Button
                    {...provided.dragHandleProps}
                    variant="ghost"
                    size="sm"
                    className="cursor-move hover:bg-gray-100 p-2"
                    title="Drag to move"
                  >
                    <Move className="h-4 w-4 text-gray-600" />
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
                  >
                    <Edit className="h-4 w-4 text-blue-600" />
                  </Button>

                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      duplicateBlock(block.id)
                    }}
                    variant="ghost"
                    size="sm"
                    className="hover:bg-green-50 p-2"
                    title="Duplicate block"
                  >
                    <Copy className="h-4 w-4 text-green-600" />
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
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>

              {/* Block Content */}
              <div className="relative">
                <BlockRenderer
                  block={block}
                  isEditing={selectedBlock === block.id}
                  onEdit={() => setEditingBlock(block.id)}
                />
                
                {/* Render children if it's a container */}
                {block.children && (
                  <Droppable droppableId={`container-${block.id}`} type="block">
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`
                          min-h-[100px] p-4 border-2 border-dashed border-transparent transition-colors
                          ${snapshot.isDraggingOver ? 'border-blue-400 bg-blue-50' : ''}
                          ${block.children.length === 0 ? 'border-gray-300' : ''}
                        `}
                      >
                        {block.children.length === 0 ? (
                          <div className="text-center py-8 text-gray-500">
                            <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">Drop blocks here</p>
                          </div>
                        ) : (
                          renderBlocksWithDropZones(block.children, block.id)
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                )}
              </div>
            </div>
          )}
        </Draggable>
      </div>
    ))
  }, [selectedBlock, draggedItem, duplicateBlock, deleteBlock])

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

  const getViewportClass = () => {
    switch (viewportMode) {
      case 'tablet': return 'max-w-3xl'
      case 'mobile': return 'max-w-sm'
      default: return 'max-w-full'
    }
  }

  return (
    <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        {/* Left Sidebar - Block Library */}
        <div className={`${showLibrary ? 'w-80' : 'w-16'} bg-white border-r border-gray-200 transition-all duration-300 flex-shrink-0`}>
          <div className="cms-toolbar">
            <Button
              onClick={() => setShowLibrary(!showLibrary)}
              variant="outline"
              size="sm"
              className="cms-button-secondary w-full flex items-center justify-center"
            >
              <Layers className="h-4 w-4" />
              {showLibrary && <span className="ml-2">Hide Library</span>}
            </Button>
          </div>
          
          {showLibrary ? (
            <DraggableBlockLibrary onAddBlock={addBlock} enableDragDrop={true} />
          ) : (
            <div className="flex-1 flex flex-col pt-6 pb-4">
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
              <div className="flex items-center space-x-2">
                <Button
                  onClick={undo}
                  disabled={historyIndex === 0}
                  variant="outline"
                  size="sm"
                  className="cms-button-secondary"
                  title="Undo"
                >
                  <Undo className="h-4 w-4" />
                </Button>
                
                <Button
                  onClick={redo}
                  disabled={historyIndex === history.length - 1}
                  variant="outline"
                  size="sm"
                  className="cms-button-secondary"
                  title="Redo"
                >
                  <Redo className="h-4 w-4" />
                </Button>

                <div className="cms-divider-vertical" />

                {/* Viewport Controls */}
                <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                  <Button
                    onClick={() => setViewportMode('desktop')}
                    variant={viewportMode === 'desktop' ? 'default' : 'ghost'}
                    size="sm"
                    className="p-2"
                    title="Desktop view"
                  >
                    <Monitor className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => setViewportMode('tablet')}
                    variant={viewportMode === 'tablet' ? 'default' : 'ghost'}
                    size="sm"
                    className="p-2"
                    title="Tablet view"
                  >
                    <Tablet className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => setViewportMode('mobile')}
                    variant={viewportMode === 'mobile' ? 'default' : 'ghost'}
                    size="sm"
                    className="p-2"
                    title="Mobile view"
                  >
                    <Smartphone className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => setShowCustomizationPanel(!showCustomizationPanel)}
                  variant="outline"
                  size="sm"
                  className="cms-button-secondary"
                  title="Toggle customization panel"
                >
                  <Palette className="h-4 w-4" />
                  <span className="hidden md:inline ml-2">Customize</span>
                </Button>
                
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
            <div className="container mx-auto px-4 py-8">
              <div 
                ref={canvasRef}
                className={`mx-auto bg-white shadow-lg rounded-lg transition-all duration-300 ${getViewportClass()}`}
                style={{ minHeight: '800px' }}
              >
                <Droppable droppableId="page-blocks" type="block">
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`
                        min-h-full p-6 transition-colors
                        ${snapshot.isDraggingOver ? 'bg-blue-50' : ''}
                      `}
                    >
                      {blocks.length === 0 ? (
                        <div className="text-center py-20">
                          <div className="max-w-md mx-auto">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                              <Target className="h-10 w-10 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                              Start Building Your Page
                            </h3>
                            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                              Drag blocks from the library to start creating your page content.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {renderBlocksWithDropZones(blocks)}
                        </div>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Block Structure & Customization */}
        {showCustomizationPanel && (
          <div className="w-80 bg-white border-l border-gray-200 flex-shrink-0">
            <div className="h-full flex flex-col">
              <div className="cms-toolbar">
                <h3 className="text-sm font-semibold text-gray-900">Block Structure</h3>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-2">
                  {blocks.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <Grid className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No blocks added yet</p>
                    </div>
                  ) : (
                    renderBlockTree(blocks)
                  )}
                </div>
              </div>

              {selectedBlock && (
                <BlockCustomizationPanel
                  block={findBlockById(blocks, selectedBlock)}
                  onUpdate={(content, settings) => updateBlock(selectedBlock, content, settings)}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Block Editor Modal */}
      {editingBlock && (
        <EnhancedBlockEditor
          block={findBlockById(blocks, editingBlock)!}
          onSave={(content, settings) => {
            updateBlock(editingBlock, content, settings)
            setEditingBlock(null)
          }}
          onClose={() => setEditingBlock(null)}
        />
      )}
    </DragDropContext>
  )
}
