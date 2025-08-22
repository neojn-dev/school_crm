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
  Award
} from "lucide-react"
import { format } from "date-fns"

export interface Lawyer {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  employeeId: string
  department: string
  practiceArea: string
  barNumber: string
  yearsOfExperience?: number
  salary?: number
  lawSchool?: string
  graduationYear?: number
  barAdmissions?: string
  specializations?: string
  caseSuccessRate?: number
  clientSatisfaction?: number
  averageCaseDuration?: number
  courtExperience?: string
  languages?: string
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
    accessorKey: "name",
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
    accessorKey: "contact",
    header: "Contact",
    cell: ({ row }) => {
      const lawyer = row.original
      return (
        <div className="flex flex-col gap-1">
          {lawyer.phone && (
            <div className="text-sm text-gray-600 flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {lawyer.phone}
            </div>
          )}
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
            <Scale className="h-3 w-3 mr-1" />
            {lawyer.barNumber}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: "experience",
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
    accessorKey: "performance",
    header: "Performance",
    cell: ({ row }) => {
      const lawyer = row.original
      return (
        <div className="flex flex-col gap-1">
          {lawyer.caseSuccessRate && (
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-500" />
              <span className="text-sm font-medium">
                {lawyer.caseSuccessRate}%
              </span>
            </div>
          )}
          {lawyer.clientSatisfaction && (
            <div className="text-xs text-gray-500">
              Satisfaction: {lawyer.clientSatisfaction}/10
            </div>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "caseMetrics",
    header: "Case Metrics",
    cell: ({ row }) => {
      const lawyer = row.original
      return (
        <div className="flex flex-col gap-1">
          {lawyer.averageCaseDuration && (
            <div className="text-sm flex items-center gap-1">
              <Gavel className="h-3 w-3 text-blue-500" />
              {lawyer.averageCaseDuration} days
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
    accessorKey: "status",
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
    accessorKey: "education",
    header: "Education",
    cell: ({ row }) => {
      const lawyer = row.original
      return (
        <div className="flex flex-col gap-1">
          {lawyer.lawSchool && (
            <div className="text-sm font-medium">
              {lawyer.lawSchool}
            </div>
          )}
          {lawyer.graduationYear && (
            <div className="text-xs text-gray-500">
              Class of {lawyer.graduationYear}
            </div>
          )}
        </div>
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
    cell: ({ row }) => {
      const lawyer = row.original
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
            title="Edit Lawyer"
            onClick={() => {
              // This will be handled by the parent component
              console.log('Edit lawyer:', lawyer.id)
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
            title="Delete Lawyer"
            onClick={() => {
              // This will be handled by the parent component
              console.log('Delete lawyer:', lawyer.id)
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]
