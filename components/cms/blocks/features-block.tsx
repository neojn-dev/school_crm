"use client"

import { Button } from "@/components/ui/button"
import { 
  Zap, 
  Shield, 
  Globe, 
  Smartphone, 
  BarChart3, 
  Users,
  Star,
  Heart,
  Lightbulb,
  Target
} from "lucide-react"

interface Feature {
  icon?: string
  title: string
  description: string
}

interface FeaturesBlockProps {
  content?: {
    title?: string
    subtitle?: string
    description?: string
    features?: Feature[]
    layout?: 'grid-2' | 'grid-3' | 'grid-4' | 'list'
    showIcons?: boolean
    backgroundColor?: string
  }
  isEditing?: boolean
  onEdit?: (content: any) => void
}

const iconMap = {
  zap: Zap,
  shield: Shield,
  globe: Globe,
  smartphone: Smartphone,
  chart: BarChart3,
  users: Users,
  star: Star,
  heart: Heart,
  lightbulb: Lightbulb,
  target: Target
}

export function FeaturesBlock({
  content = {
    title: "Why Choose Us",
    subtitle: "Our Features",
    description: "Discover the powerful features that make our platform the perfect choice for your business needs.",
    layout: "grid-3",
    showIcons: true,
    features: [
      {
        icon: "zap",
        title: "Lightning Fast",
        description: "Experience blazing fast performance with our optimized infrastructure and cutting-edge technology."
      },
      {
        icon: "shield",
        title: "Secure & Reliable",
        description: "Your data is protected with enterprise-grade security measures and 99.9% uptime guarantee."
      },
      {
        icon: "users",
        title: "Team Collaboration",
        description: "Work seamlessly with your team using our advanced collaboration tools and real-time updates."
      },
      {
        icon: "chart",
        title: "Analytics & Insights",
        description: "Make data-driven decisions with comprehensive analytics and detailed performance insights."
      },
      {
        icon: "smartphone",
        title: "Mobile Optimized",
        description: "Access your work from anywhere with our fully responsive design and mobile applications."
      },
      {
        icon: "globe",
        title: "Global Scale",
        description: "Expand your reach worldwide with our global infrastructure and multi-language support."
      }
    ]
  },
  isEditing = false,
  onEdit
}: FeaturesBlockProps) {

  const getGridCols = () => {
    switch (content.layout) {
      case 'grid-2':
        return 'grid-cols-1 md:grid-cols-2'
      case 'grid-3':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      case 'grid-4':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      case 'list':
        return 'grid-cols-1'
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    }
  }

  const getIcon = (iconName?: string) => {
    if (!iconName || !content.showIcons) return null
    const IconComponent = iconMap[iconName as keyof typeof iconMap]
    return IconComponent ? <IconComponent className="h-8 w-8" /> : null
  }

  return (
    <section className={`py-16 lg:py-24 ${content.backgroundColor || 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {content.subtitle && (
            <p className="text-lg font-medium text-blue-600 mb-4">
              {content.subtitle}
            </p>
          )}
          
          {content.title && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {content.title}
            </h2>
          )}
          
          {content.description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {content.description}
            </p>
          )}
        </div>

        {/* Features Grid */}
        <div className={`grid ${getGridCols()} gap-8`}>
          {content.features?.map((feature, index) => {
            const Icon = getIcon(feature.icon)
            
            return (
              <div
                key={index}
                className={`${
                  content.layout === 'list' 
                    ? 'flex items-start space-x-4 p-6 bg-gray-50 rounded-lg' 
                    : 'text-center'
                }`}
              >
                {/* Icon */}
                {Icon && (
                  <div className={`${
                    content.layout === 'list'
                      ? 'flex-shrink-0 p-3 bg-blue-600 text-white rounded-lg'
                      : 'inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-lg mb-6 mx-auto'
                  }`}>
                    {Icon}
                  </div>
                )}
                
                {/* Content */}
                <div className={content.layout === 'list' ? 'flex-1' : ''}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Edit Overlay */}
      {isEditing && (
        <div className="absolute inset-0 bg-blue-500 bg-opacity-20 border-2 border-blue-500 border-dashed flex items-center justify-center">
          <Button
            onClick={() => onEdit?.(content)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Edit Features Section
          </Button>
        </div>
      )}
    </section>
  )
}

// Block configuration for CMS
export const featuresBlockConfig = {
  name: "Features Section",
  type: "features",
  category: "content",
  description: "Showcase key features with icons, titles, and descriptions",
  component: "FeaturesBlock",
  previewImage: "/cms/previews/features-block.jpg",
  defaultContent: {
    title: "Why Choose Us",
    subtitle: "Our Features",
    description: "Discover the powerful features that make our platform the perfect choice for your business needs.",
    layout: "grid-3",
    showIcons: true,
    features: [
      {
        icon: "zap",
        title: "Lightning Fast",
        description: "Experience blazing fast performance with our optimized infrastructure."
      },
      {
        icon: "shield", 
        title: "Secure & Reliable",
        description: "Your data is protected with enterprise-grade security measures."
      },
      {
        icon: "users",
        title: "Team Collaboration", 
        description: "Work seamlessly with your team using our advanced collaboration tools."
      }
    ]
  },
  props: {
    title: { type: "text", label: "Title" },
    subtitle: { type: "text", label: "Subtitle" },
    description: { type: "textarea", label: "Description" },
    layout: {
      type: "select",
      label: "Layout",
      options: [
        { value: "grid-2", label: "2 Columns" },
        { value: "grid-3", label: "3 Columns" },
        { value: "grid-4", label: "4 Columns" },
        { value: "list", label: "List View" }
      ]
    },
    showIcons: { type: "boolean", label: "Show Icons" },
    backgroundColor: { type: "color", label: "Background Color" },
    features: {
      type: "array",
      label: "Features",
      itemType: "object",
      properties: {
        icon: {
          type: "select",
          label: "Icon",
          options: Object.keys(iconMap).map(key => ({ value: key, label: key }))
        },
        title: { type: "text", label: "Title", required: true },
        description: { type: "textarea", label: "Description", required: true }
      }
    }
  }
}
