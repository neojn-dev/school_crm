import { z } from "zod"

export const formLibrarySchema = z.object({
  // Basic Information
  title: z.string().min(1, "Title is required").max(200, "Title must be less than 200 characters"),
  description: z.string().max(2000, "Description must be less than 2000 characters").optional(),
  category: z.enum(["Basic", "Advanced", "Specialized"], {
    errorMap: () => ({ message: "Category must be Basic, Advanced, or Specialized" })
  }),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
  
  // Text Fields
  textField: z.string().max(255, "Text field must be less than 255 characters").optional(),
  emailField: z.string().email("Invalid email address").max(255, "Email must be less than 255 characters").optional(),
  passwordField: z.string().max(255, "Password must be less than 255 characters").optional(),
  phoneField: z.string().max(20, "Phone must be less than 20 characters").optional(),
  urlField: z.string().url("Invalid URL").max(500, "URL must be less than 500 characters").optional(),
  searchField: z.string().max(255, "Search field must be less than 255 characters").optional(),
  textareaField: z.string().max(10000, "Textarea must be less than 10000 characters").optional(),
  richTextField: z.string().max(50000, "Rich text must be less than 50000 characters").optional(),
  
  // Numeric Fields
  numberField: z.number().min(-999999.99).max(999999.99).optional(),
  integerField: z.number().int().min(-2147483648).max(2147483647).optional(),
  rangeField: z.number().int().min(0).max(100).optional(),
  sliderValue: z.number().min(0).max(100).optional(),
  
  // Date & Time Fields
  dateField: z.date().optional(),
  timeField: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)").optional(),
  dateTimeField: z.date().optional(),
  monthField: z.string().regex(/^\d{4}-\d{2}$/, "Invalid month format (YYYY-MM)").optional(),
  weekField: z.string().regex(/^\d{4}-W\d{2}$/, "Invalid week format (YYYY-WNN)").optional(),
  
  // Selection Fields
  singleSelect: z.string().max(100, "Single select must be less than 100 characters").optional(),
  multiSelect: z.array(z.string()).max(10, "Maximum 10 multi-select items").optional(),
  radioSelection: z.string().max(100, "Radio selection must be less than 100 characters").optional(),
  checkboxGroup: z.array(z.string()).max(10, "Maximum 10 checkbox items").optional(),
  
  // Boolean Fields
  switchField: z.boolean().default(false),
  checkboxField: z.boolean().default(false),
  
  // File & Media Fields
  filePath: z.string().max(500, "File path must be less than 500 characters").optional(),
  imagePath: z.string().max(500, "Image path must be less than 500 characters").optional(),
  documentPath: z.string().max(500, "Document path must be less than 500 characters").optional(),
  
  // Special Fields
  colorField: z.string().regex(/^#[0-9A-F]{6}$/i, "Invalid hex color format").optional(),
  ratingField: z.number().min(0).max(5).optional(),
  tagsField: z.array(z.string()).max(20, "Maximum 20 tags").optional(),
  
  // Advanced Fields
  autocompleteField: z.string().max(255, "Autocomplete field must be less than 255 characters").optional(),
  comboboxField: z.string().max(255, "Combobox field must be less than 255 characters").optional(),
  multiInputField: z.array(z.string()).max(10, "Maximum 10 multi-input items").optional(),
  
  // Validation & Metadata
  isRequired: z.boolean().default(false),
  minLength: z.number().int().min(0).max(10000).optional(),
  maxLength: z.number().int().min(0).max(10000).optional(),
  minValue: z.number().min(-999999.99).max(999999.99).optional(),
  maxValue: z.number().min(-999999.99).max(999999.99).optional(),
  pattern: z.string().max(200, "Pattern must be less than 200 characters").optional(),
  placeholder: z.string().max(255, "Placeholder must be less than 255 characters").optional(),
  helpText: z.string().max(1000, "Help text must be less than 1000 characters").optional(),
  
  // Field Configuration
  fieldType: z.enum([
    "input", "select", "textarea", "checkbox", "radio", "file", "date", "time", 
    "datetime-local", "month", "week", "number", "range", "color", "search", 
    "tel", "url", "password", "email", "switch", "slider", "rating", "tags"
  ]),
  inputMode: z.enum(["text", "numeric", "decimal", "email", "tel", "url", "search"]).optional(),
  step: z.number().min(0.01).max(1000).optional(),
  multiple: z.boolean().default(false),
  
  // Conditional Logic
  dependsOn: z.string().max(100, "Dependency field must be less than 100 characters").optional(),
  condition: z.string().max(200, "Condition must be less than 200 characters").optional(),
  isVisible: z.boolean().default(true),
  isDisabled: z.boolean().default(false),
  
  // Styling & Layout
  fieldSize: z.enum(["sm", "md", "lg"]).optional(),
  fieldWidth: z.enum(["full", "half", "third", "quarter"]).optional(),
  cssClass: z.string().max(200, "CSS class must be less than 200 characters").optional(),
})

export type FormLibraryFormData = z.infer<typeof formLibrarySchema>

export const formLibraryCreateSchema = formLibrarySchema

export const formLibraryUpdateSchema = formLibrarySchema.partial().extend({
  id: z.string().cuid(),
})

export const formLibraryBulkImportSchema = z.object({
  data: z.array(formLibrarySchema),
  mapping: z.record(z.string()).optional(),
})

export type FormLibraryBulkImport = z.infer<typeof formLibraryBulkImportSchema>
