"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Shield, Loader2 } from "lucide-react"

interface Role {
  id: string
  name: string
  description?: string
  isActive: boolean
}

interface RoleSelectProps {
  value?: string
  onValueChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  showDescription?: boolean
  activeOnly?: boolean
  allowEmpty?: boolean
}

export function RoleSelect({ 
  value, 
  onValueChange, 
  placeholder = "Select a role...",
  disabled = false,
  showDescription = true,
  activeOnly = true,
  allowEmpty = true
}: RoleSelectProps) {
  const { data: session, status } = useSession()
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'authenticated') {
      fetchRoles()
    } else if (status === 'unauthenticated') {
      setLoading(false)
      setError('Authentication required')
    }
  }, [activeOnly, status])

  const fetchRoles = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const params = new URLSearchParams({
        page: '1', // Required by API validation
        limit: '100', // Get all roles for dropdown
        sortBy: 'name',
        sortOrder: 'asc',
      })
      
      if (activeOnly) {
        params.set('isActive', 'true')
      }
      
      const response = await fetch(`/api/roles?${params.toString()}`, {
        credentials: 'include'
      })
      
      if (response.ok) {
        const result = await response.json()
        if (result.data && Array.isArray(result.data)) {
          setRoles(result.data)
        } else {
          setError('Invalid data format received from API')
          setRoles([])
        }
      } else {
        const errorText = await response.text()
        setError(`Failed to fetch roles: ${response.status} - ${errorText}`)
        setRoles([])
      }
    } catch (error) {
      setError(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setRoles([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Select disabled>
        <SelectTrigger>
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading roles...</span>
          </div>
        </SelectTrigger>
      </Select>
    )
  }

  if (error) {
    return (
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder={error.includes('Authentication') ? "Please sign in" : "Error loading roles"} />
        </SelectTrigger>
      </Select>
    )
  }

  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {allowEmpty && (
          <SelectItem value="none">
            <span className="text-gray-500 italic">No role assigned</span>
          </SelectItem>
        )}
        {roles.length === 0 ? (
          <SelectItem value="no-roles" disabled>
            No roles available
          </SelectItem>
        ) : (
          roles.map((role) => (
            <SelectItem key={role.id} value={role.id}>
              <div className="flex items-center gap-2 w-full">
                <Shield className="h-4 w-4 text-purple-600" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{role.name}</span>
                    {!role.isActive && (
                      <Badge variant="secondary" className="text-xs">
                        Inactive
                      </Badge>
                    )}
                  </div>
                  {showDescription && role.description && (
                    <div className="text-xs text-gray-500 mt-1">
                      {role.description}
                    </div>
                  )}
                </div>
              </div>
            </SelectItem>
          ))
        )}
      </SelectContent>
    </Select>
  )
}
