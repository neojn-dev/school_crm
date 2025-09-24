"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import ReactCrop, { 
  centerCrop, 
  makeAspectCrop, 
  Crop, 
  PixelCrop,
  convertToPixelCrop 
} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  Crop as CropIcon,
  RotateCw,
  Download,
  Eye
} from "lucide-react"
import { cn } from "@/lib/utils"

interface EnhancedMediaUploaderProps {
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
  croppedImage?: string
  aspectRatio?: string
  cropData?: {
    crop: Crop
    pixelCrop: PixelCrop
  }
}

// Common aspect ratios for different use cases
const ASPECT_RATIOS = {
  '1:1': { label: 'Square (1:1)', value: 1 },
  '4:3': { label: 'Standard (4:3)', value: 4/3 },
  '16:9': { label: 'Widescreen (16:9)', value: 16/9 },
  '3:2': { label: 'Photo (3:2)', value: 3/2 },
  '21:9': { label: 'Ultra Wide (21:9)', value: 21/9 },
  'free': { label: 'Free Aspect', value: 0 }
}

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export function EnhancedMediaUploader({ onUpload, onClose }: EnhancedMediaUploaderProps) {
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [showCropDialog, setShowCropDialog] = useState(false)
  const [currentCropFile, setCurrentCropFile] = useState<UploadFile | null>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [aspectRatio, setAspectRatio] = useState<number>(16/9)
  const [imgSrc, setImgSrc] = useState('')
  const imgRef = useRef<HTMLImageElement>(null)
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)

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
      if (newFiles[index].croppedImage) {
        URL.revokeObjectURL(newFiles[index].croppedImage!)
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

  const openCropDialog = (file: UploadFile, index: number) => {
    if (!file.preview) return
    
    setCurrentCropFile({ ...file, index } as UploadFile & { index: number })
    setImgSrc(file.preview)
    setShowCropDialog(true)
    
    // Set default aspect ratio based on image dimensions
    const img = new Image()
    img.onload = () => {
      const imageAspect = img.width / img.height
      if (Math.abs(imageAspect - 1) < 0.1) {
        setAspectRatio(1) // Square
      } else if (Math.abs(imageAspect - 16/9) < 0.1) {
        setAspectRatio(16/9) // Widescreen
      } else if (Math.abs(imageAspect - 4/3) < 0.1) {
        setAspectRatio(4/3) // Standard
      } else {
        setAspectRatio(imageAspect) // Free aspect
      }
      
      // Initialize crop
      const initialCrop = centerAspectCrop(img.width, img.height, aspectRatio)
      setCrop(initialCrop)
    }
    img.src = file.preview
  }

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget
    const initialCrop = centerAspectCrop(width, height, aspectRatio)
    setCrop(initialCrop)
  }

  const onCropComplete = (crop: PixelCrop, percentCrop: any) => {
    setCompletedCrop(crop)
  }

  const getCroppedImg = (
    image: HTMLImageElement,
    pixelCrop: PixelCrop,
  ): Promise<Blob | null> => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      return Promise.reject(new Error('No 2d context'))
    }

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const pixelRatio = window.devicePixelRatio

    canvas.width = pixelCrop.width * pixelRatio * scaleX
    canvas.height = pixelCrop.height * pixelRatio * scaleY

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    ctx.imageSmoothingQuality = 'high'

    ctx.drawImage(
      image,
      pixelCrop.x * scaleX,
      pixelCrop.y * scaleY,
      pixelCrop.width * scaleX,
      pixelCrop.height * scaleY,
      0,
      0,
      pixelCrop.width * scaleX,
      pixelCrop.height * scaleY,
    )

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        resolve(blob)
      }, 'image/jpeg', 0.9)
    })
  }

  const applyCrop = async () => {
    if (!completedCrop || !imgRef.current || !currentCropFile) return

    try {
      const croppedImageBlob = await getCroppedImg(imgRef.current, completedCrop)
      if (!croppedImageBlob) return

      const croppedImageUrl = URL.createObjectURL(croppedImageBlob)
      const aspectRatioKey = Object.entries(ASPECT_RATIOS).find(
        ([_, ratio]) => Math.abs(ratio.value - aspectRatio) < 0.01
      )?.[0] || 'free'

      // Update the file with cropped image
      const fileIndex = (currentCropFile as any).index
      setUploadFiles(prev => prev.map((file, i) => 
        i === fileIndex ? { 
          ...file, 
          croppedImage: croppedImageUrl,
          aspectRatio: aspectRatioKey,
          cropData: {
            crop: crop!,
            pixelCrop: completedCrop
          }
        } : file
      ))

      setShowCropDialog(false)
      setCurrentCropFile(null)
    } catch (error) {
      console.error('Error cropping image:', error)
    }
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
        
        // Use cropped image if available, otherwise use original file
        if (uploadFile.croppedImage) {
          // Convert cropped image URL back to file
          const response = await fetch(uploadFile.croppedImage)
          const blob = await response.blob()
          const croppedFile = new File([blob], uploadFile.file.name, { type: blob.type || 'image/jpeg' })
          formData.append('file', croppedFile)
        } else {
          formData.append('file', uploadFile.file)
        }
        
        formData.append('title', uploadFile.title)
        formData.append('altText', uploadFile.altText)
        formData.append('folder', uploadFile.folder)
        
        if (uploadFile.aspectRatio) {
          formData.append('aspectRatio', uploadFile.aspectRatio)
        }

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
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Upload Files</DialogTitle>
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
                    const isImage = uploadFile.file.type.startsWith('image/')
                    
                    return (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-start space-x-4">
                          {/* File Preview/Icon */}
                          <div className="flex-shrink-0">
                            {uploadFile.croppedImage ? (
                              <div className="relative">
                                <img
                                  src={uploadFile.croppedImage}
                                  alt="Cropped Preview"
                                  className="w-16 h-16 object-cover rounded"
                                />
                                <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-1 rounded">
                                  Cropped
                                </div>
                              </div>
                            ) : uploadFile.preview ? (
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
                                {uploadFile.aspectRatio && (
                                  <p className="text-xs text-blue-600 font-medium">
                                    Aspect: {ASPECT_RATIOS[uploadFile.aspectRatio as keyof typeof ASPECT_RATIOS]?.label || uploadFile.aspectRatio}
                                  </p>
                                )}
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                {isImage && !uploadFile.croppedImage && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => openCropDialog(uploadFile, index)}
                                    disabled={uploadFile.uploading}
                                    title="Crop Image"
                                  >
                                    <CropIcon className="h-4 w-4" />
                                  </Button>
                                )}
                                
                                {uploadFile.croppedImage && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => openCropDialog(uploadFile, index)}
                                    disabled={uploadFile.uploading}
                                    title="Recrop Image"
                                  >
                                    <RotateCw className="h-4 w-4" />
                                  </Button>
                                )}
                                
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile(index)}
                                  disabled={uploadFile.uploading}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
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
                              
                              {isImage && (
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

      {/* Crop Dialog */}
      {showCropDialog && (
        <Dialog open={showCropDialog} onOpenChange={setShowCropDialog}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Crop Image</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Aspect Ratio Selector */}
              <div className="flex items-center space-x-4">
                <Label>Aspect Ratio:</Label>
                <Select 
                  value={aspectRatio.toString()} 
                  onValueChange={(value) => {
                    const ratio = value === 'free' ? 0 : parseFloat(value)
                    setAspectRatio(ratio)
                    if (imgRef.current && ratio > 0) {
                      const initialCrop = centerAspectCrop(
                        imgRef.current.width, 
                        imgRef.current.height, 
                        ratio
                      )
                      setCrop(initialCrop)
                    }
                  }}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(ASPECT_RATIOS).map(([key, ratio]) => (
                      <SelectItem key={key} value={ratio.value.toString()}>
                        {ratio.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Crop Area */}
              <div className="flex justify-center">
                <ReactCrop
                  crop={crop}
                  onChange={(crop) => setCrop(crop)}
                  onComplete={onCropComplete}
                  aspect={aspectRatio || undefined}
                  className="max-w-full"
                >
                  <img
                    ref={imgRef}
                    alt="Crop me"
                    src={imgSrc}
                    style={{ maxHeight: '60vh', maxWidth: '100%' }}
                    onLoad={onImageLoad}
                  />
                </ReactCrop>
              </div>

              {/* Preview */}
              {completedCrop && (
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Preview:</h4>
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-24 border rounded overflow-hidden">
                      <img
                        src={imgSrc}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        style={{
                          transform: `translate(-${completedCrop.x}px, -${completedCrop.y}px)`,
                          width: `${(completedCrop.width / completedCrop.width) * 96}px`,
                          height: `${(completedCrop.height / completedCrop.height) * 96}px`
                        }}
                      />
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Size: {Math.round(completedCrop.width)} × {Math.round(completedCrop.height)}px</p>
                      <p>Position: ({Math.round(completedCrop.x)}, {Math.round(completedCrop.y)})</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCropDialog(false)}>
                Cancel
              </Button>
              <Button onClick={applyCrop} disabled={!completedCrop}>
                Apply Crop
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
