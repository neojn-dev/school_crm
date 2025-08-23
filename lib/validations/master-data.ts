import { z } from "zod"

export const masterDataSchema = z.object({
  // Basic Information
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  description: z.string().max(2000, "Description must be less than 2000 characters").optional(),
  category: z.enum(["Basic", "Advanced", "Specialized"], {
    errorMap: () => ({ message: "Category must be Basic, Advanced, or Specialized" })
  }),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
  
  // Text Fields
  textField: z.string().max(255, "Text field must be less than 255 characters").optional().or(z.literal("")),
  emailField: z.string().email("Invalid email address").max(255, "Email must be less than 255 characters").optional().or(z.literal("")),
  phoneField: z.string().max(50, "Phone must be less than 50 characters").optional().or(z.literal("")),
  urlField: z.string().url("Invalid URL").max(500, "URL must be less than 500 characters").optional().or(z.literal("")),
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
  
  // File & Media Fields
  filePath: z.string().max(500, "File path must be less than 500 characters").optional().or(z.literal("")),
  imagePath: z.string().max(500, "Image path must be less than 500 characters").optional().or(z.literal("")),
  documentPath: z.string().max(500, "Document path must be less than 500 characters").optional().or(z.literal("")),
  
  // Special Fields
  colorField: z.string().regex(/^#[0-9A-F]{6}$/i, "Invalid hex color format").optional().or(z.literal("")),
  ratingField: z.union([z.number(), z.string().transform(val => val === "" ? undefined : parseFloat(val))]).optional(),
  tagsField: z.array(z.string()).max(20, "Maximum 20 tags").optional(),
  
  // Advanced Fields
  autocompleteField: z.string().max(255, "Autocomplete field must be less than 255 characters").optional().or(z.literal("")),
  comboboxField: z.string().max(255, "Combobox field must be less than 255 characters").optional().or(z.literal("")),
  multiInputField: z.array(z.string()).max(10, "Maximum 10 multi-input items").optional(),
  
  // Required Fields (from database schema)
  fieldType: z.string().min(1, "Field type is required").max(50, "Field type must be less than 50 characters"),
  
  // Additional fields from database schema
  isRequired: z.boolean().default(false),
  minLength: z.union([z.number(), z.string().transform(val => val === "" ? undefined : parseInt(val))]).optional(),
  maxLength: z.union([z.number(), z.string().transform(val => val === "" ? undefined : parseInt(val))]).optional(),
  minValue: z.union([z.number(), z.string().transform(val => val === "" ? undefined : parseFloat(val))]).optional(),
  maxValue: z.union([z.number(), z.string().transform(val => val === "" ? undefined : parseFloat(val))]).optional(),
  pattern: z.string().max(200, "Pattern must be less than 200 characters").optional().or(z.literal("")),
  placeholder: z.string().max(255, "Placeholder must be less than 255 characters").optional().or(z.literal("")),
  helpText: z.string().max(2000, "Help text must be less than 2000 characters").optional().or(z.literal("")),
  inputMode: z.string().max(20, "Input mode must be less than 20 characters").optional().or(z.literal("")),
  step: z.union([z.number(), z.string().transform(val => val === "" ? undefined : parseFloat(val))]).optional(),
  multiple: z.boolean().default(false),
  dependsOn: z.string().max(100, "Depends on must be less than 100 characters").optional().or(z.literal("")),
  condition: z.string().max(200, "Condition must be less than 200 characters").optional().or(z.literal("")),
  isVisible: z.boolean().default(true),
  isDisabled: z.boolean().default(false),
  fieldSize: z.string().max(20, "Field size must be less than 20 characters").optional().or(z.literal("")),
  fieldWidth: z.string().max(20, "Field width must be less than 20 characters").optional().or(z.literal("")),
  cssClass: z.string().max(200, "CSS class must be less than 200 characters").optional().or(z.literal("")),
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
