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
  Settings
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HierarchicalNavigationOrganizer } from "@/components/cms/hierarchical-navigation-organizer"

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

export function PagesClient({ initialPages }: PagesClientProps) {
  const [pages, setPages] = useState<CmsPage[]>(initialPages)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("pages")

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pages & Navigation</h1>
          <p className="text-gray-600">Manage your website pages and navigation structure</p>
        </div>
        <Link href="/cms/pages/new">
          <Button className="flex items-center space-x-2">
            <PlusCircle className="h-4 w-4" />
            <span>New Page</span>
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pages" className="flex items-center space-x-2">
            <FileText className="h-4 w-4" />
            <span>Pages</span>
          </TabsTrigger>
          <TabsTrigger value="navigation" className="flex items-center space-x-2">
            <Navigation className="h-4 w-4" />
            <span>Navigation</span>
          </TabsTrigger>
        </TabsList>

        {/* Pages Tab */}
        <TabsContent value="pages" className="space-y-6">
          {/* Filters and Search */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search pages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </div>
          </div>

          {/* Pages List */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {filteredPages.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {filteredPages.map((page) => (
                  <div key={page.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-gray-400" />
                          <div>
                            <h3 className="text-lg font-medium text-gray-900">
                              {page.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              /{page.slug}
                            </p>
                            {page.description && (
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                {page.description}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                          <span>
                            Template: {page.template?.name || 'None'}
                          </span>
                          <span>•</span>
                          <span>
                            {page._count.blocks} blocks
                          </span>
                          <span>•</span>
                          <span>
                            Updated by {page.updatedByUser.firstName || page.updatedByUser.username}
                          </span>
                          <span>•</span>
                          <span>
                            {new Date(page.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        {/* Status Badge */}
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          page.isPublished 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {page.isPublished ? 'Published' : 'Draft'}
                        </span>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          {page.isPublished && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center space-x-1"
                              asChild
                            >
                              <a href={`/${page.slug}`} target="_blank" rel="noopener noreferrer">
                                <Eye className="h-4 w-4" />
                                <span>View</span>
                              </a>
                            </Button>
                          )}
                          
                          <Link href={`/cms/pages/${page.id}/edit`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center space-x-1"
                            >
                              <Edit className="h-4 w-4" />
                              <span>Edit</span>
                            </Button>
                          </Link>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Delete</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  {searchTerm ? 'No pages found' : 'No pages'}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm 
                    ? 'Try adjusting your search terms.'
                    : 'Get started by creating your first page.'
                  }
                </p>
                {!searchTerm && (
                  <div className="mt-6">
                    <Link href="/cms/pages/new">
                      <Button className="flex items-center space-x-2">
                        <PlusCircle className="h-4 w-4" />
                        <span>New Page</span>
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </TabsContent>

        {/* Navigation Tab */}
        <TabsContent value="navigation">
          <HierarchicalNavigationOrganizer onNavigationUpdate={handleNavigationUpdate} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
