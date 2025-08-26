"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ReactNode } from "react"

// ============ CONTAINER BLOCK ============
interface ContainerBlockProps {
  content: {
    maxWidth: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | 'full'
    padding: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    background: 'none' | 'white' | 'gray' | 'gradient' | 'custom'
    customBg?: string
  }
  children?: ReactNode
}

export function ContainerBlock({ content, children }: ContainerBlockProps) {
  const classes = cn(
    "mx-auto",
    {
      'max-w-sm': content.maxWidth === 'sm',
      'max-w-md': content.maxWidth === 'md',
      'max-w-lg': content.maxWidth === 'lg',
      'max-w-xl': content.maxWidth === 'xl',
      'max-w-2xl': content.maxWidth === '2xl',
      'max-w-4xl': content.maxWidth === '4xl',
      'max-w-6xl': content.maxWidth === '6xl',
      'max-w-full': content.maxWidth === 'full',
    },
    {
      'p-0': content.padding === 'none',
      'p-4': content.padding === 'sm',
      'p-6': content.padding === 'md',
      'p-8': content.padding === 'lg',
      'p-12': content.padding === 'xl',
    },
    {
      'bg-transparent': content.background === 'none',
      'bg-white': content.background === 'white',
      'bg-gray-50': content.background === 'gray',
      'bg-gradient-to-r from-blue-50 to-purple-50': content.background === 'gradient',
    }
  )

  const style = content.background === 'custom' && content.customBg 
    ? { backgroundColor: content.customBg }
    : {}

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  )
}

export const containerBlockConfig = {
  name: "Container",
  type: "container",
  category: "layout",
  description: "Wrapper container with customizable width and styling",
  component: "ContainerBlock",
  defaultContent: {
    maxWidth: 'lg',
    padding: 'md',
    background: 'none'
  }
}

// ============ SECTION BLOCK ============
interface SectionBlockProps {
  content: {
    background: 'none' | 'white' | 'gray' | 'dark' | 'gradient' | 'image' | 'custom'
    backgroundImage?: string
    customBg?: string
    padding: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
    margin: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    fullHeight?: boolean
    overlay?: boolean
    overlayOpacity?: number
  }
  children?: ReactNode
}

export function SectionBlock({ content, children }: SectionBlockProps) {
  const classes = cn(
    "relative",
    {
      'py-0': content.padding === 'none',
      'py-8': content.padding === 'sm',
      'py-12': content.padding === 'md',
      'py-16': content.padding === 'lg',
      'py-24': content.padding === 'xl',
      'py-32': content.padding === '2xl',
    },
    {
      'my-0': content.margin === 'none',
      'my-4': content.margin === 'sm',
      'my-8': content.margin === 'md',
      'my-12': content.margin === 'lg',
      'my-16': content.margin === 'xl',
    },
    {
      'min-h-screen': content.fullHeight,
    },
    {
      'bg-transparent': content.background === 'none',
      'bg-white': content.background === 'white',
      'bg-gray-50': content.background === 'gray',
      'bg-gray-900': content.background === 'dark',
      'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600': content.background === 'gradient',
    }
  )

  const style: any = {}
  if (content.background === 'image' && content.backgroundImage) {
    style.backgroundImage = `url(${content.backgroundImage})`
    style.backgroundSize = 'cover'
    style.backgroundPosition = 'center'
  }
  if (content.background === 'custom' && content.customBg) {
    style.backgroundColor = content.customBg
  }

  return (
    <section className={classes} style={style}>
      {content.overlay && (
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity: content.overlayOpacity || 0.5 }}
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  )
}

export const sectionBlockConfig = {
  name: "Section",
  type: "section",
  category: "layout",
  description: "Full-width section with background and spacing options",
  component: "SectionBlock",
  defaultContent: {
    background: 'white',
    padding: 'lg',
    margin: 'none',
    fullHeight: false,
    overlay: false,
    overlayOpacity: 0.5
  }
}

// ============ COLUMNS BLOCK ============
interface ColumnsBlockProps {
  content: {
    columns: 2 | 3 | 4 | 6
    gap: 'sm' | 'md' | 'lg' | 'xl'
    alignment: 'top' | 'center' | 'bottom' | 'stretch'
    responsive: boolean
  }
  children?: ReactNode[]
}

export function ColumnsBlock({ content, children }: ColumnsBlockProps) {
  const classes = cn(
    "grid",
    {
      'grid-cols-1 md:grid-cols-2': content.columns === 2 && content.responsive,
      'grid-cols-2': content.columns === 2 && !content.responsive,
      'grid-cols-1 md:grid-cols-3': content.columns === 3 && content.responsive,
      'grid-cols-3': content.columns === 3 && !content.responsive,
      'grid-cols-1 md:grid-cols-2 lg:grid-cols-4': content.columns === 4 && content.responsive,
      'grid-cols-4': content.columns === 4 && !content.responsive,
      'grid-cols-1 md:grid-cols-3 lg:grid-cols-6': content.columns === 6 && content.responsive,
      'grid-cols-6': content.columns === 6 && !content.responsive,
    },
    {
      'gap-2': content.gap === 'sm',
      'gap-4': content.gap === 'md',
      'gap-6': content.gap === 'lg',
      'gap-8': content.gap === 'xl',
    },
    {
      'items-start': content.alignment === 'top',
      'items-center': content.alignment === 'center',
      'items-end': content.alignment === 'bottom',
      'items-stretch': content.alignment === 'stretch',
    }
  )

  return (
    <div className={classes}>
      {children?.map((child, index) => (
        <div key={index} className="w-full">
          {child}
        </div>
      ))}
    </div>
  )
}

