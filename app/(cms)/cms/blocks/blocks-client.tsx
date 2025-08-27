"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { allBlockConfigs, blockCategories, getTotalBlockCount } from "@/components/cms/blocks"
import { Search, Plus, Eye, Code, Settings } from "lucide-react"

export function BlocksClient() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredBlocks = allBlockConfigs.filter(block => {
    const matchesSearch = block.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         block.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || block.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const getCategoryIcon = (categoryId: string) => {
    const category = blockCategories.find(cat => cat.id === categoryId)
    return category?.icon || "📦"
  }

  const getCategoryName = (categoryId: string) => {
    const category = blockCategories.find(cat => cat.id === categoryId)
    return category?.name || categoryId
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Blocks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{getTotalBlockCount()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{blockCategories.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{filteredBlocks.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Filtered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{filteredBlocks.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Blocks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {blockCategories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <span className="flex items-center space-x-2">
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search blocks by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Blocks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlocks.map((block) => (
          <Card key={block.type} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">{getCategoryIcon(block.category)}</span>
                    <Badge variant="secondary" className="text-xs">
                      {getCategoryName(block.category)}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{block.name}</CardTitle>
                </div>
                <div className="flex space-x-1">
                  <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600">
                    <Code className="h-4 w-4" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-gray-600">
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {block.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Type:</span>
                  <code className="bg-gray-100 px-2 py-1 rounded text-gray-700">
                    {block.type}
                  </code>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Component:</span>
                  <code className="bg-gray-100 px-2 py-1 rounded text-gray-700">
                    {block.component}
                  </code>
                </div>
                {block.previewImage && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Preview:</span>
                    <span className="text-blue-600">Available</span>
                  </div>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Use in Page Builder</span>
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredBlocks.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No blocks found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or category filter
            </p>
            <button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

