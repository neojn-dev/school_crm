"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

// ============ HEADING BLOCK ============
interface HeadingBlockProps {
  content: {
    text: string
    level: 1 | 2 | 3 | 4 | 5 | 6
    align: 'left' | 'center' | 'right'
    color: string
    gradient?: boolean
    animation?: 'fade' | 'slide' | 'bounce' | 'none'
  }
  settings?: {
    spacing: 'tight' | 'normal' | 'loose'
    fontWeight: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
  }
}

export function HeadingBlock({ content, settings }: HeadingBlockProps) {
  const HeadingTag = `h${content.level}` as keyof JSX.IntrinsicElements
  
  const baseClasses = cn(
    "font-sans",
    {
      'text-4xl md:text-6xl': content.level === 1,
      'text-3xl md:text-5xl': content.level === 2,
      'text-2xl md:text-4xl': content.level === 3,
      'text-xl md:text-3xl': content.level === 4,
      'text-lg md:text-2xl': content.level === 5,
      'text-base md:text-xl': content.level === 6,
    },
    {
      'text-left': content.align === 'left',
      'text-center': content.align === 'center',
      'text-right': content.align === 'right',
    },
    {
      'mb-2': settings?.spacing === 'tight',
      'mb-4': settings?.spacing === 'normal',
      'mb-8': settings?.spacing === 'loose',
    },
    {
      'font-normal': settings?.fontWeight === 'normal',
      'font-medium': settings?.fontWeight === 'medium',
      'font-semibold': settings?.fontWeight === 'semibold',
      'font-bold': settings?.fontWeight === 'bold',
      'font-extrabold': settings?.fontWeight === 'extrabold',
    },
    content.gradient 
      ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
      : '',
    !content.gradient && content.color ? content.color : 'text-gray-900'
  )

  const animationVariants = {
    fade: { initial: { opacity: 0 }, animate: { opacity: 1 } },
    slide: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
    bounce: { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 } },
    none: {}
  }

  const variant = animationVariants[content.animation || 'none']

  if (content.animation && content.animation !== 'none') {
    return (
      <motion.div
        initial={variant.initial}
        animate={variant.animate}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <HeadingTag className={baseClasses}>
          {content.text}
        </HeadingTag>
      </motion.div>
    )
  }

  return (
    <HeadingTag className={baseClasses}>
      {content.text}
    </HeadingTag>
  )
}

export const headingBlockConfig = {
  name: "Heading",
  type: "heading",
  category: "text",
  description: "Customizable headings with various styles and animations",
  component: "HeadingBlock",
  defaultContent: {
    text: "Your Heading Here",
    level: 2,
    align: 'left',
    color: 'text-gray-900',
    gradient: false,
    animation: 'fade'
  },
  settings: {
    spacing: 'normal',
    fontWeight: 'bold'
  }
}

// ============ PARAGRAPH BLOCK ============
interface ParagraphBlockProps {
  content: {
    text: string
    size: 'sm' | 'base' | 'lg' | 'xl'
    align: 'left' | 'center' | 'right' | 'justify'
    color: string
    lineHeight: 'tight' | 'normal' | 'relaxed' | 'loose'
  }
  settings?: {
    maxWidth: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    spacing: 'tight' | 'normal' | 'loose'
  }
}

export function ParagraphBlock({ content, settings }: ParagraphBlockProps) {
  const classes = cn(
    "prose",
    {
      'text-sm': content.size === 'sm',
      'text-base': content.size === 'base',
      'text-lg': content.size === 'lg',
      'text-xl': content.size === 'xl',
    },
    {
      'text-left': content.align === 'left',
      'text-center': content.align === 'center',
      'text-right': content.align === 'right',
      'text-justify': content.align === 'justify',
    },
    {
      'leading-tight': content.lineHeight === 'tight',
      'leading-normal': content.lineHeight === 'normal',
      'leading-relaxed': content.lineHeight === 'relaxed',
      'leading-loose': content.lineHeight === 'loose',
    },
    {
      'max-w-none': settings?.maxWidth === 'none',
      'max-w-sm': settings?.maxWidth === 'sm',
      'max-w-md': settings?.maxWidth === 'md',
      'max-w-lg': settings?.maxWidth === 'lg',
      'max-w-xl': settings?.maxWidth === 'xl',
      'max-w-2xl': settings?.maxWidth === '2xl',
    },
    {
      'mb-2': settings?.spacing === 'tight',
      'mb-4': settings?.spacing === 'normal',
      'mb-8': settings?.spacing === 'loose',
    },
    content.color || 'text-gray-700'
  )

  return (
    <p className={classes} dangerouslySetInnerHTML={{ __html: content.text }} />
  )
}

