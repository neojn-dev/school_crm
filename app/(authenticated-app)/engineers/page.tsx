"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Users,
  Zap,
  Star,
  UserCheck,
  Building,
  Rocket,
  Cpu,
  CheckCircle
} from "lucide-react"
import { ErrorBoundary } from "@/components/error-boundary"
import { DataTable } from "@/components/data-table/data-table"
import { columns } from "./columns"

interface Engineer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  department: string
  specialization: string
  engineeringType: string
  yearsOfExperience?: number
  salary?: number
  isActive: boolean
  projectSuccessRate?: number
  codeQuality?: number
  innovationScore?: number
  createdAt: string
  employeeId: string
}

export default function EngineersPage() {
  const { data: session, status } = useSession()
  const [engineers, setEngineers] = useState<Engineer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingEngineer, setEditingEngineer] = useState<Engineer | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    employeeId: "",
    department: "",
    specialization: "",
    engineeringType: "",
    yearsOfExperience: "",
    salary: "",
    isActive: true
  })

  useEffect(() => {
    if (status === 'authenticated') {
      fetchEngineers()
    } else if (status === 'unauthenticated') {
      setLoading(false)
    }
  }, [status])

  const fetchEngineers = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/engineers', {
        credentials: 'include'
      })
      
      if (response.ok) {
        const data = await response.json()
        
        if (Array.isArray(data)) {
          setEngineers(data)
        } else {
          setError('Invalid data format received from API')
          setEngineers([])
        }
      } else {
        const errorText = await response.text()
        setError(`API request failed: ${response.status} - ${errorText}`)
        setEngineers([])
      }
    } catch (error) {
      setError(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setEngineers([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log('🔍 [FORM DEBUG] Submitting engineer form with data:', formData)
    console.log('🔍 [FORM DEBUG] Current session:', session)
    
    try {
      const url = editingEngineer ? `/api/engineers/${editingEngineer.id}` : '/api/engineers'
      const method = editingEngineer ? 'PUT' : 'POST'
      
      console.log('🔍 [FORM DEBUG] Making request to:', url, 'with method:', method)
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      })
      
      console.log('🔍 [FORM DEBUG] Response status:', response.status)
      console.log('🔍 [FORM DEBUG] Response headers:', response.headers)
      
      if (response.ok) {
        const result = await response.json()
        console.log('🔍 [FORM DEBUG] Success response:', result)
        setIsAddDialogOpen(false)
        setEditingEngineer(null)
        resetForm()
        fetchEngineers()
        alert(editingEngineer ? 'Engineer updated successfully!' : 'Engineer added successfully!')
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        console.error('❌ [FORM ERROR] API error:', errorData)
        alert(`Error: ${errorData.error || 'Failed to save engineer'}`)
      }
    } catch (error) {
      console.error('❌ [FORM ERROR] Network error:', error)
      alert('Network error occurred. Please try again.')
    }
  }

  const handleEdit = (engineer: Engineer) => {
    setEditingEngineer(engineer)
    setFormData({
      firstName: engineer.firstName,
      lastName: engineer.lastName,
      email: engineer.email,
      employeeId: engineer.employeeId,
      department: engineer.department,
      specialization: engineer.specialization,
      engineeringType: engineer.engineeringType,
      yearsOfExperience: engineer.yearsOfExperience?.toString() || "",
      salary: engineer.salary?.toString() || "",
      isActive: engineer.isActive
    })
    setIsAddDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      employeeId: "",
      department: "",
      specialization: "",
      engineeringType: "",
      yearsOfExperience: "",
      salary: "",
      isActive: true
    })
  }

  const fillDummyData = () => {
    const departments = ["Software", "Hardware", "Civil", "Mechanical", "Electrical", "Chemical", "Biomedical", "Industrial"]
    const specializations = [
      "Full Stack Development", "Machine Learning", "Embedded Systems", "Structural Analysis",
      "Robotics", "Power Systems", "Process Engineering", "Medical Devices"
    ]
    const engineeringTypes = ["Software", "Hardware", "Civil", "Mechanical", "Electrical", "Chemical", "Biomedical", "Industrial"]
    const firstNames = ["Eng. Sarah", "Eng. Michael", "Eng. Emily", "Eng. David", "Eng. Jennifer", "Eng. Robert", "Eng. Lisa", "Eng. James"]
    const lastNames = ["Johnson", "Chen", "Williams", "Brown", "Davis", "Miller", "Wilson", "Taylor"]
    
    setFormData({
      firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
      lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
      email: `eng.${Math.random().toString(36).substring(2, 8)}@techcompany.com`,
      employeeId: `ENG${Math.floor(Math.random() * 9000) + 1000}`,
      department: departments[Math.floor(Math.random() * departments.length)],
      specialization: specializations[Math.floor(Math.random() * specializations.length)],
      engineeringType: engineeringTypes[Math.floor(Math.random() * engineeringTypes.length)],
      yearsOfExperience: (Math.floor(Math.random() * 20) + 1).toString(),
      salary: (Math.floor(Math.random() * 120000) + 70000).toString(),
      isActive: true
    })
  }

  const handleAddNew = () => {
    setEditingEngineer(null)
    resetForm()
    setIsAddDialogOpen(true)
  }

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "First Name,Last Name,Email,Employee ID,Department,Specialization,Engineering Type,Years of Experience,Salary,Status\n" +
      engineers.map(e => 
        `${e.firstName},${e.lastName},${e.email},${e.employeeId},${e.department},${e.specialization},${e.engineeringType},${e.yearsOfExperience || ''},${e.salary || ''},${e.isActive ? 'Active' : 'Inactive'}`
      ).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "engineers.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-600">Please sign in to access this page.</p>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Engineers Management</h1>
            <p className="text-gray-600">Manage your engineering staff and their information</p>
          </div>
          <Button onClick={handleAddNew} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Engineer
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Engineers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{engineers.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Engineers</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{engineers.filter(e => e.isActive).length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Departments</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Set(engineers.map(e => e.department)).size}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engineering Types</CardTitle>
              <Cpu className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Set(engineers.map(e => e.engineeringType)).size}</div>
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Engineers Directory</CardTitle>
            <CardDescription>A comprehensive list of all engineering staff</CardDescription>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="text-center py-8">
                <div className="text-red-600 mb-4">
                  <h3 className="text-lg font-semibold">Error Loading Data</h3>
                  <p>{error}</p>
                </div>
                <Button onClick={fetchEngineers} variant="outline">
                  Retry
                </Button>
              </div>
            ) : (
              <DataTable
                data={engineers}
                columns={columns}
                isLoading={loading}
                onEdit={handleEdit}
                onDelete={async (id) => {
                  try {
                    await fetch(`/api/engineers/${id}`, { 
                      method: 'DELETE',
                      credentials: 'include'
                    })
                    fetchEngineers()
                  } catch (error) {
                    console.error('Error deleting engineer:', error)
                  }
                }}
                searchPlaceholder="Search engineers..."
                exportData={exportData}
              />
            )}
          </CardContent>
        </Card>

        {/* Add/Edit Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingEngineer ? 'Edit Engineer' : 'Add New Engineer'}
              </DialogTitle>
              <DialogDescription>
                {editingEngineer ? 'Update engineer information' : 'Add a new engineer to the system'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Authentication Status */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">
                  <strong>Authentication Status:</strong> {session ? `✅ Authenticated as ${session.user?.email || 'User'}` : '❌ Not authenticated'}
                </div>
                {!session && (
                  <div className="text-xs text-red-600 mt-1">
                    You must be signed in to create or edit engineers.
                  </div>
                )}
              </div>
              
              {/* Fill Dummy Data Button */}
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={fillDummyData}
                  className="flex items-center gap-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                >
                  <Zap className="h-4 w-4" />
                  Fill Dummy Data
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="employeeId">Employee ID *</Label>
                  <Input
                    id="employeeId"
                    value={formData.employeeId}
                    onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="department">Department *</Label>
                  <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Software">Software</SelectItem>
                      <SelectItem value="Hardware">Hardware</SelectItem>
                      <SelectItem value="Civil">Civil</SelectItem>
                      <SelectItem value="Mechanical">Mechanical</SelectItem>
                      <SelectItem value="Electrical">Electrical</SelectItem>
                      <SelectItem value="Chemical">Chemical</SelectItem>
                      <SelectItem value="Biomedical">Biomedical</SelectItem>
                      <SelectItem value="Industrial">Industrial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="specialization">Specialization *</Label>
                  <Input
                    id="specialization"
                    value={formData.specialization}
                    onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                    required
                    placeholder="e.g., Full Stack Development"
                  />
                </div>
                <div>
                  <Label htmlFor="engineeringType">Engineering Type *</Label>
                  <Select value={formData.engineeringType} onValueChange={(value) => setFormData({...formData, engineeringType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Software">Software</SelectItem>
                      <SelectItem value="Hardware">Hardware</SelectItem>
                      <SelectItem value="Civil">Civil</SelectItem>
                      <SelectItem value="Mechanical">Mechanical</SelectItem>
                      <SelectItem value="Electrical">Electrical</SelectItem>
                      <SelectItem value="Chemical">Chemical</SelectItem>
                      <SelectItem value="Biomedical">Biomedical</SelectItem>
                      <SelectItem value="Industrial">Industrial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                  <Input
                    id="yearsOfExperience"
                    type="number"
                    value={formData.yearsOfExperience}
                    onChange={(e) => setFormData({...formData, yearsOfExperience: e.target.value})}
                    min="0"
                    max="50"
                  />
                </div>
                <div>
                  <Label htmlFor="salary">Salary</Label>
                  <Input
                    id="salary"
                    type="number"
                    value={formData.salary}
                    onChange={(e) => setFormData({...formData, salary: e.target.value})}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <Label htmlFor="isActive">Status</Label>
                  <Select value={formData.isActive ? "true" : "false"} onValueChange={(value) => setFormData({...formData, isActive: value === "true"})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Active</SelectItem>
                      <SelectItem value="false">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={!session}>
                  {editingEngineer ? 'Update Engineer' : 'Add Engineer'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </ErrorBoundary>
  )
}
