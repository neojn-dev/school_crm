"use client"

import { useState, useRef } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { faker } from "@faker-js/faker"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formLibrarySchema, type FormLibraryFormData } from "@/lib/validations/form-library"
import { toast } from "sonner"
import { 
  Loader2, 
  Wand2, 
  X, 
  Upload, 
  Palette, 
  Star,
  FileText,
  Calendar,
  Clock,
  Hash,
  Type,
  CheckSquare,
  CircleDot,
  Image,
  File,
  Settings,
  Eye,
  EyeOff
} from "lucide-react"
import { motion } from "framer-motion"

interface FormLibraryFormProps {
  initialData?: Partial<FormLibraryFormData>
  onSubmit: (data: FormLibraryFormData) => Promise<void>
  submitLabel?: string
  isLoading?: boolean
}

export function FormLibraryForm({ 
  initialData, 
  onSubmit, 
  submitLabel = "Save Form", 
  isLoading = false 
}: FormLibraryFormProps) {
  const [tags, setTags] = useState<string[]>(initialData?.tagsField || [])
  const [newTag, setNewTag] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const submitButtonRef = useRef<HTMLButtonElement>(null)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormLibraryFormData>({
    resolver: zodResolver(formLibrarySchema),
    defaultValues: {
      isActive: true,
      category: "Basic",
      fieldType: "input",
      switchField: false,
      checkboxField: false,
      tagsField: [],
      checkboxGroup: [],
      multiSelect: [],
      multiInputField: [],
      ...initialData,
    }
  })

  const watchedValues = watch()

  // Prevent double-click on submit
  const handleSubmitClick = (e: React.MouseEvent) => {
    if (submitButtonRef.current) {
      submitButtonRef.current.disabled = true
      setTimeout(() => {
        if (submitButtonRef.current) {
          submitButtonRef.current.disabled = false
        }
      }, 2000)
    }
  }

  const fillDummyData = () => {
    const dummyData: FormLibraryFormData = {
      title: faker.lorem.words(3),
      description: faker.lorem.paragraph(),
      category: faker.helpers.arrayElement(["Basic", "Advanced", "Specialized"] as const),
      textField: faker.lorem.words(2),
      emailField: faker.internet.email(),
      passwordField: faker.internet.password(),
      phoneField: faker.phone.number(),
      urlField: faker.internet.url(),
      searchField: faker.lorem.word(),
      textareaField: faker.lorem.paragraph(),
      richTextField: faker.lorem.paragraphs(2),
      numberField: parseFloat(faker.finance.amount()),
      integerField: faker.number.int({ min: 1, max: 1000 }),
      rangeField: faker.number.int({ min: 0, max: 100 }),
      sliderValue: faker.number.float({ min: 0, max: 100 }),
      dateField: faker.date.past(),
      timeField: faker.date.recent().toTimeString().slice(0, 5),
      dateTimeField: faker.date.recent(),
      monthField: faker.date.recent().toISOString().slice(0, 7),
      weekField: `2024-W${faker.number.int({ min: 1, max: 52 }).toString().padStart(2, '0')}`,
      singleSelect: faker.helpers.arrayElement(["Option A", "Option B", "Option C"]),
      multiSelect: faker.helpers.arrayElements(["Choice 1", "Choice 2", "Choice 3", "Choice 4"], { min: 1, max: 3 }),
      radioSelection: faker.helpers.arrayElement(["Radio A", "Radio B", "Radio C"]),
      checkboxGroup: faker.helpers.arrayElements(["Check 1", "Check 2", "Check 3"], { min: 1, max: 2 }),
      switchField: faker.datatype.boolean(),
      checkboxField: faker.datatype.boolean(),
      colorField: faker.internet.color(),
      ratingField: faker.number.float({ min: 1, max: 5, multipleOf: 0.5 }),
      tagsField: faker.helpers.arrayElements(["tag1", "tag2", "tag3", "tag4"], { min: 1, max: 3 }),
      autocompleteField: faker.lorem.word(),
      comboboxField: faker.lorem.word(),
      multiInputField: faker.helpers.arrayElements(["input1", "input2", "input3"], { min: 1, max: 2 }),
      fieldType: faker.helpers.arrayElement(["input", "select", "textarea", "checkbox", "radio", "file", "date", "time", "datetime-local", "month", "week", "number", "range", "color", "search", "tel", "url", "password", "email", "switch", "slider", "rating", "tags"] as const),
      fieldSize: faker.helpers.arrayElement(["sm", "md", "lg"]),
      fieldWidth: faker.helpers.arrayElement(["full", "half", "third", "quarter"]),
      isRequired: faker.datatype.boolean(),
      placeholder: faker.lorem.words(2),
      helpText: faker.lorem.sentence(),
    }

    Object.entries(dummyData).forEach(([key, value]) => {
      setValue(key as keyof FormLibraryFormData, value, { shouldValidate: true })
    })
    
    setTags(dummyData.tagsField || [])
    toast.success("Form filled with comprehensive dummy data")
  }

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim()) && tags.length < 20) {
      const updatedTags = [...tags, newTag.trim()]
      setTags(updatedTags)
      setValue("tagsField", updatedTags)
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove)
    setTags(updatedTags)
    setValue("tagsField", updatedTags)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, field: keyof FormLibraryFormData) => {
    const files = Array.from(event.target.files || [])
    if (files.length > 0) {
      // Validate file size (10MB max)
      const validFiles = files.filter(file => file.size <= 10 * 1024 * 1024)
      if (validFiles.length !== files.length) {
        toast.error("Some files exceed 10MB limit")
      }
      
      setSelectedFiles(validFiles)
      setValue(field, validFiles.map(f => f.name).join(", "))
    }
  }

  const onFormSubmit = async (data: FormLibraryFormData) => {
    try {
      console.log("Submitting form library data:", data)
      await onSubmit(data)
    } catch (error) {
      console.error("Form submission error:", error)
      toast.error("Failed to submit form. Please check the console for details.")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="card-custom">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Form Library Template</CardTitle>
              <CardDescription className="text-lg">
                Comprehensive collection of all HTML input field types with validation
              </CardDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={fillDummyData}
              className="flex items-center space-x-2"
            >
              <Wand2 className="h-4 w-4" />
              <span>Fill Demo Data</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic" className="flex items-center space-x-2">
                  <Type className="h-4 w-4" />
                  <span>Basic</span>
                </TabsTrigger>
                <TabsTrigger value="advanced" className="flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Advanced</span>
                </TabsTrigger>
                <TabsTrigger value="specialized" className="flex items-center space-x-2">
                  <Hash className="h-4 w-4" />
                  <span>Specialized</span>
                </TabsTrigger>
                <TabsTrigger value="metadata" className="flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Metadata</span>
                </TabsTrigger>
              </TabsList>

              {/* Basic Fields Tab */}
              <TabsContent value="basic" className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        placeholder="Enter form title"
                        {...register("title")}
                        className={errors.title ? "border-red-500" : ""}
                      />
                      {errors.title && (
                        <p className="text-sm text-red-500">{errors.title.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Category *</Label>
                      <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Basic">Basic</SelectItem>
                              <SelectItem value="Advanced">Advanced</SelectItem>
                              <SelectItem value="Specialized">Specialized</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.category && (
                        <p className="text-sm text-red-500">{errors.category.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Enter form description"
                        rows={3}
                        {...register("description")}
                        className={errors.description ? "border-red-500" : ""}
                      />
                      {errors.description && (
                        <p className="text-sm text-red-500">{errors.description.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Text Fields */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Type className="h-5 w-5 mr-2" />
                    Text Input Fields
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="textField">Text Field</Label>
                      <Input
                        id="textField"
                        placeholder="Enter text"
                        {...register("textField")}
                        className={errors.textField ? "border-red-500" : ""}
                      />
                      {errors.textField && (
                        <p className="text-sm text-red-500">{errors.textField.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="emailField">Email Field</Label>
                      <Input
                        id="emailField"
                        type="email"
                        placeholder="Enter email"
                        {...register("emailField")}
                        className={errors.emailField ? "border-red-500" : ""}
                      />
                      {errors.emailField && (
                        <p className="text-sm text-red-500">{errors.emailField.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="passwordField">Password Field</Label>
                      <div className="relative">
                        <Input
                          id="passwordField"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          {...register("passwordField")}
                          className={errors.passwordField ? "border-red-500 pr-10" : "pr-10"}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {errors.passwordField && (
                        <p className="text-sm text-red-500">{errors.passwordField.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phoneField">Phone Field</Label>
                      <Input
                        id="phoneField"
                        type="tel"
                        placeholder="Enter phone number"
                        {...register("phoneField")}
                        className={errors.phoneField ? "border-red-500" : ""}
                      />
                      {errors.phoneField && (
                        <p className="text-sm text-red-500">{errors.phoneField.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="urlField">URL Field</Label>
                      <Input
                        id="urlField"
                        type="url"
                        placeholder="https://example.com"
                        {...register("urlField")}
                        className={errors.urlField ? "border-red-500" : ""}
                      />
                      {errors.urlField && (
                        <p className="text-sm text-red-500">{errors.urlField.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="searchField">Search Field</Label>
                      <Input
                        id="searchField"
                        type="search"
                        placeholder="Search..."
                        {...register("searchField")}
                        className={errors.searchField ? "border-red-500" : ""}
                      />
                      {errors.searchField && (
                        <p className="text-sm text-red-500">{errors.searchField.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="textareaField">Textarea Field</Label>
                      <Textarea
                        id="textareaField"
                        placeholder="Enter long text"
                        rows={4}
                        {...register("textareaField")}
                        className={errors.textareaField ? "border-red-500" : ""}
                      />
                      {errors.textareaField && (
                        <p className="text-sm text-red-500">{errors.textareaField.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Advanced Fields Tab */}
              <TabsContent value="advanced" className="space-y-6">
                {/* Numeric Fields */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Hash className="h-5 w-5 mr-2" />
                    Numeric Input Fields
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="numberField">Number Field</Label>
                      <Input
                        id="numberField"
                        type="number"
                        step="0.01"
                        placeholder="Enter number"
                        {...register("numberField", { valueAsNumber: true })}
                        className={errors.numberField ? "border-red-500" : ""}
                      />
                      {errors.numberField && (
                        <p className="text-sm text-red-500">{errors.numberField.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="integerField">Integer Field</Label>
                      <Input
                        id="integerField"
                        type="number"
                        step="1"
                        placeholder="Enter integer"
                        {...register("integerField", { valueAsNumber: true })}
                        className={errors.integerField ? "border-red-500" : ""}
                      />
                      {errors.integerField && (
                        <p className="text-sm text-red-500">{errors.integerField.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="rangeField">Range Field: {watchedValues.rangeField || 0}</Label>
                      <Input
                        id="rangeField"
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        {...register("rangeField", { valueAsNumber: true })}
                        className="w-full"
                      />
                      {errors.rangeField && (
                        <p className="text-sm text-red-500">{errors.rangeField.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Slider Value: {watchedValues.sliderValue || 0}</Label>
                      <Controller
                        name="sliderValue"
                        control={control}
                        render={({ field }) => (
                          <Slider
                            min={0}
                            max={100}
                            step={1}
                            value={[field.value || 0]}
                            onValueChange={(value) => field.onChange(value[0])}
                            className="w-full"
                          />
                        )}
                      />
                      {errors.sliderValue && (
                        <p className="text-sm text-red-500">{errors.sliderValue.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Date & Time Fields */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Date & Time Fields
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dateField">Date Field</Label>
                      <Input
                        id="dateField"
                        type="date"
                        {...register("dateField")}
                        className={errors.dateField ? "border-red-500" : ""}
                      />
                      {errors.dateField && (
                        <p className="text-sm text-red-500">{errors.dateField.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timeField">Time Field</Label>
                      <Input
                        id="timeField"
                        type="time"
                        {...register("timeField")}
                        className={errors.timeField ? "border-red-500" : ""}
                      />
                      {errors.timeField && (
                        <p className="text-sm text-red-500">{errors.timeField.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dateTimeField">Date & Time Field</Label>
                      <Input
                        id="dateTimeField"
                        type="datetime-local"
                        {...register("dateTimeField")}
                        className={errors.dateTimeField ? "border-red-500" : ""}
                      />
                      {errors.dateTimeField && (
                        <p className="text-sm text-red-500">{errors.dateTimeField.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="monthField">Month Field</Label>
                      <Input
                        id="monthField"
                        type="month"
                        {...register("monthField")}
                        className={errors.monthField ? "border-red-500" : ""}
                      />
                      {errors.monthField && (
                        <p className="text-sm text-red-500">{errors.monthField.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="weekField">Week Field</Label>
                      <Input
                        id="weekField"
                        type="week"
                        {...register("weekField")}
                        className={errors.weekField ? "border-red-500" : ""}
                      />
                      {errors.weekField && (
                        <p className="text-sm text-red-500">{errors.weekField.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Specialized Fields Tab */}
              <TabsContent value="specialized" className="space-y-6">
                {/* Selection Fields */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <CheckSquare className="h-5 w-5 mr-2" />
                    Selection Fields
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Single Select</Label>
                      <Controller
                        name="singleSelect"
                        control={control}
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Option A">Option A</SelectItem>
                              <SelectItem value="Option B">Option B</SelectItem>
                              <SelectItem value="Option C">Option C</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Radio Selection</Label>
                      <Controller
                        name="radioSelection"
                        control={control}
                        render={({ field }) => (
                          <RadioGroup value={field.value} onValueChange={field.onChange}>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="Radio A" id="radio-a" />
                              <Label htmlFor="radio-a">Radio A</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="Radio B" id="radio-b" />
                              <Label htmlFor="radio-b">Radio B</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="Radio C" id="radio-c" />
                              <Label htmlFor="radio-c">Radio C</Label>
                            </div>
                          </RadioGroup>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Checkbox Group</Label>
                      <div className="space-y-2">
                        {["Check 1", "Check 2", "Check 3"].map((item) => (
                          <div key={item} className="flex items-center space-x-2">
                            <Checkbox
                              id={`checkbox-${item}`}
                              checked={watchedValues.checkboxGroup?.includes(item) || false}
                              onCheckedChange={(checked) => {
                                const current = watchedValues.checkboxGroup || []
                                if (checked) {
                                  setValue("checkboxGroup", [...current, item])
                                } else {
                                  setValue("checkboxGroup", current.filter(i => i !== item))
                                }
                              }}
                            />
                            <Label htmlFor={`checkbox-${item}`}>{item}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Boolean Fields */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <CircleDot className="h-5 w-5 mr-2" />
                    Boolean Fields
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Controller
                        name="switchField"
                        control={control}
                        render={({ field }) => (
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                      <Label>Switch Field</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Controller
                        name="checkboxField"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                      <Label>Checkbox Field</Label>
                    </div>
                  </div>
                </div>

                {/* Special Fields */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Star className="h-5 w-5 mr-2" />
                    Special Fields
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="colorField">Color Picker</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="colorField"
                          type="color"
                          {...register("colorField")}
                          className="w-16 h-10 p-1 border-2"
                        />
                        <Input
                          type="text"
                          placeholder="#000000"
                          {...register("colorField")}
                          className={`flex-1 ${errors.colorField ? "border-red-500" : ""}`}
                        />
                      </div>
                      {errors.colorField && (
                        <p className="text-sm text-red-500">{errors.colorField.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Rating: {watchedValues.ratingField || 0}</Label>
                      <Controller
                        name="ratingField"
                        control={control}
                        render={({ field }) => (
                          <Slider
                            min={0}
                            max={5}
                            step={0.5}
                            value={[field.value || 0]}
                            onValueChange={(value) => field.onChange(value[0])}
                            className="w-full"
                          />
                        )}
                      />
                      {errors.ratingField && (
                        <p className="text-sm text-red-500">{errors.ratingField.message}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* File Upload */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Upload className="h-5 w-5 mr-2" />
                    File Upload Fields
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>General File</Label>
                      <Input
                        type="file"
                        onChange={(e) => handleFileChange(e, "filePath")}
                        accept=".pdf,.doc,.docx,.txt"
                        multiple={false}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Image File</Label>
                      <Input
                        type="file"
                        onChange={(e) => handleFileChange(e, "imagePath")}
                        accept=".jpg,.jpeg,.png,.gif,.webp"
                        multiple={false}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Document File</Label>
                      <Input
                        type="file"
                        onChange={(e) => handleFileChange(e, "documentPath")}
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                        multiple={false}
                      />
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Hash className="h-5 w-5 mr-2" />
                    Tags Field
                  </h3>
                  <div className="space-y-2">
                    <Label>Add Tags</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="Enter tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                        className="flex-1"
                      />
                      <Button type="button" onClick={handleAddTag} size="sm">
                        Add
                      </Button>
                    </div>
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                            <span>{tag}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveTag(tag)}
                              className="ml-1 hover:text-red-500"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Metadata Tab */}
              <TabsContent value="metadata" className="space-y-6">
                {/* Field Configuration */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Field Configuration
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Field Type *</Label>
                      <Controller
                        name="fieldType"
                        control={control}
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className={errors.fieldType ? "border-red-500" : ""}>
                              <SelectValue placeholder="Select field type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="input">Input</SelectItem>
                              <SelectItem value="select">Select</SelectItem>
                              <SelectItem value="textarea">Textarea</SelectItem>
                              <SelectItem value="checkbox">Checkbox</SelectItem>
                              <SelectItem value="radio">Radio</SelectItem>
                              <SelectItem value="file">File</SelectItem>
                              <SelectItem value="date">Date</SelectItem>
                              <SelectItem value="time">Time</SelectItem>
                              <SelectItem value="datetime-local">DateTime</SelectItem>
                              <SelectItem value="month">Month</SelectItem>
                              <SelectItem value="week">Week</SelectItem>
                              <SelectItem value="number">Number</SelectItem>
                              <SelectItem value="range">Range</SelectItem>
                              <SelectItem value="color">Color</SelectItem>
                              <SelectItem value="search">Search</SelectItem>
                              <SelectItem value="tel">Tel</SelectItem>
                              <SelectItem value="url">URL</SelectItem>
                              <SelectItem value="password">Password</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="switch">Switch</SelectItem>
                              <SelectItem value="slider">Slider</SelectItem>
                              <SelectItem value="rating">Rating</SelectItem>
                              <SelectItem value="tags">Tags</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.fieldType && (
                        <p className="text-sm text-red-500">{errors.fieldType.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Field Size</Label>
                      <Controller
                        name="fieldSize"
                        control={control}
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="sm">Small</SelectItem>
                              <SelectItem value="md">Medium</SelectItem>
                              <SelectItem value="lg">Large</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Field Width</Label>
                      <Controller
                        name="fieldWidth"
                        control={control}
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select width" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="full">Full Width</SelectItem>
                              <SelectItem value="half">Half Width</SelectItem>
                              <SelectItem value="third">Third Width</SelectItem>
                              <SelectItem value="quarter">Quarter Width</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Input Mode</Label>
                      <Controller
                        name="inputMode"
                        control={control}
                        render={({ field }) => (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select input mode" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="text">Text</SelectItem>
                              <SelectItem value="numeric">Numeric</SelectItem>
                              <SelectItem value="decimal">Decimal</SelectItem>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="tel">Tel</SelectItem>
                              <SelectItem value="url">URL</SelectItem>
                              <SelectItem value="search">Search</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Validation & Help */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Validation & Help
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Controller
                        name="isRequired"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                      <Label>Required Field</Label>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="placeholder">Placeholder Text</Label>
                      <Input
                        id="placeholder"
                        placeholder="Enter placeholder text"
                        {...register("placeholder")}
                        className={errors.placeholder ? "border-red-500" : ""}
                      />
                      {errors.placeholder && (
                        <p className="text-sm text-red-500">{errors.placeholder.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="helpText">Help Text</Label>
                      <Textarea
                        id="helpText"
                        placeholder="Enter help text"
                        rows={2}
                        {...register("helpText")}
                        className={errors.helpText ? "border-red-500" : ""}
                      />
                      {errors.helpText && (
                        <p className="text-sm text-red-500">{errors.helpText.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cssClass">CSS Classes</Label>
                      <Input
                        id="cssClass"
                        placeholder="Enter CSS classes"
                        {...register("cssClass")}
                        className={errors.cssClass ? "border-red-500" : ""}
                      />
                      {errors.cssClass && (
                        <p className="text-sm text-red-500">{errors.cssClass.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button type="button" variant="outline" onClick={() => reset()}>
                Reset Form
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="min-w-[120px]"
                ref={submitButtonRef}
                onClick={handleSubmitClick}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {submitLabel}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
