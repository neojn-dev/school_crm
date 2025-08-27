"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ReactNode, useState, useEffect } from "react"
import { Grip, Move, RotateCcw } from "lucide-react"

// ============ GRID BLOCK ============
interface GridBlockProps {
  content: {
    columns: number
    rows?: number
    gap: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    autoFit: boolean
    minColumnWidth?: number
    aspectRatio?: 'square' | '16:9' | '4:3' | '3:2' | 'auto'
    alignment: 'start' | 'center' | 'end' | 'stretch'
    justification: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  }
  children?: ReactNode[]
  settings?: {
    responsive: boolean
    draggable: boolean
    resizable: boolean
  }
}

export function GridBlock({ content, children, settings }: GridBlockProps) {
  const [draggedItem, setDraggedItem] = useState<number | null>(null)
  const [items, setItems] = useState(children || [])

  const gridClasses = cn(
    "grid w-full",
    {
      'gap-0': content.gap === 'none',
      'gap-1': content.gap === 'sm',
      'gap-4': content.gap === 'md',
      'gap-6': content.gap === 'lg',
      'gap-8': content.gap === 'xl',
    },
    {
      'items-start': content.alignment === 'start',
      'items-center': content.alignment === 'center',
      'items-end': content.alignment === 'end',
      'items-stretch': content.alignment === 'stretch',
    },
    {
      'justify-items-start': content.justification === 'start',
      'justify-items-center': content.justification === 'center',
      'justify-items-end': content.justification === 'end',
    }
  )

  const gridStyle: any = {}
  
  if (content.autoFit && content.minColumnWidth) {
    gridStyle.gridTemplateColumns = `repeat(auto-fit, minmax(${content.minColumnWidth}px, 1fr))`
  } else {
    gridStyle.gridTemplateColumns = `repeat(${content.columns}, 1fr)`
  }
  
  if (content.rows) {
    gridStyle.gridTemplateRows = `repeat(${content.rows}, 1fr)`
  }

  const handleDragStart = (index: number) => {
    if (settings?.draggable) {
      setDraggedItem(index)
    }
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (draggedItem !== null && draggedItem !== index) {
      const newItems = [...items]
      const draggedElement = newItems[draggedItem]
      newItems.splice(draggedItem, 1)
      newItems.splice(index, 0, draggedElement)
      setItems(newItems)
      setDraggedItem(index)
    }
  }

  return (
    <div className={gridClasses} style={gridStyle}>
      {items.map((child, index) => (
        <div
          key={index}
          className={cn(
            "relative group",
            {
              'aspect-square': content.aspectRatio === 'square',
              'aspect-video': content.aspectRatio === '16:9',
              'aspect-[4/3]': content.aspectRatio === '4:3',
              'aspect-[3/2]': content.aspectRatio === '3:2',
            },
            settings?.draggable && 'cursor-move'
          )}
          draggable={settings?.draggable}
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={() => setDraggedItem(null)}
        >
          {settings?.draggable && (
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <Grip className="h-4 w-4 text-gray-400" />
            </div>
          )}
          {child}
        </div>
      ))}
    </div>
  )
}

export const gridBlockConfig = {
  name: "CSS Grid Layout",
  type: "grid",
  category: "layout",
  description: "Advanced CSS Grid layout with drag-drop positioning",
  component: "GridBlock",
  defaultContent: {
    columns: 3,
    gap: 'md',
    autoFit: false,
    minColumnWidth: 250,
    aspectRatio: 'auto',
    alignment: 'stretch',
    justification: 'start'
  },
  settings: {
    responsive: true,
    draggable: true,
    resizable: false
  }
}

// ============ FLEXBOX BLOCK ============
interface FlexboxBlockProps {
  content: {
    direction: 'row' | 'column' | 'row-reverse' | 'column-reverse'
    wrap: 'nowrap' | 'wrap' | 'wrap-reverse'
    justifyContent: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
    alignItems: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
    gap: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  }
  children?: ReactNode[]
  settings?: {
    responsive: boolean
    equalHeight: boolean
  }
}

