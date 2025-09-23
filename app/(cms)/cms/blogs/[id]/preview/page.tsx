import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeft, 
  Calendar, 
  Tag, 
  User, 
  Eye, 
  Star,
  FileText,
  Globe,
  Share2
} from "lucide-react"
import Link from "next/link"

interface BlogPreviewPageProps {
  params: {
    id: string
  }
}

export default async function BlogPreviewPage({ params }: BlogPreviewPageProps) {
  const blog = await db.blogPost.findUnique({
    where: { id: params.id },
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

  if (!blog) {
    notFound()
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { variant: 'secondary', label: 'Draft' },
      published: { variant: 'default', label: 'Published' },
      archived: { variant: 'destructive', label: 'Archived' }
    }
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft
    return <Badge variant={config.variant as any}>{config.label}</Badge>
  }

  const formatDate = (date: Date | null) => {
    if (!date) return 'Not set'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const parseTags = (tagsString: string | null) => {
    if (!tagsString) return []
    try {
      return JSON.parse(tagsString)
    } catch {
      return []
    }
  }

  const tags = parseTags(blog.tags)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/cms/blogs">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blogs
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-semibold">Blog Preview</h1>
                <p className="text-sm text-gray-600">Preview mode - This is how your blog will appear</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge(blog.status)}
              <Link href={`/cms/blogs/${blog.id}/edit`}>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="space-y-4">
              {/* Title */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {blog.title}
                  {blog.featured && (
                    <Star className="h-6 w-6 inline ml-2 text-yellow-500" />
                  )}
                </h1>
                {blog.excerpt && (
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {blog.excerpt}
                  </p>
                )}
              </div>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                {blog.author && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>
                      {blog.author.firstName} {blog.author.lastName}
                    </span>
                  </div>
                )}
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {blog.publishedAt ? formatDate(blog.publishedAt) : 'Not published'}
                  </span>
                </div>

                {blog.category && (
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    <Badge variant="outline">{blog.category}</Badge>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>{blog.viewCount} views</span>
                </div>
              </div>

              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              <Separator />
            </div>
          </CardHeader>

          <CardContent>
            {/* Cover Image */}
            {blog.coverImage && (
              <div className="mb-8">
                <img 
                  src={blog.coverImage} 
                  alt={blog.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Header Image */}
            {blog.headerImage && (
              <div className="mb-8">
                <img 
                  src={blog.headerImage} 
                  alt={blog.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {blog.content ? (
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-4" />
                  <p>No content available</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* SEO Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              SEO & Social Media Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* SEO Meta */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Search Engine Results</h4>
                <div className="border rounded-lg p-4 bg-white">
                  <div className="text-blue-600 text-sm mb-1">
                    {blog.metaTitle || blog.title}
                  </div>
                  <div className="text-green-600 text-sm mb-2">
                    https://example.com/blog/{blog.slug}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {blog.metaDescription || blog.excerpt || 'No description available'}
                  </div>
                </div>
              </div>

              {/* Social Media Preview */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Social Media Preview</h4>
                <div className="border rounded-lg p-4 bg-white">
                  {blog.ogImage && (
                    <img 
                      src={blog.ogImage} 
                      alt="Social media preview"
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                  )}
                  <div className="text-sm">
                    <div className="font-medium text-gray-900 mb-1">
                      {blog.ogTitle || blog.title}
                    </div>
                    <div className="text-gray-600">
                      {blog.ogDescription || blog.excerpt || 'No description available'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Technical Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Slug:</span> {blog.slug}
              </div>
              <div>
                <span className="font-medium">Layout:</span> {blog.layout}
              </div>
              <div>
                <span className="font-medium">Created:</span> {formatDate(blog.createdAt)}
              </div>
              <div>
                <span className="font-medium">Updated:</span> {formatDate(blog.updatedAt)}
              </div>
              {blog.canonicalUrl && (
                <div className="md:col-span-2">
                  <span className="font-medium">Canonical URL:</span> {blog.canonicalUrl}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
