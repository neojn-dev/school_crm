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

export interface Teacher {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  dateOfBirth?: string
  gender?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
  employeeId: string
  department: string
  subject: string
  gradeLevel: string
  yearsOfExperience?: number
  salary?: number
  hireDate?: string
  highestDegree?: string
  university?: string
  graduationYear?: number
  certifications?: string
  specializations?: string
  performanceRating?: number
  studentSatisfaction?: number
  attendanceRate?: number
  bio?: string
  profileImage?: string
  emergencyContact?: string
  emergencyPhone?: string
  notes?: string
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
    accessorKey: "name",
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
    accessorKey: "contact",
    header: "Contact",
    cell: ({ row }) => {
      const teacher = row.original
      return (
        <div className="flex flex-col gap-1">
          {teacher.phone && (
            <div className="text-sm text-gray-600 flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {teacher.phone}
            </div>
          )}
          {teacher.city && teacher.state && (
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {teacher.city}, {teacher.state}
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
    accessorKey: "gradeLevel",
    header: "Grade Level",
    cell: ({ row }) => {
      const teacher = row.original
      return (
        <Badge variant="secondary">
          <GraduationCap className="h-3 w-3 mr-1" />
          {teacher.gradeLevel}
        </Badge>
      )
    },
  },
  {
    accessorKey: "experience",
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
          {teacher.hireDate && (
            <div className="text-xs text-gray-500">
              Hired: {format(new Date(teacher.hireDate), 'MMM yyyy')}
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
      const teacher = row.original
      return (
        <div className="flex flex-col gap-1">
          {teacher.performanceRating && (
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-500" />
              <span className="text-sm font-medium">
                {teacher.performanceRating}/10
              </span>
            </div>
          )}
          {teacher.studentSatisfaction && (
            <div className="text-xs text-gray-500">
              Satisfaction: {teacher.studentSatisfaction}/10
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
    accessorKey: "status",
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
    accessorKey: "education",
    header: "Education",
    cell: ({ row }) => {
      const teacher = row.original
      return (
        <div className="flex flex-col gap-1">
          {teacher.highestDegree && (
            <div className="text-sm font-medium">
              {teacher.highestDegree}
            </div>
          )}
          {teacher.university && (
            <div className="text-xs text-gray-500">
              {teacher.university}
              {teacher.graduationYear && `, ${teacher.graduationYear}`}
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
    cell: ({ row }) => {
      const teacher = row.original
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
            title="Edit Teacher"
            onClick={() => {
              // This will be handled by the parent component
              console.log('Edit teacher:', teacher.id)
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
            title="Delete Teacher"
            onClick={() => {
              // This will be handled by the parent component
              console.log('Delete teacher:', teacher.id)
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]
