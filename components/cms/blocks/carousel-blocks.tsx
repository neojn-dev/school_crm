"use client"

import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import Image from "next/image"

// ============ CAROUSEL BLOCK ============
interface CarouselBlockProps {
  content: {
    slides: Array<{
      type: 'image' | 'content'
      image?: string
      title?: string
      description?: string
      buttonText?: string
      buttonLink?: string
      background?: string
    }>
    autoplay: boolean
    interval: number
    showDots: boolean
    showArrows: boolean
    infinite: boolean
    aspectRatio: '16:9' | '4:3' | '1:1' | '21:9' | 'auto'
  }
  settings?: {
    animation: 'slide' | 'fade' | 'scale'
    pauseOnHover: boolean
    showPlayButton: boolean
  }
}

export function CarouselBlock({ content, settings }: CarouselBlockProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(content.autoplay)

  useEffect(() => {
    if (isPlaying && content.autoplay) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => 
          content.infinite 
            ? (prev + 1) % content.slides.length 
            : prev < content.slides.length - 1 ? prev + 1 : 0
        )
      }, content.interval)

      return () => clearInterval(timer)
    }
  }, [isPlaying, content.autoplay, content.infinite, content.interval, content.slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      content.infinite 
        ? (prev + 1) % content.slides.length 
        : prev < content.slides.length - 1 ? prev + 1 : prev
    )
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      content.infinite 
        ? (prev - 1 + content.slides.length) % content.slides.length 
        : prev > 0 ? prev - 1 : prev
    )
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const containerClasses = cn(
    "relative overflow-hidden rounded-lg my-6",
    {
      'aspect-video': content.aspectRatio === '16:9',
      'aspect-[4/3]': content.aspectRatio === '4:3',
      'aspect-square': content.aspectRatio === '1:1',
      'aspect-[21/9]': content.aspectRatio === '21:9',
    }
  )

  const slideVariants = {
    slide: {
      enter: { x: 1000, opacity: 0 },
      center: { x: 0, opacity: 1 },
      exit: { x: -1000, opacity: 0 }
    },
    fade: {
      enter: { opacity: 0 },
      center: { opacity: 1 },
      exit: { opacity: 0 }
    },
    scale: {
      enter: { scale: 0.8, opacity: 0 },
      center: { scale: 1, opacity: 1 },
      exit: { scale: 1.2, opacity: 0 }
    }
  }

  const animation = slideVariants[settings?.animation || 'slide']

  return (
    <div 
      className={containerClasses}
      onMouseEnter={() => settings?.pauseOnHover && setIsPlaying(false)}
      onMouseLeave={() => settings?.pauseOnHover && content.autoplay && setIsPlaying(true)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={animation.enter}
          animate={animation.center}
          exit={animation.exit}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {content.slides[currentSlide]?.type === 'image' ? (
            <Image
              src={content.slides[currentSlide].image || ''}
              alt={content.slides[currentSlide].title || ''}
              fill
              className="object-cover"
            />
          ) : (
            <div 
              className="w-full h-full flex items-center justify-center text-white"
              style={{ backgroundColor: content.slides[currentSlide]?.background || '#1f2937' }}
            >
              <div className="text-center p-8">
                {content.slides[currentSlide]?.title && (
                  <h3 className="text-3xl font-bold mb-4">{content.slides[currentSlide].title}</h3>
                )}
                {content.slides[currentSlide]?.description && (
                  <p className="text-lg mb-6">{content.slides[currentSlide].description}</p>
                )}
                {content.slides[currentSlide]?.buttonText && (
                  <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                    {content.slides[currentSlide].buttonText}
                  </button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      {content.showArrows && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Play/Pause Button */}
      {settings?.showPlayButton && content.autoplay && (
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>
      )}

      {/* Dots Indicator */}
      {content.showDots && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {content.slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all",
                currentSlide === index 
                  ? "bg-white" 
                  : "bg-white bg-opacity-50 hover:bg-opacity-75"
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export const carouselBlockConfig = {
  name: "Carousel",
  type: "carousel",
  category: "media",
  description: "Interactive carousel with multiple slide types",
  component: "CarouselBlock",
  defaultContent: {
    slides: [
      {
        type: 'content',
        title: 'Welcome to Our Platform',
        description: 'Discover amazing features and capabilities',
        buttonText: 'Get Started',
        buttonLink: '/signup',
        background: '#3b82f6'
      },
      {
        type: 'content',
        title: 'Powerful Features',
        description: 'Everything you need to succeed',
        buttonText: 'Learn More',
        buttonLink: '/features',
        background: '#8b5cf6'
      },
      {
        type: 'image',
        image: '/placeholder-carousel.jpg',
        title: 'Beautiful Design'
      }
    ],
    autoplay: true,
    interval: 5000,
    showDots: true,
    showArrows: true,
    infinite: true,
    aspectRatio: '16:9'
  },
  settings: {
    animation: 'slide',
    pauseOnHover: true,
    showPlayButton: true
  }
}

// ============ SLIDER BLOCK ============
interface SliderBlockProps {
  content: {
    items: Array<{
      title: string
      description?: string
      image?: string
      link?: string
    }>
    slidesToShow: 1 | 2 | 3 | 4
    autoplay: boolean
    interval: number
    showArrows: boolean
    centerMode: boolean
  }
  settings?: {
    gap: 'sm' | 'md' | 'lg'
    responsive: boolean
  }
}

export function SliderBlock({ content, settings }: SliderBlockProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (content.autoplay) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % content.items.length)
      }, content.interval)

      return () => clearInterval(timer)
    }
  }, [content.autoplay, content.interval, content.items.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % content.items.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + content.items.length) % content.items.length)
  }

  const containerClasses = cn(
    "relative overflow-hidden my-6"
  )

  const sliderClasses = cn(
    "flex transition-transform duration-500 ease-in-out",
    {
      'gap-2': settings?.gap === 'sm',
      'gap-4': settings?.gap === 'md',
      'gap-6': settings?.gap === 'lg',
    }
  )

  const itemWidth = 100 / content.slidesToShow
  const translateX = -currentIndex * itemWidth

  return (
    <div className={containerClasses}>
      <div 
        className={sliderClasses}
        style={{ transform: `translateX(${translateX}%)` }}
      >
        {content.items.map((item, index) => (
          <div
            key={index}
            className="flex-shrink-0 bg-white rounded-lg shadow-md overflow-hidden"
            style={{ width: `${itemWidth}%` }}
          >
            {item.image && (
              <div className="aspect-video relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              {item.description && (
                <p className="text-gray-600 text-sm">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {content.showArrows && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-2 rounded-full hover:bg-gray-50 transition-all"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white shadow-lg p-2 rounded-full hover:bg-gray-50 transition-all"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}
    </div>
  )
}

export const sliderBlockConfig = {
  name: "Slider",
  type: "slider",
  category: "media",
  description: "Multi-item slider with responsive options",
  component: "SliderBlock",
  defaultContent: {
    items: [
      {
        title: "Feature One",
        description: "Amazing feature description",
        image: "/placeholder-1.jpg"
      },
      {
        title: "Feature Two", 
        description: "Another great feature",
        image: "/placeholder-2.jpg"
      },
      {
        title: "Feature Three",
        description: "Third awesome feature",
        image: "/placeholder-3.jpg"
      },
      {
        title: "Feature Four",
        description: "Fourth incredible feature",
        image: "/placeholder-4.jpg"
      }
    ],
    slidesToShow: 3,
    autoplay: true,
    interval: 4000,
    showArrows: true,
    centerMode: false
  },
  settings: {
    gap: 'md',
    responsive: true
  }
}

// ============ TABS BLOCK ============
interface TabsBlockProps {
  content: {
    tabs: Array<{
      label: string
      content: string
      icon?: string
    }>
    style: 'default' | 'pills' | 'underline' | 'cards'
    alignment: 'left' | 'center' | 'right'
    vertical: boolean
  }
}

export function TabsBlock({ content }: TabsBlockProps) {
  const [activeTab, setActiveTab] = useState(0)

  const tabListClasses = cn(
    "flex border-b border-gray-200",
    {
      'justify-start': content.alignment === 'left',
      'justify-center': content.alignment === 'center',
      'justify-end': content.alignment === 'right',
    },
    content.vertical && "flex-col border-b-0 border-r w-48"
  )

  const tabClasses = (isActive: boolean) => cn(
    "px-4 py-2 font-medium transition-all cursor-pointer",
    {
      'border-b-2 border-blue-500 text-blue-600': content.style === 'default' && isActive,
      'border-b-2 border-transparent text-gray-500 hover:text-gray-700': content.style === 'default' && !isActive,
      'bg-blue-500 text-white rounded-lg': content.style === 'pills' && isActive,
      'bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200': content.style === 'pills' && !isActive,
      'border-b-2 border-blue-500 text-blue-600': content.style === 'underline' && isActive,
      'border-b-2 border-transparent text-gray-500 hover:text-gray-700': content.style === 'underline' && !isActive,
      'bg-white border border-gray-200 rounded-t-lg shadow-sm': content.style === 'cards' && isActive,
      'bg-gray-50 border border-gray-200 rounded-t-lg text-gray-600 hover:bg-gray-100': content.style === 'cards' && !isActive,
    }
  )

  const contentClasses = cn(
    "p-6 bg-white",
    content.style === 'cards' && "border border-gray-200 border-t-0 rounded-b-lg",
    content.vertical && "flex-1 ml-4"
  )

  return (
    <div className={cn("my-6", content.vertical && "flex")}>
      <div className={tabListClasses}>
        {content.tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={tabClasses(activeTab === index)}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      <div className={contentClasses}>
        <div dangerouslySetInnerHTML={{ __html: content.tabs[activeTab]?.content || '' }} />
      </div>
    </div>
  )
}

export const tabsBlockConfig = {
  name: "Tabs",
  type: "tabs",
  category: "interactive",
  description: "Tabbed content with various styling options",
  component: "TabsBlock",
  defaultContent: {
    tabs: [
      {
        label: "Overview",
        content: "<h3>Overview Content</h3><p>This is the overview tab content with detailed information.</p>",
        icon: "📋"
      },
      {
        label: "Features",
        content: "<h3>Features</h3><p>Here are the amazing features we offer to our users.</p>",
        icon: "⭐"
      },
      {
        label: "Pricing",
        content: "<h3>Pricing Plans</h3><p>Choose from our flexible pricing options that suit your needs.</p>",
        icon: "💰"
      }
    ],
    style: 'default',
    alignment: 'left',
    vertical: false
  }
}
