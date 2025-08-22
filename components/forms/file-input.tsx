"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Upload, 
  File, 
  Image, 
  FileText, 
  X, 
  Download,
  AlertCircle,
  CheckCircle
} from "lucide-react"
import { toast } from "sonner"
import { formatFileSize } from "@/lib/utils"

interface FileInputProps {
  value?: string
  onChange?: (filePath: string, fileId: string) => void
  accept?: string
  maxSize?: number // in bytes
  className?: string
  disabled?: boolean
}

interface UploadedFile {
  id: string
  filename: string
  originalName: string
  size: number
  path: string
  url: string
}

export function FileInput({ 
  value, 
  onChange, 
  accept = ".jpg,.jpeg,.png,.gif,.pdf,.csv,.xlsx",
  maxSize = 5 * 1024 * 1024, // 5MB
  className,
  disabled = false
}: FileInputProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return Image
    if (mimeType === 'application/pdf') return FileText
    return File
  }

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize) {
      return `File size exceeds ${formatFileSize(maxSize)} limit`
    }

    const allowedTypes = [
      "image/jpeg", "image/png", "image/gif",
      "application/pdf", "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ]

    if (!allowedTypes.includes(file.type)) {
      return "Invalid file type. Allowed: JPEG, PNG, GIF, PDF, CSV, Excel"
    }

    return null
  }

  const uploadFile = async (file: File) => {
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      toast.error(validationError)
      return
    }

    setIsUploading(true)
    setUploadProgress(0)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90))
      }, 100)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Upload failed')
      }

      const uploadData: UploadedFile = await response.json()
      setUploadedFile(uploadData)
      onChange?.(uploadData.path, uploadData.id)
      toast.success('File uploaded successfully!')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setIsUploading(false)
      setTimeout(() => setUploadProgress(0), 1000)
    }
  }

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return
    uploadFile(files[0])
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleRemoveFile = async () => {
    if (!uploadedFile) return

    try {
      const response = await fetch(`/api/upload/${uploadedFile.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setUploadedFile(null)
        onChange?.('', '')
        toast.success('File removed successfully!')
      } else {
        throw new Error('Failed to remove file')
      }
    } catch (error) {
      toast.error('Failed to remove file')
    }
  }

  const handleDownload = () => {
    if (uploadedFile) {
      window.open(uploadedFile.url, '_blank')
    }
  }

  if (uploadedFile) {
    const IconComponent = getFileIcon(uploadedFile.originalName)
    
    return (
      <Card className={`${className} border-green-200 bg-green-50`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <IconComponent className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-green-900">
                  {uploadedFile.originalName}
                </p>
                <p className="text-sm text-green-600">
                  {formatFileSize(uploadedFile.size)}
                </p>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Uploaded
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleDownload}
                disabled={disabled}
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRemoveFile}
                disabled={disabled}
                className="text-red-600 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={className}>
      <Card 
        className={`
          border-2 border-dashed transition-colors cursor-pointer
          ${isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-gray-400'}
          ${error ? 'border-red-300 bg-red-50' : ''}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <CardContent className="p-6 text-center">
          {isUploading ? (
            <div className="space-y-4">
              <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto">
                <Upload className="h-6 w-6 text-blue-600 animate-pulse" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Uploading...</p>
                <Progress value={uploadProgress} className="mt-2" />
                <p className="text-sm text-gray-500 mt-1">{uploadProgress}%</p>
              </div>
            </div>
          ) : error ? (
            <div className="space-y-2">
              <div className="p-3 bg-red-100 rounded-full w-fit mx-auto">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="font-medium text-red-900">Upload Error</p>
                <p className="text-sm text-red-600">{error}</p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setError(null)}
                  className="mt-2"
                >
                  Try Again
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="p-3 bg-gray-100 rounded-full w-fit mx-auto">
                <Upload className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  Drop files here or click to upload
                </p>
                <p className="text-sm text-gray-500">
                  Max {formatFileSize(maxSize)} • JPEG, PNG, GIF, PDF, CSV, Excel
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={(e) => handleFileSelect(e.target.files)}
        className="hidden"
        disabled={disabled}
      />
    </div>
  )
}
