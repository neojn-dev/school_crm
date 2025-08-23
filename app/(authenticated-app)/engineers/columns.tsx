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
  MapPin,
  Building,
  Zap,
  Star,
  Clock,
  DollarSign,
  Cpu,
  Rocket,
  Wrench
} from "lucide-react"
import { 
  RemoveRedEye as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from "@mui/icons-material"
import { format } from "date-fns"

export interface Engineer {
  id: string
  firstName: string
  lastName: string
  email: string
  employeeId: string
  department: string
  specialization: string
  engineeringType: string
  yearsOfExperience?: number
  salary?: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export const columns: ColumnDef<Engineer>[] = [
  {
    accessorKey: "employeeId",
    header: "Employee ID",
    cell: ({ row }) => {
      const engineer = row.original
      return (
        <div className="font-mono text-sm text-gray-600">
          {engineer.employeeId}
        </div>
      )
    },
  },
  {
    accessorKey: "firstName",
    header: "Name",
    cell: ({ row }) => {
      const engineer = row.original
      return (
        <div className="flex flex-col">
          <div className="font-medium">
            {engineer.firstName} {engineer.lastName}
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <Mail className="h-3 w-3" />
            {engineer.email}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => {
      const engineer = row.original
      return (
        <div className="flex flex-col gap-1">
          <Badge variant="outline" className="w-fit">
            <Building className="h-3 w-3 mr-1" />
            {engineer.department}
          </Badge>
          <div className="text-sm text-gray-600">
            {engineer.specialization}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "engineeringType",
    header: "Type",
    cell: ({ row }) => {
      const engineer = row.original
      return (
        <div className="flex flex-col gap-1">
          <Badge variant="secondary">
            <Wrench className="h-3 w-3 mr-1" />
            {engineer.engineeringType}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: "yearsOfExperience",
    header: "Experience",
    cell: ({ row }) => {
      const engineer = row.original
      return (
        <div className="flex flex-col gap-1">
          {engineer.yearsOfExperience && (
            <div className="text-sm flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {engineer.yearsOfExperience} years
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
      const engineer = row.original
      if (!engineer.salary) return <span className="text-gray-400">-</span>
      
      return (
        <div className="flex items-center gap-1 text-sm">
          <DollarSign className="h-3 w-3 text-green-600" />
          {engineer.salary.toLocaleString()}
        </div>
      )
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const engineer = row.original
      return (
        <Badge variant={engineer.isActive ? "default" : "secondary"}>
          {engineer.isActive ? "Active" : "Inactive"}
        </Badge>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const engineer = row.original
      return (
        <div className="text-sm text-gray-500">
          {format(new Date(engineer.createdAt), 'MMM dd, yyyy')}
        </div>
      )
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const engineer = row.original
      const { onEdit, onDelete } = table.options.meta as { onEdit?: (id: string) => void; onDelete?: (id: string) => Promise<void> }
      
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-700 text-blue-600 rounded-full"
            title="View Details"
            onClick={() => {
              // View functionality - could open a details modal
              console.log('View engineer:', engineer.id)
              // TODO: Implement view details modal
            }}
          >
            <VisibilityIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-700 text-green-600 rounded-full"
            title="Edit Engineer"
            onClick={() => {
              if (onEdit) {
                onEdit(engineer.id)
              }
            }}
          >
            <EditIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-700 text-red-600 rounded-full"
            title="Delete Engineer"
            onClick={async () => {
              if (onDelete && confirm(`Are you sure you want to delete Eng. ${engineer.firstName} ${engineer.lastName}?`)) {
                try {
                  await onDelete(engineer.id)
                } catch (error) {
                  console.error('Error deleting engineer:', error)
                }
              }
            }}
          >
            <DeleteIcon className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]
