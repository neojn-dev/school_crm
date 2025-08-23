"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Edit, 
  Trash2, 
  Eye,
  Mail,
  Phone,
  Building,
  Scale,
  Star,
  Clock,
  DollarSign,
  Gavel,
  Award,
  Shield
} from "lucide-react"
import { format } from "date-fns"


export interface Lawyer {
  id: string
  firstName: string
  lastName: string
  email: string
  employeeId: string
  department: string
  practiceArea: string
  barNumber: string
  yearsOfExperience?: number
  salary?: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export const columns: ColumnDef<Lawyer>[] = [
  {
    accessorKey: "employeeId",
    header: "Employee ID",
    cell: ({ row }) => {
      const lawyer = row.original
      return (
        <div className="font-mono text-sm text-gray-600">
          {lawyer.employeeId}
        </div>
      )
    },
  },
  {
    accessorKey: "firstName",
    header: "Name",
    cell: ({ row }) => {
      const lawyer = row.original
      return (
        <div className="flex flex-col">
          <div className="font-medium">
            {lawyer.firstName} {lawyer.lastName}
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <Mail className="h-3 w-3" />
            {lawyer.email}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => {
      const lawyer = row.original
      return (
        <div className="flex flex-col gap-1">
          <Badge variant="outline" className="w-fit">
            <Building className="h-3 w-3 mr-1" />
            {lawyer.department}
          </Badge>
          <div className="text-sm text-gray-600">
            {lawyer.practiceArea}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "barNumber",
    header: "Bar Number",
    cell: ({ row }) => {
      const lawyer = row.original
      return (
        <div className="flex flex-col gap-1">
          <Badge variant="secondary">
            <Shield className="h-3 w-3 mr-1" />
            {lawyer.barNumber}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: "yearsOfExperience",
    header: "Experience",
    cell: ({ row }) => {
      const lawyer = row.original
      return (
        <div className="flex flex-col gap-1">
          {lawyer.yearsOfExperience && (
            <div className="text-sm flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {lawyer.yearsOfExperience} years
            </div>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => {
      const lawyer = row.original
      if (!lawyer.salary) return <span className="text-gray-400">-</span>
      
      return (
        <div className="flex items-center gap-1 text-sm">
          <DollarSign className="h-3 w-3 text-green-600" />
          {lawyer.salary.toLocaleString()}
        </div>
      )
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const lawyer = row.original
      return (
        <Badge variant={lawyer.isActive ? "default" : "secondary"}>
          {lawyer.isActive ? "Active" : "Inactive"}
        </Badge>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const lawyer = row.original
      return (
        <div className="text-sm text-gray-500">
          {format(new Date(lawyer.createdAt), 'MMM dd, yyyy')}
        </div>
      )
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const lawyer = row.original
      const { onEdit, onDelete } = table.options.meta as { onEdit?: (id: string) => void; onDelete?: (id: string) => Promise<void> }
      
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-700 text-blue-600 rounded-full"
            title="View Details"
            onClick={() => {
              if (onView) {
                onView(lawyer.id)
              }
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-700 text-green-600 rounded-full"
            title="Edit Lawyer"
            onClick={() => {
              if (onEdit) {
                onEdit(lawyer.id)
              }
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-700 text-red-600 rounded-full"
            title="Delete Lawyer"
            onClick={() => {
              if (onDelete) {
                onDelete(lawyer.id)
              }
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]
