import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { MediaLibraryClient } from "./media-library-client"
import { ImageManager } from "@/components/cms/image-manager"

export default async function MediaLibraryPage() {
  const session = await getServerSession(authOptions)
  
  // Get all media files with user info
  const mediaFiles = await db.cmsMedia.findMany({
    include: {
      uploadedByUser: { select: { username: true, firstName: true } }
    },
    orderBy: { createdAt: 'desc' }
  })

  // Get media statistics
  const stats = {
    totalFiles: mediaFiles.length,
    totalSize: mediaFiles.reduce((sum, file) => sum + file.size, 0),
    images: mediaFiles.filter(file => file.mimeType.startsWith('image/')).length,
    documents: mediaFiles.filter(file => 
      file.mimeType.includes('pdf') || 
      file.mimeType.includes('document') || 
      file.mimeType.includes('text')
    ).length,
    videos: mediaFiles.filter(file => file.mimeType.startsWith('video/')).length
  }

  // Transform mediaFiles to match MediaFile interface
  const transformedMediaFiles = mediaFiles.map(file => ({
    ...file,
    title: file.title || undefined,
    description: file.description || undefined,
    altText: file.altText || undefined,
    folder: file.folder || undefined,
    createdAt: file.createdAt.toISOString(),
    uploadedByUser: {
      ...file.uploadedByUser,
      firstName: file.uploadedByUser.firstName || undefined
    }
  }))

  return (
    <div className="h-screen">
      <ImageManager
        isOpen={true}
        allowSelection={false}
        allowUpload={true}
        allowEdit={true}
        allowDelete={true}
      />
    </div>
  )
}