export function FlexboxBlock({ content, children, settings }: FlexboxBlockProps) {
  const flexClasses = cn(
    "flex w-full",
    {
      'flex-row': content.direction === 'row',
      'flex-col': content.direction === 'column',
      'flex-row-reverse': content.direction === 'row-reverse',
      'flex-col-reverse': content.direction === 'column-reverse',
    },
    {
      'flex-nowrap': content.wrap === 'nowrap',
      'flex-wrap': content.wrap === 'wrap',
      'flex-wrap-reverse': content.wrap === 'wrap-reverse',
    },
    {
      'justify-start': content.justifyContent === 'start',
      'justify-center': content.justifyContent === 'center',
      'justify-end': content.justifyContent === 'end',
      'justify-between': content.justifyContent === 'between',
      'justify-around': content.justifyContent === 'around',
      'justify-evenly': content.justifyContent === 'evenly',
    },
    {
      'items-start': content.alignItems === 'start',
      'items-center': content.alignItems === 'center',
      'items-end': content.alignItems === 'end',
      'items-stretch': content.alignItems === 'stretch',
      'items-baseline': content.alignItems === 'baseline',
    },
    {
      'gap-0': content.gap === 'none',
      'gap-2': content.gap === 'sm',
      'gap-4': content.gap === 'md',
      'gap-6': content.gap === 'lg',
      'gap-8': content.gap === 'xl',
    },
    settings?.responsive && {
      'md:flex-row': content.direction === 'column',
      'md:flex-col': content.direction === 'row',
    }
  )

  return (
    <div className={flexClasses}>
      {children?.map((child, index) => (
        <div 
          key={index} 
          className={cn(
            settings?.equalHeight && 'flex-1'
          )}
        >
          {child}
        </div>
      ))}
    </div>
  )
}

export const flexboxBlockConfig = {
  name: "Flexbox Layout",
  type: "flexbox",
  category: "layout",
  description: "Advanced flexbox layout with alignment controls",
  component: "FlexboxBlock",
  defaultContent: {
    direction: 'row',
    wrap: 'wrap',
    justifyContent: 'start',
    alignItems: 'stretch',
    gap: 'md'
  },
  settings: {
    responsive: true,
    equalHeight: false
  }
}

// ============ MASONRY BLOCK ============
interface MasonryBlockProps {
  content: {
    columns: number
    gap: 'none' | 'sm' | 'md' | 'lg' | 'xl'
    breakpoints: {
      sm: number
      md: number
      lg: number
      xl: number
    }
  }
  children?: ReactNode[]
  settings?: {
    animate: boolean
    loading: 'lazy' | 'eager'
  }
}

export function MasonryBlock({ content, children, settings }: MasonryBlockProps) {
  const [columns, setColumns] = useState<ReactNode[][]>([])

  useEffect(() => {
    if (!children) return

    const columnCount = content.columns
    const newColumns: ReactNode[][] = Array.from({ length: columnCount }, () => [])
    
    children.forEach((child, index) => {
      const columnIndex = index % columnCount
      newColumns[columnIndex].push(child)
    })
    
    setColumns(newColumns)
  }, [children, content.columns])

  const containerClasses = cn(
    "flex w-full",
    {
      'gap-0': content.gap === 'none',
      'gap-1': content.gap === 'sm',
      'gap-4': content.gap === 'md',
      'gap-6': content.gap === 'lg',
      'gap-8': content.gap === 'xl',
    }
  )

  const columnClasses = cn(
    "flex-1 flex flex-col",
    {
      'gap-0': content.gap === 'none',
      'gap-1': content.gap === 'sm',
      'gap-4': content.gap === 'md',
      'gap-6': content.gap === 'lg',
      'gap-8': content.gap === 'xl',
    }
  )

  return (
    <div className={containerClasses}>
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} className={columnClasses}>
          {column.map((item, itemIndex) => (
            <motion.div
              key={itemIndex}
              initial={settings?.animate ? { opacity: 0, y: 20 } : false}
              animate={settings?.animate ? { opacity: 1, y: 0 } : false}
              transition={{ delay: itemIndex * 0.1 }}
            >
              {item}
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  )
}

export const masonryBlockConfig = {
  name: "Masonry Layout",
  type: "masonry",
  category: "layout",
  description: "Pinterest-style masonry layout for dynamic content",
  component: "MasonryBlock",
  defaultContent: {
    columns: 3,
    gap: 'md',
    breakpoints: {
      sm: 1,
      md: 2,
      lg: 3,
      xl: 4
    }
  },
  settings: {
    animate: true,
    loading: 'lazy'
  }
}

// ============ STICKY BLOCK ============
interface StickyBlockProps {
  content: {
    position: 'top' | 'bottom' | 'left' | 'right'
    offset: number
    zIndex: number
    trigger: 'immediate' | 'scroll' | 'viewport'
    behavior: 'stick' | 'slide' | 'fade'
  }
  children?: ReactNode
  settings?: {
    responsive: boolean
    hideOnScroll: boolean
    showOnHover: boolean
  }
}

export function StickyBlock({ content, children, settings }: StickyBlockProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    if (!settings?.hideOnScroll) return

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY, settings?.hideOnScroll])

  const stickyClasses = cn(
    "transition-all duration-300",
    {
      'sticky': content.behavior === 'stick',
      'fixed': content.behavior === 'slide' || content.behavior === 'fade',
    },
    {
      'top-0': content.position === 'top',
      'bottom-0': content.position === 'bottom',
      'left-0': content.position === 'left',
      'right-0': content.position === 'right',
    },
    {
      'transform translate-y-0': isVisible && content.behavior === 'slide',
      'transform -translate-y-full': !isVisible && content.behavior === 'slide' && content.position === 'top',
      'transform translate-y-full': !isVisible && content.behavior === 'slide' && content.position === 'bottom',
      'opacity-100': isVisible && content.behavior === 'fade',
      'opacity-0': !isVisible && content.behavior === 'fade',
    },
    settings?.showOnHover && 'hover:opacity-100'
  )

  const style = {
    [content.position]: `${content.offset}px`,
    zIndex: content.zIndex
  }

  return (
    <div className={stickyClasses} style={style}>
      {children}
    </div>
  )
}

