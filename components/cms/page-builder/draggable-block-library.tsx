"use client"

import { useState, useContext } from "react"
import { Draggable, Droppable, DragDropContext } from "@hello-pangea/dnd"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { allBlockConfigs, blockCategories } from "../blocks"
import { 
  Search, 
  Plus, 
  GripVertical,
  Layout,
  Type,
  FileText,
  Image,
  MousePointer,
  Zap,
  ShoppingCart,
  Target,
  Grid,
  Navigation,
  Layers
} from "lucide-react"

interface DraggableBlockLibraryProps {
  onAddBlock: (blockConfig: any) => void
  enableDragDrop?: boolean
}

export function DraggableBlockLibrary({ onAddBlock, enableDragDrop = true }: DraggableBlockLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')

  const filteredBlocks = allBlockConfigs.filter(block => {
    const matchesSearch = block.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         block.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || block.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
      case 'layout': return Layout
      case 'advanced-layout': return Grid
      case 'navigation': return Navigation
      case 'text': return Type
      case 'content': return FileText
      case 'media': return Image
      case 'interactive': return MousePointer
      case 'ecommerce': return ShoppingCart
      case 'forms': return Zap
      case 'cta': return Target
      default: return Layers
    }
  }

  const getBlockIcon = (component: string) => {
    if (component.includes('Hero')) return '🦸'
    if (component.includes('Features')) return '⭐'
    if (component.includes('Testimonials')) return '💬'
    if (component.includes('Heading')) return '📝'
    if (component.includes('Paragraph')) return '📄'
    if (component.includes('Image')) return '🖼️'
    if (component.includes('Video')) return '🎥'
    if (component.includes('Button')) return '🔘'
    if (component.includes('Form')) return '📋'
    if (component.includes('Container')) return '📦'
    if (component.includes('Section')) return '🏗️'
    if (component.includes('Columns')) return '📊'
    if (component.includes('Grid')) return '⚏'
    if (component.includes('Card')) return '🃏'
    if (component.includes('Gallery')) return '🖼️'
    if (component.includes('Carousel')) return '🎠'
    if (component.includes('Accordion')) return '🪗'
    if (component.includes('Tabs')) return '📑'
    if (component.includes('Modal')) return '🪟'
    if (component.includes('Navbar')) return '🧭'
    if (component.includes('Footer')) return '👣'
    return '🧩'
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Block Library</h2>
              {enableDragDrop && (
                <div className="mt-1 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-blue-700 font-medium">🎯 DRAG & DROP ENABLED</p>
                  <p className="text-xs text-blue-600">Drag components from here to the canvas</p>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-1">
              <Button
                onClick={() => setViewMode('list')}
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                className="p-2"
              >
                <Layers className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => setViewMode('grid')}
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                className="p-2"
              >
                <Grid className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Blocks</SelectItem>
                {blockCategories.map((category) => {
                  const Icon = getCategoryIcon(category.id)
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
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search blocks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Blocks List */}
      <div className="flex-1 overflow-y-auto">
        {enableDragDrop ? (
          <Droppable droppableId="block-library" type="block" isDropDisabled={true}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="p-4"
              >
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                  {selectedCategory === "all" 
                    ? `All Components (${filteredBlocks.length})`
                    : `${blockCategories.find(cat => cat.id === selectedCategory)?.name || selectedCategory} (${filteredBlocks.length})`
                  }
                </div>
                
                <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-2' : 'space-y-2'}>
                  {filteredBlocks.map((block, index) => (
                    <Draggable
                      key={block.component}
                      draggableId={block.component}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`
                            border-2 border-blue-300 rounded-lg p-3 transition-all
                            ${snapshot.isDragging ? 'cursor-grabbing' : 'cursor-grab'}
                            ${snapshot.isDragging 
                              ? 'opacity-50 rotate-2 scale-105 shadow-xl border-blue-400 bg-blue-100' : 'hover:border-blue-400 hover:bg-blue-50 hover:shadow-md'
                            }
                            ${viewMode === 'grid' ? 'text-center' : ''}
                          `}

                        >
                          {/* Drag Handle for Grid View */}
                          {viewMode === 'grid' && (
                            <div 
                              {...provided.dragHandleProps}
                              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm border border-gray-200 hover:bg-gray-50 cursor-grab active:cursor-grabbing z-10"
                              title="Drag to add block"
                            >
                              <GripVertical className="h-3 w-3 text-gray-500" />
                            </div>
                          )}
                          <div className={`flex items-center ${viewMode === 'grid' ? 'flex-col space-y-2' : 'justify-between'}`}>
                            <div className={`flex items-center ${viewMode === 'grid' ? 'flex-col space-y-1' : 'space-x-3 flex-1 min-w-0'}`}>
                              <div className={`
                                flex items-center justify-center rounded-lg bg-gradient-to-br from-gray-100 to-gray-200
                                ${viewMode === 'grid' ? 'w-12 h-12' : 'w-10 h-10 flex-shrink-0'}
                              `}>
                                <span className={`${viewMode === 'grid' ? 'text-2xl' : 'text-xl'}`}>
                                  {getBlockIcon(block.component)}
                                </span>
                              </div>
                              <div className={`${viewMode === 'grid' ? 'text-center' : 'flex-1 min-w-0'}`}>
                                <h4 className={`font-medium text-gray-900 ${viewMode === 'grid' ? 'text-xs' : 'text-sm'} truncate`}>
                                  {block.name}
                                </h4>
                                {viewMode === 'list' && (
                                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                    {block.description}
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            {viewMode === 'list' && (
                              <div className="flex items-center space-x-2 flex-shrink-0">
                                <div 
                                  {...provided.dragHandleProps}
                                  className="p-1 hover:bg-gray-100 rounded cursor-grab active:cursor-grabbing"
                                  title="Drag to add block"
                                >
                                  <GripVertical className="h-4 w-4 text-gray-500" />
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Drag indicator */}
                          {snapshot.isDragging && (
                            <div className="absolute inset-0 bg-blue-500 bg-opacity-20 rounded-lg border-2 border-blue-500 border-dashed flex items-center justify-center">
                              <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                                Drop to add block
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
                
                {filteredBlocks.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="h-6 w-6 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-sm font-medium">No blocks found</p>
                    <p className="text-gray-400 text-xs mt-1">
                      Try adjusting your search or selecting a different category
                    </p>
                  </div>
                )}
                
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ) : (
          <div className="p-4">
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
              {selectedCategory === "all" 
                ? `All Components (${filteredBlocks.length})`
                : `${blockCategories.find(cat => cat.id === selectedCategory)?.name || selectedCategory} (${filteredBlocks.length})`
              }
            </div>
            
            <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-2' : 'space-y-2'}>
              {filteredBlocks.map((block) => (
                <div
                  key={block.component}
                  className={`
                    border border-gray-200 rounded-lg p-3 cursor-pointer transition-all
                    hover:border-blue-300 hover:bg-blue-50 hover:shadow-md
                    ${viewMode === 'grid' ? 'text-center' : ''}
                  `}
                  onClick={() => onAddBlock(block)}
                >
                  <div className={`flex items-center ${viewMode === 'grid' ? 'flex-col space-y-2' : 'justify-between'}`}>
                    <div className={`flex items-center ${viewMode === 'grid' ? 'flex-col space-y-1' : 'space-x-3 flex-1 min-w-0'}`}>
                      <div className={`
                        flex items-center justify-center rounded-lg bg-gradient-to-br from-gray-100 to-gray-200
                        ${viewMode === 'grid' ? 'w-12 h-12' : 'w-10 h-10 flex-shrink-0'}
                      `}>
                        <span className={`${viewMode === 'grid' ? 'text-2xl' : 'text-xl'}`}>
                          {getBlockIcon(block.component)}
                        </span>
                      </div>
                      <div className={`${viewMode === 'grid' ? 'text-center' : 'flex-1 min-w-0'}`}>
                        <h4 className={`font-medium text-gray-900 ${viewMode === 'grid' ? 'text-xs' : 'text-sm'} truncate`}>
                          {block.name}
                        </h4>
                        {viewMode === 'list' && (
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                            {block.description}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {viewMode === 'list' && (
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <Plus className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {filteredBlocks.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm font-medium">No blocks found</p>
                <p className="text-gray-400 text-xs mt-1">
                  Try adjusting your search or selecting a different category
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Add Buttons */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
          Quick Add
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: 'Hero', component: 'HeroBlock', icon: '🦸' },
            { name: 'Text', component: 'ParagraphBlock', icon: '📝' },
            { name: 'Image', component: 'ImageBlock', icon: '🖼️' },
            { name: 'Button', component: 'ButtonBlock', icon: '🔘' }
          ].map((quickBlock) => {
            const blockConfig = allBlockConfigs.find(b => b.component === quickBlock.component)
            return (
              <Button
                key={quickBlock.component}
                onClick={() => blockConfig && onAddBlock(blockConfig)}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 text-xs"
              >
                <span>{quickBlock.icon}</span>
                <span>{quickBlock.name}</span>
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
