"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { 
  Layers,
  Building2,
  Briefcase,
  BookOpen,
  User,
  ShoppingCart,
  Eye,
  Download
} from "lucide-react"

interface TemplateLibraryProps {
  isOpen: boolean
  onClose: () => void
  onSelectTemplate: (template: any) => void
}

// Pre-built template structures
const TEMPLATE_LIBRARY = {
  business: [
    {
      id: 'business-corporate',
      name: 'Corporate Business',
      description: 'Professional corporate website with hero, services, and contact sections',
      category: 'business',
      icon: Building2,
      structure: [
        {
          id: 'hero-1',
          type: 'Hero',
          component: 'HeroBlock',
          content: {
            title: 'Welcome to Our Company',
            subtitle: 'Leading the Industry Forward',
            description: 'We provide innovative solutions that drive business growth and success.',
            textAlign: 'center',
            backgroundType: 'gradient',
            primaryButton: { text: 'Get Started', href: '/contact' },
            secondaryButton: { text: 'Learn More', href: '/about' }
          },
          settings: {}
        },
        {
          id: 'features-1',
          type: 'Features',
          component: 'FeaturesBlock',
          content: {
            title: 'Our Services',
            subtitle: 'What We Offer',
            description: 'Comprehensive solutions tailored to your business needs',
            layout: 'grid-3',
            showIcons: true,
            features: [
              {
                title: 'Consulting',
                description: 'Expert business consulting services',
                icon: 'briefcase'
              },
              {
                title: 'Development',
                description: 'Custom software development solutions',
                icon: 'code'
              },
              {
                title: 'Support',
                description: '24/7 customer support and maintenance',
                icon: 'headphones'
              }
            ]
          },
          settings: {}
        },
        {
          id: 'cta-1',
          type: 'CTA',
          component: 'CTABlock',
          content: {
            title: 'Ready to Get Started?',
            description: 'Contact us today to discuss your project requirements',
            buttonText: 'Contact Us',
            buttonHref: '/contact',
            backgroundType: 'solid',
            backgroundColor: '#1f2937'
          },
          settings: {}
        }
      ]
    },
    {
      id: 'business-startup',
      name: 'Startup Landing',
      description: 'Modern startup landing page with product showcase and testimonials',
      category: 'business',
      icon: Briefcase,
      structure: [
        {
          id: 'hero-2',
          type: 'Hero',
          component: 'HeroBlock',
          content: {
            title: 'Revolutionary Product',
            subtitle: 'The Future is Here',
            description: 'Transform your workflow with our cutting-edge solution.',
            textAlign: 'left',
            backgroundType: 'image',
            primaryButton: { text: 'Start Free Trial', href: '/signup' },
            secondaryButton: { text: 'Watch Demo', href: '/demo' }
          },
          settings: {}
        },
        {
          id: 'testimonials-1',
          type: 'Testimonials',
          component: 'TestimonialsBlock',
          content: {
            title: 'What Our Customers Say',
            subtitle: 'Trusted by Thousands',
            layout: 'carousel',
            showRatings: true,
            testimonials: [
              {
                name: 'John Smith',
                role: 'CEO, TechCorp',
                content: 'This product has revolutionized our business operations.',
                rating: 5,
                avatar: '/avatars/john.jpg'
              },
              {
                name: 'Sarah Johnson',
                role: 'Marketing Director',
                content: 'Incredible results and outstanding support team.',
                rating: 5,
                avatar: '/avatars/sarah.jpg'
              }
            ]
          },
          settings: {}
        }
      ]
    }
  ],
  blog: [
    {
      id: 'blog-magazine',
      name: 'Magazine Style',
      description: 'Editorial blog layout with featured articles and categories',
      category: 'blog',
      icon: BookOpen,
      structure: [
        {
          id: 'hero-blog',
          type: 'Hero',
          component: 'HeroBlock',
          content: {
            title: 'The Daily Insight',
            subtitle: 'Stories That Matter',
            description: 'Discover the latest trends, insights, and stories from our expert writers.',
            textAlign: 'center',
            backgroundType: 'gradient'
          },
          settings: {}
        },
        {
          id: 'blog-grid',
          type: 'Content',
          component: 'BlogGridBlock',
          content: {
            title: 'Latest Articles',
            layout: 'grid-2',
            showExcerpts: true,
            showCategories: true,
            showDates: true
          },
          settings: {}
        }
      ]
    }
  ],
  portfolio: [
    {
      id: 'portfolio-creative',
      name: 'Creative Portfolio',
      description: 'Showcase your work with a stunning visual portfolio',
      category: 'portfolio',
      icon: User,
      structure: [
        {
          id: 'hero-portfolio',
          type: 'Hero',
          component: 'HeroBlock',
          content: {
            title: 'Creative Designer',
            subtitle: 'John Doe',
            description: 'Crafting beautiful digital experiences through innovative design.',
            textAlign: 'center',
            backgroundType: 'image',
            primaryButton: { text: 'View Portfolio', href: '#portfolio' },
            secondaryButton: { text: 'Contact Me', href: '/contact' }
          },
          settings: {}
        },
        {
          id: 'gallery-1',
          type: 'Gallery',
          component: 'GalleryBlock',
          content: {
            title: 'Featured Work',
            layout: 'masonry',
            columns: 3,
            showTitles: true,
            showDescriptions: false
          },
          settings: {}
        }
      ]
    }
  ],
  ecommerce: [
    {
      id: 'ecommerce-store',
      name: 'Online Store',
      description: 'Complete e-commerce layout with product showcase and features',
      category: 'ecommerce',
      icon: ShoppingCart,
      structure: [
        {
          id: 'hero-store',
          type: 'Hero',
          component: 'HeroBlock',
          content: {
            title: 'Premium Products',
            subtitle: 'Shop the Best',
            description: 'Discover our curated collection of high-quality products.',
            textAlign: 'center',
            backgroundType: 'image',
            primaryButton: { text: 'Shop Now', href: '/products' },
            secondaryButton: { text: 'View Catalog', href: '/catalog' }
          },
          settings: {}
        },
        {
          id: 'products-featured',
          type: 'Products',
          component: 'ProductsBlock',
          content: {
            title: 'Featured Products',
            layout: 'grid-4',
            showPrices: true,
            showRatings: true,
            showAddToCart: true
          },
          settings: {}
        }
      ]
    }
  ]
}

