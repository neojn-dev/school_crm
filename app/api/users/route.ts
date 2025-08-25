import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { createUserSchema, userQuerySchema } from '@/lib/validations/users'
import bcrypt from 'bcryptjs'

export async function GET(request: NextRequest) {
  console.log('🔍 [API DEBUG] GET /api/users called')
  
  try {
    console.log('🔍 [API DEBUG] Getting server session...')
    const session = await getServerSession(authOptions)
    console.log('🔍 [API DEBUG] Session result:', session ? 'Authenticated' : 'No session')
    
    if (!session) {
      console.log('❌ [API DEBUG] Unauthorized - no session')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user?.id
    if (!userId) {
      return NextResponse.json({ error: 'User ID not found in session' }, { status: 401 })
    }

    // Check if user has admin role
    if (session.user?.role !== 'Admin') {
      return NextResponse.json({ error: 'Access denied. Admin privileges required.' }, { status: 403 })
    }

    // Parse and validate query parameters
    const { searchParams } = new URL(request.url)
    const queryValidation = userQuerySchema.safeParse({
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
      search: searchParams.get('search'),
      roleId: searchParams.get('roleId'),
      isActive: searchParams.get('isActive'),
      sortBy: searchParams.get('sortBy'),
      sortOrder: searchParams.get('sortOrder'),
    })

    if (!queryValidation.success) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: queryValidation.error.errors },
        { status: 400 }
      )
    }

    const { page, limit, search, roleId, isActive, sortBy, sortOrder } = queryValidation.data
    const skip = (page - 1) * limit

    // Build where clause for users with filters
    const where: any = {}

    if (search) {
      where.OR = [
        { username: { contains: search } },
        { email: { contains: search } },
        { firstName: { contains: search } },
        { lastName: { contains: search } },
      ]
    }

    if (roleId) {
      where.roleId = roleId
    }

    if (isActive !== undefined) {
      where.isActive = isActive === 'true'
    }

    // Build orderBy clause
    const orderBy: any = {}
    if (sortBy === 'username') {
      orderBy.username = sortOrder
    } else if (sortBy === 'email') {
      orderBy.email = sortOrder
    } else if (sortBy === 'firstName') {
      orderBy.firstName = sortOrder
    } else if (sortBy === 'lastName') {
      orderBy.lastName = sortOrder
    } else {
      orderBy.createdAt = sortOrder
    }

    console.log('🔍 [API DEBUG] User authenticated:', session.user?.email)
    console.log('🔍 [API DEBUG] Querying database for users with pagination...')
    console.log('🔍 [API DEBUG] Query params:', { page, limit, search, roleId, isActive })
    
    // Get total count for pagination
    const total = await prisma.user.count({ where })

    // Get paginated data
    const users = await prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy,
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

    console.log('🔍 [API DEBUG] Database query completed')
    console.log('🔍 [API DEBUG] Found users count:', users.length, 'of', total, 'total')
    
    const response = {
      data: users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      },
      filters: {
        search,
        roleId,
        isActive,
        sortBy,
        sortOrder
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('❌ [API ERROR] Error fetching users:', error)
    console.error('❌ [API ERROR] Error stack:', error instanceof Error ? error.stack : 'No stack trace')
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
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
    const validationResult = createUserSchema.safeParse(body)
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.errors },
        { status: 400 }
      )
    }

    const { username, email, firstName, lastName, roleId, isActive, password } = validationResult.data

    // Check if username already exists
    const existingUsername = await prisma.user.findUnique({
      where: { username }
    })

    if (existingUsername) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingEmail = await prisma.user.findUnique({
      where: { email }
    })

    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      )
    }

    // Validate role exists if provided (and not null/empty)
    if (roleId && roleId !== null) {
      const role = await prisma.role.findUnique({
        where: { id: roleId }
      })

      if (!role) {
        return NextResponse.json(
          { error: 'Invalid role ID' },
          { status: 400 }
        )
      }
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        username,
        email,
        firstName,
        lastName,
        roleId,
        isActive: isActive !== undefined ? isActive : true,
        passwordHash,
      },
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

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
