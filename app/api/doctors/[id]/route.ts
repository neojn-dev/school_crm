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

    const { id } = await params
    const doctor = await prisma.doctor.findUnique({
      where: { id }
    })

    if (!doctor) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 })
    }

    return NextResponse.json(doctor)
  } catch (error) {
    console.error('Error fetching doctor:', error)
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

    const { id } = await params
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

    // Check if email already exists for other doctors
    const existingEmail = await prisma.doctor.findFirst({
      where: {
        email,
        id: { not: id }
      }
    })

    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      )
    }

    // Check if employee ID already exists for other doctors
    const existingEmployeeId = await prisma.doctor.findFirst({
      where: {
        employeeId,
        id: { not: id }
      }
    })

    if (existingEmployeeId) {
      return NextResponse.json(
        { error: 'Employee ID already exists' },
        { status: 400 }
      )
    }

    // Check if license number already exists for other doctors
    const existingLicenseNumber = await prisma.doctor.findFirst({
      where: {
        licenseNumber,
        id: { not: id }
      }
    })

    if (existingLicenseNumber) {
      return NextResponse.json(
        { error: 'License number already exists' },
        { status: 400 }
      )
    }

    const doctor = await prisma.doctor.update({
      where: { id },
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
        isActive: isActive !== undefined ? isActive : true
      }
    })

    return NextResponse.json(doctor)
  } catch (error) {
    console.error('Error updating doctor:', error)
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

    const { id } = await params
    const doctor = await prisma.doctor.findUnique({
      where: { id }
    })

    if (!doctor) {
      return NextResponse.json({ error: 'Doctor not found' }, { status: 404 })
    }

    await prisma.doctor.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Doctor deleted successfully' })
  } catch (error) {
    console.error('Error deleting doctor:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
