"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  Stethoscope, 
  Zap, 
  Scale, 
  BarChart3, 
  Activity,
  TrendingUp,
  Star,
  DollarSign,
  Clock
} from "lucide-react"
import Link from "next/link"
import { ErrorBoundary } from "@/components/error-boundary"

interface DashboardStats {
  teachers: {
    total: number
    active: number
    avgPerformance: number
    departments: number
  }
  doctors: {
    total: number
    active: number
    avgSatisfaction: number
    specializations: number
  }
  engineers: {
    total: number
    active: number
    avgSuccessRate: number
    engineeringTypes: number
  }
  lawyers: {
    total: number
    active: number
    avgSuccessRate: number
    practiceAreas: number
  }
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const [mounted, setMounted] = useState(false)
  const [stats, setStats] = useState<DashboardStats>({
    teachers: { total: 0, active: 0, avgPerformance: 0, departments: 0 },
    doctors: { total: 0, active: 0, avgSatisfaction: 0, specializations: 0 },
    engineers: { total: 0, active: 0, avgSuccessRate: 0, engineeringTypes: 0 },
    lawyers: { total: 0, active: 0, avgSuccessRate: 0, practiceAreas: 0 }
  })

  // Ensure component is mounted before rendering
  useEffect(() => {
    setMounted(true)
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const [teachersRes, doctorsRes, engineersRes, lawyersRes] = await Promise.all([
        fetch('/api/teachers'),
        fetch('/api/doctors'),
        fetch('/api/engineers'),
        fetch('/api/lawyers')
      ])

      if (teachersRes.ok && doctorsRes.ok && engineersRes.ok && lawyersRes.ok) {
        const [teachers, doctors, engineers, lawyers] = await Promise.all([
          teachersRes.json(),
          doctorsRes.json(),
          engineersRes.json(),
          lawyersRes.json()
        ])

        setStats({
          teachers: {
            total: teachers.length,
            active: teachers.filter((t: any) => t.isActive).length,
            avgPerformance: teachers.length > 0 
              ? (teachers.reduce((sum: number, t: any) => sum + (t.performanceRating || 0), 0) / teachers.length)
              : 0,
            departments: new Set(teachers.map((t: any) => t.department)).size
          },
          doctors: {
            total: doctors.length,
            active: doctors.filter((d: any) => d.isActive).length,
            avgSatisfaction: doctors.length > 0 
              ? (doctors.reduce((sum: number, d: any) => sum + (d.patientSatisfaction || 0), 0) / doctors.length)
              : 0,
            specializations: new Set(doctors.map((d: any) => d.specialization)).size
          },
          engineers: {
            total: engineers.length,
            active: engineers.filter((e: any) => e.isActive).length,
            avgSuccessRate: engineers.length > 0 
              ? (engineers.reduce((sum: number, e: any) => sum + (e.projectSuccessRate || 0), 0) / engineers.length)
              : 0,
            engineeringTypes: new Set(engineers.map((e: any) => e.engineeringType)).size
          },
          lawyers: {
            total: lawyers.length,
            active: lawyers.filter((l: any) => l.isActive).length,
            avgSuccessRate: lawyers.length > 0 
              ? (lawyers.reduce((sum: number, l: any) => sum + (l.caseSuccessRate || 0), 0) / lawyers.length)
              : 0,
            practiceAreas: new Set(lawyers.map((l: any) => l.practiceArea)).size
          }
        })
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    }
  }

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <div className="space-y-6">
        <div className="text-center lg:text-left">
          <div className="w-64 h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
          <div className="w-96 h-6 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="w-8 h-8 bg-white rounded-lg"></div>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  const quickActions = [
    {
      title: "Teachers",
      description: "Manage teaching staff",
      icon: Users,
      href: "/teachers",
      color: "from-blue-500 to-blue-600",
      count: stats.teachers.total
    },
    {
      title: "Doctors",
      description: "Manage medical staff",
      icon: Stethoscope,
      href: "/doctors",
      color: "from-green-500 to-green-600",
      count: stats.doctors.total
    },
    {
      title: "Engineers",
      description: "Manage engineering staff",
      icon: Zap,
      href: "/engineers",
      color: "from-purple-500 to-purple-600",
      count: stats.engineers.total
    },
    {
      title: "Lawyers",
      description: "Manage legal staff",
      icon: Scale,
      href: "/lawyers",
      color: "from-indigo-500 to-indigo-600",
      count: stats.lawyers.total
    }
  ]

