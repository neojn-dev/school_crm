"use client"

import { useState } from "react"
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

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PasswordInput } from "@/components/forms/password-input"
import { FileInput } from "@/components/forms/file-input"
import { Badge } from "@/components/ui/badge"
import { myDataSchema, type MyDataFormData } from "@/lib/validations/mydata"
import { toast } from "sonner"
import { Loader2, Wand2, X, Upload, Palette } from "lucide-react"
import { motion } from "framer-motion"

interface MyDataFormProps {
  initialData?: Partial<MyDataFormData>
  onSubmit: (data: MyDataFormData) => Promise<void>
  submitLabel?: string
  isLoading?: boolean
}

export function MyDataForm({ 
  initialData, 
  onSubmit, 
  submitLabel = "Save", 
  isLoading = false 
}: MyDataFormProps) {
  const [tags, setTags] = useState<string[]>(initialData?.tags || [])
  const [newTag, setNewTag] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<MyDataFormData>({
    resolver: zodResolver(myDataSchema),
    defaultValues: {
      isActive: true,
      category: "A",
      tags: [],
      ...initialData,
    }
  })

  const watchedValues = watch()

  const fillDummyData = () => {
    const dummyData: MyDataFormData = {
      title: faker.lorem.words(3),
      description: faker.lorem.paragraph(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      passwordHash: faker.internet.password(),
      age: faker.number.int({ min: 18, max: 80 }),
      balance: parseFloat(faker.finance.amount()),
      rating: parseFloat(faker.number.float({ min: 1, max: 5, multipleOf: 0.1 }).toFixed(1)),
      isActive: faker.datatype.boolean(),
      category: faker.helpers.arrayElement(["A", "B", "C"] as const),
      dateOnly: faker.date.past().toISOString().split('T')[0],
      dateTime: faker.date.recent().toISOString().slice(0, 16),
      timeOnly: faker.date.recent().toTimeString().slice(0, 5),
      website: faker.internet.url(),
      avatarUrl: faker.image.avatar(),
      color: faker.internet.color(),
      tags: faker.helpers.arrayElements([
        "important", "urgent", "review", "approved", "pending", "completed", "draft"
      ], { min: 1, max: 4 }),
    }

    // Set each field individually to ensure proper form state update
    Object.entries(dummyData).forEach(([key, value]) => {
      setValue(key as keyof MyDataFormData, value, { shouldValidate: true })
    })
    
    setTags(dummyData.tags)
    toast.success("Form filled with dummy data")
  }

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      const updatedTags = [...tags, newTag.trim()]
      setTags(updatedTags)
      setValue("tags", updatedTags)
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove)
    setTags(updatedTags)
    setValue("tags", updatedTags)
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB")
        return
      }
      
      // Validate file type
      const allowedTypes = ["image/jpeg", "image/png", "image/gif", "application/pdf", "text/csv"]
      if (!allowedTypes.includes(file.type)) {
        toast.error("Invalid file type. Allowed: JPEG, PNG, GIF, PDF, CSV")
        return
      }
      
      setSelectedFile(file)
      setValue("filePath", file.name)
    }
  }

  const onFormSubmit = async (data: MyDataFormData) => {
    try {
      console.log("Submitting form data:", data)
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
              <CardTitle>MyData Form</CardTitle>
              <CardDescription>
                Comprehensive form covering all input types with validation
              </CardDescription>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={fillDummyData}
              className="flex items-center space-x-2"
            >
              <Wand2 className="h-4 w-4" />
              <span>Fill Dummy Data</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
            {/* Text Fields Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Text Fields</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter title"
                    {...register("title")}
                    className={errors.title ? "border-red-500" : ""}
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500">{errors.title.message}</p>
                  )}
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter description"
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

            {/* User Fields Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">User Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter full name"
                    {...register("name")}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    {...register("email")}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    {...register("phone")}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500">{errors.phone.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="passwordHash">Demo Password</Label>
                  <PasswordInput
                    id="passwordHash"
                    placeholder="Enter demo password"
                    {...register("passwordHash")}
                  />
                  <p className="text-xs text-gray-500">For demonstration purposes only</p>
                </div>
              </div>
            </div>

            {/* Typed Fields Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Numeric & Boolean Fields</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    min="0"
                    max="150"
                    placeholder="Enter age"
                    {...register("age", { valueAsNumber: true })}
                    className={errors.age ? "border-red-500" : ""}
                  />
                  {errors.age && (
                    <p className="text-sm text-red-500">{errors.age.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="balance">Balance</Label>
                  <Input
                    id="balance"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Enter balance"
                    {...register("balance", { valueAsNumber: true })}
                    className={errors.balance ? "border-red-500" : ""}
                  />
                  {errors.balance && (
                    <p className="text-sm text-red-500">{errors.balance.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label>Rating: {watchedValues.rating || 0}</Label>
                  <Controller
                    name="rating"
                    control={control}
                    render={({ field }) => (
                      <Slider
                        min={0}
                        max={5}
                        step={0.1}
                        value={[field.value || 0]}
                        onValueChange={(value) => field.onChange(value[0])}
                        className="w-full"
                      />
                    )}
                  />
                  {errors.rating && (
                    <p className="text-sm text-red-500">{errors.rating.message}</p>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Controller
                    name="isActive"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <Label>Active Status</Label>
                </div>
              </div>
            </div>

            {/* Enum & Selection Fields */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Selection Fields</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          <SelectItem value="A">Category A</SelectItem>
                          <SelectItem value="B">Category B</SelectItem>
                          <SelectItem value="C">Category C</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.category && (
                    <p className="text-sm text-red-500">{errors.category.message}</p>
                  )}
                </div>
                

              </div>
            </div>

            {/* Date & Time Fields */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Date & Time Fields</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOnly">Date Only</Label>
                  <Input
                    id="dateOnly"
                    type="date"
                    {...register("dateOnly")}
                    className={errors.dateOnly ? "border-red-500" : ""}
                  />
                  {errors.dateOnly && (
                    <p className="text-sm text-red-500">{errors.dateOnly.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dateTime">Date & Time</Label>
                  <Input
                    id="dateTime"
                    type="datetime-local"
                    {...register("dateTime")}
                    className={errors.dateTime ? "border-red-500" : ""}
                  />
                  {errors.dateTime && (
                    <p className="text-sm text-red-500">{errors.dateTime.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timeOnly">Time Only</Label>
                  <Input
                    id="timeOnly"
                    type="time"
                    {...register("timeOnly")}
                    className={errors.timeOnly ? "border-red-500" : ""}
                  />
                  {errors.timeOnly && (
                    <p className="text-sm text-red-500">{errors.timeOnly.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* URL & Color Fields */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">URL & Color Fields</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website URL</Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://example.com"
                    {...register("website")}
                    className={errors.website ? "border-red-500" : ""}
                  />
                  {errors.website && (
                    <p className="text-sm text-red-500">{errors.website.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="avatarUrl">Avatar URL</Label>
                  <Input
                    id="avatarUrl"
                    type="url"
                    placeholder="https://example.com/avatar.jpg"
                    {...register("avatarUrl")}
                    className={errors.avatarUrl ? "border-red-500" : ""}
                  />
                  {errors.avatarUrl && (
                    <p className="text-sm text-red-500">{errors.avatarUrl.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="color">Color Picker</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="color"
                      type="color"
                      {...register("color")}
                      className="w-16 h-10 p-1 border-2"
                    />
                    <Input
                      type="text"
                      placeholder="#000000"
                      {...register("color")}
                      className={`flex-1 ${errors.color ? "border-red-500" : ""}`}
                    />
                  </div>
                  {errors.color && (
                    <p className="text-sm text-red-500">{errors.color.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* File Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">File Upload</h3>
              <div className="space-y-2">
                <Label>Upload File</Label>
                <FileInput
                  value={watchedValues.filePath}
                  onChange={(filePath, fileId) => {
                    setValue("filePath", filePath)
                    setSelectedFile(null) // Clear the old file reference
                  }}
                  accept=".jpg,.jpeg,.png,.gif,.pdf,.csv,.xlsx"
                  maxSize={5 * 1024 * 1024}
                />
                <p className="text-xs text-gray-500">
                  Secure file upload with validation and progress tracking
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Tags</h3>
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

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button type="button" variant="outline" onClick={() => reset()}>
                Reset Form
              </Button>
              <Button type="submit" disabled={isLoading} className="min-w-[120px]">
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
