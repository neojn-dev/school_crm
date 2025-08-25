import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"
import { z } from "zod"

const uploadSchema = z.object({
  title: z.string().optional(),
  altText: z.string().optional(),
  folder: z.string().optional(),
})

// GET /api/cms/media - Get all media files
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "20")
    const search = searchParams.get("search")
    const folder = searchParams.get("folder")
    const mimeType = searchParams.get("type") // image, video, document
    
    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { originalName: { contains: search } },
        { title: { contains: search } },
        { description: { contains: search } }
      ]
    }
    
    if (folder) {
      where.folder = folder === "none" ? null : folder
    }
    
    if (mimeType) {
      switch (mimeType) {
        case "image":
          where.mimeType = { startsWith: "image/" }
          break
        case "video":
          where.mimeType = { startsWith: "video/" }
          break
        case "document":
          where.OR = [
            { mimeType: { contains: "pdf" } },
            { mimeType: { contains: "document" } },
            { mimeType: { contains: "text" } }
          ]
          break
      }
    }

    const [mediaFiles, total] = await Promise.all([
      db.cmsMedia.findMany({
        where,
        include: {
          uploadedByUser: { select: { id: true, username: true, firstName: true } }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      db.cmsMedia.count({ where })
    ])

    return NextResponse.json({
      mediaFiles,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error("Error fetching media:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// POST /api/cms/media - Upload new media file
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get("file") as File
    const title = formData.get("title") as string
    const altText = formData.get("altText") as string
    const folder = formData.get("folder") as string

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      )
    }

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be less than 10MB" },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
      'video/mp4', 'video/webm', 'video/ogg',
      'application/pdf',
      'text/plain', 'text/csv',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "File type not supported" },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const extension = file.name.split('.').pop()
    const filename = `${timestamp}-${randomString}.${extension}`

    // Create upload directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'media')
    try {
      await mkdir(uploadDir, { recursive: true })
    } catch (error) {
      // Directory might already exist
    }

    // Save file to disk
    const filePath = join(uploadDir, filename)
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // Get image dimensions for images
    let width: number | undefined
    let height: number | undefined
    
    if (file.type.startsWith('image/')) {
      // You could use a library like 'sharp' here to get actual dimensions
      // For now, we'll leave them undefined
    }

    // Save to database
    const media = await db.cmsMedia.create({
      data: {
        filename,
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        path: `/uploads/media/${filename}`,
        url: `/uploads/media/${filename}`,
        title: title || file.name.replace(/\.[^/.]+$/, ""),
        altText: altText || "",
        folder: folder || null,
        width,
        height,
        uploadedBy: session.user.id
      },
      include: {
        uploadedByUser: { select: { id: true, username: true, firstName: true } }
      }
    })

    return NextResponse.json({ media }, { status: 201 })
  } catch (error) {
    console.error("Error uploading media:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
