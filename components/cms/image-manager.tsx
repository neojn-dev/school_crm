"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { 
  Upload, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Eye, 
  Edit, 
  Trash2, 
  Download,
  Copy,
  X,
  Plus,
  Folder,
  Calendar,
  User,
  Tag,
  Crop,
  RotateCw,
  Star,
  StarOff
} from "lucide-react"
import { cn } from "@/lib/utils"
import { EnhancedMediaUploader } from "./media/enhanced-media-uploader"

interface ImageFile {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  title?: string
  altText?: string
  description?: string
  tags?: string[]
  folder?: string
  createdAt: string
  updatedAt: string
  uploadedByUser: {
    username: string
    firstName?: string
    lastName?: string
  }
  isFavorite?: boolean
  width?: number
  height?: number
}

interface ImageManagerProps {
  onSelectImage?: (image: ImageFile) => void
  onClose?: () => void
  isOpen?: boolean
  allowSelection?: boolean
  allowUpload?: boolean
  allowEdit?: boolean
  allowDelete?: boolean
  allowedTypes?: string[]
  maxSize?: number
}

export function ImageManager({
  onSelectImage,
  onClose,
  isOpen = true,
  allowSelection = true,
  allowUpload = true,
  allowEdit = true,
  allowDelete = true,
  allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  maxSize = 10 * 1024 * 1024 // 10MB
}: ImageManagerProps) {
  const [images, setImages] = useState<ImageFile[]>([])
  const [filteredImages, setFilteredImages] = useState<ImageFile[]>([])
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'size'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterFolder, setFilterFolder] = useState<string>('all')
  const [filterTags, setFilterTags] = useState<string[]>([])
  const [showUploader, setShowUploader] = useState(false)
  const [editingImage, setEditingImage] = useState<ImageFile | null>(null)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [showPreviewDialog, setShowPreviewDialog] = useState(false)
  const [previewImage, setPreviewImage] = useState<ImageFile | null>(null)

  // Fetch images from API
  const fetchImages = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/cms/media?type=image')
      if (response.ok) {
        const data = await response.json()
        setImages(data.media || [])
      } else {
        setError('Failed to fetch images')
      }
    } catch (err) {
      setError('Error fetching images')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      fetchImages()
    }
  }, [isOpen])

  // Filter and sort images
  useEffect(() => {
    let filtered = images.filter(image => {
      const matchesSearch = !searchTerm || 
        image.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        image.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        image.altText?.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesFolder = filterFolder === 'all' || image.folder === filterFolder
      
      const matchesTags = filterTags.length === 0 || 
        image.tags?.some(tag => filterTags.includes(tag))
      
      return matchesSearch && matchesFolder && matchesTags
    })

    // Sort images
    filtered.sort((a, b) => {
      let comparison = 0
      switch (sortBy) {
        case 'name':
          comparison = (a.title || a.originalName).localeCompare(b.title || b.originalName)
          break
        case 'size':
          comparison = a.size - b.size
          break
        case 'date':
        default:
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          break
      }
      return sortOrder === 'asc' ? comparison : -comparison
    })

    setFilteredImages(filtered)
  }, [images, searchTerm, filterFolder, filterTags, sortBy, sortOrder])

  // Get unique folders and tags
  const folders = Array.from(new Set(images.map(img => img.folder).filter(Boolean)))
  const allTags = Array.from(new Set(images.flatMap(img => img.tags || [])))

  const handleImageUpload = (uploadedFiles: any[]) => {
    setImages(prev => [...uploadedFiles, ...prev])
    setShowUploader(false)
  }

  const handleEditImage = async (imageId: string, updates: Partial<ImageFile>) => {
    try {
      const response = await fetch(`/api/cms/media/${imageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })

      if (response.ok) {
        const updatedImage = await response.json()
        setImages(prev => prev.map(img => img.id === imageId ? updatedImage : img))
        setShowEditDialog(false)
        setEditingImage(null)
      }
    } catch (err) {
      console.error('Error updating image:', err)
    }
  }

  const handleDeleteImages = async () => {
    try {
      const response = await fetch('/api/cms/media/bulk-delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedImages })
      })

      if (response.ok) {
        setImages(prev => prev.filter(img => !selectedImages.includes(img.id)))
        setSelectedImages([])
      }
    } catch (err) {
      console.error('Error deleting images:', err)
    }
  }

  const handleToggleFavorite = async (imageId: string) => {
    const image = images.find(img => img.id === imageId)
    if (!image) return

    try {
      const response = await fetch(`/api/cms/media/${imageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFavorite: !image.isFavorite })
      })

      if (response.ok) {
        const updatedImage = await response.json()
        setImages(prev => prev.map(img => img.id === imageId ? updatedImage : img))
      }
    } catch (err) {
      console.error('Error updating favorite status:', err)
    }
  }

  const copyImageUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    // You could add a toast notification here
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (!isOpen) return null

  return (
    <>
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-xl font-semibold">Image Manager</h2>
            <p className="text-sm text-gray-600">
              {filteredImages.length} of {images.length} images
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {allowUpload && (
              <Button onClick={() => setShowUploader(true)}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Images
              </Button>
            )}
            {onClose && (
              <Button variant="outline" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="p-4 border-b space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search images..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* View Mode */}
            <div className="flex items-center space-x-1 border rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Sort */}
            <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
              const [sort, order] = value.split('-')
              setSortBy(sort as any)
              setSortOrder(order as any)
            }}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Newest First</SelectItem>
                <SelectItem value="date-asc">Oldest First</SelectItem>
                <SelectItem value="name-asc">Name A-Z</SelectItem>
                <SelectItem value="name-desc">Name Z-A</SelectItem>
                <SelectItem value="size-asc">Size Small-Large</SelectItem>
                <SelectItem value="size-desc">Size Large-Small</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Folder Filter */}
            <Select value={filterFolder} onValueChange={setFilterFolder}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Folders</SelectItem>
                {folders.map(folder => (
                  <SelectItem key={folder} value={folder}>{folder}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Tags Filter */}
            <div className="flex items-center space-x-2">
              <Tag className="h-4 w-4 text-gray-400" />
              <div className="flex flex-wrap gap-1">
                {allTags.slice(0, 5).map(tag => (
                  <Badge
                    key={tag}
                    variant={filterTags.includes(tag) ? 'default' : 'secondary'}
                    className="cursor-pointer"
                    onClick={() => {
                      setFilterTags(prev => 
                        prev.includes(tag) 
                          ? prev.filter(t => t !== tag)
                          : [...prev, tag]
                      )
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
                {allTags.length > 5 && (
                  <Badge variant="outline">+{allTags.length - 5} more</Badge>
                )}
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedImages.length > 0 && (
            <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
              <span className="text-sm text-blue-700">
                {selectedImages.length} image{selectedImages.length !== 1 ? 's' : ''} selected
              </span>
              {allowDelete && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDeleteImages}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-red-600">{error}</p>
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <Folder className="h-12 w-12 mb-4" />
              <p>No images found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredImages.map((image) => (
                <Card
                  key={image.id}
                  className={cn(
                    "cursor-pointer transition-all duration-200 hover:shadow-lg",
                    selectedImages.includes(image.id) && "ring-2 ring-blue-500"
                  )}
                  onClick={() => {
                    if (allowSelection) {
                      if (selectedImages.includes(image.id)) {
                        setSelectedImages(prev => prev.filter(id => id !== image.id))
                      } else {
                        setSelectedImages(prev => [...prev, image.id])
                      }
                    }
                  }}
                >
                  <CardContent className="p-2">
                    <div className="relative">
                      <img
                        src={image.url}
                        alt={image.altText || image.title || image.originalName}
                        className="w-full h-32 object-cover rounded"
                        loading="lazy"
                      />
                      {image.isFavorite && (
                        <Star className="absolute top-2 right-2 h-4 w-4 fill-yellow-400 text-yellow-400" />
                      )}
                      <div className="absolute top-2 left-2 flex space-x-1">
                        {allowSelection && (
                          <Button
                            size="sm"
                            variant="secondary"
                            className="h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              onSelectImage?.(image)
                            }}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="mt-2 space-y-1">
                      <p className="text-xs font-medium truncate">
                        {image.title || image.originalName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {image.width && image.height ? `${image.width}×${image.height}` : formatFileSize(image.size)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className={cn(
                    "flex items-center space-x-4 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer",
                    selectedImages.includes(image.id) && "bg-blue-50 border-blue-200"
                  )}
                  onClick={() => {
                    if (allowSelection) {
                      if (selectedImages.includes(image.id)) {
                        setSelectedImages(prev => prev.filter(id => id !== image.id))
                      } else {
                        setSelectedImages(prev => [...prev, image.id])
                      }
                    }
                  }}
                >
                  <img
                    src={image.url}
                    alt={image.altText || image.title || image.originalName}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium truncate">
                        {image.title || image.originalName}
                      </p>
                      {image.isFavorite && (
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{formatFileSize(image.size)}</span>
                      {image.width && image.height && (
                        <span>{image.width}×{image.height}</span>
                      )}
                      <span>{formatDate(image.createdAt)}</span>
                      <span>{image.uploadedByUser.firstName || image.uploadedByUser.username}</span>
                    </div>
                    {image.tags && image.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {image.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {image.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{image.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                        setPreviewImage(image)
                        setShowPreviewDialog(true)
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {allowEdit && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation()
                          setEditingImage(image)
                          setShowEditDialog(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleToggleFavorite(image.id)
                      }}
                    >
                      {image.isFavorite ? (
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ) : (
                        <StarOff className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                        copyImageUrl(image.url)
                      }}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    {allowSelection && (
                      <Button
                        size="sm"
                        variant="default"
                        onClick={(e) => {
                          e.stopPropagation()
                          onSelectImage?.(image)
                        }}
                      >
                        Select
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Upload Dialog */}
      {showUploader && (
        <EnhancedMediaUploader
          onUpload={handleImageUpload}
          onClose={() => setShowUploader(false)}
        />
      )}

      {/* Preview Dialog */}
      {showPreviewDialog && previewImage && (
        <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{previewImage.title || previewImage.originalName}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex justify-center">
                <img
                  src={previewImage.url}
                  alt={previewImage.altText || previewImage.title || previewImage.originalName}
                  className="max-w-full max-h-96 object-contain"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label>File Size</Label>
                  <p>{formatFileSize(previewImage.size)}</p>
                </div>
                <div>
                  <Label>Dimensions</Label>
                  <p>{previewImage.width && previewImage.height ? `${previewImage.width}×${previewImage.height}` : 'Unknown'}</p>
                </div>
                <div>
                  <Label>Uploaded</Label>
                  <p>{formatDate(previewImage.createdAt)}</p>
                </div>
                <div>
                  <Label>Uploaded By</Label>
                  <p>{previewImage.uploadedByUser.firstName || previewImage.uploadedByUser.username}</p>
                </div>
                {previewImage.altText && (
                  <div className="col-span-2">
                    <Label>Alt Text</Label>
                    <p>{previewImage.altText}</p>
                  </div>
                )}
                {previewImage.description && (
                  <div className="col-span-2">
                    <Label>Description</Label>
                    <p>{previewImage.description}</p>
                  </div>
                )}
                {previewImage.tags && previewImage.tags.length > 0 && (
                  <div className="col-span-2">
                    <Label>Tags</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {previewImage.tags.map(tag => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => copyImageUrl(previewImage.url)}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy URL
              </Button>
              <Button onClick={() => setShowPreviewDialog(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Dialog */}
      {showEditDialog && editingImage && (
        <EditImageDialog
          image={editingImage}
          onSave={(updates) => handleEditImage(editingImage.id, updates)}
          onClose={() => {
            setShowEditDialog(false)
            setEditingImage(null)
          }}
        />
      )}
    </>
  )
}

// Edit Image Dialog Component
interface EditImageDialogProps {
  image: ImageFile
  onSave: (updates: Partial<ImageFile>) => void
  onClose: () => void
}

function EditImageDialog({ image, onSave, onClose }: EditImageDialogProps) {
  const [formData, setFormData] = useState({
    title: image.title || '',
    altText: image.altText || '',
    description: image.description || '',
    tags: image.tags?.join(', ') || '',
    folder: image.folder || ''
  })

  const handleSave = () => {
    const updates = {
      title: formData.title,
      altText: formData.altText,
      description: formData.description,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      folder: formData.folder
    }
    onSave(updates)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Image Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <img
              src={image.url}
              alt={image.altText || image.title || image.originalName}
              className="w-32 h-32 object-cover rounded"
            />
            <div className="flex-1 space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Image title"
                />
              </div>
              <div>
                <Label htmlFor="altText">Alt Text</Label>
                <Input
                  id="altText"
                  value={formData.altText}
                  onChange={(e) => setFormData(prev => ({ ...prev, altText: e.target.value }))}
                  placeholder="Alternative text for accessibility"
                />
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Image description"
            />
          </div>
          <div>
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="Comma-separated tags"
            />
          </div>
          <div>
            <Label htmlFor="folder">Folder</Label>
            <Input
              id="folder"
              value={formData.folder}
              onChange={(e) => setFormData(prev => ({ ...prev, folder: e.target.value }))}
              placeholder="Folder name"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
