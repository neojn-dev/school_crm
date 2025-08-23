"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ErrorBoundary } from "@/components/error-boundary"
import { DashboardFilters, type DashboardFilters as FilterType } from "@/components/dashboard/DashboardFilters"
import { KPITiles } from "@/components/dashboard/KPITiles"
import { BarChart, PieChart, LineChart, AreaChart } from "@/components/charts"
import { 
  Users, 
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Building2,
  Calendar,
  Award
} from "lucide-react"

interface DashboardData {
  overview: {
    totalStaff: number
    activeStaff: number
    inactiveStaff: number
    avgSalary: number
    minSalary: number
    maxSalary: number
  }
  roleDistribution: Array<{
    name: string
    value: number
    color: string
  }>
  departmentStats: Record<string, {
    total: number
    active: number
    roles: Record<string, number>
  }>
  monthlyTrends: Array<{
    month: string
    teachers: number
    doctors: number
    engineers: number
    lawyers: number
    total: number
  }>
  experienceDistribution: Array<{
    range: string
    count: number
  }>
  masterDataStats: {
    total: number
    active: number
    byCategory: Record<string, number>
    byFieldType: Record<string, number>
  }
}

export default function DashboardPage() {
  const { data: session } = useSession()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<DashboardData | null>(null)
  const [filters, setFilters] = useState<FilterType>({
    dateRange: '6months',
    department: null,
    status: null,
    role: null
  })

  // Ensure component is mounted before rendering
  useEffect(() => {
    setMounted(true)
  }, [])

  // Fetch dashboard data
  const fetchDashboardData = async (currentFilters: FilterType) => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      
      if (currentFilters.dateRange) params.set('dateRange', currentFilters.dateRange)
      if (currentFilters.department) params.set('department', currentFilters.department)
      if (currentFilters.status) params.set('status', currentFilters.status)
      if (currentFilters.role) params.set('role', currentFilters.role)

      const response = await fetch(`/api/dashboard/analytics?${params.toString()}`)
      
      if (response.ok) {
        const dashboardData = await response.json()
        setData(dashboardData)
      } else {
        console.error('Failed to fetch dashboard data')
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (mounted) {
      fetchDashboardData(filters)
    }
  }, [mounted, filters])

  const handleFiltersChange = (newFilters: FilterType) => {
    setFilters(newFilters)
  }

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return <DashboardSkeleton />
  }

  if (!session) {
    return <DashboardSkeleton />
  }

  if (loading || !data) {
    return <DashboardSkeleton />
  }

  // Prepare chart data
  const departmentChartData = Object.entries(data.departmentStats).map(([dept, stats]) => ({
    department: dept,
    total: stats.total,
    active: stats.active,
    inactive: stats.total - stats.active
  }))

  const experienceChartData = data.experienceDistribution.map(item => ({
    range: item.range,
    count: item.count
  }))

  const masterDataCategoryData = Object.entries(data.masterDataStats.byCategory).map(([category, count]) => ({
    name: category,
    value: count,
    color: category === 'Basic' ? '#3B82F6' : category === 'Advanced' ? '#8B5CF6' : '#10B981'
  }))

  const masterDataFieldTypeData = Object.entries(data.masterDataStats.byFieldType).map(([type, count]) => ({
    type,
    count
  }))

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="text-center lg:text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back, {session.user?.username || 'User'}! Here's your comprehensive staff analytics overview.
          </p>
        </div>

        {/* Filters */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '100ms' }}>
          <DashboardFilters 
            currentFilters={filters}
            onFiltersChange={handleFiltersChange}
          />
        </div>

        {/* KPI Tiles */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '200ms' }}>
          <KPITiles data={data.overview} />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Role Distribution Pie Chart */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '300ms' }}>
            <PieChart
              title="Staff Distribution by Role"
              description="Breakdown of staff across different professional roles"
              data={data.roleDistribution}
              height={350}
            />
          </div>

          {/* Monthly Trends Line Chart */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '400ms' }}>
            <LineChart
              title="Monthly Hiring Trends"
              description="Staff hiring trends over the selected period"
              data={data.monthlyTrends}
              xAxisKey="month"
              dataKeys={[
                { key: 'teachers', name: 'Teachers', color: '#3B82F6' },
                { key: 'doctors', name: 'Doctors', color: '#10B981' },
                { key: 'engineers', name: 'Engineers', color: '#8B5CF6' },
                { key: 'lawyers', name: 'Lawyers', color: '#6366F1' }
              ]}
              height={350}
            />
          </div>
        </div>

        {/* Department Analysis */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '500ms' }}>
          <BarChart
            title="Department Analysis"
            description="Staff distribution and activity status across departments"
            data={departmentChartData}
            xAxisKey="department"
            dataKeys={[
              { key: 'active', name: 'Active Staff', color: '#10B981' },
              { key: 'inactive', name: 'Inactive Staff', color: '#EF4444' }
            ]}
            height={400}
          />
        </div>

        {/* Experience and Master Data Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Experience Distribution */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '600ms' }}>
            <AreaChart
              title="Experience Distribution"
              description="Staff distribution by years of experience"
              data={experienceChartData}
              xAxisKey="range"
              dataKeys={[
                { key: 'count', name: 'Staff Count', color: '#8B5CF6' }
              ]}
              height={350}
            />
          </div>

          {/* Master Data Categories */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '700ms' }}>
            <PieChart
              title="Master Data Categories"
              description="Distribution of form data by category"
              data={masterDataCategoryData}
              height={350}
              innerRadius={40}
            />
          </div>
        </div>

        {/* Field Types Analysis */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '800ms' }}>
          <BarChart
            title="Form Field Types Analysis"
            description="Distribution of different field types in master data"
            data={masterDataFieldTypeData}
            xAxisKey="type"
            dataKeys={[
              { key: 'count', name: 'Field Count', color: '#F59E0B' }
            ]}
            height={350}
          />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '900ms' }}>
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Total Departments</CardTitle>
                  <CardDescription>Across all roles</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {Object.keys(data.departmentStats).length}
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Active departments with staff
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Activity Rate</CardTitle>
                  <CardDescription>Overall staff activity</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {((data.overview.activeStaff / data.overview.totalStaff) * 100).toFixed(1)}%
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Staff currently active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Data Records</CardTitle>
                  <CardDescription>Master data entries</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                {data.masterDataStats.total}
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {data.masterDataStats.active} active records
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ErrorBoundary>
  )
}

// Loading skeleton component
function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="text-center lg:text-left">
        <div className="w-64 h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="w-96 h-6 bg-gray-200 rounded animate-pulse"></div>
      </div>
      
      {/* Filters skeleton */}
      <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
      
      {/* KPI tiles skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
      
      {/* Charts skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-80 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
    </div>
  )
}