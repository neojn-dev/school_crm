"use client"

import { Loader2, FileText, Image, Layers } from "lucide-react"

export function PageLoadingSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 bg-gray-200 rounded w-48"></div>
          <div className="h-4 bg-gray-200 rounded w-64"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded w-32"></div>
      </div>

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-32"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow h-96"></div>
        </div>
      </div>
    </div>
  )
}

export function MediaLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg border animate-pulse">
          <div className="aspect-square bg-gray-200"></div>
          <div className="p-3 space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function TemplateLoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow animate-pulse">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6 space-y-3">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function LoadingSpinner({ size = "default" }: { size?: "sm" | "default" | "lg" }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-6 w-6", 
    lg: "h-8 w-8"
  }

  return (
    <div className="flex items-center justify-center p-4">
      <Loader2 className={`animate-spin text-blue-600 ${sizeClasses[size]}`} />
    </div>
  )
}

export function EmptyState({ 
  icon: Icon = FileText,
  title,
  description,
  action
}: {
  icon?: any
  title: string
  description: string
  action?: React.ReactNode
}) {
  return (
    <div className="text-center py-12">
      <Icon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      {action}
    </div>
  )
}
