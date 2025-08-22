"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DataTable } from "@/components/data-table/data-table"
import { createColumns, type MyData } from "@/components/data-table/columns"
import { MyDataForm } from "@/components/forms/mydata-form"
import { type MyDataFormData } from "@/lib/validations/mydata"
import { toast } from "sonner"
import { Plus, Database, Trash2 } from "lucide-react"
import { motion } from "framer-motion"

export default function MyDataListPage() {
  const { data: session } = useSession()
  const [data, setData] = useState<MyData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [editingData, setEditingData] = useState<MyData | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
    pageCount: 0,
    total: 0,
  })

  const fetchData = async (page = 0, limit = 10, search = "") => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams({
        page: (page + 1).toString(),
        limit: limit.toString(),
        ...(search && { search }),
      })

      const response = await fetch(`/api/mydata?${params}`)
      if (!response.ok) throw new Error("Failed to fetch data")

      const result = await response.json()
      
      // Parse tags from JSON strings
      const parsedData = result.data.map((item: any) => ({
        ...item,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
        dateOnly: item.dateOnly ? new Date(item.dateOnly) : null,
        dateTime: item.dateTime ? new Date(item.dateTime) : null,
      }))

      setData(parsedData)
      setPagination({
        pageIndex: result.pagination.page - 1,
        pageSize: result.pagination.limit,
        pageCount: result.pagination.pages,
        total: result.pagination.total,
      })
    } catch (error) {
      console.error("Error fetching data:", error)
      toast.error("Failed to load data")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleCreate = async (formData: MyDataFormData) => {
    try {
      const response = await fetch("/api/mydata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to create data")

      toast.success("Data created successfully!")
      setShowCreateForm(false)
      fetchData(pagination.pageIndex, pagination.pageSize)
    } catch (error) {
      toast.error("Failed to create data")
      throw error
    }
  }

  const handleEdit = async (formData: MyDataFormData) => {
    if (!editingData) return

    try {
      const response = await fetch(`/api/mydata/${editingData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to update data")

      toast.success("Data updated successfully!")
      setEditingData(null)
      fetchData(pagination.pageIndex, pagination.pageSize)
    } catch (error) {
      toast.error("Failed to update data")
      throw error
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/mydata/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Failed to delete data")

      toast.success("Data deleted successfully!")
      fetchData(pagination.pageIndex, pagination.pageSize)
    } catch (error) {
      toast.error("Failed to delete data")
    }
  }

  const handleExport = async (format: 'csv' | 'excel') => {
    try {
      const response = await fetch(`/api/mydata/export?format=${format}`)
      if (!response.ok) throw new Error("Failed to export data")

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = `mydata-export.${format === 'excel' ? 'xlsx' : 'csv'}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      
      toast.success(`Data exported as ${format.toUpperCase()}`)
    } catch (error) {
      toast.error("Failed to export data")
    }
  }

  const handlePaginationChange = (newPagination: { pageIndex: number; pageSize: number }) => {
    fetchData(newPagination.pageIndex, newPagination.pageSize)
  }

  const columns = createColumns(
    (data) => setEditingData(data),
    handleDelete
  )

  const convertFormDataToMyData = (formData: MyDataFormData): Partial<MyData> => {
    return {
      ...formData,
      tags: JSON.stringify(formData.tags),
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
          <h1 className="text-3xl font-bold text-gray-900">Data Table</h1>
          <p className="mt-2 text-gray-600">
            Advanced data table with search, sort, filter, and pagination
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Database className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{pagination.total}</p>
                <p className="text-sm text-gray-600">Total Records</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-2xl font-bold">
                  {data.filter(item => item.isActive).length}
                </p>
                <p className="text-sm text-gray-600">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
              <div>
                <p className="text-2xl font-bold">
                  {data.filter(item => !item.isActive).length}
                </p>
                <p className="text-sm text-gray-600">Inactive</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-2xl font-bold">{pagination.pageCount}</p>
                <p className="text-sm text-gray-600">Pages</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card className="card-custom">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>MyData Records</span>
          </CardTitle>
          <CardDescription>
            Comprehensive data table with advanced features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data}
            searchKey="title"
            onRefresh={() => fetchData(pagination.pageIndex, pagination.pageSize)}
            onExport={handleExport}
            isLoading={isLoading}
            pagination={pagination}
            onPaginationChange={handlePaginationChange}
          />
        </CardContent>
      </Card>

      {/* Create Modal */}
      <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Data</DialogTitle>
            <DialogDescription>
              Fill out the form to create a new data record
            </DialogDescription>
          </DialogHeader>
          <MyDataForm
            onSubmit={handleCreate}
            submitLabel="Create"
          />
        </DialogContent>
      </Dialog>

      {/* Edit Modal */}
      <Dialog open={!!editingData} onOpenChange={() => setEditingData(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Data</DialogTitle>
            <DialogDescription>
              Update the data record
            </DialogDescription>
          </DialogHeader>
          {editingData && (
            <MyDataForm
              initialData={{
                ...editingData,
                tags: editingData.tags ? JSON.parse(editingData.tags) : [],
              }}
              onSubmit={handleEdit}
              submitLabel="Update"
            />
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
