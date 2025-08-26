"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ArrowRight, Download, Play, ExternalLink, Phone, Mail } from "lucide-react"

// ============ BUTTON BLOCK ============
interface ButtonBlockProps {
  content: {
    text: string
    href?: string
    type: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
    size: 'sm' | 'md' | 'lg' | 'xl'
    icon?: 'arrow' | 'download' | 'play' | 'external' | 'phone' | 'mail' | 'none'
    iconPosition: 'left' | 'right'
    fullWidth: boolean
    disabled: boolean
  }
  settings?: {
    alignment: 'left' | 'center' | 'right'
    animation: 'none' | 'hover' | 'pulse' | 'bounce'
    openInNewTab: boolean
  }
}

export function ButtonBlock({ content, settings }: ButtonBlockProps) {
  const icons = {
    arrow: ArrowRight,
    download: Download,
    play: Play,
    external: ExternalLink,
    phone: Phone,
    mail: Mail,
    none: null
  }

  const IconComponent = content.icon !== 'none' ? icons[content.icon] : null

  const buttonClasses = cn(
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
    {
      'px-3 py-1.5 text-sm': content.size === 'sm',
      'px-4 py-2 text-base': content.size === 'md',
      'px-6 py-3 text-lg': content.size === 'lg',
      'px-8 py-4 text-xl': content.size === 'xl',
    },
    {
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500': content.type === 'primary',
      'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500': content.type === 'secondary',
      'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500': content.type === 'outline',
      'text-blue-600 hover:bg-blue-50 focus:ring-blue-500': content.type === 'ghost',
      'text-blue-600 hover:text-blue-800 underline': content.type === 'link',
    },
    {
      'w-full': content.fullWidth,
      'opacity-50 cursor-not-allowed': content.disabled,
    },
    {
      'hover:scale-105': settings?.animation === 'hover',
      'animate-pulse': settings?.animation === 'pulse',
      'animate-bounce': settings?.animation === 'bounce',
    }
  )

  const containerClasses = cn(
    "my-4",
    {
      'text-left': settings?.alignment === 'left',
      'text-center': settings?.alignment === 'center',
      'text-right': settings?.alignment === 'right',
    }
  )

  const buttonContent = (
    <>
      {IconComponent && content.iconPosition === 'left' && (
        <IconComponent className="w-4 h-4 mr-2" />
      )}
      {content.text}
      {IconComponent && content.iconPosition === 'right' && (
        <IconComponent className="w-4 h-4 ml-2" />
      )}
    </>
  )

  return (
    <div className={containerClasses}>
      {content.href ? (
        <Link
          href={content.href}
          className={buttonClasses}
          target={settings?.openInNewTab ? '_blank' : undefined}
          rel={settings?.openInNewTab ? 'noopener noreferrer' : undefined}
        >
          {buttonContent}
        </Link>
      ) : (
        <button className={buttonClasses} disabled={content.disabled}>
          {buttonContent}
        </button>
      )}
    </div>
  )
}

export const buttonBlockConfig = {
  name: "Button",
  type: "button",
  category: "cta",
  description: "Customizable call-to-action button",
  component: "ButtonBlock",
  defaultContent: {
    text: "Get Started",
    href: "/signup",
    type: 'primary',
    size: 'md',
    icon: 'arrow',
    iconPosition: 'right',
    fullWidth: false,
    disabled: false
  },
  settings: {
    alignment: 'center',
    animation: 'hover',
    openInNewTab: false
  }
}

// ============ CTA SECTION BLOCK ============
interface CtaSectionBlockProps {
  content: {
    title: string
    description?: string
    primaryButton: {
      text: string
      href: string
      style: 'primary' | 'secondary' | 'outline'
    }
    secondaryButton?: {
      text: string
      href: string
      style: 'primary' | 'secondary' | 'outline'
    }
    background: 'none' | 'gradient' | 'image' | 'color'
    backgroundImage?: string
    backgroundColor?: string
    textColor: 'dark' | 'light'
  }
  settings?: {
    padding: 'sm' | 'md' | 'lg' | 'xl'
    alignment: 'left' | 'center' | 'right'
    maxWidth: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  }
}

