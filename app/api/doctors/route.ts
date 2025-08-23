import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  console.log('🔍 [API DEBUG] GET /api/doctors called')
  
  try {
    console.log('🔍 [API DEBUG] Getting server session...')
    const session = await getServerSession(authOptions)
    console.log('🔍 [API DEBUG] Session result:', session ? 'Authenticated' : 'No session')
    
    if (!session) {
      console.log('❌ [API DEBUG] Unauthorized - no session')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('🔍 [API DEBUG] User authenticated:', session.user?.email)
    console.log('🔍 [API DEBUG] Querying database for doctors...')
    
    const doctors = await prisma.doctor.findMany({
      orderBy: { createdAt: 'desc' }
    })

    console.log('🔍 [API DEBUG] Database query completed')
    console.log('🔍 [API DEBUG] Found doctors count:', doctors.length)
    console.log('🔍 [API DEBUG] First doctor sample:', doctors[0] ? {
      id: doctors[0].id,
      firstName: doctors[0].firstName,
      lastName: doctors[0].lastName,
      email: doctors[0].email
    } : 'No doctors found')
    
    // Log the full response for debugging
    console.log('🔍 [API DEBUG] Full response data:', JSON.stringify(doctors, null, 2))

    return NextResponse.json(doctors)
  } catch (error) {
    console.error('❌ [API ERROR] Error fetching doctors:', error)
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
      licenseNumber,
      yearsOfExperience,
      salary,
      isActive
    } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !employeeId || !department || !specialization || !licenseNumber) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingEmail = await prisma.doctor.findUnique({
      where: { email }
    })

    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      )
    }

    // Check if employee ID already exists
    const existingEmployeeId = await prisma.doctor.findUnique({
      where: { employeeId }
    })

    if (existingEmployeeId) {
      return NextResponse.json(
        { error: 'Employee ID already exists' },
        { status: 400 }
      )
    }

    // Check if license number already exists
    const existingLicenseNumber = await prisma.doctor.findUnique({
      where: { licenseNumber }
    })

    if (existingLicenseNumber) {
      return NextResponse.json(
        { error: 'License number already exists' },
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

    const doctor = await prisma.doctor.create({
      data: {
        firstName,
        lastName,
        email,
        employeeId,
        department,
        specialization,
        licenseNumber,
        yearsOfExperience: yearsOfExperience ? parseInt(yearsOfExperience) : null,
        salary: salary ? parseFloat(salary) : null,
        isActive: isActive !== undefined ? isActive : true,
        userId: userId
      }
    })

    return NextResponse.json(doctor, { status: 201 })
  } catch (error) {
    console.error('Error creating doctor:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
