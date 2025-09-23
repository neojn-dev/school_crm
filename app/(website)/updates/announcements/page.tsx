import Link from "next/link"
import { Calendar, Megaphone, ArrowRight, AlertCircle } from "lucide-react"

export default async function AnnouncementsPage() {
  const res = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/announcements`, { cache: 'no-store' })
  const items = await res.json()
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Announcements</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay informed with our latest announcements and important updates
          </p>
        </div>

        {/* Announcements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((announcement: any) => (
            <Link 
              key={announcement.id} 
              href={`/updates/announcements/${announcement.slug || announcement.id}`}
              className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Header with Icon */}
              <div className="h-48 bg-gradient-to-br from-purple-100 to-purple-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute top-4 right-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Megaphone className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Announcement
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                  {announcement.title}
                </h3>
                
                {announcement.body && (
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {announcement.body.slice(0, 140)}...
                  </p>
                )}

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(announcement.publishedAt || announcement.createdAt).toLocaleDateString()}</span>
                  </div>
                  {announcement.priority === 'high' && (
                    <div className="flex items-center space-x-1 text-red-600">
                      <AlertCircle className="h-4 w-4" />
                      <span className="font-medium">Important</span>
                    </div>
                  )}
                </div>

                {/* Read More */}
                <div className="flex items-center text-purple-600 font-medium group-hover:text-purple-700 transition-colors">
                  <span>Read More</span>
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {items.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Megaphone className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No announcements yet</h3>
            <p className="text-gray-600">Check back later for important updates!</p>
          </div>
        )}
      </div>
    </div>
  )
}


