"use client"

import { useState, useEffect, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Eye, 
  EyeOff, 
  Monitor, 
  Tablet, 
  Smartphone,
  RefreshCw
} from "lucide-react"

interface PageBlock {
  id: string
  type: string
  component: string
  content: any
  settings: any
}

interface LiveBlockPreviewProps {
  block: PageBlock
  isVisible?: boolean
  onToggleVisibility?: () => void
}

export function LiveBlockPreview({ 
  block, 
  isVisible = true, 
  onToggleVisibility 
}: LiveBlockPreviewProps) {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Generate preview HTML based on block type and content
  const generatePreviewHTML = useMemo(() => {
    try {
      switch (block.component) {
        case 'HeroBlock':
          return generateHeroPreview(block.content, block.settings)
        case 'FeaturesBlock':
          return generateFeaturesPreview(block.content, block.settings)
        case 'TestimonialsBlock':
          return generateTestimonialsPreview(block.content, block.settings)
        case 'ImageBlock':
          return generateImagePreview(block.content, block.settings)
        case 'ButtonBlock':
          return generateButtonPreview(block.content, block.settings)
        default:
          return generateGenericPreview(block.content, block.settings)
      }
    } catch (error) {
      console.error('Error generating preview:', error)
      return '<div class="p-4 text-red-600">Preview error</div>'
    }
  }, [block.content, block.settings, block.component])

  // Get viewport dimensions
  const getViewportClass = () => {
    switch (viewport) {
      case 'mobile': return 'max-w-sm'
      case 'tablet': return 'max-w-2xl'
      case 'desktop': return 'w-full'
    }
  }

  const refresh = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 500)
  }

  if (!isVisible) {
    return (
      <div className="flex items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
            <Eye className="h-6 w-6 text-gray-400" />
          </div>
          <p className="text-sm text-gray-600 mb-3">Preview is hidden</p>
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleVisibility}
            className="flex items-center space-x-2"
          >
            <Eye className="h-4 w-4" />
            <span>Show Preview</span>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Card className="overflow-hidden shadow-lg">
      {/* Preview Controls */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <Eye className="h-4 w-4 text-green-600" />
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-900">Live Preview</span>
            <p className="text-xs text-gray-500">{block.type} Block</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Viewport Controls */}
          <div className="flex items-center space-x-1 bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
            <Button
              variant={viewport === 'desktop' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewport('desktop')}
              className="p-2 h-8 w-8 rounded-md"
              title="Desktop View"
            >
              <Monitor className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant={viewport === 'tablet' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewport('tablet')}
              className="p-2 h-8 w-8 rounded-md"
              title="Tablet View"
            >
              <Tablet className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant={viewport === 'mobile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewport('mobile')}
              className="p-2 h-8 w-8 rounded-md"
              title="Mobile View"
            >
              <Smartphone className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Action Controls */}
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={refresh}
              disabled={isLoading}
              className="p-2 h-8 w-8 rounded-md"
              title="Refresh Preview"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleVisibility}
              className="p-2 h-8 w-8 rounded-md"
              title="Hide Preview"
            >
              <EyeOff className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Viewport Indicator */}
      <div className="px-4 py-2 bg-gray-100 border-b">
        <div className="flex items-center justify-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${viewport === 'desktop' ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
          <span className="text-xs font-medium text-gray-600 capitalize">{viewport} Preview</span>
          <div className="text-xs text-gray-500">
            {viewport === 'desktop' && '1200px+'}
            {viewport === 'tablet' && '768px - 1199px'}
            {viewport === 'mobile' && '320px - 767px'}
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="p-6 bg-white min-h-[300px] flex items-center justify-center">
        <div className={`w-full transition-all duration-500 ease-in-out ${getViewportClass()}`}>
          {error ? (
            <div className="p-6 text-red-600 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">!</span>
                </div>
                <p className="text-sm font-semibold">Preview Error</p>
              </div>
              <p className="text-xs text-red-500">{error}</p>
            </div>
          ) : (
            <div 
              className="preview-content rounded-lg overflow-hidden shadow-sm border border-gray-200"
              dangerouslySetInnerHTML={{ __html: generatePreviewHTML }}
            />
          )}
        </div>
      </div>
    </Card>
  )
}

