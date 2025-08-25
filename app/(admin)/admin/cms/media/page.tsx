import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { MediaLibraryClient } from "./media-library-client"

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

  return (
    <MediaLibraryClient 
      initialMediaFiles={mediaFiles}
      stats={stats}
    />
  )
}
