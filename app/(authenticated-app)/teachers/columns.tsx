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
  GraduationCap,
  Star,
  Clock,
  DollarSign
} from "lucide-react"
import { format } from "date-fns"
import { 
  VisibilityRounded as VisibilityIcon,
  EditRounded as EditIcon,
  DeleteRounded as DeleteIcon
} from "@mui/icons-material"

export interface Teacher {
  id: string
  firstName: string
  lastName: string
  email: string
  employeeId: string
  department: string
  subject: string
  yearsOfExperience?: number
  salary?: number
  hireDate?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export const columns: ColumnDef<Teacher>[] = [
  {
    accessorKey: "employeeId",
    header: "Employee ID",
    cell: ({ row }) => {
      const teacher = row.original
      return (
        <div className="font-mono text-sm text-gray-600">
          {teacher.employeeId}
        </div>
      )
    },
  },
  {
    accessorKey: "firstName",
    header: "Name",
    cell: ({ row }) => {
      const teacher = row.original
      return (
        <div className="flex flex-col">
          <div className="font-medium">
            {teacher.firstName} {teacher.lastName}
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <Mail className="h-3 w-3" />
            {teacher.email}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => {
      const teacher = row.original
      return (
        <div className="flex flex-col gap-1">
          <Badge variant="outline" className="w-fit">
            <Building className="h-3 w-3 mr-1" />
            {teacher.department}
          </Badge>
          <div className="text-sm text-gray-600">
            {teacher.subject}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "yearsOfExperience",
    header: "Experience",
    cell: ({ row }) => {
      const teacher = row.original
      return (
        <div className="flex flex-col gap-1">
          {teacher.yearsOfExperience && (
            <div className="text-sm flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {teacher.yearsOfExperience} years
            </div>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "hireDate",
    header: "Hire Date",
    cell: ({ row }) => {
      const teacher = row.original
      if (!teacher.hireDate) return <span className="text-gray-400">-</span>
      
      return (
        <div className="text-sm text-gray-600">
          {format(new Date(teacher.hireDate), 'MMM yyyy')}
        </div>
      )
    },
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => {
      const teacher = row.original
      if (!teacher.salary) return <span className="text-gray-400">-</span>
      
      return (
        <div className="flex items-center gap-1 text-sm">
          <DollarSign className="h-3 w-3 text-green-600" />
          {teacher.salary.toLocaleString()}
        </div>
      )
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const teacher = row.original
      return (
        <Badge variant={teacher.isActive ? "default" : "secondary"}>
          {teacher.isActive ? "Active" : "Inactive"}
        </Badge>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const teacher = row.original
      return (
        <div className="text-sm text-gray-500">
          {format(new Date(teacher.createdAt), 'MMM dd, yyyy')}
        </div>
      )
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const teacher = row.original
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
              console.log('View teacher:', teacher.id)
              // TODO: Implement view details modal
            }}
          >
            <VisibilityIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-700 text-green-600 rounded-full"
            title="Edit Teacher"
            onClick={() => {
              if (onEdit) {
                onEdit(teacher.id)
              }
            }}
          >
            <EditIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-700 text-red-600 rounded-full"
            title="Delete Teacher"
            onClick={async () => {
              if (onDelete && confirm(`Are you sure you want to delete Prof. ${teacher.firstName} ${teacher.lastName}?`)) {
                try {
                  await onDelete(teacher.id)
                } catch (error) {
                  console.error('Error deleting teacher:', error)
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
