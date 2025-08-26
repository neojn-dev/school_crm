import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

// GET /api/cms/navigation/[id] - Get single navigation item
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params
  try {
    const navigationItem = await db.cmsNavigation.findUnique({
      where: { id: resolvedParams.id },
      include: {
        page: {
          select: { id: true, title: true, slug: true }
        },
        children: {
          include: {
            page: {
              select: { id: true, title: true, slug: true }
            }
          },
          orderBy: { sortOrder: 'asc' }
        }
      }
    })

    if (!navigationItem) {
      return NextResponse.json(
        { error: 'Navigation item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(navigationItem)
  } catch (error) {
    console.error('Error fetching navigation item:', error)
    return NextResponse.json(
      { error: 'Failed to fetch navigation item' },
      { status: 500 }
    )
  }
}

// PUT /api/cms/navigation/[id] - Update navigation item
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { label, href, target, type, pageId, parentId, isActive, sortOrder } = body

    // Check if navigation item exists
    const existingItem = await db.cmsNavigation.findUnique({
      where: { id: resolvedParams.id }
    })

    if (!existingItem) {
      return NextResponse.json(
        { error: 'Navigation item not found' },
        { status: 404 }
      )
    }

    // Prepare update data
    const updateData: any = {
      updatedBy: session.user.id
    }

    if (label !== undefined) updateData.label = label.trim()
    if (href !== undefined) updateData.href = href.trim()
    if (target !== undefined) updateData.target = target
    if (type !== undefined) updateData.type = type
    if (pageId !== undefined) updateData.pageId = pageId
    if (parentId !== undefined) updateData.parentId = parentId
    if (isActive !== undefined) updateData.isActive = isActive
    if (sortOrder !== undefined) updateData.sortOrder = sortOrder

    // Validate required fields based on type
    if (updateData.type === 'external' && !updateData.href) {
      return NextResponse.json({ error: 'URL is required for external links' }, { status: 400 })
    }

    if (updateData.type === 'page' && !updateData.pageId) {
      return NextResponse.json({ error: 'Page selection is required' }, { status: 400 })
    }

    const navigationItem = await db.cmsNavigation.update({
      where: { id: resolvedParams.id },
      data: updateData,
      include: {
        page: {
          select: { id: true, title: true, slug: true }
        }
      }
    })

    return NextResponse.json(navigationItem)
  } catch (error) {
    console.error('Error updating navigation item:', error)
    return NextResponse.json(
      { error: 'Failed to update navigation item' },
      { status: 500 }
    )
  }
}

// DELETE /api/cms/navigation/[id] - Delete navigation item
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if navigation item exists
    const existingItem = await db.cmsNavigation.findUnique({
      where: { id: resolvedParams.id },
      include: {
        children: true
      }
    })

    if (!existingItem) {
      return NextResponse.json(
        { error: 'Navigation item not found' },
        { status: 404 }
      )
    }

    // Check if item has children
    if (existingItem.children && existingItem.children.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete navigation item with children. Remove children first.' },
        { status: 400 }
      )
    }

    // Delete the navigation item
    await db.cmsNavigation.delete({
      where: { id: resolvedParams.id }
    })

    return NextResponse.json({ message: 'Navigation item deleted successfully' })
  } catch (error) {
    console.error('Error deleting navigation item:', error)
    return NextResponse.json(
      { error: 'Failed to delete navigation item' },
      { status: 500 }
    )
  }
}