// Preview generators for different block types
function generateHeroPreview(content: any, settings: any): string {
  const { title, subtitle, description, textAlign, backgroundType, backgroundColor } = content
  const { fullHeight, padding } = settings
  
  const alignClass = textAlign === 'center' ? 'text-center' : textAlign === 'right' ? 'text-right' : 'text-left'
  const paddingClass = padding === 'lg' ? 'py-20' : padding === 'xl' ? 'py-32' : 'py-16'
  const heightClass = fullHeight ? 'min-h-screen' : ''
  
  let backgroundStyle = ''
  if (backgroundType === 'solid' && backgroundColor) {
    backgroundStyle = `background-color: ${backgroundColor};`
  } else if (backgroundType === 'gradient') {
    backgroundStyle = 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);'
  }

  return `
    <div class="relative ${heightClass} ${paddingClass} flex items-center" style="${backgroundStyle}">
      <div class="container mx-auto px-4">
        <div class="${alignClass} max-w-4xl ${textAlign === 'center' ? 'mx-auto' : ''}">
          ${subtitle ? `<p class="text-lg text-blue-600 font-medium mb-4">${subtitle}</p>` : ''}
          ${title ? `<h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">${title}</h1>` : ''}
          ${description ? `<p class="text-xl text-gray-600 mb-8 leading-relaxed">${description}</p>` : ''}
          <div class="flex ${textAlign === 'center' ? 'justify-center' : textAlign === 'right' ? 'justify-end' : 'justify-start'} space-x-4">
            ${content.primaryButton?.text ? `
              <button class="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                ${content.primaryButton.text}
              </button>
            ` : ''}
            ${content.secondaryButton?.text ? `
              <button class="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                ${content.secondaryButton.text}
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    </div>
  `
}

