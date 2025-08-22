"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, Users, Database, Settings, Activity, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Role1Page() {
  const { data: session } = useSession()

  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12%",
      icon: Users,
      color: "text-blue-600 bg-blue-100"
    },
    {
      title: "Active Sessions",
      value: "89",
      change: "+5%", 
      icon: Activity,
      color: "text-green-600 bg-green-100"
    },
    {
      title: "Data Records",
      value: "5,678",
      change: "+18%",
      icon: Database,
      color: "text-purple-600 bg-purple-100"
    },
    {
      title: "System Health",
      value: "98.5%",
      change: "+0.2%",
      icon: TrendingUp,
      color: "text-orange-600 bg-orange-100"
    }
  ]

  const features = [
    {
      title: "User Management",
      description: "Manage user accounts, roles, and permissions",
      icon: Users,
      href: "/app/mydata"
    },
    {
      title: "System Settings", 
      description: "Configure system-wide settings and preferences",
      icon: Settings,
      href: "/app/all-roles"
    },
    {
      title: "Security Controls",
      description: "Monitor and control security settings",
      icon: Shield,
      href: "/app/mydata"
    },
    {
      title: "Data Analytics",
      description: "View detailed analytics and reports",
      icon: Database,
      href: "/app/mydata"
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
          <h1 className="text-3xl font-bold text-gray-900">Role 1 Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back, {session?.user.username}! Here's your Role 1 overview.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-lg font-semibold text-primary">Administrator</span>
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
                        {stat.change} from last month
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

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      {/* Role-specific Information */}
      <Card className="card-custom">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <span>Role 1 Privileges</span>
          </CardTitle>
          <CardDescription>
            As a Role 1 user, you have access to administrative features and system controls.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Administrative Access</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Full user management capabilities</li>
                <li>• System configuration access</li>
                <li>• Security settings control</li>
                <li>• Advanced reporting features</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Data Management</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Create, read, update, delete operations</li>
                <li>• Bulk data import/export</li>
                <li>• Advanced filtering and search</li>
                <li>• Data analytics and insights</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
