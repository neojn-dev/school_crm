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
  Stethoscope,
  Star,
  Clock,
  DollarSign,
  Shield,
  Activity,
  Heart
} from "lucide-react"
import { format } from "date-fns"
import { 
  VisibilityRounded as VisibilityIcon,
  EditRounded as EditIcon,
  DeleteRounded as DeleteIcon
} from "@mui/icons-material"

export interface Doctor {
  id: string
  firstName: string
  lastName: string
  email: string
  employeeId: string
  department: string
  specialization: string
  licenseNumber: string
  yearsOfExperience?: number
  salary?: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export const columns: ColumnDef<Doctor>[] = [
  {
    accessorKey: "employeeId",
    header: "Employee ID",
    cell: ({ row }) => {
      const doctor = row.original
      return (
        <div className="font-mono text-sm text-gray-600">
          {doctor.employeeId}
        </div>
      )
    },
  },
  {
    accessorKey: "firstName",
    header: "Name",
    cell: ({ row }) => {
      const doctor = row.original
      return (
        <div className="flex flex-col">
          <div className="font-medium">
            {doctor.firstName} {doctor.lastName}
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <Mail className="h-3 w-3" />
            {doctor.email}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => {
      const doctor = row.original
      return (
        <div className="flex flex-col gap-1">
          <Badge variant="outline" className="w-fit">
            <Building className="h-3 w-3 mr-1" />
            {doctor.department}
          </Badge>
          <div className="text-sm text-gray-600">
            {doctor.specialization}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "licenseNumber",
    header: "License",
    cell: ({ row }) => {
      const doctor = row.original
      return (
        <div className="flex flex-col gap-1">
          <Badge variant="secondary">
            <Shield className="h-3 w-3 mr-1" />
            {doctor.licenseNumber}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: "yearsOfExperience",
    header: "Experience",
    cell: ({ row }) => {
      const doctor = row.original
      return (
        <div className="flex flex-col gap-1">
          {doctor.yearsOfExperience && (
            <div className="text-sm flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {doctor.yearsOfExperience} years
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
      const doctor = row.original
      if (!doctor.salary) return <span className="text-gray-400">-</span>
      
      return (
        <div className="flex items-center gap-1 text-sm">
          <DollarSign className="h-3 w-3 text-green-600" />
          {doctor.salary.toLocaleString()}
        </div>
      )
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      const doctor = row.original
      return (
        <Badge variant={doctor.isActive ? "default" : "secondary"}>
          {doctor.isActive ? "Active" : "Inactive"}
        </Badge>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const doctor = row.original
      return (
        <div className="text-sm text-gray-500">
          {format(new Date(doctor.createdAt), 'MMM dd, yyyy')}
        </div>
      )
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const doctor = row.original
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
              console.log('View doctor:', doctor.id)
              // TODO: Implement view details modal
            }}
          >
            <VisibilityIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-700 text-green-600 rounded-full"
            title="Edit Doctor"
            onClick={() => {
              if (onEdit) {
                onEdit(doctor.id)
              }
            }}
          >
            <EditIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-700 text-red-600 rounded-full"
            title="Delete Doctor"
            onClick={async () => {
              if (onDelete && confirm(`Are you sure you want to delete Dr. ${doctor.firstName} ${doctor.lastName}?`)) {
                try {
                  await onDelete(doctor.id)
                } catch (error) {
                  console.error('Error deleting doctor:', error)
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
