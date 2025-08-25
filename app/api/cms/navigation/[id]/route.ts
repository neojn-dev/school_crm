import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const navigationItem = await db.cmsNavigation.findUnique({
      where: { id: params.id },
      include: {
        children: {
          include: {
            page: {
              select: { id: true, title: true, slug: true }
            }
          },
          orderBy: { sortOrder: 'asc' }
        },
        page: {
          select: { id: true, title: true, slug: true }
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { label, href, target, type, pageId, parentId, isActive } = body

    if (!label?.trim()) {
      return NextResponse.json({ error: 'Label is required' }, { status: 400 })
    }

    if (type === 'external' && !href?.trim()) {
      return NextResponse.json({ error: 'URL is required for external links' }, { status: 400 })
    }

    if (type === 'page' && !pageId) {
      return NextResponse.json({ error: 'Page selection is required' }, { status: 400 })
    }

    // Check if navigation item exists
    const existingItem = await db.cmsNavigation.findUnique({
      where: { id: params.id }
    })

    if (!existingItem) {
      return NextResponse.json(
        { error: 'Navigation item not found' },
        { status: 404 }
      )
    }

    const navigationItem = await db.cmsNavigation.update({
      where: { id: params.id },
      data: {
        label: label.trim(),
        href: type === 'page' ? '' : (href?.trim() || ''),
        target: target || null,
        type,
        pageId: type === 'page' ? pageId : null,
        parentId: parentId || null,
        isActive: isActive !== false,
        updatedBy: session.user.id
      },
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if navigation item exists
    const existingItem = await db.cmsNavigation.findUnique({
      where: { id: params.id },
      include: { children: true }
    })

    if (!existingItem) {
      return NextResponse.json(
        { error: 'Navigation item not found' },
        { status: 404 }
      )
    }

    // Delete children first (if any)
    if (existingItem.children.length > 0) {
      await db.cmsNavigation.deleteMany({
        where: { parentId: params.id }
      })
    }

    // Delete the navigation item
    await db.cmsNavigation.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting navigation item:', error)
    return NextResponse.json(
      { error: 'Failed to delete navigation item' },
      { status: 500 }
    )
  }
}
