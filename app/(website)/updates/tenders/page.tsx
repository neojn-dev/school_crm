import Link from "next/link"
import { Calendar, FileText, ArrowRight, DollarSign, Clock } from "lucide-react"

export default async function TendersPage() {
  const res = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/tenders`, { cache: 'no-store' })
  const items = await res.json()
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tenders</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore current tender opportunities and procurement notices
          </p>
        </div>

        {/* Tenders Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((tender: any) => (
            <Link 
              key={tender.id} 
              href={`/updates/tenders/${tender.slug || tender.id}`}
              className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Header with Icon */}
              <div className="h-48 bg-gradient-to-br from-orange-100 to-orange-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute top-4 right-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Tender
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                  {tender.title}
                </h3>
                
                {tender.description && (
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {tender.description.slice(0, 140)}...
                  </p>
                )}

                {/* Meta Info */}
                <div className="space-y-2 mb-4">
                  {tender.referenceNo && (
                    <div className="flex items-center text-sm text-gray-500">
                      <FileText className="h-4 w-4 mr-2" />
                      <span>Ref: {tender.referenceNo}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Published: {new Date(tender.publishedAt || tender.createdAt).toLocaleDateString()}</span>
                  </div>

                  {tender.closingDate && (
                    <div className="flex items-center text-sm text-red-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Closes: {new Date(tender.closingDate).toLocaleDateString()}</span>
                    </div>
                  )}

                  {tender.estimatedValue && (
                    <div className="flex items-center text-sm text-green-600">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span>Est. Value: {tender.estimatedValue}</span>
                    </div>
                  )}
                </div>

                {/* Read More */}
                <div className="flex items-center text-orange-600 font-medium group-hover:text-orange-700 transition-colors">
                  <span>View Details</span>
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
              <FileText className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No tenders available</h3>
            <p className="text-gray-600">Check back later for new opportunities!</p>
          </div>
        )}
      </div>
    </div>
  )
}


