"use client"

import { useState } from 'react'
import { Button } from './button'
import { Input } from './input'
import { Label } from './label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'
import { Badge } from './badge'
import { 
  Filter, 
  X, 
  Search,
  Calendar,
  DollarSign,
  Hash,
  ChevronDown,
  RotateCcw
} from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './popover'

export interface FilterField {
  key: string
  label: string
  type: 'text' | 'select' | 'number' | 'date' | 'boolean' | 'range'
  options?: { value: string; label: string }[]
  placeholder?: string
}

export interface FilterValue {
  field: string
  operator: string
  value: any
  label?: string
}

interface AdvancedFiltersProps {
  fields: FilterField[]
  onFiltersChange: (filters: FilterValue[]) => void
  className?: string
}

const operators = {
  text: [
    { value: 'contains', label: 'Contains' },
    { value: 'equals', label: 'Equals' },
    { value: 'startsWith', label: 'Starts with' },
    { value: 'endsWith', label: 'Ends with' },
  ],
  select: [
    { value: 'equals', label: 'Equals' },
    { value: 'notEquals', label: 'Not equals' },
  ],
  number: [
    { value: 'equals', label: 'Equals' },
    { value: 'greaterThan', label: 'Greater than' },
    { value: 'lessThan', label: 'Less than' },
    { value: 'between', label: 'Between' },
  ],
  date: [
    { value: 'equals', label: 'On date' },
    { value: 'after', label: 'After' },
    { value: 'before', label: 'Before' },
    { value: 'between', label: 'Between' },
  ],
  boolean: [
    { value: 'equals', label: 'Is' },
  ],
  range: [
    { value: 'between', label: 'Between' },
    { value: 'greaterThan', label: 'Greater than' },
    { value: 'lessThan', label: 'Less than' },
  ]
}

export function AdvancedFilters({ fields, onFiltersChange, className = '' }: AdvancedFiltersProps) {
  const [filters, setFilters] = useState<FilterValue[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [newFilter, setNewFilter] = useState({
    field: '',
    operator: '',
    value: '',
    value2: '' // For range/between operators
  })

  const addFilter = () => {
    if (!newFilter.field || !newFilter.operator || !newFilter.value) return

    const field = fields.find(f => f.key === newFilter.field)
    if (!field) return

    const filterValue: FilterValue = {
      field: newFilter.field,
      operator: newFilter.operator,
      value: newFilter.operator === 'between' ? [newFilter.value, newFilter.value2] : newFilter.value,
      label: `${field.label} ${operators[field.type].find(op => op.value === newFilter.operator)?.label} ${
        newFilter.operator === 'between' ? `${newFilter.value} - ${newFilter.value2}` : newFilter.value
      }`
    }

    const updatedFilters = [...filters, filterValue]
    setFilters(updatedFilters)
    onFiltersChange(updatedFilters)
    
    // Reset form
    setNewFilter({ field: '', operator: '', value: '', value2: '' })
  }

  const removeFilter = (index: number) => {
    const updatedFilters = filters.filter((_, i) => i !== index)
    setFilters(updatedFilters)
    onFiltersChange(updatedFilters)
  }

  const clearAllFilters = () => {
    setFilters([])
    onFiltersChange([])
    setNewFilter({ field: '', operator: '', value: '', value2: '' })
  }

  const selectedField = fields.find(f => f.key === newFilter.field)
  const availableOperators = selectedField ? operators[selectedField.type] : []

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Filter Controls */}
      <div className="flex items-center gap-2 flex-wrap">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Add Filter
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-4" align="start">
            <div className="space-y-4">
              <div className="font-medium text-sm">Add New Filter</div>
              
              {/* Field Selection */}
              <div className="space-y-2">
                <Label htmlFor="field">Field</Label>
                <Select 
                  value={newFilter.field} 
                  onValueChange={(value) => setNewFilter({ ...newFilter, field: value, operator: '', value: '', value2: '' })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select field..." />
                  </SelectTrigger>
                  <SelectContent>
                    {fields.map(field => (
                      <SelectItem key={field.key} value={field.key}>
                        {field.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Operator Selection */}
              {selectedField && (
                <div className="space-y-2">
                  <Label htmlFor="operator">Condition</Label>
                  <Select 
                    value={newFilter.operator} 
                    onValueChange={(value) => setNewFilter({ ...newFilter, operator: value, value: '', value2: '' })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition..." />
                    </SelectTrigger>
                    <SelectContent>
                      {availableOperators.map(op => (
                        <SelectItem key={op.value} value={op.value}>
                          {op.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Value Input */}
              {selectedField && newFilter.operator && (
                <div className="space-y-2">
                  <Label htmlFor="value">Value</Label>
                  {selectedField.type === 'select' ? (
                    <Select 
                      value={newFilter.value} 
                      onValueChange={(value) => setNewFilter({ ...newFilter, value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select value..." />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedField.options?.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : selectedField.type === 'boolean' ? (
                    <Select 
                      value={newFilter.value} 
                      onValueChange={(value) => setNewFilter({ ...newFilter, value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select value..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="space-y-2">
                      <Input
                        type={selectedField.type === 'date' ? 'date' : selectedField.type === 'number' ? 'number' : 'text'}
                        value={newFilter.value}
                        onChange={(e) => setNewFilter({ ...newFilter, value: e.target.value })}
                        placeholder={selectedField.placeholder || `Enter ${selectedField.label.toLowerCase()}...`}
                      />
                      {newFilter.operator === 'between' && (
                        <Input
                          type={selectedField.type === 'date' ? 'date' : selectedField.type === 'number' ? 'number' : 'text'}
                          value={newFilter.value2}
                          onChange={(e) => setNewFilter({ ...newFilter, value2: e.target.value })}
                          placeholder={`To ${selectedField.label.toLowerCase()}...`}
                        />
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Add Button */}
              <Button 
                onClick={addFilter} 
                disabled={!newFilter.field || !newFilter.operator || !newFilter.value || (newFilter.operator === 'between' && !newFilter.value2)}
                className="w-full"
                size="sm"
              >
                Add Filter
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {filters.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}

        {filters.length > 0 && (
          <span className="text-sm text-gray-500">
            {filters.length} filter{filters.length !== 1 ? 's' : ''} applied
          </span>
        )}
      </div>

      {/* Active Filters */}
      {filters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.map((filter, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-2 pr-1">
              <span className="text-xs">{filter.label}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => removeFilter(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
