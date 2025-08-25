"use client"

import { Button } from "@/components/ui/button"
import { Star, Quote } from "lucide-react"
import Image from "next/image"

interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar?: string
}

interface TestimonialsBlockProps {
  content?: {
    title?: string
    subtitle?: string
    description?: string
    testimonials?: Testimonial[]
    layout?: 'carousel' | 'grid' | 'single'
    showRatings?: boolean
    backgroundColor?: string
  }
  isEditing?: boolean
  onEdit?: (content: any) => void
}

export function TestimonialsBlock({
  content = {
    title: "What Our Customers Say",
    subtitle: "Testimonials",
    description: "Don't just take our word for it. Here's what our satisfied customers have to say about their experience.",
    layout: "grid",
    showRatings: true,
    testimonials: [
      {
        name: "Sarah Johnson",
        role: "CEO",
        company: "TechStart Inc.",
        content: "This platform has completely transformed how we manage our business operations. The intuitive interface and powerful features have saved us countless hours.",
        rating: 5,
        avatar: "/avatars/sarah.jpg"
      },
      {
        name: "Michael Chen",
        role: "Product Manager",
        company: "InnovateCorp",
        content: "The customer support is exceptional, and the platform's reliability is unmatched. We've seen a 40% increase in productivity since switching.",
        rating: 5,
        avatar: "/avatars/michael.jpg"
      },
      {
        name: "Emily Rodriguez",
        role: "Marketing Director",
        company: "GrowthLab",
        content: "The analytics and insights provided have helped us make better data-driven decisions. It's an essential tool for our marketing team.",
        rating: 5,
        avatar: "/avatars/emily.jpg"
      }
    ]
  },
  isEditing = false,
  onEdit
}: TestimonialsBlockProps) {

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  const getGridCols = () => {
    if (content.layout === 'single') return 'grid-cols-1'
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
  }

  return (
    <section className={`py-16 lg:py-24 ${content.backgroundColor || 'bg-gray-50'}`}>
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

        {/* Testimonials */}
        <div className={`grid ${getGridCols()} gap-8`}>
          {content.testimonials?.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Quote Icon */}
              <Quote className="h-8 w-8 text-blue-600 mb-4" />
              
              {/* Rating */}
              {content.showRatings && (
                <div className="flex items-center mb-4">
                  {renderStars(testimonial.rating)}
                </div>
              )}
              
              {/* Content */}
              <blockquote className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center">
                {testimonial.avatar && (
                  <div className="flex-shrink-0 mr-4">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Edit Overlay */}
      {isEditing && (
        <div className="absolute inset-0 bg-blue-500 bg-opacity-20 border-2 border-blue-500 border-dashed flex items-center justify-center">
          <Button
            onClick={() => onEdit?.(content)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Edit Testimonials Section
          </Button>
        </div>
      )}
    </section>
  )
}

// Block configuration for CMS
export const testimonialsBlockConfig = {
  name: "Testimonials Section",
  type: "testimonials",
  category: "content",
  description: "Display customer testimonials with ratings and author information",
  component: "TestimonialsBlock",
  previewImage: "/cms/previews/testimonials-block.jpg",
  defaultContent: {
    title: "What Our Customers Say",
    subtitle: "Testimonials",
    description: "Don't just take our word for it. Here's what our satisfied customers have to say.",
    layout: "grid",
    showRatings: true,
    testimonials: [
      {
        name: "Sarah Johnson",
        role: "CEO",
        company: "TechStart Inc.",
        content: "This platform has completely transformed how we manage our business operations.",
        rating: 5
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
        { value: "grid", label: "Grid" },
        { value: "carousel", label: "Carousel" },
        { value: "single", label: "Single" }
      ]
    },
    showRatings: { type: "boolean", label: "Show Ratings" },
    backgroundColor: { type: "color", label: "Background Color" },
    testimonials: {
      type: "array",
      label: "Testimonials",
      itemType: "object",
      properties: {
        name: { type: "text", label: "Name", required: true },
        role: { type: "text", label: "Role", required: true },
        company: { type: "text", label: "Company", required: true },
        content: { type: "textarea", label: "Testimonial Content", required: true },
        rating: { type: "number", label: "Rating (1-5)", min: 1, max: 5 },
        avatar: { type: "image", label: "Avatar Image" }
      }
    }
  }
}