function generateFeaturesPreview(content: any, settings: any): string {
  const { title, subtitle, description, layout, showIcons, features = [] } = content
  const { gap, hover, border, shadow } = settings
  
  const gridClass = layout === 'grid-2' ? 'grid-cols-1 md:grid-cols-2' : 
                   layout === 'grid-3' ? 'grid-cols-1 md:grid-cols-3' :
                   layout === 'grid-4' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' :
                   'space-y-6'
  
  const gapClass = gap === 'lg' ? 'gap-8' : gap === 'sm' ? 'gap-4' : 'gap-6'
  const cardClass = `${border ? 'border border-gray-200' : ''} ${shadow ? 'shadow-md' : ''} ${hover ? 'hover:shadow-lg transition-shadow' : ''} p-6 rounded-lg`

  return `
    <div class="py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          ${subtitle ? `<p class="text-lg text-blue-600 font-medium mb-4">${subtitle}</p>` : ''}
          ${title ? `<h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">${title}</h2>` : ''}
          ${description ? `<p class="text-xl text-gray-600 max-w-3xl mx-auto">${description}</p>` : ''}
        </div>
        
        <div class="${layout === 'list' ? 'space-y-6' : `grid ${gridClass} ${gapClass}`}">
          ${features.slice(0, 6).map((feature: any) => `
            <div class="${cardClass}">
              ${showIcons && feature.icon ? `
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span class="text-2xl">${getIconForName(feature.icon)}</span>
                </div>
              ` : ''}
              <h3 class="text-xl font-semibold text-gray-900 mb-3">${feature.title || 'Feature Title'}</h3>
              <p class="text-gray-600">${feature.description || 'Feature description goes here.'}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `
}

function generateTestimonialsPreview(content: any, settings: any): string {
  const { title, subtitle, description, layout, showRatings, testimonials = [] } = content
  
  return `
    <div class="py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          ${subtitle ? `<p class="text-lg text-blue-600 font-medium mb-4">${subtitle}</p>` : ''}
          ${title ? `<h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">${title}</h2>` : ''}
          ${description ? `<p class="text-xl text-gray-600 max-w-3xl mx-auto">${description}</p>` : ''}
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${testimonials.slice(0, 3).map((testimonial: any) => `
            <div class="bg-white p-6 rounded-lg shadow-md">
              ${showRatings && testimonial.rating ? `
                <div class="flex items-center mb-4">
                  ${'★'.repeat(testimonial.rating || 5)}<span class="text-gray-300">${'★'.repeat(5 - (testimonial.rating || 5))}</span>
                </div>
              ` : ''}
              <p class="text-gray-600 mb-4">"${testimonial.content || 'This is a great testimonial about the product or service.'}"</p>
              <div class="flex items-center">
                <div class="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                <div>
                  <p class="font-semibold text-gray-900">${testimonial.name || 'Customer Name'}</p>
                  <p class="text-sm text-gray-600">${testimonial.role || 'Position'} ${testimonial.company ? `at ${testimonial.company}` : ''}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `
}

function generateImagePreview(content: any, settings: any): string {
  const { src, alt, caption } = content
  const { alignment, rounded, shadow, hover } = settings
  
  const alignClass = alignment === 'center' ? 'mx-auto' : alignment === 'right' ? 'ml-auto' : ''
  const roundedClass = rounded === 'full' ? 'rounded-full' : rounded === 'lg' ? 'rounded-lg' : rounded === 'md' ? 'rounded-md' : ''
  const shadowClass = shadow === 'lg' ? 'shadow-lg' : shadow === 'md' ? 'shadow-md' : shadow === 'sm' ? 'shadow-sm' : ''
  const hoverClass = hover === 'zoom' ? 'hover:scale-105 transition-transform' : hover === 'fade' ? 'hover:opacity-80 transition-opacity' : ''

  return `
    <div class="py-8">
      <div class="container mx-auto px-4">
        <div class="${alignClass} max-w-2xl">
          <img 
            src="${src || '/placeholder-image.jpg'}" 
            alt="${alt || 'Image'}"
            class="w-full h-auto ${roundedClass} ${shadowClass} ${hoverClass}"
          />
          ${caption ? `<p class="text-sm text-gray-600 mt-2 text-center">${caption}</p>` : ''}
        </div>
      </div>
    </div>
  `
}

function generateButtonPreview(content: any, settings: any): string {
  const { text, icon, iconPosition } = content
  const { type, size, fullWidth } = settings
  
  const typeClass = type === 'primary' ? 'bg-blue-600 text-white hover:bg-blue-700' :
                   type === 'secondary' ? 'bg-gray-600 text-white hover:bg-gray-700' :
                   type === 'outline' ? 'border border-gray-300 text-gray-700 hover:bg-gray-50' :
                   type === 'ghost' ? 'text-gray-700 hover:bg-gray-100' :
                   'text-blue-600 hover:underline'
  
  const sizeClass = size === 'sm' ? 'px-4 py-2 text-sm' : size === 'lg' ? 'px-8 py-4 text-lg' : 'px-6 py-3'
  const widthClass = fullWidth ? 'w-full' : 'inline-flex'

  return `
    <div class="py-8">
      <div class="container mx-auto px-4 text-center">
        <button class="${typeClass} ${sizeClass} ${widthClass} items-center justify-center rounded-lg font-medium transition-colors">
          ${icon && iconPosition === 'left' ? `<span class="mr-2">${getIconForName(icon)}</span>` : ''}
          ${text || 'Button Text'}
          ${icon && iconPosition === 'right' ? `<span class="ml-2">${getIconForName(icon)}</span>` : ''}
        </button>
      </div>
    </div>
  `
}

function generateGenericPreview(content: any, settings: any): string {
  return `
    <div class="py-8">
      <div class="container mx-auto px-4">
        <div class="text-center">
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Block Preview</h3>
          <p class="text-gray-600">
            ${content.title || content.text || 'Block content will be displayed here'}
          </p>
        </div>
      </div>
    </div>
  `
}

// Helper function to get icon emoji for icon names
function getIconForName(iconName: string): string {
  const iconMap: Record<string, string> = {
    'zap': '⚡',
    'shield': '🛡️',
    'users': '👥',
    'star': '⭐',
    'heart': '❤️',
    'check': '✓',
    'arrow': '→',
    'plus': '+',
    'minus': '-',
    'x': '✕'
  }
  
  return iconMap[iconName] || iconName || '📦'
}
