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
  Info,
  Target,
  Users,
  Award,
  Lightbulb,
  Zap,
  Building2,
  BarChart3,
  FileText,
  TrendingUp,
  Calendar,
  HelpCircle
} from "lucide-react"
import { motion } from "framer-motion"

// Navigation groups for public pages
const navigationGroups = [
  {
    title: "Company",
    items: [
      { title: "About Us", href: "/company/about", icon: Info },
      { title: "Our Mission", href: "/company/mission", icon: Target },
      { title: "Leadership", href: "/company/leadership", icon: Users },
      { title: "Careers", href: "/company/careers", icon: Award }
    ]
  },
  {
    title: "Services",
    items: [
      { title: "What We Do", href: "/services/overview", icon: Lightbulb },
      { title: "Solutions", href: "/services/solutions", icon: Zap },
      { title: "Industries", href: "/services/industries", icon: Building2 },
      { title: "Case Studies", href: "/services/case-studies", icon: BarChart3 }
    ]
  },
  {
    title: "Resources",
    items: [
      { title: "Blog", href: "/resources/blog", icon: FileText },
      { title: "News", href: "/resources/news", icon: TrendingUp },
      { title: "Events", href: "/resources/events", icon: Calendar },
      { title: "Support", href: "/resources/support", icon: HelpCircle }
    ]
  }
]

export function WebsiteHeader() {
  const [sessionError, setSessionError] = useState(false)
  
  const { data: session, status } = useSession({
    required: false
  })

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before rendering
  useEffect(() => {
    setMounted(true)
  }, [])

  // Check if user is authenticated
  const user = session?.user
  const isAuthenticated = !sessionError && status === "authenticated" && user

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" })
  }

  const handleDropdownToggle = (groupTitle: string) => {
    setActiveDropdown(activeDropdown === groupTitle ? null : groupTitle)
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
    setActiveDropdown(null)
  }, [])

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/30">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="w-32 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-32 h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </header>
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
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <span className="text-white font-bold text-lg lg:text-xl">NT</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-primary rounded-2xl opacity-20 blur group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-xl lg:text-2xl text-gray-900 group-hover:text-gradient-primary transition-all duration-300">
                  Template
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Link 
                href="/" 
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
            </motion.div>
            
            {/* Multi-layered Navigation Groups */}
            {navigationGroups.map((group) => (
              <div key={group.title} className="relative">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="text-gray-600 hover:text-gray-900 transition-colors p-0 h-auto font-medium relative group flex items-center gap-1"
                  onClick={() => handleDropdownToggle(group.title)}
                  onMouseEnter={() => setActiveDropdown(group.title)}
                >
                  {group.title}
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                    activeDropdown === group.title ? 'rotate-180' : ''
                  }`} />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300"></span>
                </motion.button>
                
                {activeDropdown === group.title && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200/50 py-3 z-50 backdrop-blur-md"
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="px-1">
                      {group.items.map((item, index) => {
                        const Icon = item.icon
                        return (
                          <motion.div
                            key={item.href}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                          >
                            <Link
                              href={item.href}
                              className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-gray-900 transition-all duration-200 rounded-xl mx-1 group"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <Icon className="mr-3 h-4 w-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
                              <span className="font-medium">{item.title}</span>
                              <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <ChevronDown className="h-3 w-3 rotate-[-90deg] text-blue-600" />
                              </div>
                            </Link>
                          </motion.div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Section - User Info and Auth */}
          <div className="flex items-center space-x-4">
            {/* Auth Section */}
            {(status === "loading" || sessionError) ? (
              <span className="text-sm text-gray-500">
                {sessionError ? "..." : "Loading..."}
              </span>
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
                      {/* Subtle shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: [-100, 200] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      />
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
              
              {/* Mobile Navigation Groups */}
              {navigationGroups.map((group, groupIndex) => (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 + groupIndex * 0.1 }}
                  className="space-y-3"
                >
                  <div className="text-sm font-semibold text-gray-900 border-b border-gray-200 pb-2">
                    {group.title}
                  </div>
                  <div className="space-y-2 ml-4">
                    {group.items.map((item, itemIndex) => {
                      const Icon = item.icon
                      return (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.2 + groupIndex * 0.1 + itemIndex * 0.05 }}
                        >
                          <Link
                            href={item.href}
                            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors py-2 group"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <Icon className="mr-3 h-4 w-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
                            <span className="font-medium">{item.title}</span>
                          </Link>
                        </motion.div>
                      )
                    })}
                  </div>
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
      </div>
    </motion.header>
  )
}