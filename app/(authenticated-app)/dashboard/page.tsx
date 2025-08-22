"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Database, 
  FileText, 
  Users, 
  Settings, 
  BarChart3, 
  Activity 
} from "lucide-react"
import Link from "next/link"
import { ErrorBoundary } from "@/components/error-boundary"

export default function DashboardPage() {
  const { data: session } = useSession()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before rendering
  useEffect(() => {
    setMounted(true)
  }, [])

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
      title: "My Data",
      description: "Manage your data entries",
      icon: Database,
      href: "/mydata",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Role 1",
      description: "Access Role 1 features",
      icon: Users,
      href: "/role1",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Role 2",
      description: "Access Role 2 features",
      icon: FileText,
      href: "/role2",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Role 3",
      description: "Access Role 3 features",
      icon: Settings,
      href: "/role3",
      color: "from-orange-500 to-orange-600"
    }
  ]

  const stats = [
    { label: "Total Data Entries", value: "1,234", icon: Database },
    { label: "Active Users", value: "89", icon: Users },
    { label: "System Status", value: "Healthy", icon: Activity },
    { label: "Performance", value: "98.5%", icon: BarChart3 }
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
            Here's what's happening with your account today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <stat.icon className="h-5 w-5 text-blue-600" />
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

        {/* Quick Actions */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '200ms' }}>
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
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: '300ms' }}>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <Card>
            <CardHeader>
              <CardTitle>Latest Updates</CardTitle>
              <CardDescription>Your recent activity and system updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Data entry updated successfully</span>
                  <span className="text-xs text-gray-400 ml-auto">2 min ago</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">New user registered</span>
                  <span className="text-xs text-gray-400 ml-auto">15 min ago</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">System backup completed</span>
                  <span className="text-xs text-gray-400 ml-auto">1 hour ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ErrorBoundary>
  )
}
