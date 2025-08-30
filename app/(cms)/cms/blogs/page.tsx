import Link from "next/link"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Plus, 
  Edit, 
  Eye, 
  Trash2, 
  Calendar, 
  Tag, 
  Image as ImageIcon,
  Star,
  BarChart3,
  FileText
} from "lucide-react"

export default async function BlogsAdminListPage() {
  const posts = await db.blogPost.findMany({ 
    orderBy: { updatedAt: 'desc' },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true
        }
      }
    }
  })

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { variant: 'secondary', label: 'Draft' },
      published: { variant: 'default', label: 'Published' },
      archived: { variant: 'destructive', label: 'Archived' }
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft
    return <Badge variant={config.variant as any}>{config.label}</Badge>
  }

  const getLayoutIcon = (layout: string) => {
    const layoutIcons = {
      'default': <FileText className="h-4 w-4" />,
      'featured': <Star className="h-4 w-4" />,
      'sidebar': <BarChart3 className="h-4 w-4" />,
      'full-width': <ImageIcon className="h-4 w-4" />,
      'centered': <FileText className="h-4 w-4" />,
      'magazine': <FileText className="h-4 w-4" />
    }
    return layoutIcons[layout as keyof typeof layoutIcons] || layoutIcons.default
  }

  const formatDate = (date: Date | null) => {
    if (!date) return 'Not set'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-gray-600">Create and manage blog posts with enhanced features.</p>
        </div>
        <Link href="/cms/blogs/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Blog Post
          </Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Posts</p>
                <p className="text-2xl font-bold">{posts.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-2xl font-bold">
                  {posts.filter(p => p.status === 'published').length}
                </p>
              </div>
              <Eye className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Drafts</p>
                <p className="text-2xl font-bold">
                  {posts.filter(p => p.status === 'draft').length}
                </p>
              </div>
              <FileText className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Featured</p>
                <p className="text-2xl font-bold">
                  {posts.filter(p => p.featured).length}
                </p>
              </div>
              <Star className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Blog Posts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Blog Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 text-sm">
                <tr>
                  <th className="px-4 py-3 font-medium">Title & Excerpt</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Layout</th>
                  <th className="px-4 py-3 font-medium">Author</th>
                  <th className="px-4 py-3 font-medium">Published</th>
                  <th className="px-4 py-3 font-medium">Updated</th>
                  <th className="px-4 py-3 font-medium w-32">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post.id} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="max-w-xs">
                        <div className="font-medium text-gray-900 mb-1">
                          {post.title}
                          {post.featured && (
                            <Star className="h-4 w-4 inline ml-2 text-yellow-500" />
                          )}
                        </div>
                        {post.excerpt && (
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">
                            Slug: {post.slug}
                          </span>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-4 py-3">
                      {getStatusBadge(post.status)}
                    </td>
                    
                    <td className="px-4 py-3">
                      {post.category ? (
                        <Badge variant="outline">{post.category}</Badge>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {getLayoutIcon(post.layout)}
                        <span className="text-sm capitalize">{post.layout}</span>
                      </div>
                    </td>
                    
                    <td className="px-4 py-3">
                      {post.author ? (
                        <div className="text-sm">
                          <div className="font-medium">
                            {post.author.firstName} {post.author.lastName}
                          </div>
                          <div className="text-gray-500">@{post.author.username}</div>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-600">
                        {formatDate(post.publishedAt)}
                      </div>
                    </td>
                    
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-600">
                        {formatDate(post.updatedAt)}
                      </div>
                    </td>
                    
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/cms/blogs/${post.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/cms/blogs/${post.id}/preview`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {posts.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts yet</h3>
              <p className="text-gray-600 mb-4">Get started by creating your first blog post.</p>
              <Link href="/cms/blogs/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Post
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}


