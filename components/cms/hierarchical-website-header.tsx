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

  // Ensure component is mounted before rendering
  useEffect(() => {
    setMounted(true)
  }, [])

  const user = session?.user
  const isAuthenticated = status === "authenticated" && user

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" })
  }

  const handleDropdownToggle = (itemId: string) => {
    const newActiveDropdowns = new Set(activeDropdowns)
    if (newActiveDropdowns.has(itemId)) {
      newActiveDropdowns.delete(itemId)
    } else {
      newActiveDropdowns.add(itemId)
    }
    setActiveDropdowns(newActiveDropdowns)
  }

  const handleDropdownEnter = (itemId: string) => {
    const newActiveDropdowns = new Set(activeDropdowns)
    newActiveDropdowns.add(itemId)
    setActiveDropdowns(newActiveDropdowns)
  }

  const handleDropdownLeave = (itemId: string) => {
    const newActiveDropdowns = new Set(activeDropdowns)
    newActiveDropdowns.delete(itemId)
    setActiveDropdowns(newActiveDropdowns)
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
    setActiveDropdowns(new Set())
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

  // Render navigation item with support for multi-level nesting
  const renderNavigationItem = (item: NavigationItem, depth = 0) => {
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
            onClick={() => handleDropdownToggle(item.id)}
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
                className={`absolute top-full ${depth === 0 ? 'left-0' : 'left-full top-0'} mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200/50 py-3 z-50 backdrop-blur-md`}
                onMouseLeave={() => handleDropdownLeave(item.id)}
              >
                <div className="px-1">
                  {item.children!.map((childItem, index) => (
                    <motion.div
                      key={childItem.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      {childItem.type === 'section' && childItem.children ? (
                        // Nested section
                        <div className="relative">
                          <button
                            className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-gray-900 transition-all duration-200 rounded-xl mx-1 group"
                            onClick={() => handleDropdownToggle(childItem.id)}
                          >
                            <span className="font-medium">{childItem.label}</span>
                            <ChevronRight className="h-3 w-3 text-gray-400" />
                          </button>
                          
                          {activeDropdowns.has(childItem.id) && (
                            <motion.div
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="absolute left-full top-0 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200/50 py-3 z-50 backdrop-blur-md ml-2"
                            >
                              <div className="px-1">
                                {childItem.children!.map((grandChild, grandIndex) => (
                                  <motion.div
                                    key={grandChild.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2, delay: grandIndex * 0.05 }}
                                  >
                                    <Link
                                      href={grandChild.href}
                                      target={grandChild.target}
                                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-gray-900 transition-all duration-200 rounded-xl mx-1 group"
                                      onClick={() => setActiveDropdowns(new Set())}
                                    >
                                      <span className="font-medium">{grandChild.label}</span>
                                      {grandChild.target === '_blank' && <ExternalLink className="ml-2 h-3 w-3" />}
                                    </Link>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      ) : (
                        // Regular page link
                        <Link
                          href={childItem.href}
                          target={childItem.target}
                          className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-gray-900 transition-all duration-200 rounded-xl mx-1 group"
                          onClick={() => setActiveDropdowns(new Set())}
                        >
                          <span className="font-medium">{childItem.label}</span>
                          {childItem.target === '_blank' && <ExternalLink className="ml-2 h-3 w-3" />}
                          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <ChevronDown className="h-3 w-3 rotate-[-90deg] text-blue-600" />
                          </div>
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )
    } else {
      // Regular page link
      return (
        <motion.div
          key={item.id}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <Link 
            href={item.href}
            target={item.target}
            className="text-gray-600 hover:text-gray-900 transition-colors font-medium relative group flex items-center gap-1"
          >
            {item.label}
            {item.target === '_blank' && <ExternalLink className="h-3 w-3" />}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </motion.div>
      )
    }
  }

  // Render mobile navigation item
  const renderMobileNavigationItem = (item: NavigationItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = activeDropdowns.has(item.id)

    return (
      <div key={item.id} style={{ marginLeft: `${depth * 16}px` }}>
        {item.type === 'section' && hasChildren ? (
          <div className="space-y-2">
            <button
              onClick={() => handleDropdownToggle(item.id)}
              className="flex items-center justify-between w-full text-left text-gray-600 hover:text-gray-900 transition-colors font-medium py-2"
            >
              <span>{item.label}</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''
              }`} />
            </button>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-1 overflow-hidden"
                >
                  {item.children!.map((childItem) => 
                    renderMobileNavigationItem(childItem, depth + 1)
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link
            href={item.href}
            target={item.target}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors font-medium py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            {item.label}
            {item.target === '_blank' && <ExternalLink className="ml-2 h-4 w-4" />}
          </Link>
        )}
      </div>
    )
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50' 
          : 'bg-white/80 backdrop-blur-md border-b border-gray-200/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="flex items-center space-x-3 group">
              {siteSettings.siteLogo ? (
                <div className="relative">
                  <Image
                    src={siteSettings.siteLogo}
                    alt={siteSettings.siteLogoAlt || siteName}
                    width={48}
                    height={48}
                    className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
                  />
                </div>
              ) : (
                <div className="relative">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <span className="text-white font-bold text-lg lg:text-xl">
                      {siteName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-20 blur group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
              )}
              <div className="hidden sm:block">
                <span className="font-bold text-xl lg:text-2xl text-gray-900 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {siteName}
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {/* Home Link */}
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Link 
                href="/" 
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </motion.div>
            
            {/* Navigation Items */}
            {activeNavigation.map((item) => renderNavigationItem(item))}
          </nav>

          {/* Right Section - User Info and Auth */}
          <div className="flex items-center space-x-4">
            {/* Auth Section */}
            {status === "loading" ? (
              <span className="text-sm text-gray-500">Loading...</span>
            ) : isAuthenticated ? (
              <div className="flex items-center space-x-3">
                {/* User Name - Desktop */}
                <div className="hidden md:flex items-center space-x-3">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center space-x-2 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl px-3 py-2 border border-green-200 shadow-sm"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-900">
                      {user?.username || 'User'}
                    </span>
                    <div className="text-xs text-green-600 font-medium">Online</div>
                  </motion.div>
                </div>

                {/* Go to Application Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    asChild
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 px-4 py-2 rounded-lg font-semibold"
                  >
                    <Link href="/dashboard" className="flex items-center space-x-2">
                      <span>Go to App</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>

                {/* Logout Button */}
                <Button 
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-all duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <div className="hidden lg:flex items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    asChild 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 border-0 px-6 py-2.5 rounded-xl font-semibold relative overflow-hidden"
                  >
                    <Link href="/signin" className="flex items-center space-x-2">
                      <span>Sign In</span>
                      <motion.div
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
                      </motion.div>
                    </Link>
                  </Button>
                </motion.div>
              </div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden border-t border-gray-200/50 py-4 overflow-hidden"
            >
              <nav className="flex flex-col space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Link 
                    href="/" 
                    className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                </motion.div>
                
                {/* Mobile Navigation Items */}
                {activeNavigation.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
                  >
                    {renderMobileNavigationItem(item)}
                  </motion.div>
                ))}
                
                {!isAuthenticated && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    className="pt-4 border-t border-gray-200"
                  >
                    <Link 
                      href="/signin" 
                      className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>Sign In</span>
                      <ChevronDown className="ml-2 h-4 w-4 rotate-[-90deg]" />
                    </Link>
                  </motion.div>
                )}

                {isAuthenticated && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    className="pt-4 border-t border-gray-200 space-y-3"
                  >
                    <div className="flex items-center space-x-2 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl px-3 py-2 border border-green-200 shadow-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold text-gray-900">
                        {user?.username || 'User'}
                      </span>
                      <div className="text-xs text-green-600 font-medium">Online</div>
                    </div>
                    
                    <Link 
                      href="/dashboard"
                      className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>Go to Application</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    
                    <button
                      onClick={() => {
                        handleSignOut()
                        setMobileMenuOpen(false)
                      }}
                      className="w-full flex items-center justify-center space-x-2 bg-red-50 text-red-600 hover:bg-red-100 py-3 px-6 rounded-xl font-semibold transition-all duration-300"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </motion.div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
