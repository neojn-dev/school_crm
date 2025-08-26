"use client"

import { useState } from "react"
import Link from "next/link"
import { 
  PlusCircle, 
  Search, 
  Filter,
  Eye,
  Edit,
  Trash2,
  Globe,
  FileText,
  Navigation,
  Settings,
  Layers,
  MoreHorizontal
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HierarchicalNavigationOrganizer } from "@/components/cms/hierarchical-navigation-organizer"
import { PageListSkeleton } from "@/components/cms/loading-states"

interface CmsPage {
  id: string
  title: string
  slug: string
  description?: string
  isPublished: boolean
  publishedAt?: string
  updatedAt: string
  template?: {
    name: string
  }
  createdByUser: {
    username: string
    firstName?: string
  }
  updatedByUser: {
    username: string
    firstName?: string
  }
  _count: {
    blocks: number
  }
}

interface PagesClientProps {
  initialPages: CmsPage[]
}

type ViewDensity = 'compact' | 'comfortable' | 'expanded'

export function PagesClient({ initialPages }: PagesClientProps) {
  const [pages, setPages] = useState<CmsPage[]>(initialPages)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("pages")
  const [isLoading, setIsLoading] = useState(false)
  const [viewDensity, setViewDensity] = useState<ViewDensity>('compact')

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleNavigationUpdate = () => {
    // This will be called when navigation is updated
    // You can add any additional logic here if needed
    console.log('Navigation updated')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pages & Navigation</h1>
            <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <FileText className="h-4 w-4 mr-1" />
                {pages.length} pages
              </span>
              <span className="flex items-center">
                <Globe className="h-4 w-4 mr-1" />
                {pages.filter(p => p.isPublished).length} published
              </span>
            </div>
          </div>
          <Link href="/cms/pages/new">
            <Button className="cms-button-primary">
              <PlusCircle className="h-4 w-4" />
              <span>New Page</span>
            </Button>
          </Link>
        </div>

        {/* Tabs */}
        <div className="cms-card">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6 py-4">
              <button
                onClick={() => setActiveTab("pages")}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "pages"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>Pages ({pages.length})</span>
              </button>
              <button
                onClick={() => setActiveTab("navigation")}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === "navigation"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Navigation className="h-4 w-4" />
                <span>Navigation</span>
              </button>
            </nav>
          </div>

          {/* Pages Tab */}
          {activeTab === "pages" && (
            <div className="p-6 space-y-6">
              {/* Filters and Search */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search pages by title or slug..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="cms-input pl-10"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <Button variant="outline" className="cms-button-secondary">
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                  </Button>
                  <Select value={viewDensity} onValueChange={(value: ViewDensity) => setViewDensity(value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">Compact</SelectItem>
                      <SelectItem value="comfortable">Comfortable</SelectItem>
                      <SelectItem value="expanded">Expanded</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="text-sm text-gray-500">
                    {filteredPages.length} of {pages.length} pages
                  </div>
                </div>
              </div>

              {/* Pages List */}
              {isLoading ? (
                <PageListSkeleton />
              ) : (
                <div className="cms-card overflow-hidden">
                  {filteredPages.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Page
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Status
                            </th>
                            {viewDensity !== 'compact' && (
                              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Template
                              </th>
                            )}
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Blocks
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Updated
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {filteredPages.map((page) => {
                            const rowPadding = viewDensity === 'compact' ? 'py-2' : viewDensity === 'comfortable' ? 'py-3' : 'py-4'
                            return (
                            <tr key={page.id} className="hover:bg-gray-50 transition-colors group">
                              <td className={`px-4 ${rowPadding}`}>
                                <div className="flex items-center space-x-3">
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                    page.isPublished ? 'bg-green-100' : 'bg-yellow-100'
                                  }`}>
                                    <FileText className={`h-4 w-4 ${
                                      page.isPublished ? 'text-green-600' : 'text-yellow-600'
                                    }`} />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="font-semibold text-gray-900 truncate">
                                      {page.title}
                                    </div>
                                    {viewDensity !== 'compact' && (
                                      <div className="text-sm text-gray-500 truncate">
                                        /{page.slug}
                                      </div>
                                    )}
                                    {viewDensity === 'expanded' && page.description && (
                                      <div className="text-xs text-gray-400 truncate mt-1">
                                        {page.description}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </td>
                              <td className={`px-4 ${rowPadding}`}>
                                <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                                  page.isPublished 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {page.isPublished ? 'Published' : 'Draft'}
                                </span>
                              </td>
                              <td className={`px-4 ${rowPadding}`}>
                                {viewDensity !== 'compact' && (
                                  <div className="flex items-center text-sm text-gray-600">
                                    <Layers className="h-3 w-3 mr-1 text-gray-400" />
                                    {page.template?.name || 'None'}
                                  </div>
                                )}
                              </td>
                              <td className={`px-4 ${rowPadding}`}>
                                <div className="flex items-center text-sm text-gray-600">
                                  <PlusCircle className="h-3 w-3 mr-1 text-gray-400" />
                                  {page._count.blocks}
                                </div>
                              </td>
                              <td className={`px-4 ${rowPadding}`}>
                                <div className="text-sm text-gray-600">
                                  <div className="font-medium">
                                    {page.updatedByUser.firstName || page.updatedByUser.username}
                                  </div>
                                  {viewDensity !== 'compact' && (
                                    <div className="text-xs text-gray-400">
                                      {new Date(page.updatedAt).toLocaleDateString()}
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td className={`px-4 ${rowPadding}`}>
                                <div className="flex items-center justify-end space-x-1">
                                  {page.isPublished && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0 hover:bg-blue-50"
                                      title="View page"
                                      asChild
                                    >
                                      <a href={`/${page.slug}`} target="_blank" rel="noopener noreferrer">
                                        <Eye className="h-4 w-4 text-blue-600" />
                                      </a>
                                    </Button>
                                  )}
                                  
                                  <Link href={`/cms/pages/${page.id}/edit`}>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0 hover:bg-gray-100"
                                      title="Edit page"
                                    >
                                      <Edit className="h-4 w-4 text-gray-600" />
                                    </Button>
                                  </Link>
                                  
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 w-8 p-0 hover:bg-red-50"
                                    title="Delete page"
                                  >
                                    <Trash2 className="h-4 w-4 text-red-600" />
                                  </Button>
                                </div>
                              </td>
                            </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                ) : (
                  <div className="cms-card-body text-center py-16">
                    <div className="max-w-md mx-auto">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {searchTerm ? 'No pages found' : 'No pages yet'}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {searchTerm 
                          ? 'Try adjusting your search terms or clear the search to see all pages.'
                          : 'Get started by creating your first page to build your website content.'
                        }
                      </p>
                      {!searchTerm && (
                        <Link href="/cms/pages/new">
                          <Button className="cms-button-primary">
                            <PlusCircle className="h-4 w-4" />
                            <span>Create Your First Page</span>
                          </Button>
                        </Link>
                      )}
                      {searchTerm && (
                        <Button 
                          variant="outline" 
                          onClick={() => setSearchTerm('')}
                          className="cms-button-secondary"
                        >
                          Clear Search
                        </Button>
                      )}
                    </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Navigation Tab */}
          {activeTab === "navigation" && (
            <div className="p-6">
              <HierarchicalNavigationOrganizer onNavigationUpdate={handleNavigationUpdate} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
