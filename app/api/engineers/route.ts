import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  console.log('🔍 [API DEBUG] GET /api/engineers called')
  
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

    // Parse query parameters for pagination and filtering
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100) // Cap at 100 for performance
    const search = searchParams.get('search') || ''
    const department = searchParams.get('department') || ''
    const specialization = searchParams.get('specialization') || ''
    const engineeringType = searchParams.get('engineeringType') || ''
    const isActive = searchParams.get('isActive') || ''
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    const skip = (page - 1) * limit

    // Build where clause for user's engineers with filters
    const where: any = {
      userId: userId,
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { employeeId: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (department) {
      where.department = { contains: department, mode: 'insensitive' }
    }

    if (specialization) {
      where.specialization = { contains: specialization, mode: 'insensitive' }
    }

    if (engineeringType) {
      where.engineeringType = { contains: engineeringType, mode: 'insensitive' }
    }

    if (isActive !== '') {
      where.isActive = isActive === 'true'
    }

    // Build orderBy clause
    const orderBy: any = {}
    if (sortBy === 'name') {
      orderBy.firstName = sortOrder
    } else if (sortBy === 'email') {
      orderBy.email = sortOrder
    } else if (sortBy === 'department') {
      orderBy.department = sortOrder
    } else if (sortBy === 'specialization') {
      orderBy.specialization = sortOrder
    } else if (sortBy === 'engineeringType') {
      orderBy.engineeringType = sortOrder
    } else {
      orderBy.createdAt = sortOrder
    }

    console.log('🔍 [API DEBUG] User authenticated:', session.user?.email)
    console.log('🔍 [API DEBUG] Querying database for engineers with pagination...')
    console.log('🔍 [API DEBUG] Query params:', { page, limit, search, department, specialization, engineeringType, isActive })
    
    // Get total count for pagination
    const total = await prisma.engineer.count({ where })

    // Get paginated data
    const engineers = await prisma.engineer.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        employeeId: true,
        department: true,
        specialization: true,
        engineeringType: true,
        yearsOfExperience: true,
        salary: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      }
    })

    console.log('🔍 [API DEBUG] Database query completed')
    console.log('🔍 [API DEBUG] Found engineers count:', engineers.length, 'of', total, 'total')
    
    const response = {
      data: engineers,
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
        department,
        specialization,
        engineeringType,
        isActive,
        sortBy,
        sortOrder
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('❌ [API ERROR] Error fetching engineers:', error)
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

    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      employeeId,
      department,
      specialization,
      engineeringType,
      yearsOfExperience,
      salary,
      isActive
    } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !employeeId || !department || !specialization || !engineeringType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingEmail = await prisma.engineer.findUnique({
      where: { email }
    })

    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      )
    }

    // Check if employee ID already exists
    const existingEmployeeId = await prisma.engineer.findUnique({
      where: { employeeId }
    })

    if (existingEmployeeId) {
      return NextResponse.json(
        { error: 'Employee ID already exists' },
        { status: 400 }
      )
    }

    // Log session information for debugging
    console.log('🔍 [API DEBUG] Full session object:', JSON.stringify(session, null, 2))
    console.log('🔍 [API DEBUG] Session user:', session.user)
    console.log('🔍 [API DEBUG] Session user keys:', Object.keys(session.user))
    console.log('🔍 [API DEBUG] User ID from session:', session.user.id)
    console.log('🔍 [API DEBUG] Session user email:', session.user.email)
    
    // Try to get user ID from session or fallback to email lookup
    let userId = session.user.id
    
    if (!userId && session.user.email) {
      console.log('🔍 [API DEBUG] User ID not in session, trying to find user by email:', session.user.email)
      try {
        const user = await prisma.user.findUnique({
          where: { email: session.user.email },
          select: { id: true }
        })
        if (user) {
          userId = user.id
          console.log('🔍 [API DEBUG] Found user ID by email:', userId)
        } else {
          console.error('❌ [API ERROR] No user found with email:', session.user.email)
        }
      } catch (error) {
        console.error('❌ [API ERROR] Error looking up user by email:', error)
      }
    }
    
    if (!userId) {
      console.error('❌ [API ERROR] No user ID available from session or email lookup')
      console.error('❌ [API ERROR] Available session data:', {
        hasUser: !!session.user,
        userKeys: Object.keys(session.user || {}),
        userEmail: session.user?.email,
        sessionKeys: Object.keys(session)
      })
      return NextResponse.json(
        { error: 'User ID not found in session', debug: { sessionKeys: Object.keys(session), userKeys: Object.keys(session.user || {}) } },
        { status: 400 }
      )
    }

    const engineer = await prisma.engineer.create({
      data: {
        firstName,
        lastName,
        email,
        employeeId,
        department,
        specialization,
        engineeringType,
        yearsOfExperience: yearsOfExperience ? parseInt(yearsOfExperience) : null,
        salary: salary ? parseFloat(salary) : null,
        isActive: isActive !== undefined ? isActive : true,
        userId: userId
      }
    })

    return NextResponse.json(engineer, { status: 201 })
  } catch (error) {
    console.error('Error creating engineer:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
