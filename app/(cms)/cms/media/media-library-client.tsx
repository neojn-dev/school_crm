"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Upload, 
  Search, 
  Filter,
  Grid3X3,
  List,
  Trash2,
  Download,
  Eye,
  Image as ImageIcon,
  FileText,
  Video,
  File
} from "lucide-react"
import { MediaUploader } from "@/components/cms/media/media-uploader"
import { MediaGrid } from "@/components/cms/media/media-grid"
import { MediaList } from "@/components/cms/media/media-list"

interface MediaFile {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  title?: string
  altText?: string
  folder?: string
  createdAt: string
  uploadedByUser: {
    username: string
    firstName?: string
  }
}

interface MediaLibraryClientProps {
  initialMediaFiles: MediaFile[]
  stats: {
    totalFiles: number
    totalSize: number
    images: number
    documents: number
    videos: number
  }
}

export function MediaLibraryClient({ initialMediaFiles, stats }: MediaLibraryClientProps) {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>(initialMediaFiles)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFolder, setSelectedFolder] = useState<string>("all")
  const [selectedFiles, setSelectedFiles] = useState<string[]>([])
  const [showUploader, setShowUploader] = useState(false)

  // Get unique folders
  const folders = Array.from(new Set(
    mediaFiles.map(file => file.folder).filter(Boolean)
  )) as string[]

  // Filter media files
  const filteredFiles = mediaFiles.filter(file => {
    const matchesSearch = file.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.title?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFolder = selectedFolder === "all" || file.folder === selectedFolder
    
    return matchesSearch && matchesFolder
  })

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // Handle file upload
  const handleFileUpload = useCallback((newFiles: MediaFile[]) => {
    setMediaFiles(prev => [...newFiles, ...prev])
    setShowUploader(false)
  }, [])

  // Handle file deletion
  const handleDeleteFiles = async () => {
    if (selectedFiles.length === 0) return
    
    if (!confirm(`Delete ${selectedFiles.length} file(s)? This action cannot be undone.`)) {
      return
    }

    try {
      // Delete files from server
      await Promise.all(
        selectedFiles.map(fileId =>
          fetch(`/api/cms/media/${fileId}`, { method: 'DELETE' })
        )
      )

      // Update local state
      setMediaFiles(prev => prev.filter(file => !selectedFiles.includes(file.id)))
      setSelectedFiles([])
    } catch (error) {
      console.error('Error deleting files:', error)
      alert('Failed to delete files')
    }
  }

  // Get file type icon
  const getFileTypeIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return ImageIcon
    if (mimeType.startsWith('video/')) return Video
    if (mimeType.includes('pdf') || mimeType.includes('document')) return FileText
    return File
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
          <p className="text-gray-600">Manage your images, documents, and other files</p>
        </div>
        <Button 
          onClick={() => setShowUploader(true)}
          className="flex items-center space-x-2"
        >
          <Upload className="h-4 w-4" />
          <span>Upload Files</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Files</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalFiles}</p>
            </div>
            <File className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Images</p>
              <p className="text-2xl font-bold text-gray-900">{stats.images}</p>
            </div>
            <ImageIcon className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Documents</p>
              <p className="text-2xl font-bold text-gray-900">{stats.documents}</p>
            </div>
            <FileText className="h-8 w-8 text-orange-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Videos</p>
              <p className="text-2xl font-bold text-gray-900">{stats.videos}</p>
            </div>
            <Video className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Storage Used</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatFileSize(stats.totalSize)}
              </p>
            </div>
            <Upload className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            
            {/* Folder Filter */}
            <select
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Folders</option>
              <option value="">No Folder</option>
              {folders.map(folder => (
                <option key={folder} value={folder}>{folder}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            {/* Bulk Actions */}
            {selectedFiles.length > 0 && (
              <div className="flex items-center space-x-2 mr-4">
                <span className="text-sm text-gray-600">
                  {selectedFiles.length} selected
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDeleteFiles}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            )}
            
            {/* View Mode Toggle */}
            <div className="flex items-center border rounded-md">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Media Content */}
      {viewMode === 'grid' ? (
        <MediaGrid
          files={filteredFiles}
          selectedFiles={selectedFiles}
          onSelectionChange={setSelectedFiles}
          getFileTypeIcon={getFileTypeIcon}
          formatFileSize={formatFileSize}
        />
      ) : (
        <MediaList
          files={filteredFiles}
          selectedFiles={selectedFiles}
          onSelectionChange={setSelectedFiles}
          getFileTypeIcon={getFileTypeIcon}
          formatFileSize={formatFileSize}
        />
      )}

      {/* Empty State */}
      {filteredFiles.length === 0 && (
        <div className="text-center py-12">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {searchTerm || selectedFolder !== "all" ? "No files found" : "No files uploaded"}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || selectedFolder !== "all" 
              ? "Try adjusting your search or filter criteria"
              : "Get started by uploading your first file"
            }
          </p>
          {!searchTerm && selectedFolder === "all" && (
            <div className="mt-6">
              <Button 
                onClick={() => setShowUploader(true)}
                className="flex items-center space-x-2"
              >
                <Upload className="h-4 w-4" />
                <span>Upload Files</span>
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Upload Modal */}
      {showUploader && (
        <MediaUploader
          onUpload={handleFileUpload}
          onClose={() => setShowUploader(false)}
        />
      )}
    </div>
  )
}
