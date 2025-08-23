"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Calendar, Filter, RotateCcw, Users, Building } from 'lucide-react'

interface DashboardFiltersProps {
  onFiltersChange: (filters: DashboardFilters) => void
  currentFilters: DashboardFilters
}

export interface DashboardFilters {
  dateRange: string
  department: string | null
  status: string | null
  role: string | null
}

const dateRangeOptions = [
  { value: '1month', label: 'Last Month' },
  { value: '3months', label: 'Last 3 Months' },
  { value: '6months', label: 'Last 6 Months' },
  { value: '1year', label: 'Last Year' }
]

const departmentOptions = [
  // Teachers
  'Mathematics', 'Science', 'English', 'History', 'Arts',
  // Doctors  
  'Cardiology', 'Neurology', 'Pediatrics', 'Surgery', 'Emergency',
  // Engineers
  'Software', 'Hardware', 'Civil', 'Mechanical', 'Electrical',
  // Lawyers
  'Corporate', 'Criminal', 'Family', 'Real Estate', 'Intellectual Property'
]

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' }
]

const roleOptions = [
  { value: 'teachers', label: 'Teachers' },
  { value: 'doctors', label: 'Doctors' },
  { value: 'engineers', label: 'Engineers' },
  { value: 'lawyers', label: 'Lawyers' }
]

export function DashboardFilters({ onFiltersChange, currentFilters }: DashboardFiltersProps) {
  const [filters, setFilters] = useState<DashboardFilters>(currentFilters)

  const updateFilter = (key: keyof DashboardFilters, value: string | null) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const resetFilters = () => {
    const defaultFilters: DashboardFilters = {
      dateRange: '6months',
      department: null,
      status: null,
      role: null
    }
    setFilters(defaultFilters)
    onFiltersChange(defaultFilters)
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.department) count++
    if (filters.status) count++
    if (filters.role) count++
    return count
  }

  const activeFiltersCount = getActiveFiltersCount()

  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <CardTitle className="text-lg">Dashboard Filters</CardTitle>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount} active
              </Badge>
            )}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={resetFilters}
            className="flex items-center space-x-1"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Date Range Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Date Range</span>
            </label>
            <Select
              value={filters.dateRange}
              onValueChange={(value) => updateFilter('dateRange', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                {dateRangeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Department Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
              <Building className="h-4 w-4" />
              <span>Department</span>
            </label>
            <Select
              value={filters.department || "all"}
              onValueChange={(value) => updateFilter('department', value === 'all' ? null : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departmentOptions.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>Status</span>
            </label>
            <Select
              value={filters.status || "all"}
              onValueChange={(value) => updateFilter('status', value === 'all' ? null : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {statusOptions.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Role Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>Role</span>
            </label>
            <Select
              value={filters.role || "all"}
              onValueChange={(value) => updateFilter('role', value === 'all' ? null : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {roleOptions.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters Display */}
        {activeFiltersCount > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span>Active filters:</span>
              <div className="flex flex-wrap gap-2">
                {filters.department && (
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <span>Department: {filters.department}</span>
                    <button
                      onClick={() => updateFilter('department', null)}
                      className="ml-1 hover:text-red-600"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {filters.status && (
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <span>Status: {statusOptions.find(s => s.value === filters.status)?.label}</span>
                    <button
                      onClick={() => updateFilter('status', null)}
                      className="ml-1 hover:text-red-600"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {filters.role && (
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <span>Role: {roleOptions.find(r => r.value === filters.role)?.label}</span>
                    <button
                      onClick={() => updateFilter('role', null)}
                      className="ml-1 hover:text-red-600"
                    >
                      ×
                    </button>
                  </Badge>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
