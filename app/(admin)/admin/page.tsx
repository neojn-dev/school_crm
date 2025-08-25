import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { 
  FileText, 
  Layers, 
  Image, 
  Eye,
  TrendingUp,
  Users,
  Globe,
  Calendar
} from "lucide-react"

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  
  // Get CMS statistics
  const [
    totalPages,
    publishedPages,
    totalTemplates,
    totalBlocks,
    totalMedia,
    recentPages
  ] = await Promise.all([
    db.cmsPage.count(),
    db.cmsPage.count({ where: { isPublished: true } }),
    db.cmsTemplate.count({ where: { isActive: true } }),
    db.cmsBlock.count(),
    db.cmsMedia.count(),
    db.cmsPage.findMany({
      take: 5,
      orderBy: { updatedAt: 'desc' },
      include: {
        template: { select: { name: true } },
        updatedByUser: { select: { username: true, firstName: true } }
      }
    })
  ])

  const stats = [
    {
      name: "Total Pages",
      value: totalPages,
      icon: FileText,
      color: "bg-blue-500",
      change: "+12%",
      changeType: "increase"
    },
    {
      name: "Published Pages",
      value: publishedPages,
      icon: Globe,
      color: "bg-green-500",
      change: "+8%",
      changeType: "increase"
    },
    {
      name: "Templates",
      value: totalTemplates,
      icon: Layers,
      color: "bg-purple-500",
      change: "+2%",
      changeType: "increase"
    },
    {
      name: "Media Files",
      value: totalMedia,
      icon: Image,
      color: "bg-orange-500",
      change: "+15%",
      changeType: "increase"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {session?.user?.username}!
        </h1>
        <p className="mt-2 text-gray-600">
          Here's what's happening with your content management system today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`${stat.color} p-3 rounded-md`}>
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
                        {stat.value}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Pages */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Recent Pages</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {recentPages.length > 0 ? (
              recentPages.map((page) => (
                <div key={page.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {page.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {page.template?.name || 'No template'} • 
                        Updated by {page.updatedByUser.firstName || page.updatedByUser.username}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        page.isPublished 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {page.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No pages yet</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating your first page.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <a
                href="/admin/cms/pages/new"
                className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                <FileText className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm font-medium text-gray-900">New Page</span>
              </a>
              <a
                href="/admin/cms/templates/new"
                className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                <Layers className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm font-medium text-gray-900">New Template</span>
              </a>
              <a
                href="/admin/cms/media"
                className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                <Image className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm font-medium text-gray-900">Media Library</span>
              </a>
              <a
                href="/admin/cms/pages"
                className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
              >
                <Eye className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm font-medium text-gray-900">View All Pages</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">System Status</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">99.9%</div>
              <div className="text-sm text-gray-500">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalBlocks}</div>
              <div className="text-sm text-gray-500">Content Blocks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round((totalMedia / 1024 / 1024) * 100) / 100} MB
              </div>
              <div className="text-sm text-gray-500">Storage Used</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
