import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { z } from "zod"

const createPageSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  content: z.string().optional(),
  templateId: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  layout: z.string().optional(),
  parentId: z.string().optional(),
  isPublished: z.boolean().default(false),
})

// GET /api/cms/pages - Get all pages
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
    const limit = parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search")
    const status = searchParams.get("status") // published, draft, all
    
    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { slug: { contains: search } },
        { description: { contains: search } }
      ]
    }
    
    if (status === "published") {
      where.isPublished = true
    } else if (status === "draft") {
      where.isPublished = false
    }

    const [pages, total] = await Promise.all([
      db.cmsPage.findMany({
        where,
        include: {
          template: { select: { id: true, name: true } },
          createdByUser: { select: { id: true, username: true, firstName: true } },
          updatedByUser: { select: { id: true, username: true, firstName: true } },
          _count: { select: { blocks: true } }
        },
        orderBy: { updatedAt: 'desc' },
        skip,
        take: limit
      }),
      db.cmsPage.count({ where })
    ])

    return NextResponse.json({
      pages,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error("Error fetching pages:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// POST /api/cms/pages - Create new page
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const data = createPageSchema.parse(body)

    // Check if slug already exists
    const existingPage = await db.cmsPage.findUnique({
      where: { slug: data.slug }
    })

    if (existingPage) {
      return NextResponse.json(
        { error: "A page with this slug already exists" },
        { status: 400 }
      )
    }

    // Create the page
    const page = await db.cmsPage.create({
      data: {
        ...data,
        createdBy: session.user.id,
        updatedBy: session.user.id,
        publishedAt: data.isPublished ? new Date() : null,
        isDraft: !data.isPublished
      },
      include: {
        template: { select: { id: true, name: true } },
        createdByUser: { select: { id: true, username: true, firstName: true } },
        updatedByUser: { select: { id: true, username: true, firstName: true } }
      }
    })

    return NextResponse.json({ page }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Error creating page:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