  const overviewStats = [
    { 
      label: "Total Staff", 
      value: stats.teachers.total + stats.doctors.total + stats.engineers.total + stats.lawyers.total, 
      icon: Users,
      color: "from-blue-500 to-blue-600"
    },
    { 
      label: "Active Staff", 
      value: stats.teachers.active + stats.doctors.active + stats.engineers.active + stats.lawyers.active, 
      icon: Activity,
      color: "from-green-500 to-green-600"
    },
    { 
      label: "Avg Performance", 
      value: `${((stats.teachers.avgPerformance + stats.doctors.avgSatisfaction + stats.engineers.avgSuccessRate + stats.lawyers.avgSuccessRate) / 4).toFixed(1)}`, 
      icon: Star,
      color: "from-yellow-500 to-yellow-600"
    },
    { 
      label: "Total Departments", 
      value: stats.teachers.departments + stats.doctors.specializations + stats.engineers.engineeringTypes + stats.lawyers.practiceAreas, 
      icon: BarChart3,
      color: "from-purple-500 to-purple-600"
    }
  ]

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="text-center lg:text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {session.user?.username || 'User'}!
          </h1>
          <p className="text-gray-600">
            Here's an overview of your professional staff management system.
          </p>
        </div>

        {/* Overview Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {overviewStats.map((stat, index) => (
            <div
              key={index}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 bg-gradient-to-r ${stat.color} rounded-lg`}>
                      <stat.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Professional Staff Breakdown */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '200ms' }}>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Professional Staff Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-blue-600">{stats.teachers.total}</span>
                </div>
                <CardTitle className="text-lg">Teachers</CardTitle>
                <CardDescription>
                  {stats.teachers.active} active • {stats.teachers.departments} departments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600">
                  Avg Performance: <span className="font-semibold">{stats.teachers.avgPerformance.toFixed(1)}/10</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                    <Stethoscope className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-green-600">{stats.doctors.total}</span>
                </div>
                <CardTitle className="text-lg">Doctors</CardTitle>
                <CardDescription>
                  {stats.doctors.active} active • {stats.doctors.specializations} specializations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600">
                  Avg Satisfaction: <span className="font-semibold">{stats.doctors.avgSatisfaction.toFixed(1)}/10</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-purple-600">{stats.engineers.total}</span>
                </div>
                <CardTitle className="text-lg">Engineers</CardTitle>
                <CardDescription>
                  {stats.engineers.active} active • {stats.engineers.engineeringTypes} types
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600">
                  Avg Success Rate: <span className="font-semibold">{stats.engineers.avgSuccessRate.toFixed(1)}%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Scale className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-indigo-600">{stats.lawyers.total}</span>
                </div>
                <CardTitle className="text-lg">Lawyers</CardTitle>
                <CardDescription>
                  {stats.lawyers.active} active • {stats.lawyers.practiceAreas} practice areas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-600">
                  Avg Success Rate: <span className="font-semibold">{stats.lawyers.avgSuccessRate.toFixed(1)}%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '300ms' }}>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-600">
                      Total: <span className="font-semibold">{action.count}</span> staff members
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '400ms' }}>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">System Overview</h2>
          <Card>
            <CardHeader>
              <CardTitle>Professional Staff Management</CardTitle>
              <CardDescription>Comprehensive overview of your organization's professional staff</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    <strong>{stats.teachers.total}</strong> teachers across <strong>{stats.teachers.departments}</strong> departments
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    <strong>{stats.doctors.total}</strong> doctors with <strong>{stats.doctors.specializations}</strong> specializations
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    <strong>{stats.engineers.total}</strong> engineers covering <strong>{stats.engineers.engineeringTypes}</strong> engineering types
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-indigo-50 rounded-lg">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    <strong>{stats.lawyers.total}</strong> lawyers practicing in <strong>{stats.lawyers.practiceAreas}</strong> practice areas
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ErrorBoundary>
  )
}
