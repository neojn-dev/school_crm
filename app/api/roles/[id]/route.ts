import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { updateRoleSchema, roleIdSchema } from '@/lib/validations/roles'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user has admin role
    if (session.user?.role !== 'Admin') {
      return NextResponse.json({ error: 'Access denied. Admin privileges required.' }, { status: 403 })
    }

    // Validate the role ID
    const validationResult = roleIdSchema.safeParse({ id: params.id })
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid role ID' },
        { status: 400 }
      )
    }

    const role = await prisma.role.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        name: true,
        description: true,
        permissions: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            users: true,
          },
        },
      }
    })

    if (!role) {
      return NextResponse.json({ error: 'Role not found' }, { status: 404 })
    }

    return NextResponse.json(role)
  } catch (error) {
    console.error('Error fetching role:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
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
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user has admin role
    if (session.user?.role !== 'Admin') {
      return NextResponse.json({ error: 'Access denied. Admin privileges required.' }, { status: 403 })
    }

    const body = await request.json()
    
    // Validate the request body
    const validationResult = updateRoleSchema.safeParse({ ...body, id: params.id })
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.errors },
        { status: 400 }
      )
    }

    const { name, description, permissions, isActive } = validationResult.data

    // Check if role exists
    const existingRole = await prisma.role.findUnique({
      where: { id: params.id }
    })

    if (!existingRole) {
      return NextResponse.json({ error: 'Role not found' }, { status: 404 })
    }

    // Check if role name already exists (excluding current role)
    if (name && name !== existingRole.name) {
      const roleWithSameName = await prisma.role.findUnique({
        where: { name }
      })

      if (roleWithSameName) {
        return NextResponse.json(
          { error: 'Role name already exists' },
          { status: 400 }
        )
      }
    }

    const role = await prisma.role.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(permissions !== undefined && { permissions }),
        ...(isActive !== undefined && { isActive }),
      },
      select: {
        id: true,
        name: true,
        description: true,
        permissions: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            users: true,
          },
        },
      }
    })

    return NextResponse.json(role)
  } catch (error) {
    console.error('Error updating role:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
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
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user has admin role
    if (session.user?.role !== 'Admin') {
      return NextResponse.json({ error: 'Access denied. Admin privileges required.' }, { status: 403 })
    }

    // Validate the role ID
    const validationResult = roleIdSchema.safeParse({ id: params.id })
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid role ID' },
        { status: 400 }
      )
    }

    // Check if role exists
    const existingRole = await prisma.role.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            users: true,
          },
        },
      }
    })

    if (!existingRole) {
      return NextResponse.json({ error: 'Role not found' }, { status: 404 })
    }

    // Check if role has users assigned
    if (existingRole._count.users > 0) {
      return NextResponse.json(
        { error: 'Cannot delete role with assigned users. Please reassign users first.' },
        { status: 400 }
      )
    }

    await prisma.role.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Role deleted successfully' })
  } catch (error) {
    console.error('Error deleting role:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
