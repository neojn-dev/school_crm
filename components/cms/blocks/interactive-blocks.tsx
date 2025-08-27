"use client"

import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { ReactNode, useState, useEffect, useRef } from "react"
import { 
  ChevronDown, 
  ChevronUp, 
  X, 
  Info, 
  HelpCircle, 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  Download
} from "lucide-react"

// ============ ACCORDION BLOCK ============
interface AccordionBlockProps {
  content: {
    items: Array<{
      title: string
      content: string
      icon?: string
      defaultOpen?: boolean
    }>
    style: 'simple' | 'bordered' | 'filled' | 'minimal'
    allowMultiple: boolean
    animation: 'slide' | 'fade' | 'scale'
  }
  settings?: {
    showIcons: boolean
    spacing: 'tight' | 'normal' | 'loose'
  }
}

export function AccordionBlock({ content, settings }: AccordionBlockProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(
    new Set(content.items.map((item, index) => item.defaultOpen ? index : -1).filter(i => i !== -1))
  )

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      if (!content.allowMultiple) {
        newOpenItems.clear()
      }
      newOpenItems.add(index)
    }
    
    setOpenItems(newOpenItems)
  }

  const itemClasses = cn(
    "border-b border-gray-200 last:border-b-0",
    {
      'mb-2': settings?.spacing === 'tight',
      'mb-4': settings?.spacing === 'normal',
      'mb-6': settings?.spacing === 'loose',
    },
    {
      'border border-gray-200 rounded-lg mb-2': content.style === 'bordered',
      'bg-gray-50 rounded-lg mb-2': content.style === 'filled',
      'border-0': content.style === 'minimal',
    }
  )

  const headerClasses = cn(
    "w-full flex items-center justify-between p-4 text-left transition-colors",
    {
      'hover:bg-gray-50': content.style === 'simple',
      'hover:bg-gray-100': content.style === 'bordered' || content.style === 'filled',
      'hover:bg-gray-50 rounded-lg': content.style === 'minimal',
    }
  )

  return (
    <div className="w-full">
      {content.items.map((item, index) => {
        const isOpen = openItems.has(index)
        
        return (
          <div key={index} className={itemClasses}>
            <button
              className={headerClasses}
              onClick={() => toggleItem(index)}
              aria-expanded={isOpen}
            >
              <div className="flex items-center space-x-3">
                {settings?.showIcons && item.icon && (
                  <span className="text-lg">{item.icon}</span>
                )}
                <span className="font-medium text-gray-900">{item.title}</span>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pt-0 text-gray-700 leading-relaxed">
                    <div dangerouslySetInnerHTML={{ __html: item.content }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

export const accordionBlockConfig = {
  name: "Accordion",
  type: "accordion",
  category: "interactive",
  description: "Collapsible content sections with smooth animations",
  component: "AccordionBlock",
  defaultContent: {
    items: [
      {
        title: "What is your return policy?",
        content: "We offer a 30-day return policy for all unused items in their original packaging.",
        icon: "📦",
        defaultOpen: true
      },
      {
        title: "How long does shipping take?",
        content: "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 day delivery.",
        icon: "🚚"
      },
      {
        title: "Do you offer international shipping?",
        content: "Yes, we ship to over 50 countries worldwide. International shipping rates vary by location.",
        icon: "🌍"
      }
    ],
    style: 'bordered',
    allowMultiple: false,
    animation: 'slide'
  },
  settings: {
    showIcons: true,
    spacing: 'normal'
  }
}

// ============ MODAL BLOCK ============
interface ModalBlockProps {
  content: {
    trigger: {
      type: 'button' | 'image' | 'text'
      content: string
      style?: 'primary' | 'secondary' | 'outline'
    }
    modal: {
      title?: string
      content: string
      size: 'sm' | 'md' | 'lg' | 'xl' | 'full'
      closable: boolean
      backdrop: 'blur' | 'dark' | 'light'
    }
    animation: 'fade' | 'scale' | 'slide-up' | 'slide-down'
  }
  settings?: {
    closeOnBackdrop: boolean
    closeOnEscape: boolean
    showCloseButton: boolean
  }
}

export function ModalBlock({ content, settings }: ModalBlockProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && settings?.closeOnEscape) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, settings?.closeOnEscape])

  const modalSizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  }

  const animations = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 }
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 }
    },
    'slide-up': {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 50 }
    },
    'slide-down': {
      initial: { opacity: 0, y: -50 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -50 }
    }
  }

  const renderTrigger = () => {
    const { trigger } = content
    
    switch (trigger.type) {
      case 'button':
        return (
          <button
            onClick={() => setIsOpen(true)}
            className={cn(
              "px-4 py-2 rounded-md font-medium transition-colors",
              {
                'bg-blue-600 text-white hover:bg-blue-700': trigger.style === 'primary',
                'bg-gray-600 text-white hover:bg-gray-700': trigger.style === 'secondary',
                'border border-gray-300 text-gray-700 hover:bg-gray-50': trigger.style === 'outline',
              }
            )}
          >
            {trigger.content}
          </button>
        )
      case 'image':
        return (
          <img
            src={trigger.content}
            alt="Modal trigger"
            className="cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setIsOpen(true)}
          />
        )
      case 'text':
        return (
          <span
            className="text-blue-600 hover:text-blue-800 cursor-pointer underline"
            onClick={() => setIsOpen(true)}
          >
            {trigger.content}
          </span>
        )
    }
  }

  return (
    <>
      {renderTrigger()}
      
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn(
                "absolute inset-0",
                {
                  'bg-black/50 backdrop-blur-sm': content.modal.backdrop === 'blur',
                  'bg-black/75': content.modal.backdrop === 'dark',
                  'bg-white/75': content.modal.backdrop === 'light',
                }
              )}
              onClick={() => settings?.closeOnBackdrop && setIsOpen(false)}
            />
            
            {/* Modal */}
            <motion.div
              {...animations[content.animation]}
              transition={{ duration: 0.3 }}
              className={cn(
                "relative bg-white rounded-lg shadow-xl w-full",
                modalSizes[content.modal.size]
              )}
            >
              {/* Header */}
              {(content.modal.title || settings?.showCloseButton) && (
                <div className="flex items-center justify-between p-6 border-b">
                  {content.modal.title && (
                    <h2 className="text-xl font-semibold text-gray-900">
                      {content.modal.title}
                    </h2>
                  )}
                  {settings?.showCloseButton && (
                    <button
                      onClick={() => setIsOpen(false)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              )}
              
              {/* Content */}
              <div className="p-6">
                <div dangerouslySetInnerHTML={{ __html: content.modal.content }} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

export const modalBlockConfig = {
  name: "Modal Dialog",
  type: "modal",
  category: "interactive",
  description: "Customizable modal dialogs with various triggers",
  component: "ModalBlock",
  defaultContent: {
    trigger: {
      type: 'button',
      content: 'Open Modal',
      style: 'primary'
    },
    modal: {
      title: 'Modal Title',
      content: '<p>This is the modal content. You can include any HTML here.</p>',
      size: 'md',
      closable: true,
      backdrop: 'blur'
    },
    animation: 'scale'
  },
  settings: {
    closeOnBackdrop: true,
    closeOnEscape: true,
    showCloseButton: true
  }
}

// ============ TOOLTIP BLOCK ============
interface TooltipBlockProps {
  content: {
    trigger: string
    tooltip: string
    position: 'top' | 'bottom' | 'left' | 'right'
    style: 'dark' | 'light' | 'colored'
    size: 'sm' | 'md' | 'lg'
  }
  settings?: {
    delay: number
    arrow: boolean
    interactive: boolean
  }
}

export function TooltipBlock({ content, settings }: TooltipBlockProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLSpanElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const showTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    
    timeoutRef.current = setTimeout(() => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect()
        setPosition({
          x: rect.left + rect.width / 2,
          y: rect.top
        })
      }
      setIsVisible(true)
    }, settings?.delay || 200)
  }

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsVisible(false)
  }

  const tooltipClasses = cn(
    "fixed z-50 px-3 py-2 text-sm rounded-md pointer-events-none transition-opacity duration-200",
    {
      'bg-gray-900 text-white': content.style === 'dark',
      'bg-white text-gray-900 border border-gray-200 shadow-lg': content.style === 'light',
      'bg-blue-600 text-white': content.style === 'colored',
    },
    {
      'text-xs px-2 py-1': content.size === 'sm',
      'text-sm px-3 py-2': content.size === 'md',
      'text-base px-4 py-3': content.size === 'lg',
    }
  )

  const getTooltipPosition = () => {
    const offset = 10
    
    switch (content.position) {
      case 'top':
        return {
          left: position.x,
          top: position.y - offset,
          transform: 'translate(-50%, -100%)'
        }
      case 'bottom':
        return {
          left: position.x,
          top: position.y + offset,
          transform: 'translate(-50%, 0)'
        }
      case 'left':
        return {
          left: position.x - offset,
          top: position.y,
          transform: 'translate(-100%, -50%)'
        }
      case 'right':
        return {
          left: position.x + offset,
          top: position.y,
          transform: 'translate(0, -50%)'
        }
    }
  }

  return (
    <>
      <span
        ref={triggerRef}
        className="cursor-help border-b border-dotted border-gray-400"
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {content.trigger}
      </span>
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={tooltipClasses}
            style={getTooltipPosition()}
          >
            {content.tooltip}
            {settings?.arrow && (
              <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export const tooltipBlockConfig = {
  name: "Tooltip",
  type: "tooltip",
  category: "interactive",
  description: "Interactive tooltips and popovers for additional information",
  component: "TooltipBlock",
  defaultContent: {
    trigger: "Hover me",
    tooltip: "This is a helpful tooltip with additional information.",
    position: 'top',
    style: 'dark',
    size: 'md'
  },
  settings: {
    delay: 200,
    arrow: true,
    interactive: false
  }
}

// ============ PROGRESS BAR BLOCK ============
interface ProgressBarBlockProps {
  content: {
    value: number
    max: number
    label?: string
    showPercentage: boolean
    showValue: boolean
    style: 'simple' | 'gradient' | 'striped' | 'animated'
    color: 'blue' | 'green' | 'red' | 'yellow' | 'purple'
    size: 'sm' | 'md' | 'lg'
  }
  settings?: {
    animated: boolean
    duration: number
    easing: 'linear' | 'ease' | 'ease-in' | 'ease-out'
  }
}

export function ProgressBarBlock({ content, settings }: ProgressBarBlockProps) {
  const [animatedValue, setAnimatedValue] = useState(0)
  
  useEffect(() => {
    if (settings?.animated) {
      const timer = setTimeout(() => {
        setAnimatedValue(content.value)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setAnimatedValue(content.value)
    }
  }, [content.value, settings?.animated])

  const percentage = Math.min((animatedValue / content.max) * 100, 100)

  const containerClasses = cn(
    "w-full bg-gray-200 rounded-full overflow-hidden",
    {
      'h-2': content.size === 'sm',
      'h-4': content.size === 'md',
      'h-6': content.size === 'lg',
    }
  )

  const barClasses = cn(
    "h-full transition-all rounded-full",
    {
      'bg-blue-600': content.color === 'blue' && content.style === 'simple',
      'bg-green-600': content.color === 'green' && content.style === 'simple',
      'bg-red-600': content.color === 'red' && content.style === 'simple',
      'bg-yellow-600': content.color === 'yellow' && content.style === 'simple',
      'bg-purple-600': content.color === 'purple' && content.style === 'simple',
    },
    {
      'bg-gradient-to-r from-blue-400 to-blue-600': content.color === 'blue' && content.style === 'gradient',
      'bg-gradient-to-r from-green-400 to-green-600': content.color === 'green' && content.style === 'gradient',
      'bg-gradient-to-r from-red-400 to-red-600': content.color === 'red' && content.style === 'gradient',
      'bg-gradient-to-r from-yellow-400 to-yellow-600': content.color === 'yellow' && content.style === 'gradient',
      'bg-gradient-to-r from-purple-400 to-purple-600': content.color === 'purple' && content.style === 'gradient',
    },
    {
      'animate-pulse': content.style === 'animated',
    }
  )

  const duration = settings?.duration || 1000

  return (
    <div className="w-full">
      {/* Label and Values */}
      {(content.label || content.showPercentage || content.showValue) && (
        <div className="flex justify-between items-center mb-2">
          {content.label && (
            <span className="text-sm font-medium text-gray-700">{content.label}</span>
          )}
          <div className="flex space-x-2 text-sm text-gray-600">
            {content.showValue && (
              <span>{animatedValue} / {content.max}</span>
            )}
            {content.showPercentage && (
              <span>{Math.round(percentage)}%</span>
            )}
          </div>
        </div>
      )}
      
      {/* Progress Bar */}
      <div className={containerClasses}>
        <motion.div
          className={barClasses}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ 
            duration: settings?.animated ? duration / 1000 : 0,
            ease: settings?.easing || 'ease-out'
          }}
        />
      </div>
    </div>
  )
}

export const progressBarBlockConfig = {
  name: "Progress Bar",
  type: "progress-bar",
  category: "interactive",
  description: "Animated progress indicators with customizable styles",
  component: "ProgressBarBlock",
  defaultContent: {
    value: 75,
    max: 100,
    label: "Progress",
    showPercentage: true,
    showValue: false,
    style: 'gradient',
    color: 'blue',
    size: 'md'
  },
  settings: {
    animated: true,
    duration: 1000,
    easing: 'ease-out'
  }
}

