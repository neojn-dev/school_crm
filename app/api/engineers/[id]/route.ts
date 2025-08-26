import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const engineer = await prisma.engineer.findUnique({
      where: { id: (await params).id }
    })

    if (!engineer) {
      return NextResponse.json({ error: 'Engineer not found' }, { status: 404 })
    }

    return NextResponse.json(engineer)
  } catch (error) {
    console.error('Error fetching engineer:', error)
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
  const resolvedParams = await params
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

    // Check if email already exists for other engineers
    const existingEmail = await prisma.engineer.findFirst({
      where: {
        email,
        id: { not: (await params).id }
      }
    })

    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      )
    }

    // Check if employee ID already exists for other engineers
    const existingEmployeeId = await prisma.engineer.findFirst({
      where: {
        employeeId,
        id: { not: (await params).id }
      }
    })

    if (existingEmployeeId) {
      return NextResponse.json(
        { error: 'Employee ID already exists' },
        { status: 400 }
      )
    }

    const engineer = await prisma.engineer.update({
      where: { id: (await params).id },
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
        isActive: isActive !== undefined ? isActive : true
      }
    })

    return NextResponse.json(engineer)
  } catch (error) {
    console.error('Error updating engineer:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const engineer = await prisma.engineer.findUnique({
      where: { id: (await params).id }
    })

    if (!engineer) {
      return NextResponse.json({ error: 'Engineer not found' }, { status: 404 })
    }

    await prisma.engineer.delete({
      where: { id: (await params).id }
    })

    return NextResponse.json({ message: 'Engineer deleted successfully' })
  } catch (error) {
    console.error('Error deleting engineer:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
