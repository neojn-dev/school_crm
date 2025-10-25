"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ErrorBoundary } from "@/components/error-boundary"
import { 
  Users, 
  TrendingUp,
  BarChart3,
  Activity,
  Building2,
  Calendar,
  Award
} from "lucide-react"

export default function DashboardPage() {
  const { data: session } = useSession()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)

  // Ensure component is mounted before rendering
  useEffect(() => {
    setMounted(true)
    setLoading(false)
  }, [])

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return <DashboardSkeleton loadingProgress="Preparing dashboard..." />
  }

  if (!session) {
    return <DashboardSkeleton loadingProgress="Verifying access..." />
  }

  if (loading) {
    return <DashboardSkeleton loadingProgress="Loading dashboard..." />
  }

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="text-center lg:text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                School CRM Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back, {session.user?.username || 'User'}! Manage your school's users and roles.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">User Management</CardTitle>
                  <CardDescription>Manage school users</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                Users
              </div>
              <p className="text-sm text-gray-600 mt-1">
                View and manage all users
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">Role Management</CardTitle>
                  <CardDescription>Manage user roles</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                Roles
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Configure user permissions
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
                  <CardTitle className="text-lg">System Status</CardTitle>
                  <CardDescription>Application health</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                Active
              </div>
              <p className="text-sm text-gray-600 mt-1">
                All systems operational
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>User Management</span>
              </CardTitle>
              <CardDescription>
                Manage school users, roles, and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  • Create and manage user accounts<br/>
                  • Assign roles and permissions<br/>
                  • Monitor user activity<br/>
                  • Handle user authentication
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Role Management</span>
              </CardTitle>
              <CardDescription>
                Configure user roles and access levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  • Define role permissions<br/>
                  • Manage access levels<br/>
                  • Configure security settings<br/>
                  • Audit role assignments
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ErrorBoundary>
  )
}

// Loading skeleton component
function DashboardSkeleton({ loadingProgress }: { loadingProgress?: string }) {
  return (
    <div className="space-y-6">
      <div className="text-center lg:text-left">
        <div className="w-64 h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="w-96 h-6 bg-gray-200 rounded animate-pulse"></div>
      </div>
      
      {/* Loading progress indicator */}
      {loadingProgress && (
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-blue-700 font-medium">{loadingProgress}</span>
          </div>
        </div>
      )}
      
      {/* Cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
      
      {/* Action cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="h-48 bg-gray-200 rounded animate-pulse"></div>
        ))}
      </div>
    </div>
  )
}