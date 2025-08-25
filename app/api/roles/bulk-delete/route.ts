import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only admins can perform bulk delete operations
    if (session.user?.role !== 'Admin') {
      return NextResponse.json({ 
        error: 'Access denied. Admin privileges required for bulk operations.' 
      }, { status: 403 })
    }

    const body = await request.json()
    const { ids, password, deleteAll } = body

    // Validate request
    if (deleteAll && !password) {
      return NextResponse.json({ 
        error: 'Password is required for delete all operation' 
      }, { status: 400 })
    }

    if (!deleteAll && (!ids || !Array.isArray(ids) || ids.length === 0)) {
      return NextResponse.json({ 
        error: 'Role IDs are required for bulk delete' 
      }, { status: 400 })
    }

    // Verify admin password for delete all operations
    if (deleteAll) {
      const adminUser = await prisma.user.findUnique({
        where: { id: session.user.id }
      })

      if (!adminUser) {
        return NextResponse.json({ error: 'Admin user not found' }, { status: 404 })
      }

      const isPasswordValid = await bcrypt.compare(password, adminUser.passwordHash)
      if (!isPasswordValid) {
        return NextResponse.json({ 
          error: 'Invalid password. Delete all operation cancelled.' 
        }, { status: 401 })
      }
    }

    let deletedCount = 0

    if (deleteAll) {
      // Delete all roles except Admin role
      const result = await prisma.role.deleteMany({
        where: {
          name: {
            not: 'Admin' // Don't delete the Admin role
          }
        }
      })
      deletedCount = result.count
    } else {
      // Delete selected roles, but protect Admin role
      const safeIds = await prisma.role.findMany({
        where: {
          id: { in: ids },
          name: { not: 'Admin' }
        },
        select: { id: true }
      })

      if (safeIds.length === 0) {
        return NextResponse.json({ 
          error: 'Cannot delete Admin role or roles not found' 
        }, { status: 400 })
      }

      const result = await prisma.role.deleteMany({
        where: {
          id: { in: safeIds.map(r => r.id) }
        }
      })
      deletedCount = result.count
    }

    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${deletedCount} role${deletedCount !== 1 ? 's' : ''}`,
      deletedCount
    })

  } catch (error) {
    console.error('Bulk delete roles error:', error)
    return NextResponse.json(
      { error: 'Internal server error during bulk delete operation' },
      { status: 500 }
    )
  }
}