export const paragraphBlockConfig = {
  name: "Paragraph",
  type: "paragraph",
  category: "text",
  description: "Rich text paragraphs with formatting options",
  component: "ParagraphBlock",
  defaultContent: {
    text: "Your paragraph text goes here. You can format it with <strong>bold</strong>, <em>italic</em>, and <a href='#'>links</a>.",
    size: 'base',
    align: 'left',
    color: 'text-gray-700',
    lineHeight: 'relaxed'
  },
  settings: {
    maxWidth: 'none',
    spacing: 'normal'
  }
}

// ============ QUOTE BLOCK ============
interface QuoteBlockProps {
  content: {
    quote: string
    author?: string
    role?: string
    company?: string
    style: 'simple' | 'bordered' | 'highlighted' | 'card'
    size: 'sm' | 'base' | 'lg' | 'xl'
  }
  settings?: {
    showQuoteMarks: boolean
    alignment: 'left' | 'center' | 'right'
  }
}

export function QuoteBlock({ content, settings }: QuoteBlockProps) {
  const quoteClasses = cn(
    "relative",
    {
      'text-sm': content.size === 'sm',
      'text-base': content.size === 'base',
      'text-lg': content.size === 'lg',
      'text-xl': content.size === 'xl',
    },
    {
      'text-left': settings?.alignment === 'left',
      'text-center': settings?.alignment === 'center',
      'text-right': settings?.alignment === 'right',
    }
  )

  const containerClasses = cn(
    "my-8",
    {
      'border-l-4 border-blue-500 pl-6': content.style === 'bordered',
      'bg-gray-50 p-6 rounded-lg': content.style === 'highlighted',
      'bg-white p-6 rounded-xl shadow-lg border': content.style === 'card',
    }
  )

  return (
    <blockquote className={containerClasses}>
      <div className={quoteClasses}>
        {settings?.showQuoteMarks && (
          <span className="text-4xl text-blue-500 absolute -top-2 -left-2">&ldquo;</span>
        )}
        <p className="italic text-gray-700 mb-4">{content.quote}</p>
        {(content.author || content.role || content.company) && (
          <footer className="text-sm text-gray-500">
            {content.author && <span className="font-medium text-gray-900">{content.author}</span>}
            {content.role && <span>, {content.role}</span>}
            {content.company && <span> at {content.company}</span>}
          </footer>
        )}
      </div>
    </blockquote>
  )
}

export const quoteBlockConfig = {
  name: "Quote",
  type: "quote",
  category: "text",
  description: "Stylized quotes and testimonials",
  component: "QuoteBlock",
  defaultContent: {
    quote: "This is an inspiring quote that adds credibility and social proof to your content.",
    author: "John Doe",
    role: "CEO",
    company: "Example Corp",
    style: 'bordered',
    size: 'base'
  },
  settings: {
    showQuoteMarks: true,
    alignment: 'left'
  }
}

// ============ LIST BLOCK ============
interface ListBlockProps {
  content: {
    items: string[]
    type: 'bullet' | 'numbered' | 'checklist' | 'custom'
    customIcon?: string
    style: 'simple' | 'spaced' | 'cards'
  }
  settings?: {
    columns: 1 | 2 | 3
    spacing: 'tight' | 'normal' | 'loose'
  }
}

