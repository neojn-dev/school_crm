"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Eye,
  Download,
  Edit,
  Trash2,
  MoreVertical
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface MediaFile {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  title?: string
  altText?: string
  createdAt: string
  uploadedByUser: {
    username: string
    firstName?: string
  }
}

interface MediaGridProps {
  files: MediaFile[]
  selectedFiles: string[]
  onSelectionChange: (selected: string[]) => void
  getFileTypeIcon: (mimeType: string) => any
  formatFileSize: (bytes: number) => string
}

export function MediaGrid({ 
  files, 
  selectedFiles, 
  onSelectionChange, 
  getFileTypeIcon, 
  formatFileSize 
}: MediaGridProps) {
  const [previewFile, setPreviewFile] = useState<MediaFile | null>(null)

  const toggleSelection = (fileId: string) => {
    if (selectedFiles.includes(fileId)) {
      onSelectionChange(selectedFiles.filter(id => id !== fileId))
    } else {
      onSelectionChange([...selectedFiles, fileId])
    }
  }

  const handleSelectAll = () => {
    if (selectedFiles.length === files.length) {
      onSelectionChange([])
    } else {
      onSelectionChange(files.map(file => file.id))
    }
  }

  const downloadFile = (file: MediaFile) => {
    const link = document.createElement('a')
    link.href = file.url
    link.download = file.originalName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-4">
      {/* Select All */}
      {files.length > 0 && (
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selectedFiles.length === files.length}
            onChange={handleSelectAll}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-600">
            Select all ({files.length} files)
          </span>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {files.map((file) => {
          const FileIcon = getFileTypeIcon(file.mimeType)
          const isSelected = selectedFiles.includes(file.id)
          const isImage = file.mimeType.startsWith('image/')

          return (
            <div
              key={file.id}
              className={`relative group bg-white rounded-lg border-2 transition-all cursor-pointer ${
                isSelected 
                  ? 'border-blue-500 shadow-lg' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
              onClick={() => toggleSelection(file.id)}
            >
              {/* Selection Checkbox */}
              <div className="absolute top-2 left-2 z-10">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleSelection(file.id)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              {/* Actions Menu */}
              <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setPreviewFile(file)}>
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => downloadFile(file)}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* File Preview */}
              <div className="aspect-square p-4">
                {isImage ? (
                  <img
                    src={file.url}
                    alt={file.altText || file.title || file.originalName}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded">
                    <FileIcon className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>

              {/* File Info */}
              <div className="p-3 border-t">
                <p className="text-sm font-medium text-gray-900 truncate" title={file.title || file.originalName}>
                  {file.title || file.originalName}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatFileSize(file.size)}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(file.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Preview Modal */}
      {previewFile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setPreviewFile(null)}
        >
          <div className="max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">
                  {previewFile.title || previewFile.originalName}
                </h3>
                <p className="text-sm text-gray-500">
                  {formatFileSize(previewFile.size)} • {previewFile.mimeType}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPreviewFile(null)}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-4">
              {previewFile.mimeType.startsWith('image/') ? (
                <img
                  src={previewFile.url}
                  alt={previewFile.altText || previewFile.title || previewFile.originalName}
                  className="max-w-full max-h-[60vh] object-contain mx-auto"
                />
              ) : previewFile.mimeType.startsWith('video/') ? (
                <video
                  src={previewFile.url}
                  controls
                  className="max-w-full max-h-[60vh] mx-auto"
                />
              ) : (
                <div className="text-center py-12">
                  <FileIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Preview not available for this file type</p>
                  <Button
                    className="mt-4"
                    onClick={() => downloadFile(previewFile)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download File
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
