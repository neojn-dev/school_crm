import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { z } from "zod"

// Template creation/update schema
const templateSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  category: z.enum(['business', 'government', 'blog', 'portfolio', 'ecommerce']),
  structure: z.string(), // JSON structure
  previewImage: z.string().optional(),
  isActive: z.boolean().default(true),
  parentTemplateId: z.string().optional()
})

// GET /api/cms/templates - Get all templates
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const isActive = searchParams.get('isActive')

    const templates = await db.cmsTemplate.findMany({
      where: {
        ...(category && { category }),
        ...(isActive !== null && { isActive: isActive === 'true' })
      },
      include: {
        createdByUser: { select: { username: true, firstName: true } },
        updatedByUser: { select: { username: true, firstName: true } },
        _count: { select: { pages: true } }
      },
      orderBy: { updatedAt: 'desc' }
    })

    return NextResponse.json(templates)
  } catch (error) {
    console.error('Error fetching templates:', error)
    return NextResponse.json(
      { error: "Failed to fetch templates" },
      { status: 500 }
    )
  }
}

// POST /api/cms/templates - Create new template
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = templateSchema.parse(body)

    const template = await db.cmsTemplate.create({
      data: {
        ...validatedData,
        createdByUserId: session.user.id,
        updatedByUserId: session.user.id
      },
      include: {
        createdByUser: { select: { username: true, firstName: true } },
        updatedByUser: { select: { username: true, firstName: true } },
        _count: { select: { pages: true } }
      }
    })

    return NextResponse.json(template, { status: 201 })
  } catch (error) {
    console.error('Error creating template:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Failed to create template" },
      { status: 500 }
    )
  }
}
