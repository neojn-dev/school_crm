"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { 
  Upload, 
  X, 
  File,
  Image as ImageIcon,
  Video,
  FileText,
  AlertCircle,
  Crop
} from "lucide-react"
import { EnhancedMediaUploader } from "./enhanced-media-uploader"

interface MediaUploaderProps {
  onUpload: (files: any[]) => void
  onClose: () => void
}

interface UploadFile {
  file: File
  preview?: string
  title: string
  altText: string
  folder: string
  uploading: boolean
  error?: string
}

export function MediaUploader({ onUpload, onClose }: MediaUploaderProps) {
  const [useEnhancedUploader, setUseEnhancedUploader] = useState(true)
  
  // If enhanced uploader is enabled, use it
  if (useEnhancedUploader) {
    return <EnhancedMediaUploader onUpload={onUpload} onClose={onClose} />
  }

  // Fallback to original uploader
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([])
  const [isUploading, setIsUploading] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
      title: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
      altText: "",
      folder: "",
      uploading: false
    }))
    
    setUploadFiles(prev => [...prev, ...newFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp', '.svg'],
      'video/*': ['.mp4', '.webm', '.ogg'],
      'application/pdf': ['.pdf'],
      'text/*': ['.txt', '.csv'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: true
  })

  const removeFile = (index: number) => {
    setUploadFiles(prev => {
      const newFiles = [...prev]
      if (newFiles[index].preview) {
        URL.revokeObjectURL(newFiles[index].preview!)
      }
      newFiles.splice(index, 1)
      return newFiles
    })
  }

  const updateFile = (index: number, field: keyof UploadFile, value: string) => {
    setUploadFiles(prev => prev.map((file, i) => 
      i === index ? { ...file, [field]: value } : file
    ))
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return ImageIcon
    if (file.type.startsWith('video/')) return Video
    if (file.type.includes('pdf') || file.type.includes('document')) return FileText
    return File
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const handleUpload = async () => {
    if (uploadFiles.length === 0) return

    setIsUploading(true)
    const uploadedFiles = []

    for (let i = 0; i < uploadFiles.length; i++) {
      const uploadFile = uploadFiles[i]
      
      // Update uploading status
      setUploadFiles(prev => prev.map((file, index) => 
        index === i ? { ...file, uploading: true, error: undefined } : file
      ))

      try {
        const formData = new FormData()
        formData.append('file', uploadFile.file)
        formData.append('title', uploadFile.title)
        formData.append('altText', uploadFile.altText)
        formData.append('folder', uploadFile.folder)

        const response = await fetch('/api/cms/media', {
          method: 'POST',
          body: formData
        })

        if (response.ok) {
          const result = await response.json()
          uploadedFiles.push(result.media)
          
          // Update success status
          setUploadFiles(prev => prev.map((file, index) => 
            index === i ? { ...file, uploading: false } : file
          ))
        } else {
          const error = await response.json()
          setUploadFiles(prev => prev.map((file, index) => 
            index === i ? { ...file, uploading: false, error: error.error } : file
          ))
        }
      } catch (error) {
        setUploadFiles(prev => prev.map((file, index) => 
          index === i ? { ...file, uploading: false, error: 'Upload failed' } : file
        ))
      }
    }

    setIsUploading(false)
    
    if (uploadedFiles.length > 0) {
      onUpload(uploadedFiles)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Upload Files</DialogTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setUseEnhancedUploader(!useEnhancedUploader)}
                className="flex items-center space-x-2"
              >
                <Crop className="h-4 w-4" />
                <span>{useEnhancedUploader ? 'Basic' : 'Enhanced'}</span>
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Drop Zone */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
            </p>
            <p className="text-gray-600 mb-4">
              or click to browse files
            </p>
            <p className="text-sm text-gray-500">
              Supports: Images, Videos, PDFs, Documents (Max 10MB each)
            </p>
          </div>

          {/* File List */}
          {uploadFiles.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">
                Files to Upload ({uploadFiles.length})
              </h3>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {uploadFiles.map((uploadFile, index) => {
                  const FileIcon = getFileIcon(uploadFile.file)
                  
                  return (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start space-x-4">
                        {/* File Preview/Icon */}
                        <div className="flex-shrink-0">
                          {uploadFile.preview ? (
                            <img
                              src={uploadFile.preview}
                              alt="Preview"
                              className="w-16 h-16 object-cover rounded"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                              <FileIcon className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                        
                        {/* File Info */}
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">
                                {uploadFile.file.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {formatFileSize(uploadFile.file.size)} • {uploadFile.file.type}
                              </p>
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                              disabled={uploadFile.uploading}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          {/* Metadata Fields */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            <div>
                              <Label htmlFor={`title-${index}`}>Title</Label>
                              <Input
                                id={`title-${index}`}
                                value={uploadFile.title}
                                onChange={(e) => updateFile(index, 'title', e.target.value)}
                                disabled={uploadFile.uploading}
                              />
                            </div>
                            
                            {uploadFile.file.type.startsWith('image/') && (
                              <div>
                                <Label htmlFor={`alt-${index}`}>Alt Text</Label>
                                <Input
                                  id={`alt-${index}`}
                                  value={uploadFile.altText}
                                  onChange={(e) => updateFile(index, 'altText', e.target.value)}
                                  placeholder="Describe the image"
                                  disabled={uploadFile.uploading}
                                />
                              </div>
                            )}
                            
                            <div>
                              <Label htmlFor={`folder-${index}`}>Folder</Label>
                              <Input
                                id={`folder-${index}`}
                                value={uploadFile.folder}
                                onChange={(e) => updateFile(index, 'folder', e.target.value)}
                                placeholder="Optional folder name"
                                disabled={uploadFile.uploading}
                              />
                            </div>
                          </div>
                          
                          {/* Upload Status */}
                          {uploadFile.uploading && (
                            <div className="flex items-center space-x-2 text-blue-600">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                              <span className="text-sm">Uploading...</span>
                            </div>
                          )}
                          
                          {uploadFile.error && (
                            <div className="flex items-center space-x-2 text-red-600">
                              <AlertCircle className="h-4 w-4" />
                              <span className="text-sm">{uploadFile.error}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isUploading}>
            Cancel
          </Button>
          <Button 
            onClick={handleUpload} 
            disabled={uploadFiles.length === 0 || isUploading}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload {uploadFiles.length} File{uploadFiles.length !== 1 ? 's' : ''}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
