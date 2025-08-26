import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

// POST /api/cms/templates/[id]/clone - Clone template
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get the original template
    const originalTemplate = await db.cmsTemplate.findUnique({
      where: { id: params.id }
    })

    if (!originalTemplate) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 })
    }

    // Create cloned template
    const clonedTemplate = await db.cmsTemplate.create({
      data: {
        name: `${originalTemplate.name} (Copy)`,
        description: originalTemplate.description,
        category: originalTemplate.category,
        structure: originalTemplate.structure,
        previewImage: originalTemplate.previewImage,
        isActive: true,
        isSystem: false, // Cloned templates are never system templates
        createdByUserId: session.user.id,
        updatedByUserId: session.user.id
      },
      include: {
        createdByUser: { select: { username: true, firstName: true } },
        updatedByUser: { select: { username: true, firstName: true } },
        _count: { select: { pages: true } }
      }
    })

    return NextResponse.json(clonedTemplate, { status: 201 })
  } catch (error) {
    console.error('Error cloning template:', error)
    return NextResponse.json(
      { error: "Failed to clone template" },
      { status: 500 }
    )
  }
}
