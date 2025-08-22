import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const engineers = await prisma.engineer.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(engineers)
  } catch (error) {
    console.error('Error fetching engineers:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
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
      specialization,
      engineeringType,
      yearsOfExperience,
      salary,
      projectSuccessRate,
      codeQuality,
      innovationScore,
      programmingLanguages,
      frameworks,
      tools
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

    const engineer = await prisma.engineer.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        employeeId,
        department,
        specialization,
        engineeringType,
        yearsOfExperience: yearsOfExperience ? parseInt(yearsOfExperience) : null,
        salary: salary ? parseFloat(salary) : null,
        projectSuccessRate: projectSuccessRate ? parseFloat(projectSuccessRate) : null,
        codeQuality: codeQuality ? parseFloat(codeQuality) : null,
        innovationScore: innovationScore ? parseFloat(innovationScore) : null,
        programmingLanguages,
        frameworks,
        tools,
        userId: session.user.id
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
