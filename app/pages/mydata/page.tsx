"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MyDataForm } from "@/components/forms/mydata-form"
import { type MyDataFormData } from "@/lib/validations/mydata"
import { toast } from "sonner"
import { Plus, Database, FileSpreadsheet, Upload } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function MyDataPage() {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)

  const handleSubmit = async (data: MyDataFormData) => {
    setIsLoading(true)
    try {
      console.log("Submitting data to API:", data)
      
      const response = await fetch("/api/mydata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error("API Error:", errorData)
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      console.log("API Success:", result)
      toast.success("Data saved successfully!")
      setShowForm(false)
    } catch (error) {
      console.error("Submit error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to save data")
    } finally {
      setIsLoading(false)
    }
  }

  if (showForm) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Data</h1>
            <p className="mt-2 text-gray-600">
              Fill out the comprehensive form with all available input types
            </p>
          </div>
          <Button variant="outline" onClick={() => setShowForm(false)}>
            Back to Overview
          </Button>
        </div>
        
        <MyDataForm
          onSubmit={handleSubmit}
          submitLabel="Create Data"
          isLoading={isLoading}
        />
      </div>
    )
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
          <h1 className="text-3xl font-bold text-gray-900">My Data</h1>
          <p className="mt-2 text-gray-600">
            Manage your data with comprehensive forms, tables, and bulk operations
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Database className="h-8 w-8 text-primary" />
          <span className="text-lg font-semibold text-primary">Data Management</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-custom hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => setShowForm(true)}>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Create New</CardTitle>
                <CardDescription>Add new data with comprehensive form</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Button className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
              Create Data
            </Button>
          </CardContent>
        </Card>

        <Card className="card-custom hover:shadow-lg transition-shadow cursor-pointer group">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <Database className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-lg">View Data Table</CardTitle>
                <CardDescription>Browse, search, and manage existing data</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Button asChild variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Link href="/pages/mydata/list">
                View Table
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="card-custom hover:shadow-lg transition-shadow cursor-pointer group">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <Upload className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Bulk Import</CardTitle>
                <CardDescription>Import data from Excel/CSV files</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <Button asChild variant="outline" className="w-full group-hover:bg-green-600 group-hover:text-white transition-colors">
              <Link href="/pages/mydata/import">
                Import Data
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Features Overview */}
      <Card className="card-custom">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileSpreadsheet className="h-5 w-5 text-primary" />
            <span>MyData Features</span>
          </CardTitle>
          <CardDescription>
            Comprehensive data management with all modern input types and validation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Form Input Types</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Text & Textarea fields</li>
                <li>• Email, Phone, URL inputs</li>
                <li>• Number, Range sliders</li>
                <li>• Date, DateTime, Time pickers</li>
                <li>• Color picker</li>
                <li>• File upload with validation</li>
                <li>• Checkbox, Radio, Switch</li>
                <li>• Select dropdown & Multi-select</li>
                <li>• Tags with autocomplete</li>
                <li>• Password with show/hide</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Data Table Features</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Advanced search & filtering</li>
                <li>• Column sorting & visibility</li>
                <li>• Pagination with size options</li>
                <li>• Row selection & bulk actions</li>
                <li>• Export to Excel/CSV</li>
                <li>• Responsive design</li>
                <li>• Real-time updates</li>
                <li>• Keyboard navigation</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-900">Import/Export</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Excel (.xlsx) import</li>
                <li>• CSV import with preview</li>
                <li>• Column mapping interface</li>
                <li>• Validation error highlighting</li>
                <li>• Bulk data processing</li>
                <li>• Export filtered results</li>
                <li>• Template download</li>
                <li>• Progress indicators</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sample Data Preview */}
      <Card className="card-custom">
        <CardHeader>
          <CardTitle>Sample Data Structure</CardTitle>
          <CardDescription>
            Preview of the comprehensive data model with 50 seeded records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
            <pre className="text-gray-700">
{`{
  "id": "clw1234567890",
  "title": "Sample Data Entry",
  "description": "Comprehensive sample with all field types",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1-555-0123",
  "age": 32,
  "balance": 1250.75,
  "rating": 4.2,
  "isActive": true,
  "category": "A",
  "dateOnly": "2024-01-15",
  "dateTime": "2024-01-15T14:30:00",
  "timeOnly": "14:30",
  "website": "https://example.com",
  "avatarUrl": "https://example.com/avatar.jpg",
  "color": "#3B82F6",
  "tags": ["important", "review", "approved"],
  "filePath": "/uploads/document.pdf",
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-15T14:30:00Z"
}`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
