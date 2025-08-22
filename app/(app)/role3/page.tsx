"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Database, BarChart3, FileSpreadsheet, Download, Upload, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Role3Page() {
  const { data: session } = useSession()

  const stats = [
    {
      title: "Records Processed",
      value: "15,432",
      change: "+1,234",
      icon: Database,
      color: "text-blue-600 bg-blue-100"
    },
    {
      title: "Data Imports",
      value: "89",
      change: "+12", 
      icon: Upload,
      color: "text-green-600 bg-green-100"
    },
    {
      title: "Reports Generated",
      value: "156",
      change: "+23",
      icon: FileSpreadsheet,
      color: "text-purple-600 bg-purple-100"
    },
    {
      title: "Data Exports",
      value: "67",
      change: "+8",
      icon: Download,
      color: "text-orange-600 bg-orange-100"
    }
  ]

  const features = [
    {
      title: "Data Analytics",
      description: "Analyze data patterns and generate insights",
      icon: BarChart3,
      href: "/app/mydata"
    },
    {
      title: "Data Import/Export", 
      description: "Import and export data in various formats",
      icon: Upload,
      href: "/app/mydata"
    },
    {
      title: "Report Generation",
      description: "Create detailed reports and visualizations",
      icon: FileSpreadsheet,
      href: "/app/mydata"
    },
    {
      title: "Data Processing",
      description: "Process and transform data efficiently",
      icon: RefreshCw,
      href: "/app/mydata"
    }
  ]

  const dataInsights = [
    {
      title: "Top Category",
      value: "Category A",
      percentage: "45%",
      trend: "up"
    },
    {
      title: "Average Rating",
      value: "4.2/5.0",
      percentage: "+0.3",
      trend: "up"
    },
    {
      title: "Active Records",
      value: "89%",
      percentage: "+2%",
      trend: "up"
    },
    {
      title: "Processing Speed",
      value: "1.2s avg",
      percentage: "-0.1s",
      trend: "up"
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
          <h1 className="text-3xl font-bold text-gray-900">Role 3 Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome back, {session?.user.username}! Here's your data analysis overview.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Database className="h-8 w-8 text-primary" />
          <span className="text-lg font-semibold text-primary">Data Analyst</span>
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
                        {stat.change} this month
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

        {/* Data Insights */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <Card className="card-custom">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <span>Data Insights</span>
              </CardTitle>
              <CardDescription>
                Key metrics from your data analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dataInsights.map((insight, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{insight.title}</p>
                      <p className="text-lg font-semibold text-gray-700">{insight.value}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-green-600">{insight.percentage}</p>
                      <div className="w-2 h-2 bg-green-500 rounded-full ml-auto" />
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
            <Database className="h-5 w-5 text-primary" />
            <span>Role 3 Privileges</span>
          </CardTitle>
          <CardDescription>
            As a Role 3 user, you have access to advanced data analysis and processing features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Data Analysis</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Advanced analytics and insights</li>
                <li>• Custom data visualizations</li>
                <li>• Statistical analysis tools</li>
                <li>• Trend analysis and forecasting</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Data Processing</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Bulk data import/export operations</li>
                <li>• Data transformation and cleansing</li>
                <li>• Automated report generation</li>
                <li>• Real-time data processing</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
