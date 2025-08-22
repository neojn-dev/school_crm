import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  console.log('🔍 [API DEBUG] GET /api/teachers called')
  
  try {
    console.log('🔍 [API DEBUG] Getting server session...')
    const session = await getServerSession(authOptions)
    console.log('🔍 [API DEBUG] Session result:', session ? 'Authenticated' : 'No session')
    
    if (!session) {
      console.log('❌ [API DEBUG] Unauthorized - no session')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('🔍 [API DEBUG] User authenticated:', session.user?.email)
    console.log('🔍 [API DEBUG] Querying database for teachers...')
    
    const teachers = await prisma.teacher.findMany({
      orderBy: { createdAt: 'desc' }
    })

    console.log('🔍 [API DEBUG] Database query completed')
    console.log('🔍 [API DEBUG] Found teachers count:', teachers.length)
    console.log('🔍 [API DEBUG] First teacher sample:', teachers[0] ? {
      id: teachers[0].id,
      firstName: teachers[0].firstName,
      lastName: teachers[0].lastName,
      email: teachers[0].email
    } : 'No teachers found')
    
    // Log the full response for debugging
    console.log('🔍 [API DEBUG] Full response data:', JSON.stringify(teachers, null, 2))

    return NextResponse.json(teachers)
  } catch (error) {
    console.error('❌ [API ERROR] Error fetching teachers:', error)
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
      phone,
      dateOfBirth,
      gender,
      address,
      city,
      state,
      zipCode,
      country,
      employeeId,
      department,
      subject,
      gradeLevel,
      yearsOfExperience,
      salary,
      hireDate,
      highestDegree,
      university,
      graduationYear,
      certifications,
      specializations,
      performanceRating,
      studentSatisfaction,
      attendanceRate,
      bio,
      profileImage,
      emergencyContact,
      emergencyPhone,
      notes
    } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !employeeId || !department || !subject || !gradeLevel) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingEmail = await prisma.teacher.findUnique({
      where: { email }
    })

    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      )
    }

    // Check if employee ID already exists
    const existingEmployeeId = await prisma.teacher.findUnique({
      where: { employeeId }
    })

    if (existingEmployeeId) {
      return NextResponse.json(
        { error: 'Employee ID already exists' },
        { status: 400 }
      )
    }

    const teacher = await prisma.teacher.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        gender,
        address,
        city,
        state,
        zipCode,
        country,
        employeeId,
        department,
        subject,
        gradeLevel,
        yearsOfExperience: yearsOfExperience ? parseInt(yearsOfExperience) : null,
        salary: salary ? parseFloat(salary) : null,
        hireDate: hireDate ? new Date(hireDate) : null,
        highestDegree,
        university,
        graduationYear: graduationYear ? parseInt(graduationYear) : null,
        certifications,
        specializations,
        performanceRating: performanceRating ? parseFloat(performanceRating) : null,
        studentSatisfaction: studentSatisfaction ? parseFloat(studentSatisfaction) : null,
        attendanceRate: attendanceRate ? parseFloat(attendanceRate) : null,
        bio,
        profileImage,
        emergencyContact,
        emergencyPhone,
        notes,
        userId: session.user.id
      }
    })

    return NextResponse.json(teacher, { status: 201 })
  } catch (error) {
    console.error('Error creating teacher:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