export function TemplateLibrary({ isOpen, onClose, onSelectTemplate }: TemplateLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof TEMPLATE_LIBRARY>('business')
  const [previewTemplate, setPreviewTemplate] = useState<any>(null)

  const categories = [
    { id: 'business', name: 'Business', icon: Building2 },
    { id: 'blog', name: 'Blog', icon: BookOpen },
    { id: 'portfolio', name: 'Portfolio', icon: User },
    { id: 'ecommerce', name: 'E-commerce', icon: ShoppingCart }
  ]

  const handleSelectTemplate = (template: any) => {
    onSelectTemplate({
      name: template.name,
      description: template.description,
      category: template.category,
      structure: JSON.stringify(template.structure)
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Layers className="h-5 w-5" />
            <span>Template Library</span>
          </DialogTitle>
        </DialogHeader>

        <div className="flex h-[60vh]">
          {/* Categories Sidebar */}
          <div className="w-48 border-r border-gray-200 pr-4">
            <div className="space-y-2">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id as keyof typeof TEMPLATE_LIBRARY)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{category.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Templates Grid */}
          <div className="flex-1 pl-6 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TEMPLATE_LIBRARY[selectedCategory]?.map((template) => {
                const Icon = template.icon
                return (
                  <div
                    key={template.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    {/* Template Preview */}
                    <div className="h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-md mb-3 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-gray-400" />
                    </div>

                    {/* Template Info */}
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900">{template.name}</h3>
                      <p className="text-sm text-gray-600">{template.description}</p>
                      
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded capitalize">
                          {template.category}
                        </span>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPreviewTemplate(template)}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          
                          <Button
                            size="sm"
                            onClick={() => handleSelectTemplate(template)}
                          >
                            <Download className="h-3 w-3 mr-1" />
                            Use Template
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Empty State */}
            {TEMPLATE_LIBRARY[selectedCategory]?.length === 0 && (
              <div className="text-center py-12">
                <Layers className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No templates available
                </h3>
                <p className="text-gray-600">
                  Templates for this category are coming soon.
                </p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>

      {/* Template Preview Modal */}
      {previewTemplate && (
        <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Preview: {previewTemplate.name}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <p className="text-gray-600">{previewTemplate.description}</p>
              
              {/* Template Structure Preview */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h4 className="font-medium text-gray-900 mb-3">Template Structure:</h4>
                <div className="space-y-2">
                  {previewTemplate.structure.map((block: any, index: number) => (
                    <div key={block.id} className="flex items-center space-x-3 text-sm">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </span>
                      <span className="font-medium">{block.type} Block</span>
                      <span className="text-gray-500">({block.component})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setPreviewTemplate(null)}>
                Close
              </Button>
              <Button onClick={() => handleSelectTemplate(previewTemplate)}>
                <Download className="h-4 w-4 mr-2" />
                Use This Template
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  )
}
