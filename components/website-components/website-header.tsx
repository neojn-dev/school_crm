"use client"

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings, 
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
  HelpCircle,
  Search,
  Bell,
  Database
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
  const { data: session, status } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before rendering
  useEffect(() => {
    setMounted(true)
  }, [])

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

          {/* Right Section */}
          <div className="flex items-center space-x-3 lg:space-x-4">
            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
            >
              <Search className="h-5 w-5" />
            </motion.button>

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200 relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            </motion.button>

            {/* Auth Section */}
            {status === "loading" ? (
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            ) : session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative h-10 w-10 rounded-full overflow-hidden ring-2 ring-transparent hover:ring-blue-500/20 transition-all duration-200"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-primary text-white font-semibold">
                        {session?.user?.username?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 p-2" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal p-3">
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm font-semibold leading-none text-gray-900">
                        {session?.user?.username || "User"}
                      </p>
                      <p className="text-xs leading-none text-gray-500">
                        {session?.user?.email || "No email"}
                      </p>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {session?.user?.role || "Unknown"}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="p-1">
                    <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                      <Link href="/dashboard" className="flex items-center p-2">
                        <BarChart3 className="mr-3 h-4 w-4" />
                        <span>Go to Application</span>
                      </Link>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <div className="p-1">
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600 rounded-lg cursor-pointer"
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden lg:flex items-center space-x-3">
                <Button variant="ghost" asChild className="btn-ghost">
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button asChild className="btn-primary">
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
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
              
              {!session && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="pt-4 border-t border-gray-200 space-y-3"
                >
                  <Link 
                    href="/auth/signin" 
                    className="block text-gray-600 hover:text-gray-900 transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/auth/signup" 
                    className="block text-gray-600 hover:text-gray-900 transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </motion.div>
              )}
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}