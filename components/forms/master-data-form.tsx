"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { TipTapEditor } from "@/components/ui/tiptap-editor"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { 
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
  Settings
} from "lucide-react"

export interface MasterDataFormData {
  // Basic Information
  title: string
  description: string
  category: "Basic" | "Advanced" | "Specialized"
  isActive: boolean
  sortOrder: number
  
  // Text Fields
  textField: string
  emailField: string
  phoneField: string
  urlField: string
  searchField: string
  textareaField: string
  richTextField: string
  
  // Numeric Fields
  numberField: number | string
  integerField: number | string
  rangeField: number | string
  sliderValue: number | string
  
  // Date & Time Fields
  dateField: string
  timeField: string
  dateTimeField: string
  monthField: string
  weekField: string
  
  // Selection Fields
  singleSelect: string
  multiSelect: string[]
  radioSelection: string
  checkboxGroup: string[]
  
  // Boolean Fields
  switchField: boolean
  checkboxField: boolean
  
  // Special Fields
  colorField: string
  ratingField: number | string
  tagsField: string[]
  
  // Required Fields (from database schema)
  fieldType: string
}

interface MasterDataFormProps {
  formData: MasterDataFormData
  setFormData: (data: MasterDataFormData) => void
  onSubmit: (e: React.FormEvent) => void
  onCancel: () => void
  isEditing: boolean
  loading?: boolean
}

export function MasterDataForm({ 
  formData, 
  setFormData, 
  onSubmit, 
  onCancel, 
  isEditing,
  loading = false 
}: MasterDataFormProps) {
  const categories = ["Basic", "Advanced", "Specialized"] as const
  const fieldTypes = [
    "input", "select", "textarea", "checkbox", "radio", "file", "date", "time", 
    "datetime-local", "month", "week", "number", "range", "color", "search", 
    "tel", "url", "email", "switch", "slider", "rating", "tags"
  ]

  const handleDescriptionChange = (content: string) => {
    setFormData({ ...formData, description: content })
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Basic Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Type className="h-5 w-5 mr-2 text-blue-600" />
          Basic Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Enter field title..."
              required
            />
          </div>
          
          <div className="md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <TipTapEditor
              content={formData.description}
              onChange={handleDescriptionChange}
              placeholder="Describe this form field..."
              className="min-h-[120px]"
              disabled={loading}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="category">Category *</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData({...formData, category: value as any})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="fieldType">Field Type *</Label>
            <Select 
              value={formData.fieldType} 
              onValueChange={(value) => setFormData({...formData, fieldType: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select field type" />
              </SelectTrigger>
              <SelectContent>
                {fieldTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <FileText className="h-5 w-5 mr-2 text-green-600" />
          Text Fields
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="textField">Text Field</Label>
            <Input
              id="textField"
              value={formData.textField}
              onChange={(e) => setFormData({...formData, textField: e.target.value})}
              placeholder="Sample text..."
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
        </div>
      </div>



      {/* Form Actions */}
      <div className="flex justify-end space-x-2 pt-6 border-t">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={loading}
        >
          {loading ? "Saving..." : isEditing ? "Update Master Data" : "Create Master Data"}
        </Button>
      </div>
    </form>
  )
}
