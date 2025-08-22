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
  Gavel
} from "lucide-react"
import { ErrorBoundary } from "@/components/error-boundary"
import { EnhancedDataTable } from "@/components/data-table/enhanced-data-table"
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
}

export default function LawyersPage() {
  const { data: session } = useSession()
  const [lawyers, setLawyers] = useState<Lawyer[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingLawyer, setEditingLawyer] = useState<Lawyer | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    employeeId: "",
    department: "",
    practiceArea: "",
    barNumber: "",
    yearsOfExperience: "",
    salary: "",
    lawSchool: "",
    graduationYear: "",
    barAdmissions: "",
    specializations: "",
    caseSuccessRate: "",
    clientSatisfaction: "",
    averageCaseDuration: "",
    courtExperience: "",
    languages: ""
  })

  useEffect(() => {
    fetchLawyers()
  }, [])

  const fetchLawyers = async () => {
    try {
      const response = await fetch('/api/lawyers')
      if (response.ok) {
        const data = await response.json()
        setLawyers(data)
      }
    } catch (error) {
      console.error('Error fetching lawyers:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingLawyer ? `/api/lawyers/${editingLawyer.id}` : '/api/lawyers'
      const method = editingLawyer ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setIsAddDialogOpen(false)
        setEditingLawyer(null)
        resetForm()
        fetchLawyers()
      }
    } catch (error) {
      console.error('Error saving lawyer:', error)
    }
  }

  const handleEdit = (lawyer: Lawyer) => {
    setEditingLawyer(lawyer)
    setFormData({
      firstName: lawyer.firstName,
      lastName: lawyer.lastName,
      email: lawyer.email,
      phone: lawyer.phone || "",
      employeeId: "",
      department: lawyer.department,
      practiceArea: lawyer.practiceArea,
      barNumber: lawyer.barNumber,
      yearsOfExperience: lawyer.yearsOfExperience?.toString() || "",
      salary: lawyer.salary?.toString() || "",
      lawSchool: "",
      graduationYear: "",
      barAdmissions: "",
      specializations: "",
      caseSuccessRate: lawyer.caseSuccessRate?.toString() || "",
      clientSatisfaction: lawyer.clientSatisfaction?.toString() || "",
      averageCaseDuration: lawyer.averageCaseDuration?.toString() || "",
      courtExperience: "",
      languages: ""
    })
    setIsAddDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      employeeId: "",
      department: "",
      practiceArea: "",
      barNumber: "",
      yearsOfExperience: "",
      salary: "",
      lawSchool: "",
      graduationYear: "",
      barAdmissions: "",
      specializations: "",
      caseSuccessRate: "",
      clientSatisfaction: "",
      averageCaseDuration: "",
      courtExperience: "",
      languages: ""
    })
  }

  const handleAddNew = () => {
    setEditingLawyer(null)
    resetForm()
    setIsAddDialogOpen(true)
  }

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "First Name,Last Name,Email,Phone,Department,Practice Area,Bar Number,Years of Experience,Salary,Case Success Rate,Client Satisfaction,Average Case Duration\n" +
      lawyers.map(l => 
        `${l.firstName},${l.lastName},${l.email},${l.phone || ''},${l.department},${l.practiceArea},${l.barNumber},${l.yearsOfExperience || ''},${l.salary || ''},${l.caseSuccessRate || ''},${l.clientSatisfaction || ''},${l.averageCaseDuration || ''}`
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
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Users className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Lawyers</p>
                  <p className="text-2xl font-bold text-gray-900">{lawyers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <UserCheck className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Lawyers</p>
                  <p className="text-2xl font-bold text-gray-900">{lawyers.filter(l => l.isActive).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Star className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {lawyers.length > 0 
                      ? (lawyers.reduce((sum, l) => sum + (l.caseSuccessRate || 0), 0) / lawyers.length).toFixed(1)
                      : '0'
                    }%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Scale className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Practice Areas</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(lawyers.map(l => l.practiceArea)).size}
                  </p>
                </div>
              </div>
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
            <EnhancedDataTable
              data={lawyers}
              columns={columns}
              loading={loading}
              onEdit={handleEdit}
              onDelete={async (id) => {
                try {
                  await fetch(`/api/lawyers/${id}`, { method: 'DELETE' })
                  fetchLawyers()
                } catch (error) {
                  console.error('Error deleting lawyer:', error)
                }
              }}
              searchPlaceholder="Search lawyers..."
              exportData={exportData}
            />
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
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
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
                  <Label htmlFor="caseSuccessRate">Case Success Rate (%)</Label>
                  <Input
                    id="caseSuccessRate"
                    type="number"
                    value={formData.caseSuccessRate}
                    onChange={(e) => setFormData({...formData, caseSuccessRate: e.target.value})}
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </div>
                <div>
                  <Label htmlFor="clientSatisfaction">Client Satisfaction (1-10)</Label>
                  <Input
                    id="clientSatisfaction"
                    type="number"
                    value={formData.clientSatisfaction}
                    onChange={(e) => setFormData({...formData, clientSatisfaction: e.target.value})}
                    min="1"
                    max="10"
                    step="0.1"
                  />
                </div>
                <div>
                  <Label htmlFor="averageCaseDuration">Average Case Duration (days)</Label>
                  <Input
                    id="averageCaseDuration"
                    type="number"
                    value={formData.averageCaseDuration}
                    onChange={(e) => setFormData({...formData, averageCaseDuration: e.target.value})}
                    min="0"
                    step="1"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="lawSchool">Law School</Label>
                <Input
                  id="lawSchool"
                  value={formData.lawSchool}
                  onChange={(e) => setFormData({...formData, lawSchool: e.target.value})}
                  placeholder="Law school name"
                />
                
                <Label htmlFor="graduationYear">Graduation Year</Label>
                <Input
                  id="graduationYear"
                  type="number"
                  value={formData.graduationYear}
                  onChange={(e) => setFormData({...formData, graduationYear: e.target.value})}
                  min="1950"
                  max={new Date().getFullYear()}
                />
                
                <Label htmlFor="barAdmissions">Bar Admissions (comma-separated)</Label>
                <Input
                  id="barAdmissions"
                  value={formData.barAdmissions}
                  onChange={(e) => setFormData({...formData, barAdmissions: e.target.value})}
                  placeholder="e.g., California, New York, Federal"
                />
                
                <Label htmlFor="specializations">Specializations (comma-separated)</Label>
                <Input
                  id="specializations"
                  value={formData.specializations}
                  onChange={(e) => setFormData({...formData, specializations: e.target.value})}
                  placeholder="e.g., Securities Law, International Arbitration"
                />
                
                <Label htmlFor="courtExperience">Court Experience (comma-separated)</Label>
                <Input
                  id="courtExperience"
                  value={formData.courtExperience}
                  onChange={(e) => setFormData({...formData, courtExperience: e.target.value})}
                  placeholder="e.g., Federal Court, State Court, Appellate"
                />
                
                <Label htmlFor="languages">Languages Spoken (comma-separated)</Label>
                <Input
                  id="languages"
                  value={formData.languages}
                  onChange={(e) => setFormData({...formData, languages: e.target.value})}
                  placeholder="e.g., English, Spanish, French"
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
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
