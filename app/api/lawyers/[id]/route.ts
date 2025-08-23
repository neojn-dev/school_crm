import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const lawyer = await prisma.lawyer.findUnique({
      where: { id: (await params).id }
    })

    if (!lawyer) {
      return NextResponse.json({ error: 'Lawyer not found' }, { status: 404 })
    }

    return NextResponse.json(lawyer)
  } catch (error) {
    console.error('Error fetching lawyer:', error)
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

    const body = await request.json()
    const {
      firstName,
      lastName,
      email,
      employeeId,
      department,
      practiceArea,
      barNumber,
      yearsOfExperience,
      salary,
      isActive
    } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !employeeId || !department || !practiceArea || !barNumber) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if email already exists for other lawyers
    const existingEmail = await prisma.lawyer.findFirst({
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

    // Check if employee ID already exists for other lawyers
    const existingEmployeeId = await prisma.lawyer.findFirst({
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

    // Check if bar number already exists for other lawyers
    const existingBarNumber = await prisma.lawyer.findFirst({
      where: {
        barNumber,
        id: { not: (await params).id }
      }
    })

    if (existingBarNumber) {
      return NextResponse.json(
        { error: 'Bar number already exists' },
        { status: 400 }
      )
    }

    const lawyer = await prisma.lawyer.update({
      where: { id: (await params).id },
      data: {
        firstName,
        lastName,
        email,
        employeeId,
        department,
        practiceArea,
        barNumber,
        yearsOfExperience: yearsOfExperience ? parseInt(yearsOfExperience) : null,
        salary: salary ? parseFloat(salary) : null,
        isActive: isActive !== undefined ? isActive : true
      }
    })

    return NextResponse.json(lawyer)
  } catch (error) {
    console.error('Error updating lawyer:', error)
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
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const lawyer = await prisma.lawyer.findUnique({
      where: { id: (await params).id }
    })

    if (!lawyer) {
      return NextResponse.json({ error: 'Lawyer not found' }, { status: 404 })
    }

    await prisma.lawyer.delete({
      where: { id: (await params).id }
    })

    return NextResponse.json({ message: 'Lawyer deleted successfully' })
  } catch (error) {
    console.error('Error deleting lawyer:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
