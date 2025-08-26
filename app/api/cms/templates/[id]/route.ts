import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { z } from "zod"
import { validateTemplateInheritance } from "@/lib/template-utils"

// Template update schema
const templateUpdateSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
  category: z.enum(['business', 'government', 'blog', 'portfolio', 'ecommerce']).optional(),
  structure: z.string().optional(), // JSON structure
  previewImage: z.string().optional(),
  isActive: z.boolean().optional(),
  parentTemplateId: z.string().optional().nullable()
})

// GET /api/cms/templates/[id] - Get single template
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const template = await db.cmsTemplate.findUnique({
      where: { id: params.id },
      include: {
        createdByUser: { select: { username: true, firstName: true } },
        updatedByUser: { select: { username: true, firstName: true } },
        _count: { select: { pages: true } }
      }
    })

    if (!template) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 })
    }

    return NextResponse.json(template)
  } catch (error) {
    console.error('Error fetching template:', error)
    return NextResponse.json(
      { error: "Failed to fetch template" },
      { status: 500 }
    )
  }
}

// PUT /api/cms/templates/[id] - Update template
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if template exists and is not a system template
    const existingTemplate = await db.cmsTemplate.findUnique({
      where: { id: params.id }
    })

    if (!existingTemplate) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 })
    }

    if (existingTemplate.isSystem) {
      return NextResponse.json(
        { error: "System templates cannot be modified" },
        { status: 403 }
      )
    }

    const body = await request.json()
    const validatedData = templateUpdateSchema.parse(body)

    // Validate inheritance if parentTemplateId is being set
    if (validatedData.parentTemplateId) {
      const validation = await validateTemplateInheritance(params.id, validatedData.parentTemplateId)
      if (!validation.valid) {
        return NextResponse.json(
          { error: validation.error },
          { status: 400 }
        )
      }
    }

    const template = await db.cmsTemplate.update({
      where: { id: params.id },
      data: {
        ...validatedData,
        updatedByUserId: session.user.id
      },
      include: {
        createdByUser: { select: { username: true, firstName: true } },
        updatedByUser: { select: { username: true, firstName: true } },
        _count: { select: { pages: true } }
      }
    })

    return NextResponse.json(template)
  } catch (error) {
    console.error('Error updating template:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Failed to update template" },
      { status: 500 }
    )
  }
}

// DELETE /api/cms/templates/[id] - Delete template
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if template exists and is not a system template
    const existingTemplate = await db.cmsTemplate.findUnique({
      where: { id: params.id },
      include: {
        _count: { select: { pages: true } }
      }
    })

    if (!existingTemplate) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 })
    }

    if (existingTemplate.isSystem) {
      return NextResponse.json(
        { error: "System templates cannot be deleted" },
        { status: 403 }
      )
    }

    if (existingTemplate._count.pages > 0) {
      return NextResponse.json(
        { error: "Cannot delete template that is being used by pages" },
        { status: 400 }
      )
    }

    await db.cmsTemplate.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting template:', error)
    return NextResponse.json(
      { error: "Failed to delete template" },
      { status: 500 }
    )
  }
}
