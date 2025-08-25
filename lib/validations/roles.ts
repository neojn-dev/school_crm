import { z } from "zod"

export const roleSchema = z.object({
  name: z.string()
    .min(1, "Role name is required")
    .max(50, "Role name must be less than 50 characters")
    .regex(/^[a-zA-Z0-9\s\-_]+$/, "Role name can only contain letters, numbers, spaces, hyphens, and underscores"),
  description: z.string()
    .max(255, "Description must be less than 255 characters")
    .optional(),
  permissions: z.string()
    .optional()
    .refine((val) => {
      if (!val) return true
      try {
        const parsed = JSON.parse(val)
        return Array.isArray(parsed) && parsed.every(p => typeof p === 'string')
      } catch {
        return false
      }
    }, "Permissions must be a valid JSON array of strings"),
  isActive: z.boolean().default(true),
})

export const createRoleSchema = roleSchema

export const updateRoleSchema = roleSchema.partial().extend({
  id: z.string().cuid("Invalid role ID format"),
})

export const roleIdSchema = z.object({
  id: z.string().cuid("Invalid role ID format"),
})

// Helper function to validate permissions array
export const validatePermissions = (permissions: string[]): boolean => {
  const validPermissions = ['read', 'write', 'delete', 'admin', 'manage_users', 'manage_roles']
  return permissions.every(permission => validPermissions.includes(permission))
}

// Query schema for roles API
export const roleQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().nullish().transform(val => val || undefined),
  isActive: z.enum(['true', 'false']).nullish().transform(val => val || undefined),
  sortBy: z.enum(['name', 'description', 'createdAt', 'updatedAt']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

// Helper function to get default permissions for role types
export const getDefaultPermissions = (roleName: string): string[] => {
  const name = roleName.toLowerCase()
  
  if (name.includes('admin')) {
    return ['read', 'write', 'delete', 'admin', 'manage_users', 'manage_roles']
  } else if (name.includes('manager')) {
    return ['read', 'write', 'manage_users']
  } else {
    return ['read']
  }
}

export type Role = z.infer<typeof roleSchema>
export type CreateRole = z.infer<typeof createRoleSchema>
export type UpdateRole = z.infer<typeof updateRoleSchema>
export type RoleId = z.infer<typeof roleIdSchema>
export type RoleQuery = z.infer<typeof roleQuerySchema>
