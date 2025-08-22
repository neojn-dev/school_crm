"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, FileText, BarChart3, MessageSquare, Clock, Target } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Role2Page() {
  const { data: session } = useSession()

  const stats = [
    {
      title: "Team Members",
      value: "45",
      change: "+3",
      icon: Users,
      color: "text-blue-600 bg-blue-100"
    },
    {
      title: "Active Projects",
      value: "12",
      change: "+2", 
      icon: Target,
      color: "text-green-600 bg-green-100"
    },
    {
      title: "Documents",
      value: "234",
      change: "+15",
      icon: FileText,
      color: "text-purple-600 bg-purple-100"
    },
    {
      title: "Messages",
      value: "67",
      change: "+8",
      icon: MessageSquare,
      color: "text-orange-600 bg-orange-100"
    }
  ]

  const features = [
    {
      title: "Team Management",
      description: "Manage team members and their assignments",
      icon: Users,
      href: "/mydata"
    },
    {
      title: "Project Tracking", 
      description: "Track project progress and milestones",
      icon: Target,
      href: "/dashboard"
    },
    {
      title: "Document Management",
      description: "Organize and share team documents",
      icon: FileText,
      href: "/mydata"
    },
    {
      title: "Performance Analytics",
      description: "View team performance metrics",
      icon: BarChart3,
      href: "/mydata"
    }
  ]

  const recentActivities = [
    {
      action: "Project Alpha milestone completed",
      time: "2 hours ago",
      type: "success"
    },
    {
      action: "New team member onboarded",
      time: "4 hours ago", 
      type: "info"
    },
    {
      action: "Weekly report generated",
      time: "1 day ago",
      type: "neutral"
    },
    {
      action: "Team meeting scheduled",
      time: "2 days ago",
      type: "info"
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Role 2 Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back, {session?.user.username}! Here's your team overview.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="h-8 w-8 text-primary" />
          <span className="text-lg font-semibold text-primary">Team Manager</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="card-custom">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                      <p className="text-sm text-green-600">
                        {stat.change} this week
                      </p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Features Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                <Card className="card-custom hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                        <CardDescription>{feature.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button asChild variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                      <Link href={feature.href}>
                        Access Feature
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <Card className="card-custom">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>
                Latest updates from your team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'success' ? 'bg-green-500' :
                      activity.type === 'info' ? 'bg-blue-500' : 'bg-gray-400'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Role-specific Information */}
      <Card className="card-custom">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-primary" />
            <span>Role 2 Privileges</span>
          </CardTitle>
          <CardDescription>
            As a Role 2 user, you have access to team management and project coordination features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Team Management</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Manage team member assignments</li>
                <li>• Track team performance metrics</li>
                <li>• Schedule and organize meetings</li>
                <li>• Access team communication tools</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Project Coordination</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Create and manage projects</li>
                <li>• Set milestones and deadlines</li>
                <li>• Generate progress reports</li>
                <li>• Coordinate cross-team activities</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
