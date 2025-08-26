"use client"

import { Loader2, FileText, Layers, Image, Settings } from "lucide-react"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  }

  return (
    <Loader2 className={`animate-spin ${sizeClasses[size]} ${className}`} />
  )
}

interface LoadingCardProps {
  title?: string
  description?: string
  icon?: React.ComponentType<{ className?: string }>
}

export function LoadingCard({ title, description, icon: Icon }: LoadingCardProps) {
  return (
    <div className="cms-card animate-pulse">
      <div className="cms-card-body">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            {Icon ? (
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <Icon className="h-6 w-6 text-gray-400" />
              </div>
            ) : (
              <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
            )}
          </div>
          <div className="flex-1 space-y-3">
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            {description && (
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function LoadingGrid({ count = 6, type = "card" }: { count?: number; type?: "card" | "list" }) {
  if (type === "list") {
    return (
      <div className="cms-card">
        <div className="divide-y divide-gray-100">
          {Array.from({ length: count }).map((_, index) => (
            <div key={index} className="cms-list-item animate-pulse">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex-shrink-0"></div>
                <div className="flex-1 space-y-3">
                  <div className="space-y-2">
                    <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  <div className="w-8 h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="cms-card-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <LoadingCard key={index} />
      ))}
    </div>
  )
}

export function LoadingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Skeleton */}
        <div className="cms-page-header animate-pulse">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-3">
              <div className="h-8 bg-gray-200 rounded w-64"></div>
              <div className="h-5 bg-gray-200 rounded w-96"></div>
              <div className="flex space-x-6">
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
            <div className="w-40 h-10 bg-gray-200 rounded-lg"></div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="cms-content-section">
          <LoadingGrid count={8} />
        </div>
      </div>
    </div>
  )
}

export function LoadingButton({ children, isLoading, ...props }: any) {
  return (
    <button {...props} disabled={isLoading || props.disabled}>
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <LoadingSpinner size="sm" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  )
}

interface LoadingOverlayProps {
  isVisible: boolean
  message?: string
}

export function LoadingOverlay({ isVisible, message = "Loading..." }: LoadingOverlayProps) {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="cms-card max-w-sm w-full mx-4">
        <div className="cms-card-body text-center py-8">
          <LoadingSpinner size="lg" className="mx-auto mb-4 text-blue-600" />
          <p className="text-lg font-medium text-gray-900">{message}</p>
        </div>
      </div>
    </div>
  )
}

export function LoadingTableRow({ columns = 5 }: { columns?: number }) {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: columns }).map((_, index) => (
        <td key={index} className="px-6 py-4">
          <div className="h-4 bg-gray-200 rounded"></div>
        </td>
      ))}
    </tr>
  )
}

export function LoadingForm() {
  return (
    <div className="cms-card animate-pulse">
      <div className="cms-card-header">
        <div className="h-6 bg-gray-200 rounded w-48"></div>
        <div className="h-4 bg-gray-200 rounded w-64 mt-2"></div>
      </div>
      <div className="cms-card-body space-y-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="cms-form-group">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
      <div className="cms-card-footer">
        <div className="flex justify-end space-x-3">
          <div className="w-20 h-10 bg-gray-200 rounded"></div>
          <div className="w-32 h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}

// Skeleton components for specific CMS sections
export function PageListSkeleton() {
  return <LoadingGrid count={6} type="list" />
}

export function TemplateGridSkeleton() {
  return <LoadingGrid count={8} type="card" />
}

export function BlockEditorSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="cms-card-header">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
          <div className="space-y-2">
            <div className="h-6 bg-gray-200 rounded w-48"></div>
            <div className="h-4 bg-gray-200 rounded w-64"></div>
          </div>
        </div>
      </div>
      <div className="cms-card-body">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="cms-form-group">
              <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
              <div className="h-10 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
