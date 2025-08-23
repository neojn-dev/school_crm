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
    cell: ({ row }) => {
      const engineer = row.original
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            title="Edit Engineer"
            onClick={() => {
              // This will be handled by the parent component
              console.log('Edit engineer:', engineer.id)
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
            title="Delete Engineer"
            onClick={() => {
              // This will be handled by the parent component
              console.log('Delete engineer:', engineer.id)
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]
