"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
      {/* Content Type Dropdown */}
      <div className="p-4 border-b border-gray-200">
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Content Type</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Blocks</SelectItem>
                {blockCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Search */}
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
        <div className="p-4">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
            {selectedCategory === "all" 
              ? `All Components (${filteredBlocks.length})`
              : `${blockCategories.find(cat => cat.id === selectedCategory)?.name || selectedCategory} (${filteredBlocks.length})`
            }
          </div>
          
          <div className="space-y-2">
            {filteredBlocks.map((block) => (
              <div
                key={block.type}
                className="border border-gray-200 rounded-lg p-3 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer group"
                onClick={() => onAddBlock(block)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm truncate">
                      {block.name}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {block.description}
                    </p>
                  </div>
                  <div className="ml-3 flex-shrink-0">
                    <Plus className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </div>
              </div>
            ))}
            
            {filteredBlocks.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm font-medium">No blocks found</p>
                <p className="text-gray-400 text-xs mt-1">
                  Try adjusting your search or selecting a different content type
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