export const stickyBlockConfig = {
  name: "Sticky Element",
  type: "sticky",
  category: "layout",
  description: "Sticky positioned elements with scroll triggers",
  component: "StickyBlock",
  defaultContent: {
    position: 'top',
    offset: 0,
    zIndex: 50,
    trigger: 'immediate',
    behavior: 'stick'
  },
  settings: {
    responsive: true,
    hideOnScroll: false,
    showOnHover: false
  }
}

// ============ FLOATING BLOCK ============
interface FloatingBlockProps {
  content: {
    position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'center'
    offset: { x: number; y: number }
    size: 'sm' | 'md' | 'lg'
    shape: 'circle' | 'square' | 'rounded'
    animation: 'none' | 'bounce' | 'pulse' | 'float'
    trigger: 'always' | 'scroll' | 'hover' | 'click'
  }
  children?: ReactNode
  settings?: {
    draggable: boolean
    closable: boolean
    expandable: boolean
  }
}

export function FloatingBlock({ content, children, settings }: FloatingBlockProps) {
  const [isVisible, setIsVisible] = useState(content.trigger === 'always')
  const [isExpanded, setIsExpanded] = useState(false)
  const [position, setPosition] = useState(content.offset)

  useEffect(() => {
    if (content.trigger === 'scroll') {
      const handleScroll = () => {
        setIsVisible(window.scrollY > 200)
      }
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [content.trigger])

  const floatingClasses = cn(
    "fixed z-50 transition-all duration-300",
    {
      'w-12 h-12': content.size === 'sm',
      'w-16 h-16': content.size === 'md',
      'w-20 h-20': content.size === 'lg',
    },
    {
      'rounded-full': content.shape === 'circle',
      'rounded-none': content.shape === 'square',
      'rounded-lg': content.shape === 'rounded',
    },
    {
      'animate-bounce': content.animation === 'bounce',
      'animate-pulse': content.animation === 'pulse',
      'animate-[float_3s_ease-in-out_infinite]': content.animation === 'float',
    },
    {
      'opacity-100 scale-100': isVisible,
      'opacity-0 scale-0': !isVisible,
    },
    isExpanded && 'w-auto h-auto max-w-sm'
  )

  const getPositionStyles = () => {
    const styles: any = {}
    
    switch (content.position) {
      case 'bottom-right':
        styles.bottom = `${position.y}px`
        styles.right = `${position.x}px`
        break
      case 'bottom-left':
        styles.bottom = `${position.y}px`
        styles.left = `${position.x}px`
        break
      case 'top-right':
        styles.top = `${position.y}px`
        styles.right = `${position.x}px`
        break
      case 'top-left':
        styles.top = `${position.y}px`
        styles.left = `${position.x}px`
        break
      case 'center':
        styles.top = '50%'
        styles.left = '50%'
        styles.transform = 'translate(-50%, -50%)'
        break
    }
    
    return styles
  }

  return (
    <motion.div
      className={floatingClasses}
      style={getPositionStyles()}
      drag={settings?.draggable}
      dragMomentum={false}
      onDragEnd={(_, info) => {
        if (settings?.draggable) {
          setPosition({
            x: position.x + info.offset.x,
            y: position.y + info.offset.y
          })
        }
      }}
      onMouseEnter={() => content.trigger === 'hover' && setIsVisible(true)}
      onMouseLeave={() => content.trigger === 'hover' && setIsVisible(false)}
      onClick={() => {
        if (content.trigger === 'click') setIsVisible(!isVisible)
        if (settings?.expandable) setIsExpanded(!isExpanded)
      }}
    >
      {settings?.closable && (
        <button
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation()
            setIsVisible(false)
          }}
        >
          ×
        </button>
      )}
      {children}
    </motion.div>
  )
}

export const floatingBlockConfig = {
  name: "Floating Element",
  type: "floating",
  category: "layout",
  description: "Floating action buttons and elements",
  component: "FloatingBlock",
  defaultContent: {
    position: 'bottom-right',
    offset: { x: 20, y: 20 },
    size: 'md',
    shape: 'circle',
    animation: 'none',
    trigger: 'always'
  },
  settings: {
    draggable: true,
    closable: true,
    expandable: false
  }
}