export const columnsBlockConfig = {
  name: "Columns",
  type: "columns",
  category: "layout",
  description: "Multi-column layout with responsive options",
  component: "ColumnsBlock",
  defaultContent: {
    columns: 2,
    gap: 'md',
    alignment: 'top',
    responsive: true
  }
}

// ============ SPACER BLOCK ============
interface SpacerBlockProps {
  content: {
    height: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
    responsive: boolean
  }
}

export function SpacerBlock({ content }: SpacerBlockProps) {
  const classes = cn(
    "w-full",
    {
      'h-2': content.height === 'xs',
      'h-4': content.height === 'sm',
      'h-8': content.height === 'md',
      'h-16': content.height === 'lg',
      'h-24': content.height === 'xl',
      'h-32': content.height === '2xl',
      'h-48': content.height === '3xl',
    },
    content.responsive && {
      'md:h-4': content.height === 'xs',
      'md:h-8': content.height === 'sm',
      'md:h-16': content.height === 'md',
      'md:h-24': content.height === 'lg',
      'md:h-32': content.height === 'xl',
      'md:h-48': content.height === '2xl',
      'md:h-64': content.height === '3xl',
    }
  )

  return <div className={classes} />
}

export const spacerBlockConfig = {
  name: "Spacer",
  type: "spacer",
  category: "layout",
  description: "Add vertical spacing between content blocks",
  component: "SpacerBlock",
  defaultContent: {
    height: 'md',
    responsive: true
  }
}

// ============ DIVIDER BLOCK ============
interface DividerBlockProps {
  content: {
    style: 'solid' | 'dashed' | 'dotted' | 'gradient'
    thickness: 'thin' | 'medium' | 'thick'
    color: string
    width: 'full' | 'half' | 'quarter'
    alignment: 'left' | 'center' | 'right'
    spacing: 'sm' | 'md' | 'lg'
  }
}

export function DividerBlock({ content }: DividerBlockProps) {
  const containerClasses = cn(
    "flex",
    {
      'justify-start': content.alignment === 'left',
      'justify-center': content.alignment === 'center',
      'justify-end': content.alignment === 'right',
    },
    {
      'my-2': content.spacing === 'sm',
      'my-4': content.spacing === 'md',
      'my-8': content.spacing === 'lg',
    }
  )

  const dividerClasses = cn(
    {
      'w-full': content.width === 'full',
      'w-1/2': content.width === 'half',
      'w-1/4': content.width === 'quarter',
    },
    {
      'border-t': content.thickness === 'thin',
      'border-t-2': content.thickness === 'medium',
      'border-t-4': content.thickness === 'thick',
    },
    {
      'border-solid': content.style === 'solid',
      'border-dashed': content.style === 'dashed',
      'border-dotted': content.style === 'dotted',
    },
    content.style !== 'gradient' ? content.color : ''
  )

  if (content.style === 'gradient') {
    return (
      <div className={containerClasses}>
        <div 
          className={cn(
            'h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent',
            {
              'w-full': content.width === 'full',
              'w-1/2': content.width === 'half',
              'w-1/4': content.width === 'quarter',
            }
          )}
        />
      </div>
    )
  }

  return (
    <div className={containerClasses}>
      <hr className={dividerClasses} />
    </div>
  )
}

export const dividerBlockConfig = {
  name: "Divider",
  type: "divider",
  category: "layout",
  description: "Visual dividers to separate content sections",
  component: "DividerBlock",
  defaultContent: {
    style: 'solid',
    thickness: 'thin',
    color: 'border-gray-300',
    width: 'full',
    alignment: 'center',
    spacing: 'md'
  }
}

// ============ CARD BLOCK ============
interface CardBlockProps {
  content: {
    style: 'simple' | 'bordered' | 'shadow' | 'elevated' | 'gradient'
    padding: 'sm' | 'md' | 'lg' | 'xl'
    rounded: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
    background: 'white' | 'gray' | 'transparent' | 'custom'
    customBg?: string
    hover: boolean
  }
  children?: ReactNode
}

export function CardBlock({ content, children }: CardBlockProps) {
  const classes = cn(
    "transition-all duration-300",
    {
      'p-3': content.padding === 'sm',
      'p-4': content.padding === 'md',
      'p-6': content.padding === 'lg',
      'p-8': content.padding === 'xl',
    },
    {
      'rounded-none': content.rounded === 'none',
      'rounded-sm': content.rounded === 'sm',
      'rounded-md': content.rounded === 'md',
      'rounded-lg': content.rounded === 'lg',
      'rounded-xl': content.rounded === 'xl',
      'rounded-full': content.rounded === 'full',
    },
    {
      'bg-white': content.background === 'white',
      'bg-gray-50': content.background === 'gray',
      'bg-transparent': content.background === 'transparent',
    },
    {
      'border border-gray-200': content.style === 'bordered',
      'shadow-sm': content.style === 'shadow',
      'shadow-lg': content.style === 'elevated',
      'bg-gradient-to-br from-white to-gray-50 border border-gray-100': content.style === 'gradient',
    },
    content.hover && 'hover:shadow-lg hover:scale-105'
  )

  const style = content.background === 'custom' && content.customBg 
    ? { backgroundColor: content.customBg }
    : {}

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  )
}

export const cardBlockConfig = {
  name: "Card",
  type: "card",
  category: "layout",
  description: "Container card with various styling options",
  component: "CardBlock",
  defaultContent: {
    style: 'shadow',
    padding: 'md',
    rounded: 'lg',
    background: 'white',
    hover: false
  }
}
