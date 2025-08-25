"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Monitor, Tablet, Smartphone } from "lucide-react"

interface ResponsivePreviewProps {
  children: React.ReactNode
}

type ViewportSize = 'desktop' | 'tablet' | 'mobile'

export function ResponsivePreview({ children }: ResponsivePreviewProps) {
  const [viewportSize, setViewportSize] = useState<ViewportSize>('desktop')

  const getViewportClasses = () => {
    switch (viewportSize) {
      case 'mobile':
        return 'max-w-sm mx-auto'
      case 'tablet':
        return 'max-w-2xl mx-auto'
      case 'desktop':
      default:
        return 'w-full'
    }
  }

  const getViewportLabel = () => {
    switch (viewportSize) {
      case 'mobile':
        return '375px'
      case 'tablet':
        return '768px'
      case 'desktop':
      default:
        return '100%'
    }
  }

  return (
    <div className="space-y-4">
      {/* Viewport Controls */}
      <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
        <div className="flex items-center space-x-2">
          <Button
            variant={viewportSize === 'desktop' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewportSize('desktop')}
          >
            <Monitor className="h-4 w-4 mr-2" />
            Desktop
          </Button>
          
          <Button
            variant={viewportSize === 'tablet' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewportSize('tablet')}
          >
            <Tablet className="h-4 w-4 mr-2" />
            Tablet
          </Button>
          
          <Button
            variant={viewportSize === 'mobile' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewportSize('mobile')}
          >
            <Smartphone className="h-4 w-4 mr-2" />
            Mobile
          </Button>
        </div>
        
        <div className="text-sm text-gray-600">
          Viewport: {getViewportLabel()}
        </div>
      </div>

      {/* Preview Container */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className={`transition-all duration-300 ${getViewportClasses()}`}>
          <div className="border-l border-r min-h-96">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
