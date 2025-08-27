"use client"

import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useState, useEffect } from "react"
import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight, 
  Search, 
  Home, 
  ArrowLeft, 
  ArrowRight,
  MoreHorizontal,
  Filter,
  Tag
} from "lucide-react"

// ============ NAVBAR BLOCK ============
interface NavbarBlockProps {
  content: {
    logo?: {
      src: string
      alt: string
      text?: string
    }
    items: Array<{
      label: string
      href: string
      children?: Array<{
        label: string
        href: string
        description?: string
      }>
    }>
    cta?: {
      text: string
      href: string
      style: 'primary' | 'secondary' | 'outline'
    }
    style: 'minimal' | 'classic' | 'modern' | 'glass'
    position: 'static' | 'sticky' | 'fixed'
    background: 'white' | 'transparent' | 'dark' | 'gradient'
  }
  settings?: {
    showSearch: boolean
    mobileBreakpoint: 'sm' | 'md' | 'lg'
    animation: 'slide' | 'fade' | 'scale'
  }
}

export function NavbarBlock({ content, settings }: NavbarBlockProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navClasses = cn(
    "w-full transition-all duration-300 z-50",
    {
      'static': content.position === 'static',
      'sticky top-0': content.position === 'sticky',
      'fixed top-0': content.position === 'fixed',
    },
    {
      'bg-white border-b': content.background === 'white',
      'bg-transparent': content.background === 'transparent' && !isScrolled,
      'bg-white/80 backdrop-blur-md': content.background === 'transparent' && isScrolled,
      'bg-gray-900 text-white': content.background === 'dark',
      'bg-gradient-to-r from-blue-600 to-purple-600 text-white': content.background === 'gradient',
    },
    {
      'shadow-sm': isScrolled || content.background !== 'transparent',
      'border-b border-white/10': content.background === 'dark',
    }
  )

  const containerClasses = cn(
    "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    {
      'py-2': content.style === 'minimal',
      'py-3': content.style === 'classic',
      'py-4': content.style === 'modern' || content.style === 'glass',
    }
  )

  return (
    <nav className={navClasses}>
      <div className={containerClasses}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            {content.logo && (
              <Link href="/" className="flex items-center space-x-2">
                <img 
                  src={content.logo.src} 
                  alt={content.logo.alt}
                  className="h-8 w-auto"
                />
                {content.logo.text && (
                  <span className="text-xl font-bold">{content.logo.text}</span>
                )}
              </Link>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {content.items.map((item, index) => (
              <div key={index} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-colors"
                  onMouseEnter={() => setActiveDropdown(item.children ? item.label : null)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <span>{item.label}</span>
                  {item.children && <ChevronDown className="h-4 w-4" />}
                </Link>

                {/* Dropdown Menu */}
                {item.children && (
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border py-2 z-50"
                        onMouseEnter={() => setActiveDropdown(item.label)}
                        onMouseLeave={() => setActiveDropdown(null)}
                      >
                        {item.children.map((child, childIndex) => (
                          <Link
                            key={childIndex}
                            href={child.href}
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <div className="font-medium">{child.label}</div>
                            {child.description && (
                              <div className="text-xs text-gray-500 mt-1">{child.description}</div>
                            )}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            {settings?.showSearch && (
              <button className="p-2 rounded-md hover:bg-gray-100 transition-colors">
                <Search className="h-5 w-5" />
              </button>
            )}

            {/* CTA Button */}
            {content.cta && (
              <Link
                href={content.cta.href}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  {
                    'bg-blue-600 text-white hover:bg-blue-700': content.cta.style === 'primary',
                    'bg-gray-600 text-white hover:bg-gray-700': content.cta.style === 'secondary',
                    'border border-gray-300 text-gray-700 hover:bg-gray-50': content.cta.style === 'outline',
                  }
                )}
              >
                {content.cta.text}
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t"
            >
              <div className="space-y-2 pt-4">
                {content.items.map((item, index) => (
                  <div key={index}>
                    <Link
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="ml-4 space-y-1">
                        {item.children.map((child, childIndex) => (
                          <Link
                            key={childIndex}
                            href={child.href}
                            className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export const navbarBlockConfig = {
  name: "Navigation Bar",
  type: "navbar",
  category: "navigation",
  description: "Responsive navigation bar with dropdowns and mobile menu",
  component: "NavbarBlock",
  defaultContent: {
    logo: {
      src: "/logo.png",
      alt: "Logo",
      text: "Brand"
    },
    items: [
      { label: "Home", href: "/" },
      { 
        label: "Products", 
        href: "/products",
        children: [
          { label: "Web Apps", href: "/products/web", description: "Modern web applications" },
          { label: "Mobile Apps", href: "/products/mobile", description: "iOS and Android apps" }
        ]
      },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" }
    ],
    cta: {
      text: "Get Started",
      href: "/signup",
      style: 'primary'
    },
    style: 'modern',
    position: 'sticky',
    background: 'white'
  },
  settings: {
    showSearch: true,
    mobileBreakpoint: 'md',
    animation: 'slide'
  }
}

// ============ BREADCRUMB BLOCK ============
interface BreadcrumbBlockProps {
  content: {
    items: Array<{
      label: string
      href?: string
      icon?: string
    }>
    separator: 'slash' | 'chevron' | 'arrow' | 'dot'
    showHome: boolean
    style: 'simple' | 'pills' | 'underline' | 'background'
  }
  settings?: {
    maxItems: number
    showIcons: boolean
    truncate: boolean
  }
}

export function BreadcrumbBlock({ content, settings }: BreadcrumbBlockProps) {
  const separators = {
    slash: '/',
    chevron: <ChevronRight className="h-4 w-4" />,
    arrow: '→',
    dot: '•'
  }

  const items = content.showHome 
    ? [{ label: 'Home', href: '/', icon: '🏠' }, ...content.items]
    : content.items

  const displayItems = settings?.maxItems 
    ? items.length > settings.maxItems 
      ? [...items.slice(0, 1), { label: '...', href: undefined }, ...items.slice(-2)]
      : items
    : items

  const containerClasses = cn(
    "flex items-center space-x-2 text-sm",
    {
      'py-2': content.style === 'simple',
      'py-1': content.style === 'pills' || content.style === 'underline',
      'py-2 px-4 bg-gray-50 rounded-lg': content.style === 'background',
    }
  )

  const itemClasses = cn(
    "transition-colors",
    {
      'text-gray-600 hover:text-gray-900': content.style === 'simple',
      'px-2 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200': content.style === 'pills',
      'text-gray-600 hover:text-gray-900 border-b border-transparent hover:border-gray-300': content.style === 'underline',
      'text-gray-600 hover:text-gray-900': content.style === 'background',
    }
  )

  return (
    <nav className={containerClasses} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {displayItems.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            {index > 0 && (
              <span className="text-gray-400">
                {separators[content.separator]}
              </span>
            )}
            {item.href ? (
              <Link href={item.href} className={itemClasses}>
                <span className="flex items-center space-x-1">
                  {settings?.showIcons && item.icon && <span>{item.icon}</span>}
                  <span>{item.label}</span>
                </span>
              </Link>
            ) : (
              <span className="text-gray-900 font-medium">
                <span className="flex items-center space-x-1">
                  {settings?.showIcons && item.icon && <span>{item.icon}</span>}
                  <span>{item.label}</span>
                </span>
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export const breadcrumbBlockConfig = {
  name: "Breadcrumb Navigation",
  type: "breadcrumb",
  category: "navigation",
  description: "Breadcrumb navigation for hierarchical page structure",
  component: "BreadcrumbBlock",
  defaultContent: {
    items: [
      { label: "Products", href: "/products" },
      { label: "Web Apps", href: "/products/web" },
      { label: "Dashboard", href: undefined }
    ],
    separator: 'chevron',
    showHome: true,
    style: 'simple'
  },
  settings: {
    maxItems: 5,
    showIcons: false,
    truncate: true
  }
}

// ============ PAGINATION BLOCK ============
interface PaginationBlockProps {
  content: {
    currentPage: number
    totalPages: number
    style: 'simple' | 'numbered' | 'compact' | 'advanced'
    showFirstLast: boolean
    showPrevNext: boolean
    maxVisible: number
  }
  settings?: {
    showPageInfo: boolean
    showJumpTo: boolean
    size: 'sm' | 'md' | 'lg'
  }
  onPageChange?: (page: number) => void
}

export function PaginationBlock({ content, settings, onPageChange }: PaginationBlockProps) {
  const { currentPage, totalPages, maxVisible } = content
  
  const getVisiblePages = () => {
    const pages = []
    const half = Math.floor(maxVisible / 2)
    let start = Math.max(1, currentPage - half)
    let end = Math.min(totalPages, start + maxVisible - 1)
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    return pages
  }

  const buttonClasses = cn(
    "inline-flex items-center justify-center border transition-colors",
    {
      'px-2 py-1 text-sm': settings?.size === 'sm',
      'px-3 py-2 text-sm': settings?.size === 'md',
      'px-4 py-3 text-base': settings?.size === 'lg',
    },
    {
      'rounded-md': content.style === 'simple' || content.style === 'advanced',
      'rounded-full': content.style === 'compact',
      'rounded-none first:rounded-l-md last:rounded-r-md': content.style === 'numbered',
    }
  )

  const activeClasses = "bg-blue-600 text-white border-blue-600"
  const inactiveClasses = "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
  const disabledClasses = "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Page Info */}
      {settings?.showPageInfo && (
        <div className="text-sm text-gray-600">
          Showing page {currentPage} of {totalPages}
        </div>
      )}

      {/* Pagination Controls */}
      <nav className="flex items-center space-x-1">
        {/* First Page */}
        {content.showFirstLast && currentPage > 1 && (
          <button
            onClick={() => onPageChange?.(1)}
            className={cn(buttonClasses, inactiveClasses)}
            disabled={currentPage === 1}
          >
            First
          </button>
        )}

        {/* Previous Page */}
        {content.showPrevNext && (
          <button
            onClick={() => onPageChange?.(currentPage - 1)}
            className={cn(
              buttonClasses,
              currentPage === 1 ? disabledClasses : inactiveClasses
            )}
            disabled={currentPage === 1}
          >
            <ArrowLeft className="h-4 w-4" />
            {content.style === 'advanced' && <span className="ml-1">Previous</span>}
          </button>
        )}

        {/* Page Numbers */}
        {content.style === 'numbered' || content.style === 'advanced' ? (
          <>
            {getVisiblePages().map((page) => (
              <button
                key={page}
                onClick={() => onPageChange?.(page)}
                className={cn(
                  buttonClasses,
                  page === currentPage ? activeClasses : inactiveClasses
                )}
              >
                {page}
              </button>
            ))}
          </>
        ) : (
          <span className="px-4 py-2 text-sm text-gray-600">
            {currentPage} / {totalPages}
          </span>
        )}

        {/* Next Page */}
        {content.showPrevNext && (
          <button
            onClick={() => onPageChange?.(currentPage + 1)}
            className={cn(
              buttonClasses,
              currentPage === totalPages ? disabledClasses : inactiveClasses
            )}
            disabled={currentPage === totalPages}
          >
            {content.style === 'advanced' && <span className="mr-1">Next</span>}
            <ArrowRight className="h-4 w-4" />
          </button>
        )}

        {/* Last Page */}
        {content.showFirstLast && currentPage < totalPages && (
          <button
            onClick={() => onPageChange?.(totalPages)}
            className={cn(buttonClasses, inactiveClasses)}
            disabled={currentPage === totalPages}
          >
            Last
          </button>
        )}
      </nav>

      {/* Jump To Page */}
      {settings?.showJumpTo && totalPages > 10 && (
        <div className="flex items-center space-x-2 text-sm">
          <span>Jump to page:</span>
          <input
            type="number"
            min={1}
            max={totalPages}
            className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const page = parseInt((e.target as HTMLInputElement).value)
                if (page >= 1 && page <= totalPages) {
                  onPageChange?.(page)
                }
              }
            }}
          />
        </div>
      )}
    </div>
  )
}

export const paginationBlockConfig = {
  name: "Pagination",
  type: "pagination",
  category: "navigation",
  description: "Pagination controls for multi-page content",
  component: "PaginationBlock",
  defaultContent: {
    currentPage: 1,
    totalPages: 10,
    style: 'numbered',
    showFirstLast: true,
    showPrevNext: true,
    maxVisible: 5
  },
  settings: {
    showPageInfo: true,
    showJumpTo: false,
    size: 'md'
  }
}

// ============ TAG CLOUD BLOCK ============
interface TagCloudBlockProps {
  content: {
    tags: Array<{
      label: string
      count: number
      href?: string
      color?: string
    }>
    style: 'simple' | 'weighted' | 'colorful' | 'minimal'
    layout: 'flow' | 'grid' | 'circular'
    interactive: boolean
  }
  settings?: {
    maxTags: number
    minSize: number
    maxSize: number
    showCounts: boolean
  }
  onTagClick?: (tag: string) => void
}

export function TagCloudBlock({ content, settings, onTagClick }: TagCloudBlockProps) {
  const maxCount = Math.max(...content.tags.map(tag => tag.count))
  const minCount = Math.min(...content.tags.map(tag => tag.count))
  
  const getTagSize = (count: number) => {
    if (!settings || content.style === 'simple') return settings?.minSize || 14
    
    const ratio = (count - minCount) / (maxCount - minCount) || 0
    const minSize = settings.minSize || 12
    const maxSize = settings.maxSize || 24
    return minSize + (ratio * (maxSize - minSize))
  }

  const getTagClasses = (tag: any, index: number) => {
    const baseClasses = cn(
      "inline-block transition-all duration-200",
      {
        'px-2 py-1 m-1 rounded-full border': content.style === 'simple',
        'px-3 py-1 m-1 rounded-full': content.style === 'weighted',
        'px-2 py-1 m-1 rounded-lg': content.style === 'colorful',
        'px-1 py-0.5 m-0.5': content.style === 'minimal',
      },
      {
        'hover:scale-110 cursor-pointer': content.interactive,
        'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200': content.style === 'simple',
        'bg-blue-100 text-blue-800 hover:bg-blue-200': content.style === 'weighted',
        'text-white hover:opacity-80': content.style === 'colorful',
        'text-gray-600 hover:text-gray-900 underline': content.style === 'minimal',
      }
    )

    return baseClasses
  }

  const getTagStyle = (tag: any, index: number) => {
    const fontSize = getTagSize(tag.count)
    const style: any = { fontSize: `${fontSize}px` }
    
    if (content.style === 'colorful') {
      const colors = [
        '#3B82F6', '#EF4444', '#10B981', '#F59E0B', 
        '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
      ]
      style.backgroundColor = tag.color || colors[index % colors.length]
    }
    
    return style
  }

  const containerClasses = cn(
    "p-4",
    {
      'text-left': content.layout === 'flow',
      'grid grid-cols-2 md:grid-cols-4 gap-2': content.layout === 'grid',
      'flex flex-wrap justify-center': content.layout === 'circular',
    }
  )

  const displayTags = settings?.maxTags 
    ? content.tags.slice(0, settings.maxTags)
    : content.tags

  return (
    <div className={containerClasses}>
      {displayTags.map((tag, index) => {
        const TagComponent = tag.href ? Link : 'span'
        const tagProps = tag.href ? { href: tag.href } : {}
        
        return (
          <TagComponent
            key={index}
            {...tagProps}
            className={getTagClasses(tag, index)}
            style={getTagStyle(tag, index)}
            onClick={() => content.interactive && onTagClick?.(tag.label)}
          >
            <span className="flex items-center space-x-1">
              <Tag className="h-3 w-3" />
              <span>{tag.label}</span>
              {settings?.showCounts && (
                <span className="text-xs opacity-75">({tag.count})</span>
              )}
            </span>
          </TagComponent>
        )
      })}
    </div>
  )
}

export const tagCloudBlockConfig = {
  name: "Tag Cloud",
  type: "tag-cloud",
  category: "navigation",
  description: "Interactive tag cloud for content categorization",
  component: "TagCloudBlock",
  defaultContent: {
    tags: [
      { label: "React", count: 45, href: "/tags/react" },
      { label: "JavaScript", count: 38, href: "/tags/javascript" },
      { label: "TypeScript", count: 29, href: "/tags/typescript" },
      { label: "Next.js", count: 22, href: "/tags/nextjs" },
      { label: "CSS", count: 18, href: "/tags/css" },
      { label: "Node.js", count: 15, href: "/tags/nodejs" },
      { label: "Python", count: 12, href: "/tags/python" },
      { label: "Design", count: 8, href: "/tags/design" }
    ],
    style: 'weighted',
    layout: 'flow',
    interactive: true
  },
  settings: {
    maxTags: 20,
    minSize: 12,
    maxSize: 24,
    showCounts: true
  }
}

