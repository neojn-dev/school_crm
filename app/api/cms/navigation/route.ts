import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const navigationItems = await db.cmsNavigation.findMany({
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
      },
      orderBy: { sortOrder: 'asc' }
    })

    return NextResponse.json(navigationItems)
  } catch (error) {
    console.error('Error fetching navigation items:', error)
    return NextResponse.json(
      { error: 'Failed to fetch navigation items' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
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

    // Get the next sort order
    const lastItem = await db.cmsNavigation.findFirst({
      where: { parentId: parentId || null },
      orderBy: { sortOrder: 'desc' }
    })
    const sortOrder = (lastItem?.sortOrder || 0) + 1

    const navigationItem = await db.cmsNavigation.create({
      data: {
        label: label.trim(),
        href: type === 'page' ? '' : (href?.trim() || ''),
        target: target || null,
        type,
        pageId: type === 'page' ? pageId : null,
        parentId: parentId || null,
        sortOrder,
        isActive: isActive !== false,
        createdBy: session.user.id,
        updatedBy: session.user.id
      },
      include: {
        page: {
          select: { id: true, title: true, slug: true }
        }
      }
    })

    return NextResponse.json(navigationItem, { status: 201 })
  } catch (error) {
    console.error('Error creating navigation item:', error)
    return NextResponse.json(
      { error: 'Failed to create navigation item' },
      { status: 500 }
    )
  }
}
