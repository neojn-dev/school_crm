"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"


import { DataTable } from "@/components/data-table/data-table"
import { columns, type FormLibrary } from "./columns"
import { Plus, FileText, Table, Settings, Database, Code, Palette, Calendar, Hash, Type, CheckSquare, CircleDot, Upload, Star, Eye, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "@/components/ui/toast-container"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

// Mock data for demonstration
const mockFormLibraryData: FormLibrary[] = [
  {
    id: "1",
    title: "User Registration Form",
    description: "Complete user registration with validation and file upload",
    category: "Basic",
    isActive: true,
    sortOrder: 1,
    fieldType: "input",
    isRequired: true,
    createdAt: "2024-01-15T00:00:00.000Z",
    updatedAt: "2024-01-15T00:00:00.000Z",
    textField: "John Doe",
    emailField: "john@example.com",
    numberField: 25,
    dateField: "1999-05-15T00:00:00.000Z",
    colorField: "#3B82F6",
    ratingField: 4.5,
    tagsField: JSON.stringify(["user", "registration", "form"]),
    singleSelect: "Premium",
    switchField: true,
    checkboxField: false,
  },
  {
    id: "2",
    title: "Product Configuration",
    description: "Advanced product configuration with multiple field types",
    category: "Advanced",
    isActive: true,
    sortOrder: 2,
    fieldType: "select",
    isRequired: true,
    createdAt: "2024-01-20T00:00:00.000Z",
    updatedAt: "2024-01-20T00:00:00.000Z",
    textField: "Smartphone Pro",
    numberField: 999.99,
    dateField: "2024-02-01T00:00:00.000Z",
    colorField: "#10B981",
    ratingField: 5.0,
    tagsField: JSON.stringify(["product", "config", "advanced"]),
    singleSelect: "Electronics",
    switchField: false,
    checkboxField: true,
  },
  {
    id: "3",
    title: "Survey Form",
    description: "Comprehensive survey with rating scales and open-ended questions",
    category: "Specialized",
    isActive: true,
    sortOrder: 3,
    fieldType: "textarea",
    isRequired: false,
    createdAt: "2024-01-25T00:00:00.000Z",
    updatedAt: "2024-01-25T00:00:00.000Z",
    textField: "Customer Feedback",
    numberField: 85,
    dateField: "2024-01-30T00:00:00.000Z",
    colorField: "#F59E0B",
    ratingField: 3.8,
    tagsField: JSON.stringify(["survey", "feedback", "customer"]),
    singleSelect: "Research",
    switchField: true,
    checkboxField: true,
  },
  {
    id: "4",
    title: "File Upload Manager",
    description: "Multi-file upload with drag and drop functionality",
    category: "Advanced",
    isActive: true,
    sortOrder: 4,
    fieldType: "file",
    isRequired: true,
    createdAt: "2024-02-01T00:00:00.000Z",
    updatedAt: "2024-02-01T00:00:00.000Z",
    textField: "Document Manager",
    numberField: 1024,
    dateField: "2024-02-05T00:00:00.000Z",
    colorField: "#8B5CF6",
    ratingField: 4.2,
    tagsField: JSON.stringify(["file", "upload", "manager"]),
    singleSelect: "System",
    switchField: false,
    checkboxField: false,
  },
  {
    id: "5",
    title: "Date Range Picker",
    description: "Advanced date and time selection with range validation",
    category: "Specialized",
    isActive: true,
    sortOrder: 5,
    fieldType: "date",
    isRequired: true,
    createdAt: "2024-02-10T00:00:00.000Z",
    updatedAt: "2024-02-10T00:00:00.000Z",
    textField: "Event Scheduler",
    numberField: 30,
    dateField: "2024-03-01T00:00:00.000Z",
    colorField: "#EF4444",
    ratingField: 4.7,
    tagsField: JSON.stringify(["date", "time", "scheduler"]),
    singleSelect: "Calendar",
    switchField: true,
    checkboxField: true,
  },
]

export default function FormLibraryPage() {
  const [data, setData] = useState<FormLibrary[]>(mockFormLibraryData)
  const [isLoading, setIsLoading] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingForm, setEditingForm] = useState<FormLibrary | null>(null)
  const [viewingForm, setViewingForm] = useState<FormLibrary | null>(null)
  const [formData, setFormData] = useState({
    // Basic Information
    title: "",
    description: "",
    category: "Basic" as "Basic" | "Advanced" | "Specialized",
    fieldType: "input" as string,
    isRequired: true,
    isActive: true,
    sortOrder: 1,
    
    // Text Fields
    textField: "",
    emailField: "",
    passwordField: "",
    textareaField: "",
    urlField: "",
    searchField: "",
    telField: "",
    
    // Numeric Fields
    numberField: "",
    rangeField: "",
    progressField: "",
    meterField: "",
    
    // Date & Time Fields
    dateField: "",
    timeField: "",
    datetimeField: "",
    monthField: "",
    weekField: "",
    
    // Selection Fields
    singleSelect: "",
    multiSelect: "",
    radioGroup: "",
    checkboxGroup: "",
    
    // File & Media Fields
    fileField: "",
    imageField: "",
    videoField: "",
    audioField: "",
    
    // Special Input Fields
    colorField: "",
    ratingField: "",
    tagsField: "",
    switchField: false,
    checkboxField: false,
    sliderField: "",
    
    // Advanced Fields
    richTextField: "",
    codeField: "",
    jsonField: "",
    xmlField: "",
    
    // Validation Fields
    minLength: "",
    maxLength: "",
    pattern: "",
    minValue: "",
    maxValue: "",
    stepValue: "",
    
    // Metadata Fields
    author: "",
    version: "",
    tags: "",
    notes: "",
    documentation: "",
    examples: "",
    dependencies: "",
    browserSupport: "",
    accessibility: "",
    performance: "",
    security: ""
  })
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ open: boolean; form: FormLibrary | null }>({ open: false, form: null })



  const handleView = (id: string) => {
    const form = data.find(f => f.id === id)
    if (form) {
      setViewingForm(form)
    }
  }

  const handleDelete = (id: string) => {
    const form = data.find(f => f.id === id)
    if (form) {
      setDeleteConfirmation({ open: true, form })
    }
  }

  const confirmDelete = async () => {
    if (!deleteConfirmation.form) return
    
    try {
      // Remove from local state
      setData(prev => prev.filter(form => form.id !== deleteConfirmation.form!.id))
      toast.error('Form template deleted successfully!', {
        style: {
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          color: '#dc2626'
        }
      })
    } catch (error) {
      console.error('Error deleting form template:', error)
      toast.error('Failed to delete form template', {
        style: {
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          color: '#dc2626'
        }
      })
    }
  }

  const handleEditForm = (id: string) => {
    const form = data.find(f => f.id === id)
    if (form) {
      setEditingForm(form)
      // Populate form data with existing values
      setFormData({
        title: form.title,
        description: form.description || "",
        category: form.category,
        fieldType: form.fieldType,
        isRequired: form.isRequired,
        isActive: form.isActive,
        sortOrder: form.sortOrder,
        
        // Text Fields
        textField: form.textField || "",
        emailField: form.emailField || "",
        passwordField: "",
        textareaField: "",
        urlField: "",
        searchField: "",
        telField: "",
        
        // Numeric Fields
        numberField: form.numberField?.toString() || "",
        rangeField: "",
        progressField: "",
        meterField: "",
        
        // Date & Time Fields
        dateField: form.dateField ? (typeof form.dateField === 'string' ? form.dateField.split('T')[0] : new Date(form.dateField).toISOString().split('T')[0]) : "",
        timeField: "",
        datetimeField: "",
        monthField: "",
        weekField: "",
        
        // Selection Fields
        singleSelect: form.singleSelect || "",
        multiSelect: "",
        radioGroup: "",
        checkboxGroup: "",
        
        // File & Media Fields
        fileField: "",
        imageField: "",
        videoField: "",
        audioField: "",
        
        // Special Input Fields
        colorField: form.colorField || "",
        ratingField: form.ratingField?.toString() || "",
        tagsField: form.tagsField ? (typeof form.tagsField === 'string' ? form.tagsField : JSON.parse(form.tagsField).join(', ')) : "",
        switchField: form.switchField || false,
        checkboxField: form.checkboxField || false,
        sliderField: "",
        
        // Advanced Fields
        richTextField: "",
        codeField: "",
        jsonField: "",
        xmlField: "",
        
        // Validation Fields
        minLength: "",
        maxLength: "",
        pattern: "",
        minValue: "",
        maxValue: "",
        stepValue: "",
        
        // Metadata Fields
        author: "",
        version: "",
        tags: "",
        notes: "",
        documentation: "",
        examples: "",
        dependencies: "",
        browserSupport: "",
        accessibility: "",
        performance: "",
        security: ""
      })
      setIsAddDialogOpen(true)
    }
  }

  const handleDeleteForm = async (id: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      setData(prev => prev.filter(item => item.id !== id))
      toast.error("Form deleted successfully!")
    } catch (error) {
      toast.error("Failed to delete form")
      console.error(error)
    }
  }

  const handleExport = (format: 'csv' | 'excel') => {
    toast.info(`${format.toUpperCase()} export coming soon!`)
  }

  const resetForm = () => {
    setFormData({
      // Basic Information
      title: "",
      description: "",
      category: "Basic",
      fieldType: "input",
      isRequired: true,
      isActive: true,
      sortOrder: 1,
      
      // Text Fields
      textField: "",
      emailField: "",
      passwordField: "",
      textareaField: "",
      urlField: "",
      searchField: "",
      telField: "",
      
      // Numeric Fields
      numberField: "",
      rangeField: "",
      progressField: "",
      meterField: "",
      
      // Date & Time Fields
      dateField: "",
      timeField: "",
      datetimeField: "",
      monthField: "",
      weekField: "",
      
      // Selection Fields
      singleSelect: "",
      multiSelect: "",
      radioGroup: "",
      checkboxGroup: "",
      
      // File & Media Fields
      fileField: "",
      imageField: "",
      videoField: "",
      audioField: "",
      
      // Special Input Fields
      colorField: "",
      ratingField: "",
      tagsField: "",
      switchField: false,
      checkboxField: false,
      sliderField: "",
      
      // Advanced Fields
      richTextField: "",
      codeField: "",
      jsonField: "",
      xmlField: "",
      
      // Validation Fields
      minLength: "",
      maxLength: "",
      pattern: "",
      minValue: "",
      maxValue: "",
      stepValue: "",
      
      // Metadata Fields
      author: "",
      version: "",
      tags: "",
      notes: "",
      documentation: "",
      examples: "",
      dependencies: "",
      browserSupport: "",
      accessibility: "",
      performance: "",
      security: ""
    })
  }

  const fillDummyData = () => {
    const categories = ["Basic", "Advanced", "Specialized"]
    const fieldTypes = ["input", "select", "textarea", "checkbox", "radio", "file", "date", "number", "range", "color", "switch", "rating", "tags"]
    const titles = ["User Registration", "Product Configuration", "Survey Form", "File Upload", "Contact Form", "Order Form", "Feedback Form", "Settings Form"]
    const authors = ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson", "David Brown"]
    const versions = ["1.0.0", "2.1.3", "3.0.0", "1.5.2", "4.2.1"]
    
    setFormData({
      // Basic Information
      title: titles[Math.floor(Math.random() * titles.length)],
      description: `Sample ${categories[Math.floor(Math.random() * categories.length)].toLowerCase()} form template`,
      category: categories[Math.floor(Math.random() * categories.length)] as "Basic" | "Advanced" | "Specialized",
      fieldType: fieldTypes[Math.floor(Math.random() * fieldTypes.length)],
      isRequired: Math.random() > 0.5,
      isActive: true,
      sortOrder: Math.floor(Math.random() * 100) + 1,
      
      // Text Fields
      textField: "Sample text value",
      emailField: "sample@example.com",
      passwordField: "password123",
      textareaField: "This is a sample textarea content with multiple lines",
      urlField: "https://example.com",
      searchField: "search query",
      telField: "+1-555-0123",
      
      // Numeric Fields
      numberField: (Math.floor(Math.random() * 100) + 1).toString(),
      rangeField: (Math.floor(Math.random() * 100) + 1).toString(),
      progressField: (Math.floor(Math.random() * 100) + 1).toString(),
      meterField: (Math.floor(Math.random() * 100) + 1).toString(),
      
      // Date & Time Fields
      dateField: new Date().toISOString().split('T')[0],
      timeField: "14:30",
      datetimeField: new Date().toISOString().slice(0, 16),
      monthField: new Date().toISOString().slice(0, 7),
      weekField: new Date().toISOString().slice(0, 10),
      
      // Selection Fields
      singleSelect: "Option 1",
      multiSelect: "option1,option2,option3",
      radioGroup: "radio1,radio2,radio3",
      checkboxGroup: "check1,check2,check3",
      
      // File & Media Fields
      fileField: "document.pdf",
      imageField: "image.jpg",
      videoField: "video.mp4",
      audioField: "audio.mp3",
      
      // Special Input Fields
      colorField: "#" + Math.floor(Math.random()*16777215).toString(16),
      ratingField: (Math.floor(Math.random() * 5) + 1).toString(),
      tagsField: "tag1,tag2,tag3",
      switchField: Math.random() > 0.5,
      checkboxField: Math.random() > 0.5,
      sliderField: (Math.floor(Math.random() * 100) + 1).toString(),
      
      // Advanced Fields
      richTextField: "<p>Rich text content with <strong>formatting</strong></p>",
      codeField: "console.log('Hello World');",
      jsonField: '{"key": "value", "number": 42}',
      xmlField: "<root><item>value</item></root>",
      
      // Validation Fields
      minLength: "3",
      maxLength: "255",
      pattern: "[A-Za-z0-9]+",
      minValue: "0",
      maxValue: "100",
      stepValue: "1",
      
      // Metadata Fields
      author: authors[Math.floor(Math.random() * authors.length)],
      version: versions[Math.floor(Math.random() * versions.length)],
      tags: "form,library,template,ui",
      notes: "This is a sample form template for demonstration purposes",
      documentation: "https://docs.example.com/form-template",
      examples: "See examples in the documentation",
      dependencies: "React, TypeScript, Tailwind CSS",
      browserSupport: "Chrome 90+, Firefox 88+, Safari 14+",
      accessibility: "WCAG 2.1 AA compliant",
      performance: "Optimized for fast rendering",
      security: "XSS protection enabled"
    })
  }

  const handleAddNew = () => {
    setEditingForm(null)
    resetForm()
    setIsAddDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Submitting form library form
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const formToSave: FormLibrary = {
        id: editingForm ? editingForm.id : Date.now().toString(),
        title: formData.title,
        description: formData.description,
        category: formData.category,
        isActive: formData.isActive,
        sortOrder: formData.sortOrder || data.length + 1,
        fieldType: formData.fieldType,
        isRequired: formData.isRequired,
        createdAt: editingForm ? editingForm.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        
        // Text Fields
        textField: formData.textField || undefined,
        emailField: formData.emailField || undefined,
        passwordField: formData.passwordField || undefined,
        textareaField: formData.textareaField || undefined,
        urlField: formData.urlField || undefined,
        searchField: formData.searchField || undefined,
        telField: formData.telField || undefined,
        
        // Numeric Fields
        numberField: formData.numberField ? parseFloat(formData.numberField) : undefined,
        rangeField: formData.rangeField ? parseFloat(formData.rangeField) : undefined,
        progressField: formData.progressField ? parseFloat(formData.progressField) : undefined,
        meterField: formData.meterField ? parseFloat(formData.meterField) : undefined,
        
        // Date & Time Fields
        dateField: formData.dateField || undefined,
        timeField: formData.timeField || undefined,
        datetimeField: formData.datetimeField || undefined,
        monthField: formData.monthField || undefined,
        weekField: formData.weekField || undefined,
        
        // Selection Fields
        singleSelect: formData.singleSelect || undefined,
        multiSelect: formData.multiSelect || undefined,
        radioGroup: formData.radioGroup || undefined,
        checkboxGroup: formData.checkboxGroup || undefined,
        
        // File & Media Fields
        fileField: formData.fileField || undefined,
        imageField: formData.imageField || undefined,
        videoField: formData.videoField || undefined,
        audioField: formData.audioField || undefined,
        
        // Special Input Fields
        colorField: formData.colorField || undefined,
        ratingField: formData.ratingField ? parseFloat(formData.ratingField) : undefined,
        tagsField: formData.tagsField ? formData.tagsField.split(',').map(tag => tag.trim()) : undefined,
        switchField: formData.switchField,
        checkboxField: formData.checkboxField,
        sliderField: formData.sliderField ? parseFloat(formData.sliderField) : undefined,
        
        // Advanced Fields
        richTextField: formData.richTextField || undefined,
        codeField: formData.codeField || undefined,
        jsonField: formData.jsonField || undefined,
        xmlField: formData.xmlField || undefined,
        
        // Validation Fields
        minLength: formData.minLength ? parseInt(formData.minLength) : undefined,
        maxLength: formData.maxLength ? parseInt(formData.maxLength) : undefined,
        pattern: formData.pattern || undefined,
        minValue: formData.minValue ? parseFloat(formData.minValue) : undefined,
        maxValue: formData.maxValue ? parseFloat(formData.maxValue) : undefined,
        stepValue: formData.stepValue ? parseFloat(formData.stepValue) : undefined,
        
        // Metadata Fields
        author: formData.author || undefined,
        version: formData.version || undefined,
        tags: formData.tags || undefined,
        notes: formData.notes || undefined,
        documentation: formData.documentation || undefined,
        examples: formData.examples || undefined,
        dependencies: formData.dependencies || undefined,
        browserSupport: formData.browserSupport || undefined,
        accessibility: formData.accessibility || undefined,
        performance: formData.performance || undefined,
        security: formData.security || undefined
      }
      
      if (editingForm) {
        // Update existing form
        setData(prev => prev.map(form => form.id === editingForm.id ? formToSave : form))
        toast.success("Form template updated successfully!", {
          style: {
            backgroundColor: '#f0fdf4',
            border: '1px solid #bbf7d0',
            color: '#16a34a'
          }
        })
      } else {
        // Add new form
        setData(prev => [formToSave, ...prev])
        toast.success("Form template added successfully!", {
          style: {
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626'
          }
        })
      }
      
      setIsAddDialogOpen(false)
      setEditingForm(null)
      resetForm()
    } catch (error) {
      toast.error("Failed to add form template")
      console.error(error)
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Form Library</h1>
          <p className="text-muted-foreground">
            Comprehensive collection of all HTML input field types and form components
          </p>
        </div>
        <Button onClick={handleAddNew} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Form Library Data</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Type className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Forms</p>
                <p className="text-2xl font-bold">{data.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckSquare className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Active Forms</p>
                <p className="text-2xl font-bold">{data.filter(f => f.isActive).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Hash className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Field Types</p>
                <p className="text-2xl font-bold">{new Set(data.map(f => f.fieldType)).size}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Star className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold">{new Set(data.map(f => f.category)).size}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Form Library Database</span>
          </CardTitle>
          <CardDescription>
            Browse and manage all form templates in the library
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data}
            searchKey="title"
            searchPlaceholder="Search forms..."
            exportData={() => handleExport('csv')}
            meta={{ onView: handleView, onEdit: handleEditForm, onDelete: handleDelete }}
          />
        </CardContent>
      </Card>

      {/* Field Type Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Code className="h-5 w-5" />
            <span>Field Type Legend</span>
          </CardTitle>
          <CardDescription>
            Reference guide for all available field types in the form library
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
              <Type className="h-4 w-4 text-blue-600" />
              <span className="text-sm">Input</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
              <CheckSquare className="h-4 w-4 text-green-600" />
              <span className="text-sm">Select</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
              <FileText className="h-4 w-4 text-purple-600" />
              <span className="text-sm">Textarea</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
              <CheckSquare className="h-4 w-4 text-orange-600" />
              <span className="text-sm">Checkbox</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
              <CircleDot className="h-4 w-4 text-red-600" />
              <span className="text-sm">Radio</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
              <Upload className="h-4 w-4 text-indigo-600" />
              <span className="text-sm">File</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
              <Calendar className="h-4 w-4 text-teal-600" />
              <span className="text-sm">Date/Time</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
              <Hash className="h-4 w-4 text-gray-600" />
              <span className="text-sm">Number</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
              <Star className="h-4 w-4 text-yellow-600" />
              <span className="text-sm">Rating</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
              <Palette className="h-4 w-4 text-pink-600" />
              <span className="text-sm">Color</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
              <Hash className="h-4 w-4 text-cyan-600" />
              <span className="text-sm">Tags</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add New Form Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingForm ? 'Edit Form Library Data' : 'Add Form Library Data'}
            </DialogTitle>
            <DialogDescription>
              {editingForm ? 'Update form library entry with all HTML input field types, validation rules, and metadata' : 'Create comprehensive form library entries with all HTML input field types, validation rules, and metadata'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
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
            
            {/* Basic Information Section */}
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
                    placeholder="e.g., User Registration Form"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value as "Basic" | "Advanced" | "Specialized"})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Basic">Basic</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Specialized">Specialized</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="fieldType">Field Type *</Label>
                  <Select value={formData.fieldType} onValueChange={(value) => setFormData({...formData, fieldType: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="input">Input</SelectItem>
                      <SelectItem value="select">Select</SelectItem>
                      <SelectItem value="textarea">Textarea</SelectItem>
                      <SelectItem value="checkbox">Checkbox</SelectItem>
                      <SelectItem value="radio">Radio</SelectItem>
                      <SelectItem value="file">File</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="range">Range</SelectItem>
                      <SelectItem value="color">Color</SelectItem>
                      <SelectItem value="switch">Switch</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="tags">Tags</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="sortOrder">Sort Order</Label>
                  <Input
                    id="sortOrder"
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({...formData, sortOrder: parseInt(e.target.value) || 1})}
                    placeholder="1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe the purpose and functionality of this form template"
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isRequired"
                    checked={formData.isRequired}
                    onCheckedChange={(checked) => setFormData({...formData, isRequired: checked})}
                  />
                  <Label htmlFor="isRequired">Required Field</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>
              </div>
            </div>

            {/* Text Fields Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Text Fields</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="textField">Text Field</Label>
                  <Input
                    id="textField"
                    value={formData.textField}
                    onChange={(e) => setFormData({...formData, textField: e.target.value})}
                    placeholder="Sample text value"
                  />
                </div>
                <div>
                  <Label htmlFor="emailField">Email Field</Label>
                  <Input
                    id="emailField"
                    type="email"
                    value={formData.emailField}
                    onChange={(e) => setFormData({...formData, emailField: e.target.value})}
                    placeholder="sample@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="passwordField">Password Field</Label>
                  <Input
                    id="passwordField"
                    type="password"
                    value={formData.passwordField}
                    onChange={(e) => setFormData({...formData, passwordField: e.target.value})}
                    placeholder="Enter password"
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
                    type="search"
                    value={formData.searchField}
                    onChange={(e) => setFormData({...formData, searchField: e.target.value})}
                    placeholder="Search query"
                  />
                </div>
                <div>
                  <Label htmlFor="telField">Telephone Field</Label>
                  <Input
                    id="telField"
                    type="tel"
                    value={formData.telField}
                    onChange={(e) => setFormData({...formData, telField: e.target.value})}
                    placeholder="+1-555-0123"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="textareaField">Textarea Field</Label>
                <Textarea
                  id="textareaField"
                  value={formData.textareaField}
                  onChange={(e) => setFormData({...formData, textareaField: e.target.value})}
                  placeholder="Multi-line text content"
                  rows={3}
                />
              </div>
            </div>

            {/* Numeric Fields Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Numeric Fields</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="numberField">Number Field</Label>
                  <Input
                    id="numberField"
                    type="number"
                    value={formData.numberField}
                    onChange={(e) => setFormData({...formData, numberField: e.target.value})}
                    placeholder="42"
                  />
                </div>
                <div>
                  <Label htmlFor="rangeField">Range Field</Label>
                  <Input
                    id="rangeField"
                    type="number"
                    value={formData.rangeField}
                    onChange={(e) => setFormData({...formData, rangeField: e.target.value})}
                    placeholder="50"
                  />
                </div>
                <div>
                  <Label htmlFor="progressField">Progress Field</Label>
                  <Input
                    id="progressField"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progressField}
                    onChange={(e) => setFormData({...formData, progressField: e.target.value})}
                    placeholder="75"
                  />
                </div>
                <div>
                  <Label htmlFor="meterField">Meter Field</Label>
                  <Input
                    id="meterField"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.meterField}
                    onChange={(e) => setFormData({...formData, meterField: e.target.value})}
                    placeholder="60"
                  />
                </div>
              </div>
            </div>

            {/* Date & Time Fields Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Date & Time Fields</h3>
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
                  <Label htmlFor="datetimeField">Date Time Field</Label>
                  <Input
                    id="datetimeField"
                    type="datetime-local"
                    value={formData.datetimeField}
                    onChange={(e) => setFormData({...formData, datetimeField: e.target.value})}
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

            {/* Selection Fields Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Selection Fields</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="singleSelect">Single Select</Label>
                  <Input
                    id="singleSelect"
                    value={formData.singleSelect}
                    onChange={(e) => setFormData({...formData, singleSelect: e.target.value})}
                    placeholder="Option 1"
                  />
                </div>
                <div>
                  <Label htmlFor="multiSelect">Multi Select</Label>
                  <Input
                    id="multiSelect"
                    value={formData.multiSelect}
                    onChange={(e) => setFormData({...formData, multiSelect: e.target.value})}
                    placeholder="option1,option2,option3"
                  />
                </div>
                <div>
                  <Label htmlFor="radioGroup">Radio Group</Label>
                  <Input
                    id="radioGroup"
                    value={formData.radioGroup}
                    onChange={(e) => setFormData({...formData, radioGroup: e.target.value})}
                    placeholder="radio1,radio2,radio3"
                  />
                </div>
                <div>
                  <Label htmlFor="checkboxGroup">Checkbox Group</Label>
                  <Input
                    id="checkboxGroup"
                    value={formData.checkboxGroup}
                    onChange={(e) => setFormData({...formData, checkboxGroup: e.target.value})}
                    placeholder="check1,check2,check3"
                  />
                </div>
              </div>
            </div>

            {/* File & Media Fields Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">File & Media Fields</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fileField">File Field</Label>
                  <Input
                    id="fileField"
                    value={formData.fileField}
                    onChange={(e) => setFormData({...formData, fileField: e.target.value})}
                    placeholder="document.pdf"
                  />
                </div>
                <div>
                  <Label htmlFor="imageField">Image Field</Label>
                  <Input
                    id="imageField"
                    value={formData.imageField}
                    onChange={(e) => setFormData({...formData, imageField: e.target.value})}
                    placeholder="image.jpg"
                  />
                </div>
                <div>
                  <Label htmlFor="videoField">Video Field</Label>
                  <Input
                    id="videoField"
                    value={formData.videoField}
                    onChange={(e) => setFormData({...formData, videoField: e.target.value})}
                    placeholder="video.mp4"
                  />
                </div>
                <div>
                  <Label htmlFor="audioField">Audio Field</Label>
                  <Input
                    id="audioField"
                    value={formData.audioField}
                    onChange={(e) => setFormData({...formData, audioField: e.target.value})}
                    placeholder="audio.mp3"
                  />
                </div>
              </div>
            </div>

            {/* Special Input Fields Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Special Input Fields</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="colorField">Color Field</Label>
                  <Input
                    id="colorField"
                    type="color"
                    value={formData.colorField}
                    onChange={(e) => setFormData({...formData, colorField: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="ratingField">Rating Field</Label>
                  <Input
                    id="ratingField"
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={formData.ratingField}
                    onChange={(e) => setFormData({...formData, ratingField: e.target.value})}
                    placeholder="1-5"
                  />
                </div>
                <div>
                  <Label htmlFor="sliderField">Slider Field</Label>
                  <Input
                    id="sliderField"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.sliderField}
                    onChange={(e) => setFormData({...formData, sliderField: e.target.value})}
                    placeholder="50"
                  />
                </div>
                <div>
                  <Label htmlFor="tagsField">Tags Field</Label>
                  <Input
                    id="tagsField"
                    value={formData.tagsField}
                    onChange={(e) => setFormData({...formData, tagsField: e.target.value})}
                    placeholder="tag1, tag2, tag3 (comma-separated)"
                  />
                </div>
              </div>
              
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
                  <Switch
                    id="checkboxField"
                    checked={formData.checkboxField}
                    onCheckedChange={(checked) => setFormData({...formData, checkboxField: checked})}
                  />
                  <Label htmlFor="checkboxField">Checkbox Field</Label>
                </div>
              </div>
            </div>

            {/* Advanced Fields Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Advanced Fields</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="richTextField">Rich Text Field</Label>
                  <Textarea
                    id="richTextField"
                    value={formData.richTextField}
                    onChange={(e) => setFormData({...formData, richTextField: e.target.value})}
                    placeholder="<p>Rich text content with <strong>formatting</strong></p>"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="codeField">Code Field</Label>
                  <Textarea
                    id="codeField"
                    value={formData.codeField}
                    onChange={(e) => setFormData({...formData, codeField: e.target.value})}
                    placeholder="console.log('Hello World');"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="jsonField">JSON Field</Label>
                  <Textarea
                    id="jsonField"
                    value={formData.jsonField}
                    onChange={(e) => setFormData({...formData, jsonField: e.target.value})}
                    placeholder='{"key": "value", "number": 42}'
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="xmlField">XML Field</Label>
                  <Textarea
                    id="xmlField"
                    value={formData.xmlField}
                    onChange={(e) => setFormData({...formData, xmlField: e.target.value})}
                    placeholder="<root><item>value</item></root>"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Validation Fields Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Validation Fields</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minLength">Min Length</Label>
                  <Input
                    id="minLength"
                    type="number"
                    value={formData.minLength}
                    onChange={(e) => setFormData({...formData, minLength: e.target.value})}
                    placeholder="3"
                  />
                </div>
                <div>
                  <Label htmlFor="maxLength">Max Length</Label>
                  <Input
                    id="maxLength"
                    type="number"
                    value={formData.maxLength}
                    onChange={(e) => setFormData({...formData, maxLength: e.target.value})}
                    placeholder="255"
                  />
                </div>
                <div>
                  <Label htmlFor="pattern">Pattern</Label>
                  <Input
                    id="pattern"
                    value={formData.pattern}
                    onChange={(e) => setFormData({...formData, pattern: e.target.value})}
                    placeholder="[A-Za-z0-9]+"
                  />
                </div>
                <div>
                  <Label htmlFor="minValue">Min Value</Label>
                  <Input
                    id="minValue"
                    type="number"
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
                    value={formData.maxValue}
                    onChange={(e) => setFormData({...formData, maxValue: e.target.value})}
                    placeholder="100"
                  />
                </div>
                <div>
                  <Label htmlFor="stepValue">Step Value</Label>
                  <Input
                    id="stepValue"
                    type="number"
                    value={formData.stepValue}
                    onChange={(e) => setFormData({...formData, stepValue: e.target.value})}
                    placeholder="1"
                  />
                </div>
              </div>
            </div>

            {/* Metadata Fields Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Metadata Fields</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="version">Version</Label>
                  <Input
                    id="version"
                    value={formData.version}
                    onChange={(e) => setFormData({...formData, version: e.target.value})}
                    placeholder="1.0.0"
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    placeholder="form,library,template,ui"
                  />
                </div>
                <div>
                  <Label htmlFor="browserSupport">Browser Support</Label>
                  <Input
                    id="browserSupport"
                    value={formData.browserSupport}
                    onChange={(e) => setFormData({...formData, browserSupport: e.target.value})}
                    placeholder="Chrome 90+, Firefox 88+, Safari 14+"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Additional notes about this form template"
                    rows={2}
                  />
                </div>
                <div>
                  <Label htmlFor="documentation">Documentation URL</Label>
                  <Input
                    id="documentation"
                    type="url"
                    value={formData.documentation}
                    onChange={(e) => setFormData({...formData, documentation: e.target.value})}
                    placeholder="https://docs.example.com/form-template"
                  />
                </div>
                <div>
                  <Label htmlFor="examples">Examples</Label>
                  <Input
                    id="examples"
                    value={formData.examples}
                    onChange={(e) => setFormData({...formData, examples: e.target.value})}
                    placeholder="See examples in the documentation"
                  />
                </div>
                <div>
                  <Label htmlFor="dependencies">Dependencies</Label>
                  <Input
                    id="dependencies"
                    value={formData.dependencies}
                    onChange={(e) => setFormData({...formData, dependencies: e.target.value})}
                    placeholder="React, TypeScript, Tailwind CSS"
                  />
                </div>
                <div>
                  <Label htmlFor="accessibility">Accessibility</Label>
                  <Input
                    id="accessibility"
                    value={formData.accessibility}
                    onChange={(e) => setFormData({...formData, accessibility: e.target.value})}
                    placeholder="WCAG 2.1 AA compliant"
                  />
                </div>
                <div>
                  <Label htmlFor="performance">Performance</Label>
                  <Input
                    id="performance"
                    value={formData.performance}
                    onChange={(e) => setFormData({...formData, performance: e.target.value})}
                    placeholder="Optimized for fast rendering"
                  />
                </div>
                <div>
                  <Label htmlFor="security">Security</Label>
                  <Input
                    id="security"
                    value={formData.security}
                    onChange={(e) => setFormData({...formData, security: e.target.value})}
                    placeholder="XSS protection enabled"
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={!formData.title || !formData.fieldType}>
                {editingForm ? 'Update Form Template' : 'Create Form Template'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* View Form Library Dialog */}
      <Dialog open={!!viewingForm} onOpenChange={(open) => !open && setViewingForm(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Form Library Details</DialogTitle>
            <DialogDescription>
              View complete information for {viewingForm?.title}
            </DialogDescription>
          </DialogHeader>
          
          {viewingForm && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Title</Label>
                      <p className="text-gray-900 font-medium">{viewingForm.title}</p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Description</Label>
                      <p className="text-gray-900">{viewingForm.description || 'No description provided'}</p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Category</Label>
                      <Badge className={
                        viewingForm.category === "Basic" ? "bg-blue-100 text-blue-800" :
                        viewingForm.category === "Advanced" ? "bg-purple-100 text-purple-800" :
                        "bg-orange-100 text-orange-800"
                      }>
                        {viewingForm.category}
                      </Badge>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Field Type</Label>
                      <p className="text-gray-900 capitalize">{viewingForm.fieldType}</p>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Status</Label>
                      <Badge variant={viewingForm.isActive ? "default" : "secondary"}>
                        {viewingForm.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Required Field</Label>
                      <Badge variant={viewingForm.isRequired ? "default" : "outline"}>
                        {viewingForm.isRequired ? "Required" : "Optional"}
                      </Badge>
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Sort Order</Label>
                      <p className="text-gray-900">{viewingForm.sortOrder}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Sample Field Values</h3>
                  
                  <div className="space-y-3">
                    {viewingForm.textField && (
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Text Field</Label>
                        <p className="text-gray-900">{viewingForm.textField}</p>
                      </div>
                    )}
                    
                    {viewingForm.emailField && (
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Email Field</Label>
                        <p className="text-gray-900">{viewingForm.emailField}</p>
                      </div>
                    )}
                    
                    {viewingForm.numberField !== undefined && (
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Number Field</Label>
                        <p className="text-gray-900">{viewingForm.numberField}</p>
                      </div>
                    )}
                    
                    {viewingForm.dateField && (
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Date Field</Label>
                        <p className="text-gray-900">
                          {new Date(viewingForm.dateField).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    )}
                    
                    {viewingForm.colorField && (
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Color Field</Label>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-6 h-6 rounded border border-gray-300"
                            style={{ backgroundColor: viewingForm.colorField }}
                          ></div>
                          <p className="text-gray-900">{viewingForm.colorField}</p>
                        </div>
                      </div>
                    )}
                    
                    {viewingForm.ratingField !== undefined && (
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Rating Field</Label>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star}
                              className={`h-4 w-4 ${star <= viewingForm.ratingField! ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            />
                          ))}
                          <span className="ml-2 text-gray-900">{viewingForm.ratingField}/5</span>
                        </div>
                      </div>
                    )}
                    
                    {viewingForm.singleSelect && (
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Single Select</Label>
                        <p className="text-gray-900">{viewingForm.singleSelect}</p>
                      </div>
                    )}
                    
                    {viewingForm.switchField !== undefined && (
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Switch Field</Label>
                        <Badge variant={viewingForm.switchField ? "default" : "outline"}>
                          {viewingForm.switchField ? "ON" : "OFF"}
                        </Badge>
                      </div>
                    )}
                    
                    {viewingForm.checkboxField !== undefined && (
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Checkbox Field</Label>
                        <Badge variant={viewingForm.checkboxField ? "default" : "outline"}>
                          {viewingForm.checkboxField ? "Checked" : "Unchecked"}
                        </Badge>
                      </div>
                    )}
                    
                    {viewingForm.tagsField && (
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Tags Field</Label>
                        <div className="flex flex-wrap gap-1">
                          {(typeof viewingForm.tagsField === 'string' ? 
                            JSON.parse(viewingForm.tagsField) : 
                            viewingForm.tagsField
                          ).map((tag: string, index: number) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
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
                      {new Date(viewingForm.createdAt).toLocaleDateString('en-US', {
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
                      {new Date(viewingForm.updatedAt).toLocaleDateString('en-US', {
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
              onClick={() => setViewingForm(null)}
            >
              Close
            </Button>
            <Button 
              onClick={() => {
                setViewingForm(null)
                handleEditForm(viewingForm!.id)
              }}
            >
              Edit Form
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={deleteConfirmation.open}
        onOpenChange={(open) => setDeleteConfirmation({ open, form: null })}
        title="Delete Form Template"
        description="Are you sure you want to delete this form template? This action cannot be undone."
        confirmText="Delete Template"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        type="danger"
        itemName={deleteConfirmation.form?.title}
      />
    </div>
  )
}
