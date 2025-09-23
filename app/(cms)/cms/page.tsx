import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import Link from "next/link"
import { 
  FileText, 
  Megaphone, 
  Image, 
  Eye,
  TrendingUp,
  Plus,
  Calendar,
  ArrowRight
} from "lucide-react"

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  
  // Get CMS statistics
  const [
    totalBlogs,
    publishedBlogs,
    totalAnnouncements,
    publishedAnnouncements,
    totalTenders,
    publishedTenders,
    totalMedia,
    recentBlogs,
    recentAnnouncements,
    recentTenders
  ] = await Promise.all([
    db.blogPost.count(),
    db.blogPost.count({ where: { status: 'published' } }),
    db.announcement.count(),
    db.announcement.count({ where: { status: 'published' } }),
    db.tender.count(),
    db.tender.count({ where: { status: 'published' } }),
    db.cmsMedia.count(),
    db.blogPost.findMany({
      take: 3,
      orderBy: { updatedAt: 'desc' },
      select: { id: true, title: true, status: true, updatedAt: true }
    }),
    db.announcement.findMany({
      take: 3,
      orderBy: { updatedAt: 'desc' },
      select: { id: true, title: true, status: true, updatedAt: true }
    }),
    db.tender.findMany({
      take: 3,
      orderBy: { updatedAt: 'desc' },
      select: { id: true, title: true, status: true, updatedAt: true }
    })
  ])

  const stats = [
    {
      name: "Blog Posts",
      total: totalBlogs,
      published: publishedBlogs,
      icon: FileText,
      color: "bg-blue-500",
      href: "/cms/blogs",
      createHref: "/cms/blogs/new"
    },
    {
      name: "Announcements",
      total: totalAnnouncements,
      published: publishedAnnouncements,
      icon: Megaphone,
      color: "bg-purple-500",
      href: "/cms/announcements",
      createHref: "/cms/announcements/new"
    },
    {
      name: "Tenders",
      total: totalTenders,
      published: publishedTenders,
      icon: FileText,
      color: "bg-orange-500",
      href: "/cms/tenders",
      createHref: "/cms/tenders/new"
    },
    {
      name: "Media Files",
      total: totalMedia,
      published: totalMedia,
      icon: Image,
      color: "bg-green-500",
      href: "/cms/media",
      createHref: "/cms/media"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {session?.user?.username || 'Admin'}!
        </h1>
        <p className="text-gray-600 text-lg">
          Manage your content with our streamlined CMS focused on blogs, announcements, and tenders.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow group"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`${stat.color} p-3 rounded-lg group-hover:scale-105 transition-transform`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stat.total}
                      </div>
                      <div className="ml-2 text-sm text-gray-500">
                        ({stat.published} published)
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500 group-hover:text-gray-700">View all</span>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/cms/blogs/new"
            className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
          >
            <div className="bg-blue-500 p-2 rounded-lg mr-3 group-hover:scale-105 transition-transform">
              <Plus className="h-4 w-4 text-white" />
            </div>
            <span className="font-medium text-blue-700">New Blog Post</span>
          </Link>
          
          <Link
            href="/cms/announcements/new"
            className="flex items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group"
          >
            <div className="bg-purple-500 p-2 rounded-lg mr-3 group-hover:scale-105 transition-transform">
              <Plus className="h-4 w-4 text-white" />
            </div>
            <span className="font-medium text-purple-700">New Announcement</span>
          </Link>
          
          <Link
            href="/cms/tenders/new"
            className="flex items-center p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors group"
          >
            <div className="bg-orange-500 p-2 rounded-lg mr-3 group-hover:scale-105 transition-transform">
              <Plus className="h-4 w-4 text-white" />
            </div>
            <span className="font-medium text-orange-700">New Tender</span>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Blogs */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Recent Blogs</h3>
              <Link href="/cms/blogs" className="text-sm text-blue-600 hover:text-blue-700">
                View all
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {recentBlogs.length > 0 ? (
              recentBlogs.map((blog) => (
                <div key={blog.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {blog.title}
                      </p>
                      <div className="flex items-center mt-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          blog.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {blog.status}
                        </span>
                        <span className="ml-2 text-xs text-gray-500">
                          {new Date(blog.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center">
                <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No blog posts yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Announcements */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Recent Announcements</h3>
              <Link href="/cms/announcements" className="text-sm text-purple-600 hover:text-purple-700">
                View all
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {recentAnnouncements.length > 0 ? (
              recentAnnouncements.map((announcement) => (
                <div key={announcement.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {announcement.title}
                      </p>
                      <div className="flex items-center mt-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          announcement.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {announcement.status}
                        </span>
                        <span className="ml-2 text-xs text-gray-500">
                          {new Date(announcement.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center">
                <Megaphone className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No announcements yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Tenders */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Recent Tenders</h3>
              <Link href="/cms/tenders" className="text-sm text-orange-600 hover:text-orange-700">
                View all
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {recentTenders.length > 0 ? (
              recentTenders.map((tender) => (
                <div key={tender.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {tender.title}
                      </p>
                      <div className="flex items-center mt-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          tender.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {tender.status}
                        </span>
                        <span className="ml-2 text-xs text-gray-500">
                          {new Date(tender.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center">
                <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No tenders yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}