export function ListBlock({ content, settings }: ListBlockProps) {
  const containerClasses = cn(
    "my-6",
    {
      'grid grid-cols-1': settings?.columns === 1,
      'grid grid-cols-1 md:grid-cols-2': settings?.columns === 2,
      'grid grid-cols-1 md:grid-cols-3': settings?.columns === 3,
    },
    {
      'gap-1': settings?.spacing === 'tight',
      'gap-3': settings?.spacing === 'normal',
      'gap-6': settings?.spacing === 'loose',
    }
  )

  const itemClasses = cn(
    "flex items-start",
    {
      'py-1': content.style === 'simple',
      'py-2': content.style === 'spaced',
      'p-4 bg-white rounded-lg border shadow-sm': content.style === 'cards',
    }
  )

  const renderIcon = (index: number) => {
    switch (content.type) {
      case 'bullet':
        return <span className="text-blue-500 mr-3 mt-1">•</span>
      case 'numbered':
        return <span className="text-blue-500 mr-3 mt-1 font-medium">{index + 1}.</span>
      case 'checklist':
        return <span className="text-green-500 mr-3 mt-1">✓</span>
      case 'custom':
        return <span className="mr-3 mt-1">{content.customIcon || '→'}</span>
      default:
        return null
    }
  }

  return (
    <div className={containerClasses}>
      {content.items.map((item, index) => (
        <div key={index} className={itemClasses}>
          {renderIcon(index)}
          <span className="text-gray-700">{item}</span>
        </div>
      ))}
    </div>
  )
}

export const listBlockConfig = {
  name: "List",
  type: "list",
  category: "text",
  description: "Customizable lists with various styles and layouts",
  component: "ListBlock",
  defaultContent: {
    items: [
      "First list item with important information",
      "Second item highlighting key benefits",
      "Third item with additional details",
      "Fourth item to complete the list"
    ],
    type: 'bullet',
    style: 'simple'
  },
  settings: {
    columns: 1,
    spacing: 'normal'
  }
}

// ============ CALLOUT BLOCK ============
interface CalloutBlockProps {
  content: {
    title?: string
    text: string
    type: 'info' | 'warning' | 'success' | 'error' | 'tip'
    style: 'simple' | 'bordered' | 'filled' | 'gradient'
  }
  settings?: {
    showIcon: boolean
    dismissible: boolean
  }
}

export function CalloutBlock({ content, settings }: CalloutBlockProps) {
  const typeStyles = {
    info: {
      simple: 'border-blue-200 bg-blue-50 text-blue-800',
      bordered: 'border-l-4 border-blue-500 bg-blue-50 text-blue-800',
      filled: 'bg-blue-500 text-white',
      gradient: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
    },
    warning: {
      simple: 'border-yellow-200 bg-yellow-50 text-yellow-800',
      bordered: 'border-l-4 border-yellow-500 bg-yellow-50 text-yellow-800',
      filled: 'bg-yellow-500 text-white',
      gradient: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
    },
    success: {
      simple: 'border-green-200 bg-green-50 text-green-800',
      bordered: 'border-l-4 border-green-500 bg-green-50 text-green-800',
      filled: 'bg-green-500 text-white',
      gradient: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
    },
    error: {
      simple: 'border-red-200 bg-red-50 text-red-800',
      bordered: 'border-l-4 border-red-500 bg-red-50 text-red-800',
      filled: 'bg-red-500 text-white',
      gradient: 'bg-gradient-to-r from-red-500 to-pink-500 text-white'
    },
    tip: {
      simple: 'border-purple-200 bg-purple-50 text-purple-800',
      bordered: 'border-l-4 border-purple-500 bg-purple-50 text-purple-800',
      filled: 'bg-purple-500 text-white',
      gradient: 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
    }
  }

  const icons = {
    info: 'ℹ️',
    warning: '⚠️',
    success: '✅',
    error: '❌',
    tip: '💡'
  }

  const classes = cn(
    "p-4 rounded-lg border my-6",
    typeStyles[content.type][content.style]
  )

  return (
    <div className={classes}>
      <div className="flex items-start">
        {settings?.showIcon && (
          <span className="mr-3 text-lg">{icons[content.type]}</span>
        )}
        <div className="flex-1">
          {content.title && (
            <h4 className="font-semibold mb-2">{content.title}</h4>
          )}
          <p className="text-sm leading-relaxed">{content.text}</p>
        </div>
      </div>
    </div>
  )
}

export const calloutBlockConfig = {
  name: "Callout",
  type: "callout",
  category: "text",
  description: "Highlighted callout boxes for important information",
  component: "CalloutBlock",
  defaultContent: {
    title: "Important Note",
    text: "This is an important callout that draws attention to key information or tips.",
    type: 'info',
    style: 'bordered'
  },
  settings: {
    showIcon: true,
    dismissible: false
  }
}
