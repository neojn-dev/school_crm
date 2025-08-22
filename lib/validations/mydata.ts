import { z } from "zod"

export const myDataSchema = z.object({
  // Text fields
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().min(1, "Description is required").max(1000, "Description must be less than 1000 characters"),
  
  // User fields
  name: z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional().refine((val) => !val || /^\+?[\d\s\-\(\)]+$/.test(val), {
    message: "Invalid phone number format"
  }),
  
  // Security fields (demo only)
  passwordHash: z.string().optional(),
  
  // Typed fields
  age: z.number().int().min(0, "Age must be positive").max(150, "Age must be realistic").optional(),
  balance: z.number().min(0, "Balance must be positive").optional(),
  rating: z.number().min(0, "Rating must be at least 0").max(5, "Rating must be at most 5").optional(),
  isActive: z.boolean().default(true),
  
  // Enums
  category: z.enum(["A", "B", "C"], {
    required_error: "Please select a category",
  }),
  
  // Dates
  dateOnly: z.string().optional().refine((val) => !val || /^\d{4}-\d{2}-\d{2}$/.test(val), {
    message: "Invalid date format (YYYY-MM-DD)"
  }),
  dateTime: z.string().optional().refine((val) => !val || !isNaN(Date.parse(val)), {
    message: "Invalid datetime format"
  }),
  timeOnly: z.string().optional().refine((val) => !val || /^\d{2}:\d{2}$/.test(val), {
    message: "Invalid time format (HH:MM)"
  }),
  
  // URLs
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
  avatarUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  
  // Media
  filePath: z.string().optional(),
  
  // Arrays/tags (stored as JSON)
  tags: z.array(z.string()).default([]),
  
  // Color
  color: z.string().regex(/^#[0-9A-F]{6}$/i, "Invalid hex color").optional(),
})

export type MyDataFormData = z.infer<typeof myDataSchema>

export const myDataCreateSchema = myDataSchema

export const myDataUpdateSchema = myDataSchema.partial().extend({
  id: z.string().cuid(),
})

export const myDataBulkImportSchema = z.object({
  data: z.array(myDataSchema.omit({ filePath: true })),
  mapping: z.record(z.string()).optional(),
})

export type MyDataBulkImport = z.infer<typeof myDataBulkImportSchema>
