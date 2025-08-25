"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

interface HeroBlockProps {
  content?: {
    title?: string
    subtitle?: string
    description?: string
    primaryButton?: {
      text: string
      href: string
    }
    secondaryButton?: {
      text: string
      href: string
    }
    backgroundImage?: string
    backgroundType?: 'gradient' | 'image' | 'solid'
    backgroundColor?: string
    textAlign?: 'left' | 'center' | 'right'
  }
  isEditing?: boolean
  onEdit?: (content: any) => void
}

export function HeroBlock({ 
  content = {
    title: "Welcome to Our Platform",
    subtitle: "Innovative Solutions",
    description: "Transform your business with our cutting-edge technology and expert guidance. We help companies achieve their digital transformation goals.",
    primaryButton: { text: "Get Started", href: "/signup" },
    secondaryButton: { text: "Learn More", href: "/about" },
    backgroundType: "gradient",
    textAlign: "center"
  },
  isEditing = false,
  onEdit
}: HeroBlockProps) {
  
  const getBackgroundStyle = () => {
    switch (content.backgroundType) {
      case 'gradient':
        return 'bg-gradient-to-r from-blue-600 to-purple-600'
      case 'image':
        return content.backgroundImage ? '' : 'bg-gray-900'
      case 'solid':
        return content.backgroundColor || 'bg-blue-600'
      default:
        return 'bg-gradient-to-r from-blue-600 to-purple-600'
    }
  }

  const getTextAlign = () => {
    switch (content.textAlign) {
      case 'left':
        return 'text-left'
      case 'right':
        return 'text-right'
      case 'center':
      default:
        return 'text-center'
    }
  }

  return (
    <section className={`relative py-20 lg:py-32 ${getBackgroundStyle()}`}>
      {/* Background Image */}
      {content.backgroundType === 'image' && content.backgroundImage && (
        <div className="absolute inset-0">
          <Image
            src={content.backgroundImage}
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
      )}
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${getTextAlign()} ${content.textAlign === 'center' ? 'max-w-4xl mx-auto' : ''}`}>
          {/* Subtitle */}
          {content.subtitle && (
            <p className="text-lg font-medium text-blue-200 mb-4">
              {content.subtitle}
            </p>
          )}
          
          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {content.title}
          </h1>
          
          {/* Description */}
          {content.description && (
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              {content.description}
            </p>
          )}
          
          {/* Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 ${
            content.textAlign === 'center' ? 'justify-center' : 
            content.textAlign === 'right' ? 'justify-end' : 'justify-start'
          }`}>
            {content.primaryButton && (
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
                asChild
              >
                <a href={content.primaryButton.href}>
                  {content.primaryButton.text}
                </a>
              </Button>
            )}
            
            {content.secondaryButton && (
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg font-semibold"
                asChild
              >
                <a href={content.secondaryButton.href}>
                  {content.secondaryButton.text}
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Edit Overlay */}
      {isEditing && (
        <div className="absolute inset-0 bg-blue-500 bg-opacity-20 border-2 border-blue-500 border-dashed flex items-center justify-center">
          <Button
            onClick={() => onEdit?.(content)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Edit Hero Section
          </Button>
        </div>
      )}
    </section>
  )
}

// Block configuration for CMS
export const heroBlockConfig = {
  name: "Hero Section",
  type: "hero",
  category: "layout",
  description: "A prominent hero section with title, description, and call-to-action buttons",
  component: "HeroBlock",
  previewImage: "/cms/previews/hero-block.jpg",
  defaultContent: {
    title: "Welcome to Our Platform",
    subtitle: "Innovative Solutions",
    description: "Transform your business with our cutting-edge technology and expert guidance.",
    primaryButton: { text: "Get Started", href: "/signup" },
    secondaryButton: { text: "Learn More", href: "/about" },
    backgroundType: "gradient",
    textAlign: "center"
  },
  props: {
    title: { type: "text", label: "Title", required: true },
    subtitle: { type: "text", label: "Subtitle" },
    description: { type: "textarea", label: "Description" },
    primaryButton: {
      type: "object",
      label: "Primary Button",
      properties: {
        text: { type: "text", label: "Button Text" },
        href: { type: "text", label: "Button Link" }
      }
    },
    secondaryButton: {
      type: "object", 
      label: "Secondary Button",
      properties: {
        text: { type: "text", label: "Button Text" },
        href: { type: "text", label: "Button Link" }
      }
    },
    backgroundType: {
      type: "select",
      label: "Background Type",
      options: [
        { value: "gradient", label: "Gradient" },
        { value: "image", label: "Image" },
        { value: "solid", label: "Solid Color" }
      ]
    },
    backgroundImage: { type: "image", label: "Background Image" },
    backgroundColor: { type: "color", label: "Background Color" },
    textAlign: {
      type: "select",
      label: "Text Alignment",
      options: [
        { value: "left", label: "Left" },
        { value: "center", label: "Center" },
        { value: "right", label: "Right" }
      ]
    }
  }
}
