import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { z } from "zod"

const updatePageSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  slug: z.string().min(1, "Slug is required").optional(),
  description: z.string().optional(),
  content: z.string().optional(),
  templateId: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  layout: z.string().optional(),
  parentId: z.string().optional(),
  isPublished: z.boolean().optional(),
})

// GET /api/cms/pages/[id] - Get single page
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const page = await db.cmsPage.findUnique({
      where: { id: resolvedParams.id },
      include: {
        template: { select: { id: true, name: true } },
        createdByUser: { select: { id: true, username: true, firstName: true } },
        updatedByUser: { select: { id: true, username: true, firstName: true } },
        blocks: {
          include: {
            block: { select: { id: true, name: true, type: true, component: true } }
          },
          orderBy: { sortOrder: 'asc' }
        }
      }
    })

    if (!page) {
      return NextResponse.json(
        { error: "Page not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ page })
  } catch (error) {
    console.error("Error fetching page:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// PUT /api/cms/pages/[id] - Update page
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const data = updatePageSchema.parse(body)

    // Check if page exists
    const existingPage = await db.cmsPage.findUnique({
      where: { id: resolvedParams.id }
    })

    if (!existingPage) {
      return NextResponse.json(
        { error: "Page not found" },
        { status: 404 }
      )
    }

    // Check if slug already exists (if being updated)
    if (data.slug && data.slug !== existingPage.slug) {
      const slugExists = await db.cmsPage.findUnique({
        where: { slug: data.slug }
      })

      if (slugExists) {
        return NextResponse.json(
          { error: "A page with this slug already exists" },
          { status: 400 }
        )
      }
    }

    // Update the page
    const updateData: any = {
      ...data,
      updatedBy: session.user.id,
    }

    // Handle publishing status
    if (data.isPublished !== undefined) {
      if (data.isPublished && !existingPage.isPublished) {
        updateData.publishedAt = new Date()
        updateData.isDraft = false
      } else if (!data.isPublished) {
        updateData.publishedAt = null
        updateData.isDraft = true
      }
    }

    const page = await db.cmsPage.update({
      where: { id: resolvedParams.id },
      data: updateData,
      include: {
        template: { select: { id: true, name: true } },
        createdByUser: { select: { id: true, username: true, firstName: true } },
        updatedByUser: { select: { id: true, username: true, firstName: true } }
      }
    })

    return NextResponse.json({ page })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Error updating page:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// DELETE /api/cms/pages/[id] - Delete page
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Check if page exists
    const existingPage = await db.cmsPage.findUnique({
      where: { id: resolvedParams.id }
    })

    if (!existingPage) {
      return NextResponse.json(
        { error: "Page not found" },
        { status: 404 }
      )
    }

    // Delete the page (this will cascade delete related blocks)
    await db.cmsPage.delete({
      where: { id: resolvedParams.id }
    })

    return NextResponse.json({ message: "Page deleted successfully" })
  } catch (error) {
    console.error("Error deleting page:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
