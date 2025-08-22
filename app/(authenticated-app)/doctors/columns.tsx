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

export interface Doctor {
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
  specialization: string
  licenseNumber: string
  yearsOfExperience?: number
  salary?: number
  hireDate?: string
  medicalSchool?: string
  graduationYear?: number
  boardCertifications?: string
  languages?: string
  patientSatisfaction?: number
  successRate?: number
  averageWaitTime?: number
  workingHours?: string
  onCallSchedule?: string
  bio?: string
  profileImage?: string
  emergencyContact?: string
  emergencyPhone?: string
  notes?: string
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
    accessorKey: "firstName", // Fixed: was "name"
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
    accessorKey: "phone", // Fixed: was "contact"
    header: "Contact",
    cell: ({ row }) => {
      const doctor = row.original
      return (
        <div className="flex flex-col gap-1">
          {doctor.phone && (
            <div className="text-sm text-gray-600 flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {doctor.phone}
            </div>
          )}
          {doctor.city && doctor.state && (
            <div className="text-sm text-gray-500 flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {doctor.city}, {doctor.state}
            </div>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "department", // This one was correct
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
    accessorKey: "licenseNumber", // Fixed: was "license"
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
    accessorKey: "yearsOfExperience", // Fixed: was "experience"
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
          {doctor.hireDate && (
            <div className="text-xs text-gray-500">
              Hired: {format(new Date(doctor.hireDate), 'MMM yyyy')}
            </div>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "patientSatisfaction", // Fixed: was "performance"
    header: "Performance",
    cell: ({ row }) => {
      const doctor = row.original
      return (
        <div className="flex flex-col gap-1">
          {doctor.patientSatisfaction && (
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-yellow-500" />
              <span className="text-sm font-medium">
                {doctor.patientSatisfaction}/10
              </span>
            </div>
          )}
          {doctor.successRate && (
            <div className="text-xs text-gray-500">
              Success: {doctor.successRate}%
            </div>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "averageWaitTime", // Fixed: was "metrics"
    header: "Metrics",
    cell: ({ row }) => {
      const doctor = row.original
      return (
        <div className="flex flex-col gap-1">
          {doctor.averageWaitTime && (
            <div className="text-sm flex items-center gap-1">
              <Clock className="h-3 w-3 text-blue-500" />
              {doctor.averageWaitTime} min
            </div>
          )}
          {doctor.workingHours && (
            <div className="text-xs text-gray-500">
              {doctor.workingHours}
            </div>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "salary", // This one was correct
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
    accessorKey: "isActive", // This one was correct
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
    accessorKey: "medicalSchool", // Fixed: was "education"
    header: "Education",
    cell: ({ row }) => {
      const doctor = row.original
      return (
        <div className="flex flex-col gap-1">
          {doctor.medicalSchool && (
            <div className="text-sm font-medium">
              {doctor.medicalSchool}
            </div>
          )}
          {doctor.graduationYear && (
            <div className="text-xs text-gray-500">
              Class of {doctor.graduationYear}
            </div>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "createdAt", // This one was correct
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
    cell: ({ row }) => {
      const doctor = row.original
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
            title="Edit Doctor"
            onClick={() => {
              // This will be handled by the parent component
              console.log('Edit doctor:', doctor.id)
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
            title="Delete Doctor"
            onClick={() => {
              // This will be handled by the parent component
              console.log('Delete doctor:', doctor.id)
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]
