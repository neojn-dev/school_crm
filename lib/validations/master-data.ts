import { z } from "zod"

export const masterDataSchema = z.object({
  // Basic Information
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  description: z.string().max(10000, "Description must be less than 10000 characters").optional().or(z.literal("")),
  category: z.enum(["Basic", "Advanced", "Specialized"], {
    errorMap: () => ({ message: "Category must be Basic, Advanced, or Specialized" })
  }),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
  
  // Text Fields
  textField: z.string().max(255, "Text field must be less than 255 characters").optional().or(z.literal("")),
  emailField: z.string().max(255, "Email must be less than 255 characters").optional().or(z.literal("")),
  phoneField: z.string().max(50, "Phone must be less than 50 characters").optional().or(z.literal("")),
  urlField: z.string().max(500, "URL must be less than 500 characters").optional().or(z.literal("")),
  searchField: z.string().max(255, "Search field must be less than 255 characters").optional().or(z.literal("")),
  textareaField: z.string().max(10000, "Textarea must be less than 10000 characters").optional().or(z.literal("")),
  richTextField: z.string().max(50000, "Rich text must be less than 50000 characters").optional().or(z.literal("")),
  
  // Numeric Fields
  numberField: z.union([z.number(), z.string().transform(val => val === "" ? undefined : parseFloat(val))]).optional(),
  integerField: z.union([z.number(), z.string().transform(val => val === "" ? undefined : parseInt(val))]).optional(),
  rangeField: z.union([z.number(), z.string().transform(val => val === "" ? 50 : parseInt(val))]).optional(),
  sliderValue: z.union([z.number(), z.string().transform(val => val === "" ? 50 : parseFloat(val))]).optional(),
  
  // Date & Time Fields
  dateField: z.union([z.date(), z.string().transform(val => val === "" ? undefined : new Date(val))]).optional(),
  timeField: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)").optional().or(z.literal("")),
  dateTimeField: z.union([z.date(), z.string().transform(val => val === "" ? undefined : new Date(val))]).optional(),
  monthField: z.string().regex(/^\d{4}-\d{2}$/, "Invalid month format (YYYY-MM)").optional().or(z.literal("")),
  weekField: z.string().regex(/^\d{4}-W\d{2}$/, "Invalid week format (YYYY-WNN)").optional().or(z.literal("")),
  
  // Selection Fields
  singleSelect: z.string().max(100, "Single select must be less than 100 characters").optional().or(z.literal("")),
  multiSelect: z.array(z.string()).max(10, "Maximum 10 multi-select items").optional(),
  radioSelection: z.string().max(100, "Radio selection must be less than 100 characters").optional().or(z.literal("")),
  checkboxGroup: z.array(z.string()).max(10, "Maximum 10 checkbox items").optional(),
  
  // Boolean Fields
  switchField: z.boolean().default(false),
  checkboxField: z.boolean().default(false),
  
  // Special Fields
  colorField: z.string().regex(/^#[0-9A-F]{6}$/i, "Invalid hex color format").optional().or(z.literal("")),
  ratingField: z.union([z.number(), z.string().transform(val => val === "" ? undefined : parseFloat(val))]).optional(),
  tagsField: z.array(z.string()).max(20, "Maximum 20 tags").optional(),
  
  // Required Fields (from database schema)
  fieldType: z.string().min(1, "Field type is required").max(50, "Field type must be less than 50 characters"),
})

export type MasterDataFormData = z.infer<typeof masterDataSchema>

export const masterDataCreateSchema = masterDataSchema

export const masterDataUpdateSchema = masterDataSchema.partial().extend({
  id: z.string().cuid(),
})

export const masterDataBulkImportSchema = z.object({
  data: z.array(masterDataSchema),
  mapping: z.record(z.string()).optional(),
})

export type MasterDataBulkImport = z.infer<typeof masterDataBulkImportSchema>
