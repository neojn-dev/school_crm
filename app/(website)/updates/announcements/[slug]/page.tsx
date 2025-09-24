import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { Calendar, Megaphone, AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default async function AnnouncementDetailPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const announcement = await db.announcement.findFirst({ 
    where: { 
      OR: [
        { slug: params.slug }, 
        { id: params.slug }
      ] 
    } 
  })
  
  if (!announcement || announcement.status !== 'published') {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Link 
          href="/updates/announcements"
          className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Announcements
        </Link>

        {/* Article */}
        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
            <div className="h-64 bg-gradient-to-br from-purple-100 to-purple-200 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute top-6 left-6">
                <span className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  Announcement
                </span>
              </div>
              <div className="absolute bottom-6 right-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Megaphone className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {announcement.title}
              </h1>
              
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Published {new Date(announcement.publishedAt || announcement.createdAt).toLocaleDateString()}</span>
                </div>
                
                {announcement.priority === 'high' && (
                  <div className="flex items-center space-x-2 text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span className="font-medium">Important Notice</span>
                  </div>
                )}
                
                {announcement.category && (
                  <div className="bg-gray-100 px-3 py-1 rounded-full">
                    {announcement.category}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="prose prose-lg max-w-none">
              {announcement.body && (
                <div 
                  dangerouslySetInnerHTML={{ __html: announcement.body }} 
                  className="text-gray-700 leading-relaxed"
                />
              )}
            </div>

            {/* Additional Information */}
            {(announcement.effectiveDate || announcement.expiryDate) && (
              <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Dates</h3>
                <div className="space-y-2">
                  {announcement.effectiveDate && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Effective from: {new Date(announcement.effectiveDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  {announcement.expiryDate && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Valid until: {new Date(announcement.expiryDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  )
}