export function CtaSectionBlock({ content, settings }: CtaSectionBlockProps) {
  const containerClasses = cn(
    "relative overflow-hidden rounded-lg my-8",
    {
      'py-8 px-6': settings?.padding === 'sm',
      'py-12 px-8': settings?.padding === 'md',
      'py-16 px-12': settings?.padding === 'lg',
      'py-24 px-16': settings?.padding === 'xl',
    },
    {
      'text-left': settings?.alignment === 'left',
      'text-center': settings?.alignment === 'center',
      'text-right': settings?.alignment === 'right',
    },
    {
      'bg-gradient-to-r from-blue-600 to-purple-600': content.background === 'gradient',
    }
  )

  const contentClasses = cn(
    "relative z-10 mx-auto",
    {
      'max-w-sm': settings?.maxWidth === 'sm',
      'max-w-md': settings?.maxWidth === 'md',
      'max-w-lg': settings?.maxWidth === 'lg',
      'max-w-xl': settings?.maxWidth === 'xl',
      'max-w-full': settings?.maxWidth === 'full',
    }
  )

  const textClasses = cn(
    {
      'text-gray-900': content.textColor === 'dark',
      'text-white': content.textColor === 'light',
    }
  )

  const buttonClasses = (style: string) => cn(
    "inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200",
    {
      'bg-white text-gray-900 hover:bg-gray-100': style === 'primary' && content.textColor === 'light',
      'bg-blue-600 text-white hover:bg-blue-700': style === 'primary' && content.textColor === 'dark',
      'bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900': style === 'outline' && content.textColor === 'light',
      'bg-transparent border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white': style === 'outline' && content.textColor === 'dark',
    }
  )

  const backgroundStyle: any = {}
  if (content.background === 'image' && content.backgroundImage) {
    backgroundStyle.backgroundImage = `url(${content.backgroundImage})`
    backgroundStyle.backgroundSize = 'cover'
    backgroundStyle.backgroundPosition = 'center'
  }
  if (content.background === 'color' && content.backgroundColor) {
    backgroundStyle.backgroundColor = content.backgroundColor
  }

  return (
    <div className={containerClasses} style={backgroundStyle}>
      {content.background === 'image' && (
        <div className="absolute inset-0 bg-black bg-opacity-50" />
      )}
      
      <div className={contentClasses}>
        <h2 className={cn("text-3xl md:text-4xl font-bold mb-4", textClasses)}>
          {content.title}
        </h2>
        
        {content.description && (
          <p className={cn("text-lg md:text-xl mb-8 opacity-90", textClasses)}>
            {content.description}
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={content.primaryButton.href}
            className={buttonClasses(content.primaryButton.style)}
          >
            {content.primaryButton.text}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          
          {content.secondaryButton && (
            <Link
              href={content.secondaryButton.href}
              className={buttonClasses(content.secondaryButton.style)}
            >
              {content.secondaryButton.text}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export const ctaSectionBlockConfig = {
  name: "CTA Section",
  type: "cta-section",
  category: "cta",
  description: "Full-width call-to-action section with background options",
  component: "CtaSectionBlock",
  defaultContent: {
    title: "Ready to Get Started?",
    description: "Join thousands of satisfied customers and transform your business today.",
    primaryButton: {
      text: "Start Free Trial",
      href: "/signup",
      style: 'primary'
    },
    secondaryButton: {
      text: "Learn More",
      href: "/about",
      style: 'outline'
    },
    background: 'gradient',
    textColor: 'light'
  },
  settings: {
    padding: 'lg',
    alignment: 'center',
    maxWidth: 'lg'
  }
}

// ============ BANNER BLOCK ============
interface BannerBlockProps {
  content: {
    text: string
    type: 'info' | 'success' | 'warning' | 'error' | 'announcement'
    dismissible: boolean
    button?: {
      text: string
      href: string
    }
    icon?: string
  }
  settings?: {
    position: 'top' | 'bottom' | 'inline'
    sticky: boolean
  }
}

export function BannerBlock({ content, settings }: BannerBlockProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const typeStyles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    announcement: 'bg-purple-50 border-purple-200 text-purple-800'
  }

  const containerClasses = cn(
    "border-l-4 p-4 my-4 flex items-center justify-between",
    typeStyles[content.type],
    {
      'fixed top-0 left-0 right-0 z-50': settings?.position === 'top' && settings?.sticky,
      'fixed bottom-0 left-0 right-0 z-50': settings?.position === 'bottom' && settings?.sticky,
    }
  )

  return (
    <div className={containerClasses}>
      <div className="flex items-center">
        {content.icon && (
          <span className="mr-3 text-lg">{content.icon}</span>
        )}
        <span className="font-medium">{content.text}</span>
        {content.button && (
          <Link
            href={content.button.href}
            className="ml-4 underline hover:no-underline"
          >
            {content.button.text}
          </Link>
        )}
      </div>
      
      {content.dismissible && (
        <button
          onClick={() => setIsVisible(false)}
          className="ml-4 text-lg hover:opacity-70"
        >
          ×
        </button>
      )}
    </div>
  )
}

export const bannerBlockConfig = {
  name: "Banner",
  type: "banner",
  category: "cta",
  description: "Notification banner with various styles",
  component: "BannerBlock",
  defaultContent: {
    text: "🎉 Special offer: Get 50% off your first month!",
    type: 'announcement',
    dismissible: true,
    button: {
      text: "Claim Offer",
      href: "/signup"
    },
    icon: "🎉"
  },
  settings: {
    position: 'inline',
    sticky: false
  }
}

// ============ COUNTDOWN BLOCK ============
interface CountdownBlockProps {
  content: {
    title?: string
    targetDate: string
    labels: {
      days: string
      hours: string
      minutes: string
      seconds: string
    }
    style: 'simple' | 'cards' | 'circles'
    size: 'sm' | 'md' | 'lg'
  }
  settings?: {
    showLabels: boolean
    alignment: 'left' | 'center' | 'right'
  }
}

export function CountdownBlock({ content, settings }: CountdownBlockProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const target = new Date(content.targetDate).getTime()
      const now = new Date().getTime()
      const difference = target - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [content.targetDate])

  const containerClasses = cn(
    "my-6",
    {
      'text-left': settings?.alignment === 'left',
      'text-center': settings?.alignment === 'center',
      'text-right': settings?.alignment === 'right',
    }
  )

  const itemClasses = cn(
    "inline-flex flex-col items-center mx-2",
    {
      'text-sm': content.size === 'sm',
      'text-base': content.size === 'md',
      'text-lg': content.size === 'lg',
    }
  )

  const numberClasses = cn(
    "font-bold",
    {
      'text-2xl': content.size === 'sm',
      'text-4xl': content.size === 'md',
      'text-6xl': content.size === 'lg',
    },
    {
      'bg-white p-4 rounded-lg shadow-md': content.style === 'cards',
      'bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center': content.style === 'circles' && content.size === 'md',
    }
  )

  return (
    <div className={containerClasses}>
      {content.title && (
        <h3 className="text-xl font-semibold mb-4">{content.title}</h3>
      )}
      
      <div className="flex justify-center">
        <div className={itemClasses}>
          <div className={numberClasses}>{timeLeft.days}</div>
          {settings?.showLabels && (
            <span className="text-sm text-gray-600 mt-1">{content.labels.days}</span>
          )}
        </div>
        
        <div className={itemClasses}>
          <div className={numberClasses}>{timeLeft.hours}</div>
          {settings?.showLabels && (
            <span className="text-sm text-gray-600 mt-1">{content.labels.hours}</span>
          )}
        </div>
        
        <div className={itemClasses}>
          <div className={numberClasses}>{timeLeft.minutes}</div>
          {settings?.showLabels && (
            <span className="text-sm text-gray-600 mt-1">{content.labels.minutes}</span>
          )}
        </div>
        
        <div className={itemClasses}>
          <div className={numberClasses}>{timeLeft.seconds}</div>
          {settings?.showLabels && (
            <span className="text-sm text-gray-600 mt-1">{content.labels.seconds}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export const countdownBlockConfig = {
  name: "Countdown",
  type: "countdown",
  category: "cta",
  description: "Countdown timer for events or promotions",
  component: "CountdownBlock",
  defaultContent: {
    title: "Limited Time Offer Ends In:",
    targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    labels: {
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      seconds: "Seconds"
    },
    style: 'cards',
    size: 'md'
  },
  settings: {
    showLabels: true,
    alignment: 'center'
  }
}
