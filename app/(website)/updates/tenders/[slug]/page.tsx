import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { Calendar, FileText, DollarSign, Clock, ArrowLeft, Download, MapPin } from "lucide-react"
import Link from "next/link"

export default async function TenderDetailPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const tender = await db.tender.findFirst({ 
    where: { 
      OR: [
        { slug: params.slug }, 
        { id: params.slug }
      ] 
    } 
  })
  
  if (!tender || tender.status !== 'published') {
    return notFound()
  }

  const isClosingSoon = tender.closingDate && new Date(tender.closingDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const isClosed = tender.closingDate && new Date(tender.closingDate) < new Date()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Link 
          href="/updates/tenders"
          className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tenders
        </Link>

        {/* Article */}
        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
            <div className="h-64 bg-gradient-to-br from-orange-100 to-orange-200 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              <div className="absolute top-6 left-6">
                <span className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  Tender Notice
                </span>
              </div>
              <div className="absolute bottom-6 right-6">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <FileText className="h-8 w-8 text-white" />
                </div>
              </div>
              {isClosed && (
                <div className="absolute top-6 right-6">
                  <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Closed
                  </span>
                </div>
              )}
              {isClosingSoon && !isClosed && (
                <div className="absolute top-6 right-6">
                  <span className="bg-yellow-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Closing Soon
                  </span>
                </div>
              )}
            </div>
            
            <div className="p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {tender.title}
              </h1>
              
              {/* Meta Information */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-3">
                  {tender.referenceNo && (
                    <div className="flex items-center text-sm text-gray-600">
                      <FileText className="h-4 w-4 mr-2" />
                      <span>Reference: {tender.referenceNo}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Published: {new Date(tender.publishedAt || tender.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  {tender.location && (
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>Location: {tender.location}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  {tender.closingDate && (
                    <div className={`flex items-center text-sm ${isClosed ? 'text-red-600' : isClosingSoon ? 'text-yellow-600' : 'text-gray-600'}`}>
                      <Clock className="h-4 w-4 mr-2" />
                      <span>Closing: {new Date(tender.closingDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  
                  {tender.estimatedValue && (
                    <div className="flex items-center text-sm text-green-600">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span>Est. Value: {tender.estimatedValue}</span>
                    </div>
                  )}
                  
                  {tender.category && (
                    <div className="bg-gray-100 px-3 py-1 rounded-full text-sm inline-block">
                      {tender.category}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tender Description</h2>
            <div className="prose prose-lg max-w-none">
              {tender.description && (
                <div 
                  dangerouslySetInnerHTML={{ __html: tender.description }} 
                  className="text-gray-700 leading-relaxed"
                />
              )}
            </div>
          </div>

          {/* Requirements & Documents */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Requirements */}
            {tender.requirements && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Requirements</h3>
                <div 
                  dangerouslySetInnerHTML={{ __html: tender.requirements }} 
                  className="prose text-gray-700"
                />
              </div>
            )}

            {/* Documents & Contact */}
            <div className="space-y-8">
              {/* Documents */}
              {tender.documents && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Documents</h3>
                  <div className="space-y-3">
                    <button className="flex items-center w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                      <Download className="h-4 w-4 mr-3 text-gray-600" />
                      <span className="text-sm text-gray-700">Tender Document.pdf</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Contact Information */}
              {tender.contactInfo && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                  <div 
                    dangerouslySetInnerHTML={{ __html: tender.contactInfo }} 
                    className="prose text-gray-700"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Important Dates Summary */}
          {(tender.openingDate || tender.closingDate || tender.submissionDeadline) && (
            <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Important Dates</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {tender.openingDate && (
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Calendar className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Opening Date</div>
                    <div className="font-semibold text-gray-900">
                      {new Date(tender.openingDate).toLocaleDateString()}
                    </div>
                  </div>
                )}
                
                {tender.submissionDeadline && (
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <Clock className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Submission Deadline</div>
                    <div className="font-semibold text-gray-900">
                      {new Date(tender.submissionDeadline).toLocaleDateString()}
                    </div>
                  </div>
                )}
                
                {tender.closingDate && (
                  <div className={`text-center p-4 rounded-lg ${isClosed ? 'bg-red-50' : 'bg-green-50'}`}>
                    <Clock className={`h-6 w-6 mx-auto mb-2 ${isClosed ? 'text-red-600' : 'text-green-600'}`} />
                    <div className="text-sm text-gray-600">Closing Date</div>
                    <div className="font-semibold text-gray-900">
                      {new Date(tender.closingDate).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  )
}



