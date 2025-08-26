import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { items } = body

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: 'Items must be an array' }, { status: 400 })
    }

    // Update all navigation items with new sort orders
    const updatePromises = items.map((item: { id: string, sortOrder: number }) => 
      db.cmsNavigation.update({
        where: { id: item.id },
        data: { 
          sortOrder: item.sortOrder,
          updatedBy: session.user.id
        }
      })
    )

    await Promise.all(updatePromises)

    return NextResponse.json({ 
      message: 'Navigation order updated successfully',
      updatedCount: items.length 
    })
  } catch (error) {
    console.error('Error updating navigation order:', error)
    return NextResponse.json(
      { error: 'Failed to update navigation order' },
      { status: 500 }
    )
  }
}
