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
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { 
  Plus, 
  Database,
  CheckCircle,
  Building,
  Layers,
  Zap,
  Calendar,
  Hash,
  Type,
  Mail,
  Phone,
  Link,
  Search,
  FileText,
  Palette,
  Star,
  Tag,
  Settings,
  Eye,
  Edit,
  Trash2
} from "lucide-react"
import { ErrorBoundary } from "@/components/error-boundary"
import { DataTable } from "@/components/data-table/data-table"
import { columns, MasterData } from "./columns"
import { toast } from "@/components/ui/toast-container"
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog"

export default function MasterDataPage() {
  const { data: session, status } = useSession()
  const [masterData, setMasterData] = useState<MasterData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingMasterData, setEditingMasterData] = useState<MasterData | null>(null)
  const [viewingMasterData, setViewingMasterData] = useState<MasterData | null>(null)
  const [formData, setFormData] = useState({
    // Basic Information
    title: "",
    description: "",
    category: "Basic" as "Basic" | "Advanced" | "Specialized",
    isActive: true,
    sortOrder: 0,
    
    // Text Fields
    textField: "",
    emailField: "",
    phoneField: "",
    urlField: "",
    searchField: "",
    textareaField: "",
    richTextField: "",
    
    // Numeric Fields
    numberField: "",
    integerField: "",
    rangeField: 50,
    sliderValue: 50,
    
    // Date & Time Fields
    dateField: "",
    timeField: "",
    dateTimeField: "",
    monthField: "",
    weekField: "",
    
    // Selection Fields
    singleSelect: "",
    multiSelect: [] as string[],
    radioSelection: "",
    checkboxGroup: [] as string[],
    
    // Boolean Fields
    switchField: false,
    checkboxField: false,
    
    // File & Media Fields
    filePath: "",
    imagePath: "",
    documentPath: "",
    
    // Special Fields
    colorField: "#3B82F6",
    ratingField: 3,
    tagsField: [] as string[],
    
    // Advanced Fields
    autocompleteField: "",
    comboboxField: "",
    multiInputField: [] as string[],
    
    // Required Fields
    fieldType: "input",
    
    // Additional fields
    isRequired: false,
    minLength: "",
    maxLength: "",
    minValue: "",
    maxValue: "",
    pattern: "",
    placeholder: "",
    helpText: "",
    inputMode: "",
    step: "",
    multiple: false,
    dependsOn: "",
    condition: "",
    isVisible: true,
    isDisabled: false,
    fieldSize: "",
    fieldWidth: "",
    cssClass: "",
  })
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ open: boolean; masterData: MasterData | null }>({ open: false, masterData: null })

  // Tag management
  const [currentTag, setCurrentTag] = useState("")
  const [currentMultiInput, setCurrentMultiInput] = useState("")

  useEffect(() => {
    if (status === 'authenticated') {
      fetchMasterData()
    } else if (status === 'unauthenticated') {
      setLoading(false)
    }
  }, [status])

  const fetchMasterData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/master-data', {
        credentials: 'include'
      })
      
      if (response.ok) {
        const responseData = await response.json()
        const data: MasterData[] = responseData.data || responseData
        
        if (Array.isArray(data)) {
          setMasterData(data)
        } else {
          setError('Invalid data format received from API')
          setMasterData([])
        }
      } else {
        const errorText = await response.text()
        setError(`API request failed: ${response.status} - ${errorText}`)
        setMasterData([])
      }
    } catch (error) {
      setError(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setMasterData([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingMasterData ? `/api/master-data/${editingMasterData.id}` : '/api/master-data'
      const method = editingMasterData ? 'PUT' : 'POST'
      
      // Prepare data for submission
      const submitData = {
        ...formData,
        // Convert string numbers to actual numbers
        numberField: formData.numberField ? parseFloat(formData.numberField) : undefined,
        integerField: formData.integerField ? parseInt(formData.integerField) : undefined,
        ratingField: formData.ratingField,
        sliderValue: formData.sliderValue,
        rangeField: formData.rangeField,
        // Convert string numbers for validation fields
        minLength: formData.minLength ? parseInt(formData.minLength) : undefined,
        maxLength: formData.maxLength ? parseInt(formData.maxLength) : undefined,
        minValue: formData.minValue ? parseFloat(formData.minValue) : undefined,
        maxValue: formData.maxValue ? parseFloat(formData.maxValue) : undefined,
        step: formData.step ? parseFloat(formData.step) : undefined,
        // Convert date strings to Date objects
        dateField: formData.dateField ? new Date(formData.dateField) : undefined,
        dateTimeField: formData.dateTimeField ? new Date(formData.dateTimeField) : undefined,
        // Remove empty strings
        ...Object.fromEntries(
          Object.entries(formData).map(([key, value]) => [
            key, 
            value === "" ? undefined : value
          ])
        )
      }
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(submitData)
      })
      
      if (response.ok) {
        setIsAddDialogOpen(false)
        setEditingMasterData(null)
        resetForm()
        await fetchMasterData()
        toast.success(editingMasterData ? 'Master data updated successfully!' : 'Master data added successfully!')
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        console.error('❌ [FORM ERROR] API error:', errorData)
        toast.error(`Error: ${errorData.error || 'Failed to save master data'}`)
      }
    } catch (error) {
      console.error('❌ [FORM ERROR] Network error:', error)
      toast.error('Network error occurred. Please try again.')
    }
  }

  const handleView = (id: string) => {
    const data = masterData.find(d => d.id === id)
    if (data) {
      setViewingMasterData(data)
    }
  }

  const handleDelete = (id: string) => {
    const data = masterData.find(d => d.id === id)
    if (data) {
      setDeleteConfirmation({ open: true, masterData: data })
    }
  }

  const confirmDelete = async () => {
    if (!deleteConfirmation.masterData) return
    
    try {
      const response = await fetch(`/api/master-data/${deleteConfirmation.masterData.id}`, { 
        method: 'DELETE',
        credentials: 'include'
      })
      
      if (response.ok) {
        await fetchMasterData()
        toast.error('Master data deleted successfully!', {
          style: {
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626'
          }
        })
      } else {
        toast.error('Failed to delete master data')
      }
    } catch (error) {
      console.error('Error deleting master data:', error)
      toast.error('Failed to delete master data')
    } finally {
      setDeleteConfirmation({ open: false, masterData: null })
    }
  }

  const handleEdit = (id: string) => {
    const data = masterData.find(d => d.id === id)
    if (data) {
      setEditingMasterData(data)
      setFormData({
        title: data.title,
        description: data.description || "",
        category: data.category,
        isActive: data.isActive,
        sortOrder: data.sortOrder,
        textField: data.textField || "",
        emailField: data.emailField || "",
        phoneField: data.phoneField || "",
        urlField: data.urlField || "",
        searchField: data.searchField || "",
        textareaField: data.textareaField || "",
        richTextField: data.richTextField || "",
        numberField: data.numberField?.toString() || "",
        integerField: data.integerField?.toString() || "",
        rangeField: data.rangeField || 50,
        sliderValue: data.sliderValue || 50,
        dateField: data.dateField ? new Date(data.dateField).toISOString().split('T')[0] : "",
        timeField: data.timeField || "",
        dateTimeField: data.dateTimeField ? new Date(data.dateTimeField).toISOString().slice(0, 16) : "",
        monthField: data.monthField || "",
        weekField: data.weekField || "",
        singleSelect: data.singleSelect || "",
        multiSelect: data.multiSelect ? (typeof data.multiSelect === 'string' ? JSON.parse(data.multiSelect) : data.multiSelect) : [],
        radioSelection: data.radioSelection || "",
        checkboxGroup: data.checkboxGroup ? (typeof data.checkboxGroup === 'string' ? JSON.parse(data.checkboxGroup) : data.checkboxGroup) : [],
        switchField: data.switchField || false,
        checkboxField: data.checkboxField || false,
        filePath: data.filePath || "",
        imagePath: data.imagePath || "",
        documentPath: data.documentPath || "",
        colorField: data.colorField || "#3B82F6",
        ratingField: data.ratingField || 3,
        tagsField: data.tagsField ? (typeof data.tagsField === 'string' ? JSON.parse(data.tagsField) : data.tagsField) : [],
        autocompleteField: data.autocompleteField || "",
        comboboxField: data.comboboxField || "",
        multiInputField: data.multiInputField ? (typeof data.multiInputField === 'string' ? JSON.parse(data.multiInputField) : data.multiInputField) : [],
        fieldType: data.fieldType,
        isRequired: data.isRequired || false,
        minLength: data.minLength?.toString() || "",
        maxLength: data.maxLength?.toString() || "",
        minValue: data.minValue?.toString() || "",
        maxValue: data.maxValue?.toString() || "",
        pattern: data.pattern || "",
        placeholder: data.placeholder || "",
        helpText: data.helpText || "",
        inputMode: data.inputMode || "",
        step: data.step?.toString() || "",
        multiple: data.multiple || false,
        dependsOn: data.dependsOn || "",
        condition: data.condition || "",
        isVisible: data.isVisible !== false,
        isDisabled: data.isDisabled || false,
        fieldSize: data.fieldSize || "",
        fieldWidth: data.fieldWidth || "",
        cssClass: data.cssClass || "",
      })
      setIsAddDialogOpen(true)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "Basic",
      isActive: true,
      sortOrder: 0,
      textField: "",
      emailField: "",
      phoneField: "",
      urlField: "",
      searchField: "",
      textareaField: "",
      richTextField: "",
      numberField: "",
      integerField: "",
      rangeField: 50,
      sliderValue: 50,
      dateField: "",
      timeField: "",
      dateTimeField: "",
      monthField: "",
      weekField: "",
      singleSelect: "",
      multiSelect: [],
      radioSelection: "",
      checkboxGroup: [],
      switchField: false,
      checkboxField: false,
      filePath: "",
      imagePath: "",
      documentPath: "",
      colorField: "#3B82F6",
      ratingField: 3,
      tagsField: [],
      autocompleteField: "",
      comboboxField: "",
      multiInputField: [],
      fieldType: "input",
      isRequired: false,
      minLength: "",
      maxLength: "",
      minValue: "",
      maxValue: "",
      pattern: "",
      placeholder: "",
      helpText: "",
      inputMode: "",
      step: "",
      multiple: false,
      dependsOn: "",
      condition: "",
      isVisible: true,
      isDisabled: false,
      fieldSize: "",
      fieldWidth: "",
      cssClass: "",
    })
    setCurrentTag("")
    setCurrentMultiInput("")
  }

  const fillDummyData = () => {
    const categories = ["Basic", "Advanced", "Specialized"] as const
    const fieldTypes = ["input", "select", "textarea", "checkbox", "radio", "file", "date", "number"]
    const colors = ["#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"]
    
    setFormData({
      title: `Sample Form Field ${Math.floor(Math.random() * 1000)}`,
      description: "This is a sample form field for demonstration purposes",
      category: categories[Math.floor(Math.random() * categories.length)],
      isActive: true,
      sortOrder: Math.floor(Math.random() * 100),
      textField: "Sample text input",
      emailField: `user${Math.floor(Math.random() * 1000)}@example.com`,
      phoneField: `+1-555-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      urlField: "https://example.com",
      searchField: "sample search query",
      textareaField: "This is a sample textarea content with multiple lines of text.",
      richTextField: "<p>This is <strong>rich text</strong> content with <em>formatting</em>.</p>",
      numberField: (Math.random() * 1000).toFixed(2),
      integerField: Math.floor(Math.random() * 100).toString(),
      rangeField: Math.floor(Math.random() * 100),
      sliderValue: Math.random() * 100,
      dateField: new Date().toISOString().split('T')[0],
      timeField: "14:30",
      dateTimeField: new Date().toISOString().slice(0, 16),
      monthField: "2024-01",
      weekField: "2024-W01",
      singleSelect: "option1",
      multiSelect: ["option1", "option2"],
      radioSelection: "choice1",
      checkboxGroup: ["item1", "item3"],
      switchField: Math.random() > 0.5,
      checkboxField: Math.random() > 0.5,
      filePath: "/uploads/sample-file.pdf",
      imagePath: "/uploads/sample-image.jpg",
      documentPath: "/uploads/sample-document.docx",
      colorField: colors[Math.floor(Math.random() * colors.length)],
      ratingField: Math.floor(Math.random() * 5) + 1,
      tagsField: ["tag1", "tag2", "sample"],
      autocompleteField: "autocomplete value",
      comboboxField: "combobox selection",
      multiInputField: ["input1", "input2"],
      fieldType: fieldTypes[Math.floor(Math.random() * fieldTypes.length)],
      isRequired: Math.random() > 0.5,
      minLength: "5",
      maxLength: "100",
      minValue: "0",
      maxValue: "1000",
      pattern: "^[A-Za-z0-9]+$",
      placeholder: "Enter your value here...",
      helpText: "This field helps you understand what to enter.",
      inputMode: "text",
      step: "0.01",
      multiple: Math.random() > 0.5,
      dependsOn: "otherField",
      condition: "equals:value",
      isVisible: true,
      isDisabled: false,
      fieldSize: "md",
      fieldWidth: "full",
      cssClass: "custom-field-class",
    })
  }

  const handleAddNew = () => {
    setEditingMasterData(null)
    resetForm()
    setIsAddDialogOpen(true)
  }

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Title,Description,Category,Field Type,Status,Created\n" +
      masterData.map(d => 
        `"${d.title}","${d.description || ''}","${d.category}","${d.fieldType}","${d.isActive ? 'Active' : 'Inactive'}","${new Date(d.createdAt).toLocaleDateString()}"`
      ).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "master-data.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Helper functions for array fields
  const addTag = () => {
    if (currentTag.trim() && !formData.tagsField.includes(currentTag.trim())) {
      setFormData({
        ...formData,
        tagsField: [...formData.tagsField, currentTag.trim()]
      })
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tagsField: formData.tagsField.filter(tag => tag !== tagToRemove)
    })
  }

  const addMultiInput = () => {
    if (currentMultiInput.trim() && !formData.multiInputField.includes(currentMultiInput.trim())) {
      setFormData({
        ...formData,
        multiInputField: [...formData.multiInputField, currentMultiInput.trim()]
      })
      setCurrentMultiInput("")
    }
  }

  const removeMultiInput = (inputToRemove: string) => {
    setFormData({
      ...formData,
      multiInputField: formData.multiInputField.filter(input => input !== inputToRemove)
    })
  }

  const toggleMultiSelect = (option: string) => {
    const newSelection = formData.multiSelect.includes(option)
      ? formData.multiSelect.filter(item => item !== option)
      : [...formData.multiSelect, option]
    
    setFormData({
      ...formData,
      multiSelect: newSelection
    })
  }

  const toggleCheckboxGroup = (option: string) => {
    const newSelection = formData.checkboxGroup.includes(option)
      ? formData.checkboxGroup.filter(item => item !== option)
      : [...formData.checkboxGroup, option]
    
    setFormData({
      ...formData,
      checkboxGroup: newSelection
    })
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
            <h1 className="text-3xl font-bold text-gray-900">Master Data Management</h1>
            <p className="text-gray-600">Manage comprehensive form field data with all input types</p>
          </div>
          <Button onClick={handleAddNew} className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Master Data
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Records</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{masterData.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Records</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{masterData.filter(d => d.isActive).length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Set(masterData.map(d => d.category)).size}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Field Types</CardTitle>
              <Layers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Set(masterData.map(d => d.fieldType)).size}</div>
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Master Data Directory</CardTitle>
            <CardDescription>A comprehensive list of all form field data with various input types</CardDescription>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="text-center py-8">
                <div className="text-red-600 mb-4">
                  <h3 className="text-lg font-semibold">Error Loading Data</h3>
                  <p>{error}</p>
                </div>
                <Button onClick={fetchMasterData} variant="outline">
                  Retry
                </Button>
              </div>
            ) : (
              <DataTable
                data={masterData}
                columns={columns}
                isLoading={loading}
                searchPlaceholder="Search master data..."
                exportData={exportData}
                meta={{ onView: handleView, onEdit: handleEdit, onDelete: handleDelete }}
              />
            )}
          </CardContent>
        </Card>

        {/* Add/Edit Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingMasterData ? 'Edit Master Data' : 'Add New Master Data'}
              </DialogTitle>
              <DialogDescription>
                {editingMasterData ? 'Update master data information' : 'Add a new master data entry with comprehensive form fields'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Authentication Status */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">
                  <strong>Authentication Status:</strong> {session ? `✅ Authenticated as ${session.user?.email || 'User'}` : '❌ Not authenticated'}
                </div>
              </div>
              
              {/* Fill Dummy Data Button */}
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={fillDummyData}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  <Zap className="h-4 w-4" />
                  Fill Dummy Data
                </Button>
              </div>
              
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="fieldType">Field Type *</Label>
                    <Select value={formData.fieldType} onValueChange={(value) => setFormData({...formData, fieldType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select field type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="input">Input</SelectItem>
                        <SelectItem value="textarea">Textarea</SelectItem>
                        <SelectItem value="select">Select</SelectItem>
                        <SelectItem value="checkbox">Checkbox</SelectItem>
                        <SelectItem value="radio">Radio</SelectItem>
                        <SelectItem value="file">File</SelectItem>
                        <SelectItem value="date">Date</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">Phone</SelectItem>
                        <SelectItem value="url">URL</SelectItem>
                        <SelectItem value="color">Color</SelectItem>
                        <SelectItem value="range">Range</SelectItem>
                        <SelectItem value="switch">Switch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value: "Basic" | "Advanced" | "Specialized") => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Basic">Basic</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                        <SelectItem value="Specialized">Specialized</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="sortOrder">Sort Order</Label>
                    <Input
                      id="sortOrder"
                      type="number"
                      value={formData.sortOrder}
                      onChange={(e) => setFormData({...formData, sortOrder: parseInt(e.target.value) || 0})}
                      min="0"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Describe this form field..."
                    />
                  </div>
                </div>
              </div>

              {/* Text Fields */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
                  <Type className="h-5 w-5" />
                  Text Fields
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="textField">Text Field</Label>
                    <Input
                      id="textField"
                      value={formData.textField}
                      onChange={(e) => setFormData({...formData, textField: e.target.value})}
                      placeholder="Sample text input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emailField">Email Field</Label>
                    <Input
                      id="emailField"
                      type="email"
                      value={formData.emailField}
                      onChange={(e) => setFormData({...formData, emailField: e.target.value})}
                      placeholder="user@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phoneField">Phone Field</Label>
                    <Input
                      id="phoneField"
                      value={formData.phoneField}
                      onChange={(e) => setFormData({...formData, phoneField: e.target.value})}
                      placeholder="+1-555-123-4567"
                    />
                  </div>
                  <div>
                    <Label htmlFor="urlField">URL Field</Label>
                    <Input
                      id="urlField"
                      type="url"
                      value={formData.urlField}
                      onChange={(e) => setFormData({...formData, urlField: e.target.value})}
                      placeholder="https://example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="searchField">Search Field</Label>
                    <Input
                      id="searchField"
                      value={formData.searchField}
                      onChange={(e) => setFormData({...formData, searchField: e.target.value})}
                      placeholder="Search query..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="autocompleteField">Autocomplete Field</Label>
                    <Input
                      id="autocompleteField"
                      value={formData.autocompleteField}
                      onChange={(e) => setFormData({...formData, autocompleteField: e.target.value})}
                      placeholder="Autocomplete value"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="textareaField">Textarea Field</Label>
                    <Textarea
                      id="textareaField"
                      value={formData.textareaField}
                      onChange={(e) => setFormData({...formData, textareaField: e.target.value})}
                      placeholder="Multi-line text content..."
                    />
                  </div>
                </div>
              </div>

              {/* Numeric Fields */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
                  <Hash className="h-5 w-5" />
                  Numeric Fields
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="numberField">Number Field</Label>
                    <Input
                      id="numberField"
                      type="number"
                      step="0.01"
                      value={formData.numberField}
                      onChange={(e) => setFormData({...formData, numberField: e.target.value})}
                      placeholder="123.45"
                    />
                  </div>
                  <div>
                    <Label htmlFor="integerField">Integer Field</Label>
                    <Input
                      id="integerField"
                      type="number"
                      value={formData.integerField}
                      onChange={(e) => setFormData({...formData, integerField: e.target.value})}
                      placeholder="123"
                    />
                  </div>
                  <div>
                    <Label htmlFor="rangeField">Range Field (0-100): {formData.rangeField}</Label>
                    <Slider
                      value={[formData.rangeField]}
                      onValueChange={(value) => setFormData({...formData, rangeField: value[0]})}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label htmlFor="sliderValue">Slider Value: {formData.sliderValue.toFixed(1)}</Label>
                    <Slider
                      value={[formData.sliderValue]}
                      onValueChange={(value) => setFormData({...formData, sliderValue: value[0]})}
                      max={100}
                      step={0.1}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Date & Time Fields */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Date & Time Fields
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dateField">Date Field</Label>
                    <Input
                      id="dateField"
                      type="date"
                      value={formData.dateField}
                      onChange={(e) => setFormData({...formData, dateField: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="timeField">Time Field</Label>
                    <Input
                      id="timeField"
                      type="time"
                      value={formData.timeField}
                      onChange={(e) => setFormData({...formData, timeField: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateTimeField">DateTime Field</Label>
                    <Input
                      id="dateTimeField"
                      type="datetime-local"
                      value={formData.dateTimeField}
                      onChange={(e) => setFormData({...formData, dateTimeField: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="monthField">Month Field</Label>
                    <Input
                      id="monthField"
                      type="month"
                      value={formData.monthField}
                      onChange={(e) => setFormData({...formData, monthField: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="weekField">Week Field</Label>
                    <Input
                      id="weekField"
                      type="week"
                      value={formData.weekField}
                      onChange={(e) => setFormData({...formData, weekField: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Selection Fields */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Selection Fields
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="singleSelect">Single Select</Label>
                    <Select value={formData.singleSelect} onValueChange={(value) => setFormData({...formData, singleSelect: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">Option 1</SelectItem>
                        <SelectItem value="option2">Option 2</SelectItem>
                        <SelectItem value="option3">Option 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Multi Select</Label>
                    <div className="space-y-2">
                      {["option1", "option2", "option3", "option4"].map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox
                            id={`multi-${option}`}
                            checked={formData.multiSelect.includes(option)}
                            onCheckedChange={() => toggleMultiSelect(option)}
                          />
                          <Label htmlFor={`multi-${option}`} className="capitalize">{option}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Radio Selection</Label>
                    <div className="space-y-2">
                      {["choice1", "choice2", "choice3"].map((choice) => (
                        <div key={choice} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id={`radio-${choice}`}
                            name="radioSelection"
                            value={choice}
                            checked={formData.radioSelection === choice}
                            onChange={(e) => setFormData({...formData, radioSelection: e.target.value})}
                            className="w-4 h-4"
                          />
                          <Label htmlFor={`radio-${choice}`} className="capitalize">{choice}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Checkbox Group</Label>
                    <div className="space-y-2">
                      {["item1", "item2", "item3", "item4"].map((item) => (
                        <div key={item} className="flex items-center space-x-2">
                          <Checkbox
                            id={`checkbox-${item}`}
                            checked={formData.checkboxGroup.includes(item)}
                            onCheckedChange={() => toggleCheckboxGroup(item)}
                          />
                          <Label htmlFor={`checkbox-${item}`} className="capitalize">{item}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Boolean Fields */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Boolean Fields</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="switchField"
                      checked={formData.switchField}
                      onCheckedChange={(checked) => setFormData({...formData, switchField: checked})}
                    />
                    <Label htmlFor="switchField">Switch Field</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="checkboxField"
                      checked={formData.checkboxField}
                      onCheckedChange={(checked) => setFormData({...formData, checkboxField: checked === true})}
                    />
                    <Label htmlFor="checkboxField">Checkbox Field</Label>
                  </div>
                </div>
              </div>

              {/* Special Fields */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Special Fields
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="colorField">Color Field</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="colorField"
                        type="color"
                        value={formData.colorField}
                        onChange={(e) => setFormData({...formData, colorField: e.target.value})}
                        className="w-16 h-10"
                      />
                      <Input
                        value={formData.colorField}
                        onChange={(e) => setFormData({...formData, colorField: e.target.value})}
                        placeholder="#3B82F6"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="ratingField">Rating Field: {formData.ratingField}/5</Label>
                    <div className="flex items-center space-x-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-6 w-6 cursor-pointer ${
                            star <= formData.ratingField 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`}
                          onClick={() => setFormData({...formData, ratingField: star})}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="tagsField">Tags Field</Label>
                    <div className="space-y-2">
                      <div className="flex space-x-2">
                        <Input
                          value={currentTag}
                          onChange={(e) => setCurrentTag(e.target.value)}
                          placeholder="Add a tag..."
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        />
                        <Button type="button" onClick={addTag} variant="outline">Add</Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.tagsField.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                            <span>{tag}</span>
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-1 text-xs hover:text-red-600"
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* File Fields */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  File & Media Fields
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="filePath">File Path</Label>
                    <Input
                      id="filePath"
                      value={formData.filePath}
                      onChange={(e) => setFormData({...formData, filePath: e.target.value})}
                      placeholder="/uploads/file.pdf"
                    />
                  </div>
                  <div>
                    <Label htmlFor="imagePath">Image Path</Label>
                    <Input
                      id="imagePath"
                      value={formData.imagePath}
                      onChange={(e) => setFormData({...formData, imagePath: e.target.value})}
                      placeholder="/uploads/image.jpg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="documentPath">Document Path</Label>
                    <Input
                      id="documentPath"
                      value={formData.documentPath}
                      onChange={(e) => setFormData({...formData, documentPath: e.target.value})}
                      placeholder="/uploads/document.docx"
                    />
                  </div>
                </div>
              </div>

              {/* Advanced Fields */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Advanced Fields</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="comboboxField">Combobox Field</Label>
                    <Input
                      id="comboboxField"
                      value={formData.comboboxField}
                      onChange={(e) => setFormData({...formData, comboboxField: e.target.value})}
                      placeholder="Combobox selection"
                    />
                  </div>
                  <div>
                    <Label htmlFor="multiInputField">Multi Input Field</Label>
                    <div className="space-y-2">
                      <div className="flex space-x-2">
                        <Input
                          value={currentMultiInput}
                          onChange={(e) => setCurrentMultiInput(e.target.value)}
                          placeholder="Add input..."
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMultiInput())}
                        />
                        <Button type="button" onClick={addMultiInput} variant="outline">Add</Button>
                      </div>
                      <div className="space-y-1">
                        {formData.multiInputField.map((input, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Input value={input} readOnly className="flex-1" />
                            <Button
                              type="button"
                              onClick={() => removeMultiInput(input)}
                              variant="outline"
                              size="sm"
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Validation & Configuration */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Validation & Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isRequired"
                      checked={formData.isRequired}
                      onCheckedChange={(checked) => setFormData({...formData, isRequired: checked === true})}
                    />
                    <Label htmlFor="isRequired">Is Required</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="multiple"
                      checked={formData.multiple}
                      onCheckedChange={(checked) => setFormData({...formData, multiple: checked === true})}
                    />
                    <Label htmlFor="multiple">Multiple</Label>
                  </div>
                  <div>
                    <Label htmlFor="minLength">Min Length</Label>
                    <Input
                      id="minLength"
                      type="number"
                      value={formData.minLength}
                      onChange={(e) => setFormData({...formData, minLength: e.target.value})}
                      placeholder="5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxLength">Max Length</Label>
                    <Input
                      id="maxLength"
                      type="number"
                      value={formData.maxLength}
                      onChange={(e) => setFormData({...formData, maxLength: e.target.value})}
                      placeholder="100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="minValue">Min Value</Label>
                    <Input
                      id="minValue"
                      type="number"
                      step="0.01"
                      value={formData.minValue}
                      onChange={(e) => setFormData({...formData, minValue: e.target.value})}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxValue">Max Value</Label>
                    <Input
                      id="maxValue"
                      type="number"
                      step="0.01"
                      value={formData.maxValue}
                      onChange={(e) => setFormData({...formData, maxValue: e.target.value})}
                      placeholder="1000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="pattern">Pattern (Regex)</Label>
                    <Input
                      id="pattern"
                      value={formData.pattern}
                      onChange={(e) => setFormData({...formData, pattern: e.target.value})}
                      placeholder="^[A-Za-z0-9]+$"
                    />
                  </div>
                  <div>
                    <Label htmlFor="step">Step</Label>
                    <Input
                      id="step"
                      type="number"
                      step="0.01"
                      value={formData.step}
                      onChange={(e) => setFormData({...formData, step: e.target.value})}
                      placeholder="0.01"
                    />
                  </div>
                  <div>
                    <Label htmlFor="placeholder">Placeholder</Label>
                    <Input
                      id="placeholder"
                      value={formData.placeholder}
                      onChange={(e) => setFormData({...formData, placeholder: e.target.value})}
                      placeholder="Enter your value..."
                    />
                  </div>
                  <div>
                    <Label htmlFor="inputMode">Input Mode</Label>
                    <Select value={formData.inputMode} onValueChange={(value) => setFormData({...formData, inputMode: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select input mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="numeric">Numeric</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="tel">Tel</SelectItem>
                        <SelectItem value="url">URL</SelectItem>
                        <SelectItem value="search">Search</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="helpText">Help Text</Label>
                    <Textarea
                      id="helpText"
                      value={formData.helpText}
                      onChange={(e) => setFormData({...formData, helpText: e.target.value})}
                      placeholder="Help text for this field..."
                    />
                  </div>
                </div>
              </div>

              {/* Conditional Logic & Styling */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Conditional Logic & Styling</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isVisible"
                      checked={formData.isVisible}
                      onCheckedChange={(checked) => setFormData({...formData, isVisible: checked})}
                    />
                    <Label htmlFor="isVisible">Is Visible</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isDisabled"
                      checked={formData.isDisabled}
                      onCheckedChange={(checked) => setFormData({...formData, isDisabled: checked})}
                    />
                    <Label htmlFor="isDisabled">Is Disabled</Label>
                  </div>
                  <div>
                    <Label htmlFor="dependsOn">Depends On</Label>
                    <Input
                      id="dependsOn"
                      value={formData.dependsOn}
                      onChange={(e) => setFormData({...formData, dependsOn: e.target.value})}
                      placeholder="otherField"
                    />
                  </div>
                  <div>
                    <Label htmlFor="condition">Condition</Label>
                    <Input
                      id="condition"
                      value={formData.condition}
                      onChange={(e) => setFormData({...formData, condition: e.target.value})}
                      placeholder="equals:value"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fieldSize">Field Size</Label>
                    <Select value={formData.fieldSize} onValueChange={(value) => setFormData({...formData, fieldSize: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sm">Small</SelectItem>
                        <SelectItem value="md">Medium</SelectItem>
                        <SelectItem value="lg">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="fieldWidth">Field Width</Label>
                    <Select value={formData.fieldWidth} onValueChange={(value) => setFormData({...formData, fieldWidth: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select width" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full">Full</SelectItem>
                        <SelectItem value="half">Half</SelectItem>
                        <SelectItem value="third">Third</SelectItem>
                        <SelectItem value="quarter">Quarter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="cssClass">CSS Class</Label>
                    <Input
                      id="cssClass"
                      value={formData.cssClass}
                      onChange={(e) => setFormData({...formData, cssClass: e.target.value})}
                      placeholder="custom-field-class"
                    />
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold border-b pb-2">Status</h3>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={!session}>
                  {editingMasterData ? 'Update Master Data' : 'Add Master Data'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* View Master Data Dialog */}
        <Dialog open={!!viewingMasterData} onOpenChange={(open) => !open && setViewingMasterData(null)}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Master Data Details</DialogTitle>
              <DialogDescription>
                View complete information for {viewingMasterData?.title}
              </DialogDescription>
            </DialogHeader>
            
            {viewingMasterData && (
              <div className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h3>
                    
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Title</Label>
                        <p className="text-gray-900">{viewingMasterData.title}</p>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Description</Label>
                        <p className="text-gray-900">{viewingMasterData.description || 'No description'}</p>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Category</Label>
                        <Badge variant="outline">{viewingMasterData.category}</Badge>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Field Type</Label>
                        <Badge variant="secondary">{viewingMasterData.fieldType}</Badge>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Status</Label>
                        <Badge variant={viewingMasterData.isActive ? "default" : "secondary"}>
                          {viewingMasterData.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Sample Data</h3>
                    
                    <div className="space-y-3">
                      {viewingMasterData.textField && (
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Text Field</Label>
                          <p className="text-gray-900">{viewingMasterData.textField}</p>
                        </div>
                      )}
                      
                      {viewingMasterData.emailField && (
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Email Field</Label>
                          <p className="text-gray-900">{viewingMasterData.emailField}</p>
                        </div>
                      )}
                      
                      {viewingMasterData.colorField && (
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Color Field</Label>
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-6 h-6 rounded border" 
                              style={{ backgroundColor: viewingMasterData.colorField }}
                            />
                            <span className="font-mono">{viewingMasterData.colorField}</span>
                          </div>
                        </div>
                      )}
                      
                      {viewingMasterData.ratingField && (
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Rating</Label>
                          <div className="flex items-center space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= (viewingMasterData.ratingField || 0)
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                            <span className="ml-2 text-sm">({viewingMasterData.ratingField}/5)</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* System Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">System Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Created</Label>
                      <p className="text-gray-900">
                        {new Date(viewingMasterData.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Last Updated</Label>
                      <p className="text-gray-900">
                        {new Date(viewingMasterData.updatedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setViewingMasterData(null)}
              >
                Close
              </Button>
              <Button 
                onClick={() => {
                  setViewingMasterData(null)
                  handleEdit(viewingMasterData!.id)
                }}
              >
                Edit Master Data
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={deleteConfirmation.open}
        onOpenChange={(open) => setDeleteConfirmation({ open, masterData: null })}
        title="Delete Master Data"
        description="Are you sure you want to delete this master data entry? This action cannot be undone."
        confirmText="Delete Master Data"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        type="danger"
        itemName={deleteConfirmation.masterData ? deleteConfirmation.masterData.title : undefined}
      />
    </ErrorBoundary>
  )
}
