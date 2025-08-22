"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UserCheck, Users, Shield, Database, Clock, Info, RefreshCw } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"

interface SessionInfo {
  session: {
    user: {
      id: string
      username: string
      email: string
      role: string
    }
    expires: string
  }
}

export default function AllRolesPage() {
  const { data: session } = useSession()
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchSessionInfo = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/auth/session")
      if (response.ok) {
        const data = await response.json()
        setSessionInfo(data)
      } else {
        toast.error("Failed to fetch session information")
      }
    } catch (error) {
      toast.error("Error fetching session information")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSessionInfo()
  }, [])

  const roleFeatures = {
    ROLE1: {
      title: "Administrator",
      icon: Shield,
      color: "bg-red-100 text-red-800 border-red-200",
      features: [
        "Full system administration",
        "User management",
        "Security controls",
        "System configuration",
        "Advanced analytics"
      ]
    },
    ROLE2: {
      title: "Team Manager", 
      icon: Users,
      color: "bg-blue-100 text-blue-800 border-blue-200",
      features: [
        "Team management",
        "Project coordination",
        "Performance tracking",
        "Resource allocation",
        "Team communication"
      ]
    },
    ROLE3: {
      title: "Data Analyst",
      icon: Database,
      color: "bg-green-100 text-green-800 border-green-200",
      features: [
        "Data analysis",
        "Report generation",
        "Data visualization",
        "Statistical analysis",
        "Data processing"
      ]
    }
  }

  const allFeatures = [
    {
      title: "Data Management",
      description: "Access to MyData features for all roles",
      icon: Database,
      available: true
    },
    {
      title: "Profile Management",
      description: "Update personal information and preferences",
      icon: UserCheck,
      available: true
    },
    {
      title: "Session Management",
      description: "View and manage active sessions",
      icon: Clock,
      available: true
    }
  ]

  // Get role data safely
  const getRoleData = (role: string) => {
    return roleFeatures[role as keyof typeof roleFeatures] || {
      title: role,
      icon: Shield,
      color: "bg-gray-100 text-gray-800 border-gray-200",
      features: ["Basic access"]
    }
  }

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
          <h1 className="text-3xl font-bold text-gray-900">All Roles Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Welcome, {session?.user?.username || 'User'}! This page is accessible to all authenticated users.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <UserCheck className="h-8 w-8 text-primary" />
          <span className="text-lg font-semibold text-primary">Universal Access</span>
        </div>
      </div>

      {/* Current Session Information */}
      <Card className="card-custom">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Current Session Information</span>
              </CardTitle>
              <CardDescription>
                Details about your current authentication session
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchSessionInfo}
              disabled={loading}
            >
              {loading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {sessionInfo ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">User ID</label>
                  <p className="text-sm text-gray-900 font-mono bg-gray-50 p-2 rounded">
                    {sessionInfo.session.user.id}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Username</label>
                  <p className="text-lg font-semibold text-gray-900">
                    {sessionInfo.session.user.username}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="text-sm text-gray-900">
                    {sessionInfo.session.user.email}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Role</label>
                  <div className="mt-1">
                    <Badge className={getRoleData(sessionInfo.session.user.role).color}>
                      {getRoleData(sessionInfo.session.user.role).title}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Session Expires</label>
                  <p className="text-sm text-gray-900">
                    {new Date(sessionInfo.session.expires).toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Session Duration</label>
                  <p className="text-sm text-gray-900">
                    {Math.round((new Date(sessionInfo.session.expires).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days remaining
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Click refresh to load session information</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Role Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(roleFeatures).map(([roleKey, roleData]) => {
          const isCurrentRole = sessionInfo?.session.user.role === roleKey
          const Icon = roleData.icon
          
          return (
            <motion.div
              key={roleKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Object.keys(roleFeatures).indexOf(roleKey) * 0.1 }}
            >
              <Card className={`card-custom ${isCurrentRole ? 'ring-2 ring-primary' : ''}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-right">
                      <CardTitle className="flex items-center space-x-2">
                        <span>{roleData.title}</span>
                        {isCurrentRole && <Badge variant="secondary">Your Role</Badge>}
                      </CardTitle>
                      <CardDescription>Role: {roleKey}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Capabilities:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {roleData.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Universal Features */}
      <Card className="card-custom">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <UserCheck className="h-5 w-5 text-primary" />
            <span>Features Available to All Roles</span>
          </CardTitle>
          <CardDescription>
            These features are accessible regardless of your role assignment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {allFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                    <Badge variant={feature.available ? "default" : "secondary"} className="mt-2">
                      {feature.available ? "Available" : "Coming Soon"}
                    </Badge>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Session Security Information */}
      <Card className="card-custom">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Info className="h-5 w-5 text-primary" />
            <span>How Sessions Work</span>
          </CardTitle>
          <CardDescription>
            Understanding authentication and session management in this application
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Authentication Flow</h4>
              <div className="text-sm text-gray-600 space-y-2">
                <p>1. <strong>Sign Up:</strong> Create account with email verification</p>
                <p>2. <strong>Sign In:</strong> Authenticate with credentials</p>
                <p>3. <strong>Session Creation:</strong> JWT token generated and stored</p>
                <p>4. <strong>Authorization:</strong> Role-based access control applied</p>
                <p>5. <strong>Session Expiry:</strong> Automatic logout after expiration</p>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">Security Features</h4>
              <div className="text-sm text-gray-600 space-y-2">
                <p>• <strong>Secure Cookies:</strong> HTTPOnly and Secure flags</p>
                <p>• <strong>Password Hashing:</strong> bcrypt with salt rounds</p>
                <p>• <strong>Email Verification:</strong> Required before access</p>
                <p>• <strong>Rate Limiting:</strong> Protection against brute force</p>
                <p>• <strong>CSRF Protection:</strong> Built-in NextAuth security</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
