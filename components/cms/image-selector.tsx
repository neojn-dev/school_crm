"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"
import { 
  Upload, 
  Image as ImageIcon, 
  X, 
  Edit, 
  Eye,
  Crop
} from "lucide-react"
import { ImageManager } from "./image-manager"
import { EnhancedMediaUploader } from "./media/enhanced-media-uploader"
import { cn } from "@/lib/utils"

interface ImageSelectorProps {
  value?: string
  onChange: (url: string, metadata?: any) => void
  placeholder?: string
  label?: string
  description?: string
  allowUpload?: boolean
  allowCrop?: boolean
  required?: boolean
  className?: string
}

interface ImageMetadata {
  id?: string
  title?: string
  altText?: string
  width?: number
  height?: number
  size?: number
}

export function ImageSelector({
  value,
  onChange,
  placeholder = "Select or upload an image",
  label = "Image",
  description,
  allowUpload = true,
  allowCrop = false,
  required = false,
  className
}: ImageSelectorProps) {
  const [showImageManager, setShowImageManager] = useState(false)
  const [showUploader, setShowUploader] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [imageMetadata, setImageMetadata] = useState<ImageMetadata | null>(null)

  const handleImageSelect = (image: any) => {
    onChange(image.url, {
      id: image.id,
      title: image.title,
      altText: image.altText,
      width: image.width,
      height: image.height,
      size: image.size
    })
    setImageMetadata({
      id: image.id,
      title: image.title,
      altText: image.altText,
      width: image.width,
      height: image.height,
      size: image.size
    })
    setShowImageManager(false)
  }

  const handleImageUpload = (uploadedFiles: any[]) => {
    if (uploadedFiles.length > 0) {
      const uploadedImage = uploadedFiles[0]
      onChange(uploadedImage.url, {
        id: uploadedImage.id,
        title: uploadedImage.title,
        altText: uploadedImage.altText,
        width: uploadedImage.width,
        height: uploadedImage.height,
        size: uploadedImage.size
      })
      setImageMetadata({
        id: uploadedImage.id,
        title: uploadedImage.title,
        altText: uploadedImage.altText,
        width: uploadedImage.width,
        height: uploadedImage.height,
        size: uploadedImage.size
      })
    }
    setShowUploader(false)
  }

  const clearImage = () => {
    onChange('')
    setImageMetadata(null)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <Label htmlFor="image-selector">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
        {value && (
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPreview(true)}
              title="Preview image"
            >
              <Eye className="h-4 w-4" />
            </Button>
            {allowCrop && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  // Open crop dialog - you can implement this
                  alert('Crop functionality would open here')
                }}
                title="Crop image"
              >
                <Crop className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearImage}
              title="Remove image"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {description && (
        <p className="text-sm text-gray-600">{description}</p>
      )}

      {/* Image Preview */}
      {value ? (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              <img
                src={value}
                alt={imageMetadata?.altText || imageMetadata?.title || 'Selected image'}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                <Button
                  variant="secondary"
                  size="sm"
                  className="opacity-0 hover:opacity-100 transition-opacity"
                  onClick={() => setShowImageManager(true)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Change Image
                </Button>
              </div>
            </div>
            {imageMetadata && (
              <div className="p-3 border-t">
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                  {imageMetadata.title && (
                    <div>
                      <span className="font-medium">Title:</span> {imageMetadata.title}
                    </div>
                  )}
                  {imageMetadata.width && imageMetadata.height && (
                    <div>
                      <span className="font-medium">Size:</span> {imageMetadata.width}×{imageMetadata.height}
                    </div>
                  )}
                  {imageMetadata.size && (
                    <div>
                      <span className="font-medium">File:</span> {formatFileSize(imageMetadata.size)}
                    </div>
                  )}
                  {imageMetadata.altText && (
                    <div className="col-span-2">
                      <span className="font-medium">Alt Text:</span> {imageMetadata.altText}
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="border-dashed border-2 hover:border-gray-400 transition-colors">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">{placeholder}</p>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowImageManager(true)}
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Browse Images
              </Button>
              {allowUpload && (
                <Button onClick={() => setShowUploader(true)}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload New
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Image Manager Dialog */}
      {showImageManager && (
        <Dialog open={showImageManager} onOpenChange={setShowImageManager}>
          <DialogContent className="max-w-6xl h-[80vh]">
            <DialogHeader>
              <DialogTitle>Select Image</DialogTitle>
            </DialogHeader>
            <ImageManager
              onSelectImage={handleImageSelect}
              onClose={() => setShowImageManager(false)}
              allowSelection={true}
              allowUpload={false}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Upload Dialog */}
      {showUploader && (
        <EnhancedMediaUploader
          onUpload={handleImageUpload}
          onClose={() => setShowUploader(false)}
        />
      )}

      {/* Preview Dialog */}
      {showPreview && value && (
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>
                {imageMetadata?.title || 'Image Preview'}
              </DialogTitle>
            </DialogHeader>
            <div className="flex justify-center">
              <img
                src={value}
                alt={imageMetadata?.altText || 'Preview'}
                className="max-w-full max-h-96 object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
