"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Trash2, ArrowUpDown } from "lucide-react"

export interface MasterData {
  id: string
  title: string
  description?: string
  category: "Basic" | "Advanced" | "Specialized"
  isActive: boolean
  sortOrder: number
  fieldType: string
  textField?: string
  emailField?: string
  phoneField?: string
  urlField?: string
  searchField?: string
  textareaField?: string
  richTextField?: string
  numberField?: number
  integerField?: number
  rangeField?: number
  sliderValue?: number
  dateField?: string
  timeField?: string
  dateTimeField?: string
  monthField?: string
  weekField?: string
  singleSelect?: string
  multiSelect?: string
  radioSelection?: string
  checkboxGroup?: string
  switchField?: boolean
  checkboxField?: boolean
  filePath?: string
  imagePath?: string
  documentPath?: string
  colorField?: string
  ratingField?: number
  tagsField?: string
  autocompleteField?: string
  comboboxField?: string
  multiInputField?: string
  isRequired?: boolean
  minLength?: number
  maxLength?: number
  minValue?: number
  maxValue?: number
  pattern?: string
  placeholder?: string
  helpText?: string
  inputMode?: string
  step?: number
  multiple?: boolean
  dependsOn?: string
  condition?: string
  isVisible?: boolean
  isDisabled?: boolean
  fieldSize?: string
  fieldWidth?: string
  cssClass?: string
  createdAt: string
  updatedAt: string
}

export const columns: ColumnDef<MasterData>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 p-0 hover:bg-transparent"
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const title = row.getValue("title") as string
      return (
        <div className="font-medium">
          {title}
        </div>
      )
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string
      return (
        <div className="max-w-[200px] truncate text-sm text-gray-600">
          {description || "No description"}
        </div>
      )
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 p-0 hover:bg-transparent"
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const category = row.getValue("category") as string
      return (
        <Badge 
          variant={
            category === "Basic" ? "default" : 
            category === "Advanced" ? "secondary" : 
            "outline"
          }
          className={
            category === "Basic" ? "bg-blue-100 text-blue-800 hover:bg-blue-200" :
            category === "Advanced" ? "bg-purple-100 text-purple-800 hover:bg-purple-200" :
            "bg-orange-100 text-orange-800 hover:bg-orange-200"
          }
        >
          {category}
        </Badge>
      )
    },
  },
  {
    accessorKey: "fieldType",
    header: "Field Type",
    cell: ({ row }) => {
      const fieldType = row.getValue("fieldType") as string
      return (
        <Badge variant="outline" className="capitalize">
          {fieldType}
        </Badge>
      )
    },
  },
  {
    accessorKey: "textField",
    header: "Sample Text",
    cell: ({ row }) => {
      const textField = row.getValue("textField") as string
      return (
        <div className="max-w-[150px] truncate text-sm">
          {textField || "-"}
        </div>
      )
    },
  },
  {
    accessorKey: "emailField",
    header: "Sample Email",
    cell: ({ row }) => {
      const emailField = row.getValue("emailField") as string
      return (
        <div className="max-w-[150px] truncate text-sm">
          {emailField || "-"}
        </div>
      )
    },
  },
  {
    accessorKey: "colorField",
    header: "Color",
    cell: ({ row }) => {
      const colorField = row.getValue("colorField") as string
      return colorField ? (
        <div className="flex items-center space-x-2">
          <div 
            className="w-4 h-4 rounded border border-gray-300" 
            style={{ backgroundColor: colorField }}
          />
          <span className="text-xs font-mono">{colorField}</span>
        </div>
      ) : (
        <span className="text-gray-400">-</span>
      )
    },
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 p-0 hover:bg-transparent"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const isActive = row.getValue("isActive") as boolean
      return (
        <Badge variant={isActive ? "default" : "secondary"}>
          {isActive ? "Active" : "Inactive"}
        </Badge>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-8 p-0 hover:bg-transparent"
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string
      return (
        <div className="text-sm text-gray-600">
          {new Date(createdAt).toLocaleDateString()}
        </div>
      )
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const masterData = row.original
      const meta = table.options.meta as any

      return (
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => meta?.onView?.(masterData.id)}
            className="h-8 w-8 p-0 hover:bg-blue-50"
          >
            <Eye className="h-4 w-4 text-blue-600" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => meta?.onEdit?.(masterData.id)}
            className="h-8 w-8 p-0 hover:bg-green-50"
          >
            <Edit className="h-4 w-4 text-green-600" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => meta?.onDelete?.(masterData.id)}
            className="h-8 w-8 p-0 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      )
    },
  },
]
