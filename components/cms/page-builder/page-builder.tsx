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
  Layers
} from "lucide-react"
import { BlockLibrary } from "./block-library"
import { BlockRenderer } from "./block-renderer"
import { BlockEditor } from "./block-editor"

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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Block Library */}
      <div className={`${showLibrary ? 'w-80' : 'w-16'} bg-white border-r border-gray-200 transition-all duration-300`}>
        <div className="p-4 border-b border-gray-200">
          <Button
            onClick={() => setShowLibrary(!showLibrary)}
            variant="outline"
            size="sm"
            className="w-full flex items-center justify-center"
          >
            <Layers className="h-4 w-4" />
            {showLibrary && <span className="ml-2">Hide Library</span>}
          </Button>
        </div>
        
        {showLibrary && (
          <BlockLibrary onAddBlock={addBlock} />
        )}
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                onClick={undo}
                disabled={historyIndex === 0}
                variant="outline"
                size="sm"
              >
                <Undo className="h-4 w-4" />
              </Button>
              
              <Button
                onClick={redo}
                disabled={historyIndex === history.length - 1}
                variant="outline"
                size="sm"
              >
                <Redo className="h-4 w-4" />
              </Button>
              
              <div className="w-px h-6 bg-gray-300" />
              
              <Button
                onClick={() => setShowLibrary(true)}
                variant="outline"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Block
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              
              <Button onClick={handleSave} size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-6">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="page-blocks">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4"
                  >
                    {blocks.length === 0 ? (
                      <div className="text-center py-16 border-2 border-dashed border-gray-300 rounded-lg">
                        <Layers className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          Start Building Your Page
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Add blocks from the library to start creating your page.
                        </p>
                        <Button
                          onClick={() => setShowLibrary(true)}
                          className="flex items-center space-x-2"
                        >
                          <Plus className="h-4 w-4" />
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
                              className={`relative group ${
                                snapshot.isDragging ? 'opacity-50' : ''
                              } ${
                                selectedBlock === block.id 
                                  ? 'ring-2 ring-blue-500 ring-offset-2' 
                                  : ''
                              }`}
                              onClick={() => setSelectedBlock(block.id)}
                            >
                              {/* Block Controls */}
                              <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="flex items-center space-x-1 bg-white rounded-md shadow-lg border p-1">
                                  <Button
                                    {...provided.dragHandleProps}
                                    variant="ghost"
                                    size="sm"
                                    className="cursor-move"
                                  >
                                    <Settings className="h-4 w-4" />
                                  </Button>
                                  
                                  <Button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      setEditingBlock(block.id)
                                    }}
                                    variant="ghost"
                                    size="sm"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  
                                  <Button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      deleteBlock(block.id)
                                    }}
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              {/* Block Content */}
                              <BlockRenderer
                                block={block}
                                isEditing={selectedBlock === block.id}
                                onEdit={() => setEditingBlock(block.id)}
                              />
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

      {/* Block Editor Modal */}
      {editingBlock && (
        <BlockEditor
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
