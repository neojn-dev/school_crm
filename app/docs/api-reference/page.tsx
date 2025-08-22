"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Code, 
  Key, 
  Database, 
  Upload, 
  Download,
  Shield,
  CheckCircle,
  AlertCircle
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const apiEndpoints = [
  {
    category: "Authentication",
    icon: Shield,
    endpoints: [
      {
        method: "POST",
        path: "/api/auth/signup",
        description: "Create a new user account with email verification",
        body: {
          username: "string",
          email: "string",
          password: "string",
          role: "ROLE1 | ROLE2 | ROLE3"
        },
        response: {
          message: "string",
          userId: "string"
        }
      },
      {
        method: "POST",
        path: "/api/auth/verify",
        description: "Verify user email with token",
        body: {
          token: "string"
        },
        response: {
          message: "string"
        }
      },
      {
        method: "POST",
        path: "/api/auth/forgot-password",
        description: "Request password reset email",
        body: {
          email: "string"
        },
        response: {
          message: "string"
        }
      },
      {
        method: "POST",
        path: "/api/auth/reset-password",
        description: "Reset password with token",
        body: {
          token: "string",
          password: "string"
        },
        response: {
          message: "string"
        }
      },
      {
        method: "GET",
        path: "/api/auth/session",
        description: "Get current user session",
        auth: true,
        response: {
          session: {
            user: {
              id: "string",
              username: "string",
              email: "string",
              role: "string"
            },
            expires: "string"
          }
        }
      }
    ]
  },
  {
    category: "MyData",
    icon: Database,
    endpoints: [
      {
        method: "GET",
        path: "/api/mydata",
        description: "Get paginated list of user's data with search and filters",
        auth: true,
        query: {
          page: "number (default: 1)",
          limit: "number (default: 10)",
          search: "string (optional)",
          category: "A | B | C (optional)",
          sortBy: "string (default: createdAt)",
          sortOrder: "asc | desc (default: desc)"
        },
        response: {
          data: "MyData[]",
          pagination: {
            page: "number",
            limit: "number", 
            total: "number",
            pages: "number"
          }
        }
      },
      {
        method: "POST",
        path: "/api/mydata",
        description: "Create new data record",
        auth: true,
        body: "MyDataCreateSchema",
        response: "MyData"
      },
      {
        method: "GET",
        path: "/api/mydata/[id]",
        description: "Get specific data record by ID",
        auth: true,
        response: "MyData"
      },
      {
        method: "PUT",
        path: "/api/mydata/[id]",
        description: "Update specific data record",
        auth: true,
        body: "MyDataUpdateSchema",
        response: "MyData"
      },
      {
        method: "DELETE",
        path: "/api/mydata/[id]",
        description: "Delete specific data record",
        auth: true,
        response: {
          message: "string"
        }
      },
      {
        method: "POST",
        path: "/api/mydata/bulk-import",
        description: "Import multiple records from Excel/CSV",
        auth: true,
        body: {
          data: "MyDataCreateSchema[]"
        },
        response: {
          message: "string",
          imported: "number",
          total: "number"
        }
      },
      {
        method: "GET",
        path: "/api/mydata/export",
        description: "Export data as Excel or CSV",
        auth: true,
        query: {
          format: "csv | excel",
          search: "string (optional)",
          category: "A | B | C (optional)"
        },
        response: "File download"
      }
    ]
  },
  {
    category: "File Upload",
    icon: Upload,
    endpoints: [
      {
        method: "POST",
        path: "/api/upload",
        description: "Upload file with security validation",
        auth: true,
        body: "FormData with 'file' field",
        response: {
          id: "string",
          filename: "string",
          originalName: "string",
          size: "number",
          path: "string",
          url: "string"
        }
      },
      {
        method: "GET",
        path: "/api/upload/[id]",
        description: "Download file by ID",
        auth: true,
        response: "File stream"
      },
      {
        method: "DELETE",
        path: "/api/upload/[id]",
        description: "Delete uploaded file",
        auth: true,
        response: {
          message: "string"
        }
      }
    ]
  }
]

const dataSchemas = {
  MyData: {
    id: "string (cuid)",
    createdAt: "DateTime",
    updatedAt: "DateTime",
    title: "string (1-100 chars)",
    description: "string (1-1000 chars)",
    name: "string (1-50 chars)",
    email: "string (email format, unique)",
    phone: "string (optional, phone format)",
    passwordHash: "string (optional, demo only)",
    age: "number (0-150, optional)",
    balance: "number (min: 0, optional)",
    rating: "number (0-5, optional)",
    isActive: "boolean (default: true)",
    category: "enum: A | B | C",
    dateOnly: "Date (optional)",
    dateTime: "DateTime (optional)",
    timeOnly: "string (HH:MM format, optional)",
    website: "string (URL format, optional)",
    avatarUrl: "string (URL format, optional)",
    color: "string (hex color, optional)",
    tags: "string[] (JSON array, optional)",
    filePath: "string (optional)",
    userId: "string (relation to User)"
  }
}

