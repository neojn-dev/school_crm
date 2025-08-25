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
        error: 'User IDs are required for bulk delete' 
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
      // Delete all users except the current admin
      const result = await prisma.user.deleteMany({
        where: {
          id: {
            not: session.user.id // Don't delete the current admin
          },
          username: {
            not: 'admin' // Don't delete the main admin account
          }
        }
      })
      deletedCount = result.count
    } else {
      // Delete selected users
      // Filter out the current admin and main admin from the deletion list
      const safeIds = ids.filter(id => 
        id !== session.user.id && 
        id !== 'admin'
      )

      if (safeIds.length === 0) {
        return NextResponse.json({ 
          error: 'Cannot delete admin accounts' 
        }, { status: 400 })
      }

      // Verify all IDs exist and are not admin accounts
      const usersToDelete = await prisma.user.findMany({
        where: {
          id: { in: safeIds },
          username: { not: 'admin' }
        },
        select: { id: true, username: true }
      })

      if (usersToDelete.length !== safeIds.length) {
        return NextResponse.json({ 
          error: 'Some users not found or cannot be deleted' 
        }, { status: 400 })
      }

      const result = await prisma.user.deleteMany({
        where: {
          id: { in: safeIds }
        }
      })
      deletedCount = result.count
    }

    return NextResponse.json({
      success: true,
      message: `Successfully deleted ${deletedCount} user${deletedCount !== 1 ? 's' : ''}`,
      deletedCount
    })

  } catch (error) {
    console.error('Bulk delete users error:', error)
    return NextResponse.json(
      { error: 'Internal server error during bulk delete operation' },
      { status: 500 }
    )
  }
}
