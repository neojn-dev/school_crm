import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { startOfMonth, endOfMonth, subMonths, format } from 'date-fns'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const dateRange = searchParams.get('dateRange') || '6months'
    const department = searchParams.get('department')
    const status = searchParams.get('status')

    // Calculate date range
    const now = new Date()
    let startDate: Date
    
    switch (dateRange) {
      case '1month':
        startDate = startOfMonth(subMonths(now, 1))
        break
      case '3months':
        startDate = startOfMonth(subMonths(now, 3))
        break
      case '6months':
        startDate = startOfMonth(subMonths(now, 6))
        break
      case '1year':
        startDate = startOfMonth(subMonths(now, 12))
        break
      default:
        startDate = startOfMonth(subMonths(now, 6))
    }

    // Build where conditions
    const whereConditions = {
      createdAt: {
        gte: startDate,
        lte: now
      }
    }

    // Get all data in parallel
    const [
      teachers,
      doctors, 
      engineers,
      lawyers,
      masterData
    ] = await Promise.all([
      db.teacher.findMany({
        where: {
          ...whereConditions,
          ...(department && { department: { contains: department, mode: 'insensitive' } }),
          ...(status !== null && { isActive: status === 'active' })
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          department: true,
          subject: true,
          yearsOfExperience: true,
          salary: true,
          hireDate: true,
          isActive: true,
          createdAt: true
        }
      }),
      db.doctor.findMany({
        where: {
          ...whereConditions,
          ...(department && { department: { contains: department, mode: 'insensitive' } }),
          ...(status !== null && { isActive: status === 'active' })
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          department: true,
          specialization: true,
          yearsOfExperience: true,
          salary: true,
          isActive: true,
          createdAt: true
        }
      }),
      db.engineer.findMany({
        where: {
          ...whereConditions,
          ...(department && { department: { contains: department, mode: 'insensitive' } }),
          ...(status !== null && { isActive: status === 'active' })
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          department: true,
          specialization: true,
          engineeringType: true,
          yearsOfExperience: true,
          salary: true,
          isActive: true,
          createdAt: true
        }
      }),
      db.lawyer.findMany({
        where: {
          ...whereConditions,
          ...(department && { department: { contains: department, mode: 'insensitive' } }),
          ...(status !== null && { isActive: status === 'active' })
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          department: true,
          practiceArea: true,
          yearsOfExperience: true,
          salary: true,
          isActive: true,
          createdAt: true
        }
      }),
      db.masterData.findMany({
        where: {
          ...whereConditions,
          ...(status !== null && { isActive: status === 'active' })
        },
        select: {
          id: true,
          title: true,
          category: true,
          fieldType: true,
          isActive: true,
          createdAt: true
        }
      })
    ])

    // Calculate analytics
    const totalStaff = teachers.length + doctors.length + engineers.length + lawyers.length
    const activeStaff = [...teachers, ...doctors, ...engineers, ...lawyers].filter(s => s.isActive).length

    // Department distribution
    const departmentStats = {}
    const allStaff = [
      ...teachers.map(t => ({ ...t, role: 'Teacher' })),
      ...doctors.map(d => ({ ...d, role: 'Doctor' })),
      ...engineers.map(e => ({ ...e, role: 'Engineer' })),
      ...lawyers.map(l => ({ ...l, role: 'Lawyer' }))
    ]

    allStaff.forEach(staff => {
      const dept = staff.department
      if (!departmentStats[dept]) {
        departmentStats[dept] = { total: 0, active: 0, roles: {} }
      }
      departmentStats[dept].total++
      if (staff.isActive) departmentStats[dept].active++
      
      if (!departmentStats[dept].roles[staff.role]) {
        departmentStats[dept].roles[staff.role] = 0
      }
      departmentStats[dept].roles[staff.role]++
    })

    // Monthly trends
    const monthlyData = []
    for (let i = 5; i >= 0; i--) {
      const monthStart = startOfMonth(subMonths(now, i))
      const monthEnd = endOfMonth(subMonths(now, i))
      
      const monthStaff = allStaff.filter(s => 
        s.createdAt >= monthStart && s.createdAt <= monthEnd
      )
      
      monthlyData.push({
        month: format(monthStart, 'MMM yyyy'),
        teachers: monthStaff.filter(s => s.role === 'Teacher').length,
        doctors: monthStaff.filter(s => s.role === 'Doctor').length,
        engineers: monthStaff.filter(s => s.role === 'Engineer').length,
        lawyers: monthStaff.filter(s => s.role === 'Lawyer').length,
        total: monthStaff.length
      })
    }

    // Experience distribution
    const experienceRanges = {
      '0-2 years': 0,
      '3-5 years': 0,
      '6-10 years': 0,
      '11-15 years': 0,
      '16+ years': 0
    }

    allStaff.forEach(staff => {
      const exp = staff.yearsOfExperience || 0
      if (exp <= 2) experienceRanges['0-2 years']++
      else if (exp <= 5) experienceRanges['3-5 years']++
      else if (exp <= 10) experienceRanges['6-10 years']++
      else if (exp <= 15) experienceRanges['11-15 years']++
      else experienceRanges['16+ years']++
    })

    // Salary analysis
    const salaries = allStaff.filter(s => s.salary).map(s => Number(s.salary))
    const avgSalary = salaries.length > 0 ? salaries.reduce((a, b) => a + b, 0) / salaries.length : 0
    const minSalary = salaries.length > 0 ? Math.min(...salaries) : 0
    const maxSalary = salaries.length > 0 ? Math.max(...salaries) : 0

    // Role distribution for pie chart
    const roleDistribution = [
      { name: 'Teachers', value: teachers.length, color: '#3B82F6' },
      { name: 'Doctors', value: doctors.length, color: '#10B981' },
      { name: 'Engineers', value: engineers.length, color: '#8B5CF6' },
      { name: 'Lawyers', value: lawyers.length, color: '#6366F1' }
    ]

    // Master data analytics
    const masterDataStats = {
      total: masterData.length,
      active: masterData.filter(m => m.isActive).length,
      byCategory: masterData.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1
        return acc
      }, {}),
      byFieldType: masterData.reduce((acc, item) => {
        acc[item.fieldType] = (acc[item.fieldType] || 0) + 1
        return acc
      }, {})
    }

    return NextResponse.json({
      overview: {
        totalStaff,
        activeStaff,
        inactiveStaff: totalStaff - activeStaff,
        avgSalary: Math.round(avgSalary),
        minSalary: Math.round(minSalary),
        maxSalary: Math.round(maxSalary)
      },
      roleDistribution,
      departmentStats,
      monthlyTrends: monthlyData,
      experienceDistribution: Object.entries(experienceRanges).map(([range, count]) => ({
        range,
        count
      })),
      masterDataStats,
      filters: {
        dateRange,
        department,
        status
      }
    })

  } catch (error) {
    console.error('Dashboard analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    )
  }
}
