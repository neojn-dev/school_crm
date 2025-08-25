"use client"

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

interface MediaListProps {
  files: MediaFile[]
  selectedFiles: string[]
  onSelectionChange: (selected: string[]) => void
  getFileTypeIcon: (mimeType: string) => any
  formatFileSize: (bytes: number) => string
}

export function MediaList({ 
  files, 
  selectedFiles, 
  onSelectionChange, 
  getFileTypeIcon, 
  formatFileSize 
}: MediaListProps) {
  const toggleSelection = (fileId: string) => {
    if (selectedFiles.includes(fileId)) {
      onSelectionChange(selectedFiles.filter(id => id !== fileId))
    } else {
      onSelectionChange([...selectedFiles, fileId])
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
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Header */}
      <div className="px-6 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center">
          <div className="w-12">
            <input
              type="checkbox"
              checked={selectedFiles.length === files.length && files.length > 0}
              onChange={() => {
                if (selectedFiles.length === files.length) {
                  onSelectionChange([])
                } else {
                  onSelectionChange(files.map(file => file.id))
                }
              }}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1 grid grid-cols-6 gap-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-2">Name</div>
            <div>Type</div>
            <div>Size</div>
            <div>Uploaded</div>
            <div>Actions</div>
          </div>
        </div>
      </div>

      {/* File List */}
      <div className="divide-y divide-gray-200">
        {files.map((file) => {
          const FileIcon = getFileTypeIcon(file.mimeType)
          const isSelected = selectedFiles.includes(file.id)
          const isImage = file.mimeType.startsWith('image/')

          return (
            <div
              key={file.id}
              className={`px-6 py-4 hover:bg-gray-50 transition-colors ${
                isSelected ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-center">
                {/* Checkbox */}
                <div className="w-12">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelection(file.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>

                {/* File Info */}
                <div className="flex-1 grid grid-cols-6 gap-4 items-center">
                  {/* Name & Preview */}
                  <div className="col-span-2 flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      {isImage ? (
                        <img
                          src={file.url}
                          alt={file.altText || file.title || file.originalName}
                          className="w-10 h-10 object-cover rounded"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                          <FileIcon className="h-5 w-5 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.title || file.originalName}
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {file.originalName}
                      </p>
                    </div>
                  </div>

                  {/* Type */}
                  <div className="text-sm text-gray-500">
                    {file.mimeType.split('/')[1]?.toUpperCase() || 'FILE'}
                  </div>

                  {/* Size */}
                  <div className="text-sm text-gray-500">
                    {formatFileSize(file.size)}
                  </div>

                  {/* Upload Info */}
                  <div className="text-sm text-gray-500">
                    <div>{new Date(file.createdAt).toLocaleDateString()}</div>
                    <div className="text-xs">
                      by {file.uploadedByUser.firstName || file.uploadedByUser.username}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(file.url, '_blank')}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => downloadFile(file)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Copy URL
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
