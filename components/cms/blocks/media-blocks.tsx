"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { Play, X } from "lucide-react"

// ============ IMAGE BLOCK ============
interface ImageBlockProps {
  content: {
    src: string
    alt: string
    caption?: string
    width?: number
    height?: number
    objectFit: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
    alignment: 'left' | 'center' | 'right'
    rounded: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
    shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    hover: 'none' | 'zoom' | 'lift' | 'brightness'
  }
  settings?: {
    lazy: boolean
    lightbox: boolean
    maxWidth: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  }
}

export function ImageBlock({ content, settings }: ImageBlockProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const containerClasses = cn(
    "relative my-6",
    {
      'text-left': content.alignment === 'left',
      'text-center': content.alignment === 'center',
      'text-right': content.alignment === 'right',
    },
    {
      'max-w-sm': settings?.maxWidth === 'sm',
      'max-w-md': settings?.maxWidth === 'md',
      'max-w-lg': settings?.maxWidth === 'lg',
      'max-w-xl': settings?.maxWidth === 'xl',
      'max-w-full': settings?.maxWidth === 'full',
    }
  )

  const imageClasses = cn(
    "transition-all duration-300",
    {
      'rounded-none': content.rounded === 'none',
      'rounded-sm': content.rounded === 'sm',
      'rounded-md': content.rounded === 'md',
      'rounded-lg': content.rounded === 'lg',
      'rounded-xl': content.rounded === 'xl',
      'rounded-full': content.rounded === 'full',
    },
    {
      'shadow-none': content.shadow === 'none',
      'shadow-sm': content.shadow === 'sm',
      'shadow-md': content.shadow === 'md',
      'shadow-lg': content.shadow === 'lg',
      'shadow-xl': content.shadow === 'xl',
    },
    {
      'hover:scale-105': content.hover === 'zoom',
      'hover:shadow-2xl hover:-translate-y-2': content.hover === 'lift',
      'hover:brightness-110': content.hover === 'brightness',
    },
    settings?.lightbox && 'cursor-pointer'
  )

  const handleImageClick = () => {
    if (settings?.lightbox) {
      setIsLightboxOpen(true)
    }
  }

  return (
    <>
      <div className={containerClasses}>
        <div className="inline-block">
          <Image
            src={content.src}
            alt={content.alt}
            width={content.width || 800}
            height={content.height || 600}
            className={imageClasses}
            style={{ objectFit: content.objectFit }}
            loading={settings?.lazy ? 'lazy' : 'eager'}
            onClick={handleImageClick}
          />
          {content.caption && (
            <p className="text-sm text-gray-600 mt-2 italic">{content.caption}</p>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <X className="h-8 w-8" />
          </button>
          <Image
            src={content.src}
            alt={content.alt}
            width={1200}
            height={900}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </>
  )
}

export const imageBlockConfig = {
  name: "Image",
  type: "image",
  category: "media",
  description: "Responsive images with various styling and interaction options",
  component: "ImageBlock",
  defaultContent: {
    src: "/placeholder-image.jpg",
    alt: "Placeholder image",
    objectFit: 'cover',
    alignment: 'center',
    rounded: 'md',
    shadow: 'md',
    hover: 'zoom'
  },
  settings: {
    lazy: true,
    lightbox: true,
    maxWidth: 'full'
  }
}

// ============ VIDEO BLOCK ============
interface VideoBlockProps {
  content: {
    src?: string
    embedUrl?: string
    poster?: string
    type: 'upload' | 'youtube' | 'vimeo' | 'embed'
    autoplay: boolean
    controls: boolean
    loop: boolean
    muted: boolean
    aspectRatio: '16:9' | '4:3' | '1:1' | '21:9'
  }
  settings?: {
    maxWidth: 'sm' | 'md' | 'lg' | 'xl' | 'full'
    alignment: 'left' | 'center' | 'right'
  }
}

export function VideoBlock({ content, settings }: VideoBlockProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  const containerClasses = cn(
    "relative my-6",
    {
      'text-left': settings?.alignment === 'left',
      'text-center': settings?.alignment === 'center',
      'text-right': settings?.alignment === 'right',
    },
    {
      'max-w-sm': settings?.maxWidth === 'sm',
      'max-w-md': settings?.maxWidth === 'md',
      'max-w-lg': settings?.maxWidth === 'lg',
      'max-w-xl': settings?.maxWidth === 'xl',
      'max-w-full': settings?.maxWidth === 'full',
    }
  )

  const aspectClasses = cn(
    "relative w-full overflow-hidden rounded-lg",
    {
      'aspect-video': content.aspectRatio === '16:9',
      'aspect-[4/3]': content.aspectRatio === '4:3',
      'aspect-square': content.aspectRatio === '1:1',
      'aspect-[21/9]': content.aspectRatio === '21:9',
    }
  )

  const renderVideo = () => {
    if (content.type === 'youtube' && content.embedUrl) {
      return (
        <iframe
          src={`${content.embedUrl}${content.autoplay ? '&autoplay=1' : ''}`}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )
    }

    if (content.type === 'vimeo' && content.embedUrl) {
      return (
        <iframe
          src={`${content.embedUrl}${content.autoplay ? '&autoplay=1' : ''}`}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      )
    }

    if (content.type === 'embed' && content.embedUrl) {
      return (
        <iframe
          src={content.embedUrl}
          className="absolute inset-0 w-full h-full"
          allowFullScreen
        />
      )
    }

    if (content.type === 'upload' && content.src) {
      return (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          controls={content.controls}
          autoPlay={content.autoplay}
          loop={content.loop}
          muted={content.muted}
          poster={content.poster}
        >
          <source src={content.src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )
    }

    return (
      <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">No video source provided</p>
      </div>
    )
  }

  return (
    <div className={containerClasses}>
      <div className={aspectClasses}>
        {renderVideo()}
        {!isPlaying && content.poster && !content.autoplay && (
          <div 
            className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center cursor-pointer"
            onClick={() => setIsPlaying(true)}
          >
            <Play className="h-16 w-16 text-white" />
          </div>
        )}
      </div>
    </div>
  )
}

export const videoBlockConfig = {
  name: "Video",
  type: "video",
  category: "media",
  description: "Video player with support for uploads and embeds",
  component: "VideoBlock",
  defaultContent: {
    type: 'youtube',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    autoplay: false,
    controls: true,
    loop: false,
    muted: false,
    aspectRatio: '16:9'
  },
  settings: {
    maxWidth: 'full',
    alignment: 'center'
  }
}

// ============ GALLERY BLOCK ============
interface GalleryBlockProps {
  content: {
    images: Array<{
      src: string
      alt: string
      caption?: string
    }>
    layout: 'grid' | 'masonry' | 'carousel' | 'justified'
    columns: 2 | 3 | 4 | 5 | 6
    gap: 'sm' | 'md' | 'lg'
    aspectRatio: 'auto' | 'square' | '4:3' | '16:9'
  }
  settings?: {
    lightbox: boolean
    lazy: boolean
    showCaptions: boolean
  }
}

export function GalleryBlock({ content, settings }: GalleryBlockProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const containerClasses = cn(
    "my-6",
    {
      'grid': content.layout === 'grid',
      'columns-2 md:columns-3 lg:columns-4': content.layout === 'masonry',
      'flex overflow-x-auto space-x-4': content.layout === 'carousel',
    },
    content.layout === 'grid' && {
      'grid-cols-2': content.columns === 2,
      'grid-cols-3': content.columns === 3,
      'grid-cols-2 md:grid-cols-4': content.columns === 4,
      'grid-cols-2 md:grid-cols-3 lg:grid-cols-5': content.columns === 5,
      'grid-cols-2 md:grid-cols-3 lg:grid-cols-6': content.columns === 6,
    },
    {
      'gap-2': content.gap === 'sm',
      'gap-4': content.gap === 'md',
      'gap-6': content.gap === 'lg',
    }
  )

  const imageClasses = cn(
    "w-full transition-all duration-300 hover:opacity-90",
    {
      'aspect-auto': content.aspectRatio === 'auto',
      'aspect-square': content.aspectRatio === 'square',
      'aspect-[4/3]': content.aspectRatio === '4:3',
      'aspect-video': content.aspectRatio === '16:9',
    },
    content.layout === 'carousel' && 'flex-shrink-0 w-64',
    settings?.lightbox && 'cursor-pointer'
  )

  const handleImageClick = (index: number) => {
    if (settings?.lightbox) {
      setLightboxIndex(index)
    }
  }

  const closeLightbox = () => setLightboxIndex(null)
  const nextImage = () => setLightboxIndex((prev) => 
    prev !== null ? (prev + 1) % content.images.length : null
  )
  const prevImage = () => setLightboxIndex((prev) => 
    prev !== null ? (prev - 1 + content.images.length) % content.images.length : null
  )

  return (
    <>
      <div className={containerClasses}>
        {content.images.map((image, index) => (
          <div key={index} className={content.layout === 'masonry' ? 'mb-4 break-inside-avoid' : ''}>
            <Image
              src={image.src}
              alt={image.alt}
              width={400}
              height={300}
              className={imageClasses}
              style={{ objectFit: 'cover' }}
              loading={settings?.lazy ? 'lazy' : 'eager'}
              onClick={() => handleImageClick(index)}
            />
            {settings?.showCaptions && image.caption && (
              <p className="text-sm text-gray-600 mt-2">{image.caption}</p>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
          >
            <X className="h-8 w-8" />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
          >
            ←
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
          >
            →
          </button>
          <Image
            src={content.images[lightboxIndex].src}
            alt={content.images[lightboxIndex].alt}
            width={1200}
            height={900}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </>
  )
}

export const galleryBlockConfig = {
  name: "Gallery",
  type: "gallery",
  category: "media",
  description: "Image gallery with multiple layout options",
  component: "GalleryBlock",
  defaultContent: {
    images: [
      { src: "/placeholder-1.jpg", alt: "Gallery image 1", caption: "First image" },
      { src: "/placeholder-2.jpg", alt: "Gallery image 2", caption: "Second image" },
      { src: "/placeholder-3.jpg", alt: "Gallery image 3", caption: "Third image" },
      { src: "/placeholder-4.jpg", alt: "Gallery image 4", caption: "Fourth image" }
    ],
    layout: 'grid',
    columns: 3,
    gap: 'md',
    aspectRatio: 'square'
  },
  settings: {
    lightbox: true,
    lazy: true,
    showCaptions: true
  }
}

// ============ ICON BLOCK ============
interface IconBlockProps {
  content: {
    icon: string
    size: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    color: string
    background: 'none' | 'circle' | 'square' | 'rounded'
    bgColor?: string
    alignment: 'left' | 'center' | 'right'
    animation: 'none' | 'bounce' | 'pulse' | 'spin'
  }
}

export function IconBlock({ content }: IconBlockProps) {
  const containerClasses = cn(
    "my-4",
    {
      'text-left': content.alignment === 'left',
      'text-center': content.alignment === 'center',
      'text-right': content.alignment === 'right',
    }
  )

  const iconClasses = cn(
    "inline-flex items-center justify-center",
    {
      'w-6 h-6 text-lg': content.size === 'sm',
      'w-8 h-8 text-xl': content.size === 'md',
      'w-12 h-12 text-2xl': content.size === 'lg',
      'w-16 h-16 text-3xl': content.size === 'xl',
      'w-20 h-20 text-4xl': content.size === '2xl',
    },
    {
      'rounded-full': content.background === 'circle',
      'rounded-none': content.background === 'square',
      'rounded-lg': content.background === 'rounded',
    },
    {
      'animate-bounce': content.animation === 'bounce',
      'animate-pulse': content.animation === 'pulse',
      'animate-spin': content.animation === 'spin',
    },
    content.color
  )

  const style = content.background !== 'none' && content.bgColor 
    ? { backgroundColor: content.bgColor }
    : {}

  return (
    <div className={containerClasses}>
      <div className={iconClasses} style={style}>
        <span>{content.icon}</span>
      </div>
    </div>
  )
}

export const iconBlockConfig = {
  name: "Icon",
  type: "icon",
  category: "media",
  description: "Customizable icons with various styling options",
  component: "IconBlock",
  defaultContent: {
    icon: "⭐",
    size: 'lg',
    color: 'text-blue-500',
    background: 'circle',
    bgColor: '#f3f4f6',
    alignment: 'center',
    animation: 'none'
  }
}
