import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  console.log('🔍 [API DEBUG] GET /api/lawyers called')
  
  try {
    console.log('🔍 [API DEBUG] Getting server session...')
    const session = await getServerSession(authOptions)
    console.log('🔍 [API DEBUG] Session result:', session ? 'Authenticated' : 'No session')
    
    if (!session) {
      console.log('❌ [API DEBUG] Unauthorized - no session')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('🔍 [API DEBUG] User authenticated:', session.user?.email)
    console.log('🔍 [API DEBUG] Querying database for lawyers...')
    
    const lawyers = await prisma.lawyer.findMany({
      orderBy: { createdAt: 'desc' }
    })

    console.log('🔍 [API DEBUG] Database query completed')
    console.log('🔍 [API DEBUG] Found lawyers count:', lawyers.length)
    console.log('🔍 [API DEBUG] First lawyer sample:', lawyers[0] ? {
      id: lawyers[0].id,
      firstName: lawyers[0].firstName,
      lastName: lawyers[0].lastName,
      email: lawyers[0].email
    } : 'No lawyers found')
    
    // Log the full response for debugging
    console.log('🔍 [API DEBUG] Full response data:', JSON.stringify(lawyers, null, 2))

    return NextResponse.json(lawyers)
  } catch (error) {
    console.error('❌ [API ERROR] Error fetching lawyers:', error)
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
      employeeId,
      department,
      practiceArea,
      barNumber,
      yearsOfExperience,
      salary,
      lawSchool,
      graduationYear,
      barAdmissions,
      specializations,
      caseSuccessRate,
      clientSatisfaction,
      averageCaseDuration,
      courtExperience,
      languages
    } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !employeeId || !department || !practiceArea || !barNumber) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingEmail = await prisma.lawyer.findUnique({
      where: { email }
    })

    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      )
    }

    // Check if employee ID already exists
    const existingEmployeeId = await prisma.lawyer.findUnique({
      where: { employeeId }
    })

    if (existingEmployeeId) {
      return NextResponse.json(
        { error: 'Employee ID already exists' },
        { status: 400 }
      )
    }

    // Check if bar number already exists
    const existingBarNumber = await prisma.lawyer.findUnique({
      where: { barNumber }
    })

    if (existingBarNumber) {
      return NextResponse.json(
        { error: 'Bar number already exists' },
        { status: 400 }
      )
    }

    const lawyer = await prisma.lawyer.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        employeeId,
        department,
        practiceArea,
        barNumber,
        yearsOfExperience: yearsOfExperience ? parseInt(yearsOfExperience) : null,
        salary: salary ? parseFloat(salary) : null,
        lawSchool,
        graduationYear: graduationYear ? parseInt(graduationYear) : null,
        barAdmissions,
        specializations,
        caseSuccessRate: caseSuccessRate ? parseFloat(caseSuccessRate) : null,
        clientSatisfaction: clientSatisfaction ? parseFloat(clientSatisfaction) : null,
        averageCaseDuration: averageCaseDuration ? parseInt(averageCaseDuration) : null,
        courtExperience,
        languages,
        userId: session.user.id
      }
    })

    return NextResponse.json(lawyer, { status: 201 })
  } catch (error) {
    console.error('Error creating lawyer:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
