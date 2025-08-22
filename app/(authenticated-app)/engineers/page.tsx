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
  Cpu
} from "lucide-react"
import { ErrorBoundary } from "@/components/error-boundary"
import { EnhancedDataTable } from "@/components/data-table/enhanced-data-table"
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
}

export default function EngineersPage() {
  const { data: session } = useSession()
  const [engineers, setEngineers] = useState<Engineer[]>([])
  const [loading, setLoading] = useState(true)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingEngineer, setEditingEngineer] = useState<Engineer | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    employeeId: "",
    department: "",
    specialization: "",
    engineeringType: "",
    yearsOfExperience: "",
    salary: "",
    projectSuccessRate: "",
    codeQuality: "",
    innovationScore: "",
    programmingLanguages: "",
    frameworks: "",
    tools: ""
  })

  useEffect(() => {
    fetchEngineers()
  }, [])

  const fetchEngineers = async () => {
    try {
      const response = await fetch('/api/engineers')
      if (response.ok) {
        const data = await response.json()
        setEngineers(data)
      }
    } catch (error) {
      console.error('Error fetching engineers:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingEngineer ? `/api/engineers/${editingEngineer.id}` : '/api/engineers'
      const method = editingEngineer ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setIsAddDialogOpen(false)
        setEditingEngineer(null)
        resetForm()
        fetchEngineers()
      }
    } catch (error) {
      console.error('Error saving engineer:', error)
    }
  }

  const handleEdit = (engineer: Engineer) => {
    setEditingEngineer(engineer)
    setFormData({
      firstName: engineer.firstName,
      lastName: engineer.lastName,
      email: engineer.email,
      phone: engineer.phone || "",
      employeeId: "",
      department: engineer.department,
      specialization: engineer.specialization,
      engineeringType: engineer.engineeringType,
      yearsOfExperience: engineer.yearsOfExperience?.toString() || "",
      salary: engineer.salary?.toString() || "",
      projectSuccessRate: engineer.projectSuccessRate?.toString() || "",
      codeQuality: engineer.codeQuality?.toString() || "",
      innovationScore: engineer.innovationScore?.toString() || "",
      programmingLanguages: "",
      frameworks: "",
      tools: ""
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
      specialization: "",
      engineeringType: "",
      yearsOfExperience: "",
      salary: "",
      projectSuccessRate: "",
      codeQuality: "",
      innovationScore: "",
      programmingLanguages: "",
      frameworks: "",
      tools: ""
    })
  }

  const handleAddNew = () => {
    setEditingEngineer(null)
    resetForm()
    setIsAddDialogOpen(true)
  }

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "First Name,Last Name,Email,Phone,Department,Specialization,Engineering Type,Years of Experience,Salary,Project Success Rate,Code Quality,Innovation Score\n" +
      engineers.map(e => 
        `${e.firstName},${e.lastName},${e.email},${e.phone || ''},${e.department},${e.specialization},${e.engineeringType},${e.yearsOfExperience || ''},${e.salary || ''},${e.projectSuccessRate || ''},${e.codeQuality || ''},${e.innovationScore || ''}`
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
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Engineers</p>
                  <p className="text-2xl font-bold text-gray-900">{engineers.length}</p>
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
                  <p className="text-sm font-medium text-gray-600">Active Engineers</p>
                  <p className="text-2xl font-bold text-gray-900">{engineers.filter(e => e.isActive).length}</p>
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
                    {engineers.length > 0 
                      ? (engineers.reduce((sum, e) => sum + (e.projectSuccessRate || 0), 0) / engineers.length).toFixed(1)
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
                  <Zap className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Engineering Types</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {new Set(engineers.map(e => e.engineeringType)).size}
                  </p>
                </div>
              </div>
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
            <EnhancedDataTable
              data={engineers}
              columns={columns}
              loading={loading}
              onEdit={handleEdit}
              onDelete={async (id) => {
                try {
                  await fetch(`/api/engineers/${id}`, { method: 'DELETE' })
                  fetchEngineers()
                } catch (error) {
                  console.error('Error deleting engineer:', error)
                }
              }}
              searchPlaceholder="Search engineers..."
              exportData={exportData}
            />
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
                      <SelectItem value="Software Engineering">Software Engineering</SelectItem>
                      <SelectItem value="Hardware Engineering">Hardware Engineering</SelectItem>
                      <SelectItem value="Systems Engineering">Systems Engineering</SelectItem>
                      <SelectItem value="Data Engineering">Data Engineering</SelectItem>
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
                      <SelectValue placeholder="Select engineering type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Software">Software</SelectItem>
                      <SelectItem value="Hardware">Hardware</SelectItem>
                      <SelectItem value="Electrical">Electrical</SelectItem>
                      <SelectItem value="Mechanical">Mechanical</SelectItem>
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
                  <Label htmlFor="projectSuccessRate">Project Success Rate (%)</Label>
                  <Input
                    id="projectSuccessRate"
                    type="number"
                    value={formData.projectSuccessRate}
                    onChange={(e) => setFormData({...formData, projectSuccessRate: e.target.value})}
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </div>
                <div>
                  <Label htmlFor="codeQuality">Code Quality Score (1-10)</Label>
                  <Input
                    id="codeQuality"
                    type="number"
                    value={formData.codeQuality}
                    onChange={(e) => setFormData({...formData, codeQuality: e.target.value})}
                    min="1"
                    max="10"
                    step="0.1"
                  />
                </div>
                <div>
                  <Label htmlFor="innovationScore">Innovation Score (1-10)</Label>
                  <Input
                    id="innovationScore"
                    type="number"
                    value={formData.innovationScore}
                    onChange={(e) => setFormData({...formData, innovationScore: e.target.value})}
                    min="1"
                    max="10"
                    step="0.1"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="programmingLanguages">Programming Languages (comma-separated)</Label>
                <Input
                  id="programmingLanguages"
                  value={formData.programmingLanguages}
                  onChange={(e) => setFormData({...formData, programmingLanguages: e.target.value})}
                  placeholder="e.g., Python, JavaScript, Java"
                />
                
                <Label htmlFor="frameworks">Frameworks & Libraries (comma-separated)</Label>
                <Input
                  id="frameworks"
                  value={formData.frameworks}
                  onChange={(e) => setFormData({...formData, frameworks: e.target.value})}
                  placeholder="e.g., React, Node.js, Django"
                />
                
                <Label htmlFor="tools">Tools & Technologies (comma-separated)</Label>
                <Input
                  id="tools"
                  value={formData.tools}
                  onChange={(e) => setFormData({...formData, tools: e.target.value})}
                  placeholder="e.g., Git, Docker, AWS"
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
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
