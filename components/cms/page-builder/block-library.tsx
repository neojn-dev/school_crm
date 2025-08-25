"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { allBlockConfigs, blockCategories } from "../blocks"
import { Search, Plus } from "lucide-react"

interface BlockLibraryProps {
  onAddBlock: (blockConfig: any) => void
}

export function BlockLibrary({ onAddBlock }: BlockLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredBlocks = allBlockConfigs.filter(block => {
    const matchesSearch = block.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         block.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || block.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  return (
    <div className="h-full flex flex-col">
      {/* Search */}
      <div className="p-4 border-b border-gray-200">
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

      {/* Categories */}
      <div className="p-4 border-b border-gray-200">
        <div className="space-y-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
              selectedCategory === "all"
                ? "bg-blue-100 text-blue-700"
                : "hover:bg-gray-100"
            }`}
          >
            All Blocks
          </button>
          
          {blockCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                selectedCategory === category.id
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Blocks */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {filteredBlocks.map((block) => (
            <div
              key={block.type}
              className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer group"
              onClick={() => onAddBlock(block)}
            >
              {/* Preview Image */}
              {block.previewImage && (
                <div className="w-full h-24 bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                  <span className="text-xs text-gray-500">Preview</span>
                </div>
              )}
              
              {/* Block Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900 text-sm">
                    {block.name}
                  </h4>
                  <Plus className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
                
                <p className="text-xs text-gray-600 leading-relaxed">
                  {block.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {blockCategories.find(cat => cat.id === block.category)?.name || block.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          {filteredBlocks.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">No blocks found</p>
              <p className="text-gray-400 text-xs mt-1">
                Try adjusting your search or category filter
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
