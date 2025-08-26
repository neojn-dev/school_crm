"use client"

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Menu, 
  X, 
  LogOut, 
  ArrowRight,
  ChevronDown,
  ChevronRight,
  ExternalLink
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface NavigationItem {
  id: string
  label: string
  href: string
  target?: string
  type: 'page' | 'external' | 'section' | 'homepage'
  isActive: boolean
  children?: NavigationItem[]
}

interface SiteSettings {
  siteLogo?: string
  siteLogoAlt?: string
  headerStyle?: string
  showSearch?: boolean
}

interface HierarchicalWebsiteHeaderProps {
  navigation: NavigationItem[]
  siteSettings?: SiteSettings
  siteName?: string
}

export function HierarchicalWebsiteHeader({ 
  navigation = [], 
  siteSettings = {},
  siteName = "Your Website"
}: HierarchicalWebsiteHeaderProps) {
  const { data: session, status } = useSession({ required: false })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdowns, setActiveDropdowns] = useState<Set<string>>(new Set())
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle dropdown interactions
  const handleDropdownToggle = (itemId: string) => {
    setActiveDropdowns(prev => {
      const newSet = new Set(prev)
      if (newSet.has(itemId)) {
        newSet.delete(itemId)
      } else {
        newSet.add(itemId)
      }
      return newSet
    })
  }

  const handleDropdownEnter = (itemId: string) => {
    setActiveDropdowns(prev => new Set([...prev, itemId]))
  }

  const handleDropdownLeave = (itemId: string) => {
    setTimeout(() => {
      setActiveDropdowns(prev => {
        const newSet = new Set(prev)
        newSet.delete(itemId)
        return newSet
      })
    }, 150)
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdowns(new Set())
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // Prevent hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  // Filter active navigation items
  const activeNavigation = navigation.filter(item => item.isActive)

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="w-32 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-32 h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </header>
    )
  }

  // Recursive function to render navigation items with unlimited nesting
  const renderNavigationItem = (item: NavigationItem, depth = 0): JSX.Element | null => {
    const hasChildren = item.children && item.children.length > 0
    const isDropdownActive = activeDropdowns.has(item.id)

    if (item.type === 'section' && hasChildren) {
      // Section header with dropdown
      return (
        <div key={item.id} className="relative">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="text-gray-600 hover:text-gray-900 transition-colors p-0 h-auto font-medium relative group flex items-center gap-1"
            onClick={(e) => {
              e.stopPropagation()
              handleDropdownToggle(item.id)
            }}
            onMouseEnter={() => handleDropdownEnter(item.id)}
          >
            {item.label}
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
              isDropdownActive ? 'rotate-180' : ''
            }`} />
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
          </motion.button>
          
          <AnimatePresence>
            {isDropdownActive && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`absolute ${depth === 0 ? 'top-full left-0 mt-3' : 'left-full top-0 ml-2'} w-64 bg-white rounded-2xl shadow-2xl border border-gray-200/50 py-3 z-50 backdrop-blur-md`}
                onMouseLeave={() => handleDropdownLeave(item.id)}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-1">
                  {item.children!.map((childItem, index) => (
                    <motion.div
                      key={childItem.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      {renderDropdownItem(childItem, depth + 1)}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )
    } else if (item.type === 'page' || item.type === 'external') {
      // Regular link
      return (
        <motion.div
          key={item.id}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <Link
            href={item.href}
            target={item.target}
            className="text-gray-600 hover:text-gray-900 transition-colors font-medium relative group"
          >
            {item.label}
            {item.target === '_blank' && <ExternalLink className="inline ml-1 h-3 w-3" />}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </motion.div>
      )
    }

    return null
  }

  // Render dropdown items recursively (supports unlimited nesting)
  const renderDropdownItem = (item: NavigationItem, depth: number): JSX.Element => {
    const hasChildren = item.children && item.children.length > 0
    const isDropdownActive = activeDropdowns.has(item.id)

    if (item.type === 'section' && hasChildren) {
      // Nested section with submenu
      return (
        <div className="relative">
          <button
            className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-gray-900 transition-all duration-200 rounded-xl mx-1 group"
            onClick={(e) => {
              e.stopPropagation()
              handleDropdownToggle(item.id)
            }}
            onMouseEnter={() => handleDropdownEnter(item.id)}
          >
            <span className="font-medium">{item.label}</span>
            <ChevronRight className="h-3 w-3 text-gray-400" />
          </button>
          
          <AnimatePresence>
            {isDropdownActive && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="absolute left-full top-0 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200/50 py-3 z-50 backdrop-blur-md ml-2"
                onMouseLeave={() => handleDropdownLeave(item.id)}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-1">
                  {item.children!.map((childItem, index) => (
                    <motion.div
                      key={childItem.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      {renderDropdownItem(childItem, depth + 1)}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )
    } else {
      // Regular page link in dropdown
      return (
        <Link
          href={item.href}
          target={item.target}
          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-gray-900 transition-all duration-200 rounded-xl mx-1 group"
          onClick={() => setActiveDropdowns(new Set())}
        >
          <span className="font-medium">{item.label}</span>
          {item.target === '_blank' && <ExternalLink className="ml-2 h-3 w-3" />}
        </Link>
      )
    }
  }

  // Mobile navigation renderer (recursive)
  const renderMobileNavItem = (item: NavigationItem, depth = 0): JSX.Element | null => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = activeDropdowns.has(item.id)

    if (item.type === 'section' && hasChildren) {
      return (
        <div key={item.id} className={`${depth > 0 ? 'ml-4' : ''}`}>
          <button
            className="w-full flex items-center justify-between py-3 px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            onClick={() => handleDropdownToggle(item.id)}
          >
            <span className="font-medium">{item.label}</span>
            <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${
              isExpanded ? 'rotate-90' : ''
            }`} />
          </button>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="py-2 space-y-1">
                  {item.children!.map(childItem => renderMobileNavItem(childItem, depth + 1))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )
    } else if (item.type === 'page' || item.type === 'external') {
      return (
        <Link
          key={item.id}
          href={item.href}
          target={item.target}
          className={`block py-3 px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors font-medium ${
            depth > 0 ? 'ml-4' : ''
          }`}
          onClick={() => setMobileMenuOpen(false)}
        >
          {item.label}
          {item.target === '_blank' && <ExternalLink className="inline ml-1 h-3 w-3" />}
        </Link>
      )
    }

    return null
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
        : 'bg-white/80 backdrop-blur-md border-b border-gray-200/30'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Link href="/" className="flex items-center space-x-3">
              {siteSettings.siteLogo ? (
                <Image
                  src={siteSettings.siteLogo}
                  alt={siteSettings.siteLogoAlt || siteName}
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {siteName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {siteName}
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {activeNavigation.map(item => renderNavigationItem(item))}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            ) : session ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600 hidden sm:block">
                  Welcome, {session.user.firstName || session.user.username}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut()}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link href="/signin">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/50 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2 max-h-96 overflow-y-auto">
              {activeNavigation.map(item => renderMobileNavItem(item))}
              
              {/* Mobile Auth Links */}
              {!session && (
                <div className="pt-4 mt-4 border-t border-gray-200 space-y-2 sm:hidden">
                  <Link
                    href="/signin"
                    className="block py-3 px-4 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="block py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg transition-colors font-medium text-center"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
