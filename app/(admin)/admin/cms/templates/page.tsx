import Link from "next/link"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { 
  PlusCircle, 
  Search, 
  Filter,
  Eye,
  Edit,
  Trash2,
  Copy,
  Layers
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function TemplatesManagement() {
  const session = await getServerSession(authOptions)
  
  // Get all templates with related data
  const templates = await db.cmsTemplate.findMany({
    include: {
      createdByUser: { select: { username: true, firstName: true } },
      updatedByUser: { select: { username: true, firstName: true } },
      _count: { select: { pages: true } }
    },
    orderBy: { updatedAt: 'desc' }
  })

  const templateCategories = [
    { id: 'business', name: 'Business', count: templates.filter(t => t.category === 'business').length },
    { id: 'government', name: 'Government', count: templates.filter(t => t.category === 'government').length },
    { id: 'blog', name: 'Blog', count: templates.filter(t => t.category === 'blog').length },
    { id: 'portfolio', name: 'Portfolio', count: templates.filter(t => t.category === 'portfolio').length },
    { id: 'ecommerce', name: 'E-commerce', count: templates.filter(t => t.category === 'ecommerce').length }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Templates</h1>
          <p className="text-gray-600">Templates for general pages are deprecated. Use the Blogs editor for rich content; Announcements and Tenders manage files and notices.</p>
        </div>
        <Link href="/admin/cms/templates/new">
          <Button className="flex items-center space-x-2">
            <PlusCircle className="h-4 w-4" />
            <span>New Template</span>
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {templateCategories.map((category) => (
          <div key={category.id} className="bg-white p-4 rounded-lg shadow border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{category.name}</p>
                <p className="text-2xl font-bold text-gray-900">{category.count}</p>
              </div>
              <Layers className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
            {/* Preview Image */}
            <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
              {template.previewImage ? (
                <img 
                  src={template.previewImage} 
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <Layers className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No Preview</p>
                </div>
              )}
            </div>
            
            {/* Template Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {template.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {template.description}
                  </p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  template.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {template.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className="capitalize bg-gray-100 px-2 py-1 rounded">
                  {template.category}
                </span>
                <span>{template._count.pages} pages</span>
              </div>
              
              <div className="text-xs text-gray-500 mb-4">
                Updated by {template.updatedByUser.firstName || template.updatedByUser.username} • 
                {new Date(template.updatedAt).toLocaleDateString()}
              </div>
              
              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="flex items-center space-x-1">
                    <Eye className="h-3 w-3" />
                    <span>Preview</span>
                  </Button>
                  
                  <Link href={`/admin/cms/templates/${template.id}/edit`}>
                    <Button variant="outline" size="sm" className="flex items-center space-x-1">
                      <Edit className="h-3 w-3" />
                      <span>Edit</span>
                    </Button>
                  </Link>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Button variant="outline" size="sm" className="flex items-center space-x-1">
                    <Copy className="h-3 w-3" />
                    <span>Clone</span>
                  </Button>
                  
                  {!template.isSystem && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {templates.length === 0 && (
        <div className="text-center py-12">
          <Layers className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No templates</h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by creating your first template.
          </p>
          <div className="mt-6">
            <Link href="/admin/cms/templates/new">
              <Button className="flex items-center space-x-2">
                <PlusCircle className="h-4 w-4" />
                <span>New Template</span>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
