"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Eye, Copy, FileText, Type, Hash, Calendar, Star, Upload, CheckSquare, CircleDot } from "lucide-react"
import { format } from "date-fns"

export type FormLibrary = {
  id: string
  title: string
  description?: string
  category: "Basic" | "Advanced" | "Specialized"
  isActive: boolean
  sortOrder: number
  fieldType: string
  isRequired: boolean
  createdAt: string | Date
  updatedAt: string | Date
  
  // Sample field values for display
  textField?: string
  emailField?: string
  numberField?: number
  dateField?: string | Date
  colorField?: string
  ratingField?: number
  tagsField?: string | string[] // Stored as JSON string in DB
  singleSelect?: string
  switchField?: boolean
  checkboxField?: boolean
}

export const columns: ColumnDef<FormLibrary>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.getValue("title") as string
      const description = row.original.description
      return (
        <div className="space-y-1">
          <div className="font-medium">{title}</div>
          {description && (
            <div className="text-sm text-gray-500 line-clamp-2">{description}</div>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("category") as string
      const getCategoryColor = (cat: string) => {
        switch (cat) {
          case "Basic": return "bg-blue-100 text-blue-800"
          case "Advanced": return "bg-purple-100 text-purple-800"
          case "Specialized": return "bg-orange-100 text-orange-800"
          default: return "bg-gray-100 text-gray-800"
        }
      }
      return (
        <Badge className={getCategoryColor(category)}>
          {category}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "fieldType",
    header: "Field Type",
    cell: ({ row }) => {
      const fieldType = row.getValue("fieldType") as string
      const getFieldIcon = (type: string) => {
        switch (type) {
          case "input": return <Type className="h-4 w-4" />
          case "select": return <CheckSquare className="h-4 w-4" />
          case "textarea": return <FileText className="h-4 w-4" />
          case "checkbox": return <CheckSquare className="h-4 w-4" />
          case "radio": return <CircleDot className="h-4 w-4" />
          case "file": return <Upload className="h-4 w-4" />
          case "date": case "time": case "datetime-local": case "month": case "week": 
            return <Calendar className="h-4 w-4" />
          case "number": case "range": case "slider": 
            return <Hash className="h-4 w-4" />
          case "color": return <Star className="h-4 w-4" />
          case "switch": return <CircleDot className="h-4 w-4" />
          case "rating": return <Star className="h-4 w-4" />
          case "tags": return <Hash className="h-4 w-4" />
          default: return <Type className="h-4 w-4" />
        }
      }
      return (
        <div className="flex items-center space-x-2">
          {getFieldIcon(fieldType)}
          <span className="capitalize">{fieldType}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "sampleValues",
    header: "Sample Values",
    cell: ({ row }) => {
      const item = row.original
      const sampleValues = []
      
      if (item.textField) sampleValues.push(`Text: ${item.textField.substring(0, 20)}...`)
      if (item.emailField) sampleValues.push(`Email: ${item.emailField}`)
      if (item.numberField !== undefined) sampleValues.push(`Number: ${item.numberField}`)
      if (item.dateField) {
        try {
          const date = new Date(item.dateField)
          if (!isNaN(date.getTime())) {
            sampleValues.push(`Date: ${format(date, 'MMM dd, yyyy')}`)
          }
        } catch (e) {
          // Skip invalid dates
        }
      }
      if (item.colorField) sampleValues.push(`Color: ${item.colorField}`)
      if (item.ratingField !== undefined) sampleValues.push(`Rating: ${item.ratingField}/5`)
      if (item.singleSelect) sampleValues.push(`Select: ${item.singleSelect}`)
      if (item.switchField !== undefined) sampleValues.push(`Switch: ${item.switchField ? 'ON' : 'OFF'}`)
      if (item.checkboxField !== undefined) sampleValues.push(`Checkbox: ${item.checkboxField ? '✓' : '✗'}`)
      if (item.tagsField) {
        try {
          const tags = typeof item.tagsField === 'string' ? JSON.parse(item.tagsField) : item.tagsField
          if (Array.isArray(tags) && tags.length > 0) {
            sampleValues.push(`Tags: ${tags.slice(0, 2).join(', ')}${tags.length > 2 ? '...' : ''}`)
          }
        } catch (e) {
          // Skip invalid JSON
        }
      }
      
      if (sampleValues.length === 0) {
        return <span className="text-gray-400">No sample data</span>
      }
      
      return (
        <div className="space-y-1">
          {sampleValues.slice(0, 3).map((value, index) => (
            <div key={index} className="text-sm text-gray-600">{value}</div>
          ))}
          {sampleValues.length > 3 && (
            <div className="text-xs text-gray-400">+{sampleValues.length - 3} more</div>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "metadata",
    header: "Metadata",
    cell: ({ row }) => {
      const item = row.original
      const metadata = []
      
      if (item.isRequired) metadata.push("Required")
      if (item.fieldSize) metadata.push(`Size: ${item.fieldSize}`)
      if (item.fieldWidth) metadata.push(`Width: ${item.fieldWidth}`)
      if (item.sortOrder > 0) metadata.push(`Order: ${item.sortOrder}`)
      
      if (metadata.length === 0) {
        return <span className="text-gray-400">Default</span>
      }
      
      return (
        <div className="flex flex-wrap gap-1">
          {metadata.map((meta, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {meta}
            </Badge>
          ))}
        </div>
      )
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean
      return (
        <Badge variant={isActive ? "default" : "secondary"}>
          {isActive ? "Active" : "Inactive"}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const dateValue = row.getValue("createdAt")
      let date: Date
      
      if (typeof dateValue === 'string') {
        date = new Date(dateValue)
      } else {
        date = dateValue as Date
      }
      
      if (isNaN(date.getTime())) {
        return <div className="text-sm text-gray-400">Invalid date</div>
      }
      
      return (
        <div className="text-sm text-gray-500">
          {format(date, "MMM dd, yyyy")}
        </div>
      )
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const item = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(item.id)}>
              <Copy className="mr-2 h-4 w-4" />
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
