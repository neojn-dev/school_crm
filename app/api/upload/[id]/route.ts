import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { readFile } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params
  try {
    const { id } = resolvedParams
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    // Find the upload record
    const upload = await db.upload.findFirst({
      where: {
        id: id,
        userId: session.user.id, // Only allow access to own files
      },
    })

    if (!upload) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      )
    }

    const filePath = path.join(process.cwd(), upload.path)

    // Check if file exists on disk
    if (!existsSync(filePath)) {
      return NextResponse.json(
        { error: "File not found on disk" },
        { status: 404 }
      )
    }

    // Read file
    const fileBuffer = await readFile(filePath)

    // Return file with appropriate headers
    return new NextResponse(new Uint8Array(fileBuffer), {
      status: 200,
      headers: {
        'Content-Type': upload.mimeType,
        'Content-Length': upload.size.toString(),
        'Content-Disposition': `attachment; filename="${upload.originalName}"`,
        'Cache-Control': 'private, max-age=3600', // Cache for 1 hour
      },
    })
  } catch (error) {
    console.error("Download error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params
  try {
    const { id } = resolvedParams
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    // Find the upload record
    const upload = await db.upload.findFirst({
      where: {
        id: id,
        userId: session.user.id, // Only allow deletion of own files
      },
    })

    if (!upload) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      )
    }

    // Delete file from disk
    const filePath = path.join(process.cwd(), upload.path)
    if (existsSync(filePath)) {
      const { unlink } = await import('fs/promises')
      await unlink(filePath)
    }

    // Delete record from database
    await db.upload.delete({
      where: { id: id },
    })

    return NextResponse.json({ message: "File deleted successfully" })
  } catch (error) {
    console.error("Delete file error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
