"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { MyDataForm } from "@/components/forms/mydata-form"
import { type MyDataFormData } from "@/lib/validations/mydata"
import { EnhancedDataTable } from "@/components/data-table/enhanced-data-table"
import { createColumns } from "@/components/data-table/columns"
import { toast } from "sonner"
import { Plus, Download, FileSpreadsheet } from "lucide-react"
import { motion } from "framer-motion"

export type MyData = {
  id: string
  title: string
  description: string
  name: string
  email: string
  phone?: string
  age?: number
  balance?: number
  rating?: number
  isActive: boolean
  category: string
  dateOnly?: Date
  dateTime?: Date
  timeOnly?: string
  website?: string
  avatarUrl?: string
  color?: string
  tags?: string
  filePath?: string
  createdAt: Date
  updatedAt: Date
}

export default function MyDataPage() {
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [data, setData] = useState<MyData[]>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
    pageCount: 0,
    total: 0
  })

  const fetchData = async (pageIndex = 0, pageSize = 10) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/mydata?page=${pageIndex + 1}&limit=${pageSize}`)
      if (!response.ok) throw new Error('Failed to fetch data')
      
      const result = await response.json()
      setData(result.data)
      setPagination({
        pageIndex,
        pageSize,
        pageCount: result.pagination.pages,
        total: result.pagination.total
      })
    } catch (error) {
      console.error('Fetch error:', error)
      toast.error('Failed to fetch data')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (formData: MyDataFormData) => {
    setIsLoading(true)
    try {
      console.log("Submitting data to API:", formData)
      
      const response = await fetch("/api/mydata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
      fetchData() // Refresh the data
    } catch (error) {
      console.error("Submit error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to save data")
    } finally {
      setIsLoading(false)
    }
  }

  const handleExport = async (format: 'csv' | 'excel') => {
    try {
      const response = await fetch(`/api/mydata/export?format=${format}`)
      if (!response.ok) throw new Error('Export failed')
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `mydata-export.${format === 'excel' ? 'xlsx' : 'csv'}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      toast.success(`${format.toUpperCase()} export completed!`)
    } catch (error) {
      console.error('Export error:', error)
      toast.error('Export failed')
    }
  }

  const handleEdit = (data: MyData) => {
    // TODO: Implement edit functionality
    console.log('Edit data:', data)
    toast.info('Edit functionality coming soon!')
  }

  const handleDelete = async (id: string) => {
    // TODO: Implement delete functionality
    console.log('Delete data:', id)
    toast.info('Delete functionality coming soon!')
  }

  const handlePaginationChange = (newPagination: { pageIndex: number; pageSize: number }) => {
    fetchData(newPagination.pageIndex, newPagination.pageSize)
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
            Back to Data Table
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

  const columns = createColumns(handleEdit, handleDelete)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header with Action Buttons */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Data</h1>
          <p className="mt-2 text-gray-600">
            Manage your data with comprehensive forms, tables, and bulk operations
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {/* Export Button */}
          <Button variant="outline" onClick={() => handleExport('excel')}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
          
          {/* Add Data Button */}
          <Button onClick={() => setShowForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Data
          </Button>
        </div>
      </div>

      {/* Data Table */}
      <EnhancedDataTable
        columns={columns}
        data={data}
        isLoading={isLoading}
        pagination={pagination}
        onPaginationChange={handlePaginationChange}
        onRefresh={() => fetchData()}
        onExport={handleExport}
      />
    </motion.div>
  )
}
