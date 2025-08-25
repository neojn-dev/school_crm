import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { updateUserSchema, userIdSchema } from '@/lib/validations/users'
import bcrypt from 'bcryptjs'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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

    // Await params and validate the user ID
    const { id } = await params
    const validationResult = userIdSchema.safeParse({ id })
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        roleId: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
        role: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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
    
    // Await params and validate the request body
    const { id } = await params
    const validationResult = updateUserSchema.safeParse({ ...body, id })
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.errors },
        { status: 400 }
      )
    }

    const { username, email, firstName, lastName, roleId, isActive, password } = validationResult.data

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    })

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check if username already exists (excluding current user)
    if (username && username !== existingUser.username) {
      const userWithSameUsername = await prisma.user.findUnique({
        where: { username }
      })

      if (userWithSameUsername) {
        return NextResponse.json(
          { error: 'Username already exists' },
          { status: 400 }
        )
      }
    }

    // Check if email already exists (excluding current user)
    if (email && email !== existingUser.email) {
      const userWithSameEmail = await prisma.user.findUnique({
        where: { email }
      })

      if (userWithSameEmail) {
        return NextResponse.json(
          { error: 'Email already exists' },
          { status: 400 }
        )
      }
    }

    // Validate role exists if provided (and not null/empty)
    if (roleId && roleId !== null && roleId !== '') {
      const role = await prisma.role.findUnique({
        where: { 
          id: roleId,
          isActive: true // Only allow assignment to active roles
        }
      })

      if (!role) {
        return NextResponse.json(
          { error: 'Invalid or inactive role ID' },
          { status: 400 }
        )
      }
    }

    // Prepare update data
    const updateData: any = {}
    if (username) updateData.username = username
    if (email) updateData.email = email
    if (firstName !== undefined) updateData.firstName = firstName
    if (lastName !== undefined) updateData.lastName = lastName
    if (roleId !== undefined) updateData.roleId = roleId === null ? null : roleId
    if (isActive !== undefined) updateData.isActive = isActive

    // Hash password if provided
    if (password) {
      updateData.passwordHash = await bcrypt.hash(password, 12)
    }

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        roleId: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true,
        role: {
          select: {
            id: true,
            name: true,
            description: true,
          },
        },
      }
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error updating user:', error)
    
    // Provide more detailed error information
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
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

    // Await params and validate the user ID
    const { id } = await params
    const validationResult = userIdSchema.safeParse({ id })
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid user ID' },
        { status: 400 }
      )
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    })

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Prevent users from deleting themselves
    if (session.user?.id === id) {
      return NextResponse.json(
        { error: 'Cannot delete your own account' },
        { status: 400 }
      )
    }

    // Delete related records first (cascade should handle this, but being explicit)
    await prisma.session.deleteMany({
      where: { userId: id }
    })

    await prisma.account.deleteMany({
      where: { userId: id }
    })

    await prisma.verificationToken.deleteMany({
      where: { userId: id }
    })

    await prisma.passwordResetToken.deleteMany({
      where: { userId: id }
    })

    await prisma.upload.deleteMany({
      where: { userId: id }
    })

    // Finally delete the user
    await prisma.user.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'User deleted successfully' })
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