export default function ApiReferencePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">API Reference</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Complete documentation for the NextJS Template App REST API with examples and schemas
            </p>
          </div>

          {/* Quick Start */}
          <Card className="card-custom mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Key className="h-5 w-5" />
                <span>Quick Start</span>
              </CardTitle>
              <CardDescription>
                Get started with the API in minutes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">1. Authentication</h4>
                  <p className="text-sm text-blue-800">
                    Sign up and verify your email to get started
                  </p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">2. Session</h4>
                  <p className="text-sm text-green-800">
                    Use session cookies for authenticated requests
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">3. API Calls</h4>
                  <p className="text-sm text-purple-800">
                    Make requests to endpoints with proper validation
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm overflow-x-auto">
                <div className="mb-2 text-gray-400">// Example: Create new data</div>
                <div>fetch('/api/mydata', {'{'}</div>
                <div className="ml-4">method: 'POST',</div>
                <div className="ml-4">headers: {'{'} 'Content-Type': 'application/json' {'}'},</div>
                <div className="ml-4">body: JSON.stringify({'{'}title: 'Sample', ...{'}'})</div>
                <div>{'}'}).then(res =&gt; res.json())</div>
              </div>
            </CardContent>
          </Card>

          {/* API Endpoints */}
          <Tabs defaultValue="authentication" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="authentication">Authentication</TabsTrigger>
              <TabsTrigger value="mydata">MyData</TabsTrigger>
              <TabsTrigger value="uploads">File Upload</TabsTrigger>
            </TabsList>

            {apiEndpoints.map(category => (
              <TabsContent key={category.category.toLowerCase()} value={category.category.toLowerCase()}>
                <div className="space-y-6">
                  {category.endpoints.map((endpoint, index) => {
                    const IconComponent = category.icon
                    return (
                      <Card key={index} className="card-custom">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                <IconComponent className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <Badge variant={endpoint.method === 'GET' ? 'secondary' : 
                                                endpoint.method === 'POST' ? 'default' :
                                                endpoint.method === 'PUT' ? 'outline' : 'destructive'}>
                                    {endpoint.method}
                                  </Badge>
                                  <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                                    {endpoint.path}
                                  </code>
                                  {endpoint.auth && (
                                    <Badge variant="outline" className="text-xs">
                                      <Shield className="h-3 w-3 mr-1" />
                                      Auth Required
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                  {endpoint.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Request */}
                            <div>
                              <h4 className="font-medium mb-3">Request</h4>
                              {endpoint.query && (
                                <div className="mb-4">
                                  <h5 className="text-sm font-medium text-gray-700 mb-2">Query Parameters</h5>
                                  <div className="bg-gray-50 rounded-lg p-3 text-sm font-mono">
                                    <pre>{JSON.stringify(endpoint.query, null, 2)}</pre>
                                  </div>
                                </div>
                              )}
                              {endpoint.body && (
                                <div>
                                  <h5 className="text-sm font-medium text-gray-700 mb-2">Request Body</h5>
                                  <div className="bg-gray-50 rounded-lg p-3 text-sm font-mono">
                                    <pre>{typeof endpoint.body === 'string' ? endpoint.body : JSON.stringify(endpoint.body, null, 2)}</pre>
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            {/* Response */}
                            <div>
                              <h4 className="font-medium mb-3">Response</h4>
                              <div className="bg-gray-50 rounded-lg p-3 text-sm font-mono">
                                <pre>{typeof endpoint.response === 'string' ? endpoint.response : JSON.stringify(endpoint.response, null, 2)}</pre>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Data Schemas */}
          <Card className="card-custom mt-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Code className="h-5 w-5" />
                <span>Data Schemas</span>
              </CardTitle>
              <CardDescription>
                TypeScript interfaces and validation schemas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(dataSchemas).map(([schemaName, schema]) => (
                  <div key={schemaName}>
                    <h4 className="font-medium text-lg mb-3">{schemaName}</h4>
                    <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm overflow-x-auto">
                      <div className="text-blue-400">interface {schemaName} {'{'}</div>
                      {Object.entries(schema).map(([field, type]) => (
                        <div key={field} className="ml-4">
                          <span className="text-yellow-400">{field}</span>
                          <span className="text-gray-400">: </span>
                          <span className="text-green-400">{type}</span>
                        </div>
                      ))}
                      <div>{'}'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Error Handling */}
          <Card className="card-custom mt-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5" />
                <span>Error Handling</span>
              </CardTitle>
              <CardDescription>
                Standard error responses and status codes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">HTTP Status Codes</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>200</span>
                      <span className="text-green-600">Success</span>
                    </div>
                    <div className="flex justify-between">
                      <span>201</span>
                      <span className="text-green-600">Created</span>
                    </div>
                    <div className="flex justify-between">
                      <span>400</span>
                      <span className="text-red-600">Bad Request</span>
                    </div>
                    <div className="flex justify-between">
                      <span>401</span>
                      <span className="text-red-600">Unauthorized</span>
                    </div>
                    <div className="flex justify-between">
                      <span>404</span>
                      <span className="text-red-600">Not Found</span>
                    </div>
                    <div className="flex justify-between">
                      <span>500</span>
                      <span className="text-red-600">Server Error</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Error Response Format</h4>
                  <div className="bg-gray-50 rounded-lg p-3 text-sm font-mono">
                    <pre>{JSON.stringify({
                      error: "Error message",
                      details: "Additional details (optional)"
                    }, null, 2)}</pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-12 pt-8 border-t">
            <p className="text-gray-600">
              Need help? Check out the{" "}
              <Link href="/" className="text-primary hover:underline">
                main application
              </Link>{" "}
              or view the source code on GitHub.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
