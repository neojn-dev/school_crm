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
  Award,
  Star,
  UserCheck,
  Building,
  Scale,
  Gavel,
  CheckCircle,
  Zap
} from "lucide-react"
import { ErrorBoundary } from "@/components/error-boundary"
import { DataTable } from "@/components/data-table/data-table"
import { columns } from "./columns"

interface Lawyer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  department: string
  practiceArea: string
  barNumber: string
  yearsOfExperience?: number
  salary?: number
  isActive: boolean
  caseSuccessRate?: number
  clientSatisfaction?: number
  averageCaseDuration?: number
  createdAt: string
  employeeId: string
}

export default function LawyersPage() {
  const { data: session, status } = useSession()
  const [lawyers, setLawyers] = useState<Lawyer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingLawyer, setEditingLawyer] = useState<Lawyer | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    employeeId: "",
    department: "",
    practiceArea: "",
    barNumber: "",
    yearsOfExperience: "",
    salary: "",
    isActive: true
  })

  useEffect(() => {
    if (status === 'authenticated') {
      fetchLawyers()
    } else if (status === 'unauthenticated') {
      setLoading(false)
    }
  }, [status])

  const fetchLawyers = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/lawyers', {
        credentials: 'include'
      })
      
      if (response.ok) {
        const data = await response.json()
        if (Array.isArray(data)) {
          setLawyers(data)
        } else {
          console.error('❌ [ERROR] Lawyers - API returned non-array data:', data)
          setError('Invalid data format received from API')
          setLawyers([])
        }
      } else {
        const errorText = await response.text()
        console.error('❌ [ERROR] Lawyers - API request failed:', response.status, errorText)
        setError(`API request failed: ${response.status} - ${errorText}`)
        setLawyers([])
      }
    } catch (error) {
      console.error('❌ [ERROR] Lawyers - Error fetching lawyers:', error)
      setError(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setLawyers([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log('🔍 [FORM DEBUG] Submitting lawyer form with data:', formData)
    console.log('🔍 [FORM DEBUG] Current session:', session)
    
    try {
      const url = editingLawyer ? `/api/lawyers/${editingLawyer.id}` : '/api/lawyers'
      const method = editingLawyer ? 'PUT' : 'POST'
      
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
        setEditingLawyer(null)
        resetForm()
        fetchLawyers()
        alert(editingLawyer ? 'Lawyer updated successfully!' : 'Lawyer added successfully!')
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        console.error('❌ [FORM ERROR] API error:', errorData)
        alert(`Error: ${errorData.error || 'Failed to save lawyer'}`)
      }
    } catch (error) {
      console.error('❌ [FORM ERROR] Network error:', error)
      alert('Network error occurred. Please try again.')
    }
  }

  const handleEdit = (lawyer: Lawyer) => {
    setEditingLawyer(lawyer)
    setFormData({
      firstName: lawyer.firstName,
      lastName: lawyer.lastName,
      email: lawyer.email,
      employeeId: lawyer.employeeId,
      department: lawyer.department,
      practiceArea: lawyer.practiceArea,
      barNumber: lawyer.barNumber,
      yearsOfExperience: lawyer.yearsOfExperience?.toString() || "",
      salary: lawyer.salary?.toString() || "",
      isActive: lawyer.isActive
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
      practiceArea: "",
      barNumber: "",
      yearsOfExperience: "",
      salary: "",
      isActive: true
    })
  }

  const fillDummyData = () => {
    const departments = ["Corporate Law", "Criminal Law", "Family Law", "Real Estate Law", "Intellectual Property", "Tax Law", "Employment Law", "Environmental Law"]
    const practiceAreas = [
      "Mergers & Acquisitions", "Criminal Defense", "Family Mediation", "Property Transactions",
      "Patent Law", "Tax Planning", "Labor Disputes", "Environmental Compliance"
    ]
    const firstNames = ["Atty. Sarah", "Atty. Michael", "Atty. Emily", "Atty. David", "Atty. Jennifer", "Atty. Robert", "Atty. Lisa", "Atty. James"]
    const lastNames = ["Johnson", "Chen", "Williams", "Brown", "Davis", "Miller", "Wilson", "Taylor"]
    
    setFormData({
      firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
      lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
      email: `atty.${Math.random().toString(36).substring(2, 8)}@lawfirm.com`,
      employeeId: `LAW${Math.floor(Math.random() * 9000) + 1000}`,
      department: departments[Math.floor(Math.random() * departments.length)],
      practiceArea: practiceAreas[Math.floor(Math.random() * practiceAreas.length)],
      barNumber: `BAR${Math.floor(Math.random() * 900000) + 100000}`,
      yearsOfExperience: (Math.floor(Math.random() * 25) + 1).toString(),
      salary: (Math.floor(Math.random() * 180000) + 100000).toString(),
      isActive: true
    })
  }

  const handleAddNew = () => {
    setEditingLawyer(null)
    resetForm()
    setIsAddDialogOpen(true)
  }

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "First Name,Last Name,Email,Employee ID,Department,Practice Area,Bar Number,Years of Experience,Salary,Status\n" +
      lawyers.map(l => 
        `${l.firstName},${l.lastName},${l.email},${l.employeeId},${l.department},${l.practiceArea},${l.barNumber},${l.yearsOfExperience || ''},${l.salary || ''},${l.isActive ? 'Active' : 'Inactive'}`
      ).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "lawyers.csv")
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
            <h1 className="text-3xl font-bold text-gray-900">Lawyers Management</h1>
            <p className="text-gray-600">Manage your legal staff and their information</p>
          </div>
          <Button onClick={handleAddNew} className="bg-indigo-600 hover:bg-indigo-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Lawyer
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Lawyers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lawyers.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Lawyers</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lawyers.filter(l => l.isActive).length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Departments</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Set(lawyers.map(l => l.department)).size}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Practice Areas</CardTitle>
              <Gavel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Set(lawyers.map(l => l.practiceArea)).size}</div>
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Lawyers Directory</CardTitle>
            <CardDescription>A comprehensive list of all legal staff</CardDescription>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="text-center py-8">
                <div className="text-red-600 mb-4">
                  <h3 className="text-lg font-semibold">Error Loading Data</h3>
                  <p>{error}</p>
                </div>
                <Button onClick={fetchLawyers} variant="outline">
                  Retry
                </Button>
              </div>
            ) : (
              <DataTable
                data={lawyers}
                columns={columns}
                isLoading={loading}
                onEdit={handleEdit}
                onDelete={async (id) => {
                  try {
                    await fetch(`/api/lawyers/${id}`, { 
                      method: 'DELETE',
                      credentials: 'include'
                    })
                    fetchLawyers()
                  } catch (error) {
                    console.error('Error deleting lawyer:', error)
                  }
                }}
                searchPlaceholder="Search lawyers..."
                exportData={exportData}
                meta={{ onEdit: handleEdit, onDelete: async (id) => {
                  try {
                    await fetch(`/api/lawyers/${id}`, { 
                      method: 'DELETE',
                      credentials: 'include'
                    })
                    fetchLawyers()
                  } catch (error) {
                    console.error('Error deleting lawyer:', error)
                  }
                }}}
              />
            )}
          </CardContent>
        </Card>

        {/* Add/Edit Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingLawyer ? 'Edit Lawyer' : 'Add New Lawyer'}
              </DialogTitle>
              <DialogDescription>
                {editingLawyer ? 'Update lawyer information' : 'Add a new lawyer to the system'}
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
                    You must be signed in to create or edit lawyers.
                  </div>
                )}
              </div>
              
              {/* Fill Dummy Data Button */}
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={fillDummyData}
                  className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
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
                      <SelectItem value="Corporate Law">Corporate Law</SelectItem>
                      <SelectItem value="Criminal Law">Criminal Law</SelectItem>
                      <SelectItem value="Family Law">Family Law</SelectItem>
                      <SelectItem value="Real Estate Law">Real Estate Law</SelectItem>
                      <SelectItem value="Intellectual Property">Intellectual Property</SelectItem>
                      <SelectItem value="Tax Law">Tax Law</SelectItem>
                      <SelectItem value="Employment Law">Employment Law</SelectItem>
                      <SelectItem value="Environmental Law">Environmental Law</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="practiceArea">Practice Area *</Label>
                  <Input
                    id="practiceArea"
                    value={formData.practiceArea}
                    onChange={(e) => setFormData({...formData, practiceArea: e.target.value})}
                    required
                    placeholder="e.g., Mergers & Acquisitions"
                  />
                </div>
                <div>
                  <Label htmlFor="barNumber">Bar Number *</Label>
                  <Input
                    id="barNumber"
                    value={formData.barNumber}
                    onChange={(e) => setFormData({...formData, barNumber: e.target.value})}
                    required
                  />
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
                  {editingLawyer ? 'Update Lawyer' : 'Add Lawyer'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </ErrorBoundary>
  )
}
