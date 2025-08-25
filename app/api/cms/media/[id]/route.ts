import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { unlink } from "fs/promises"
import { join } from "path"
import { z } from "zod"

const updateMediaSchema = z.object({
  title: z.string().optional(),
  altText: z.string().optional(),
  description: z.string().optional(),
  folder: z.string().optional(),
})

// GET /api/cms/media/[id] - Get single media file
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const media = await db.cmsMedia.findUnique({
      where: { id: params.id },
      include: {
        uploadedByUser: { select: { id: true, username: true, firstName: true } }
      }
    })

    if (!media) {
      return NextResponse.json(
        { error: "Media file not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ media })
  } catch (error) {
    console.error("Error fetching media:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// PUT /api/cms/media/[id] - Update media file metadata
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const data = updateMediaSchema.parse(body)

    // Check if media exists
    const existingMedia = await db.cmsMedia.findUnique({
      where: { id: params.id }
    })

    if (!existingMedia) {
      return NextResponse.json(
        { error: "Media file not found" },
        { status: 404 }
      )
    }

    // Update the media
    const media = await db.cmsMedia.update({
      where: { id: params.id },
      data,
      include: {
        uploadedByUser: { select: { id: true, username: true, firstName: true } }
      }
    })

    return NextResponse.json({ media })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Error updating media:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// DELETE /api/cms/media/[id] - Delete media file
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Check if media exists
    const existingMedia = await db.cmsMedia.findUnique({
      where: { id: params.id }
    })

    if (!existingMedia) {
      return NextResponse.json(
        { error: "Media file not found" },
        { status: 404 }
      )
    }

    // Delete file from disk
    try {
      const filePath = join(process.cwd(), 'public', existingMedia.path)
      await unlink(filePath)
    } catch (error) {
      console.warn('Could not delete file from disk:', error)
      // Continue with database deletion even if file deletion fails
    }

    // Delete from database
    await db.cmsMedia.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: "Media file deleted successfully" })
  } catch (error) {
    console.error("Error deleting media:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
