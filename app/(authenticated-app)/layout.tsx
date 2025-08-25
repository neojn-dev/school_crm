/**
 * AUTHENTICATED APP LAYOUT - Layout for Protected Application Pages
 * 
 * This layout is used for all authenticated/protected pages in the application.
 * It provides:
 * - Beautiful collapsible sidebar navigation
 * - App header with user profile and quick navigation
 * - App footer with links and status
 * - Mobile-responsive design with hamburger menu
 * - User session management
 * - Navigation to app features (Dashboard, My Data, Roles)
 * - Website home and logout functionality
 * 
 * Used by: /dashboard, /doctors, /engineers, /teachers, /lawyers
 * Route Group: (authenticated-app)
 */

"use client"

import { useState, useEffect, useCallback } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { 
  ChevronLeft, 
  ChevronRight,
  BarChart3,
  Database,
  Users,
  FileText,
  Settings,
  LogOut,
  Globe,
  Menu,
  X,
  Layers
} from "lucide-react"
import { cn } from "@/lib/utils"
import { ErrorBoundary } from "@/components/error-boundary"
import { AppHeader, AppFooter, Sidebar } from "@/components/website-components"
import { ToastContainerWrapper } from "@/components/ui/toast-container"
import { DebugSession } from "@/components/debug-session"

const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
    description: "Overview and analytics"
  },
  {
    title: "Doctors",
    href: "/doctors",
    icon: Users,
    description: "Manage doctor records"
  },
  {
    title: "Engineers",
    href: "/engineers",
    icon: FileText,
    description: "Manage engineer records"
  },
  {
    title: "Teachers",
    href: "/teachers",
    icon: Settings,
    description: "Manage teacher records"
  },
  {
    title: "Lawyers",
    href: "/lawyers",
    icon: Database,
    description: "Manage lawyer records"
  },
  {
    title: "Master Data",
    href: "/master-data",
    icon: Layers,
    description: "Comprehensive form data management"
  },
  {
    title: "Users",
    href: "/users",
    icon: Users,
    description: "Manage system users"
  },
  {
    title: "Roles",
    href: "/roles",
    icon: Database,
    description: "Manage user roles and permissions"
  }
]

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)

  // Ensure component is mounted before rendering
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle authentication redirect
  useEffect(() => {
    if (mounted && status === "unauthenticated" && !isRedirecting) {
      setIsRedirecting(true)
      router.push("/auth/signin")
    }
  }, [mounted, status, router, isRedirecting])

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Memoized handlers to prevent unnecessary re-renders
  const handleSignOut = useCallback(async () => {
    try {
      await signOut({ callbackUrl: "/" })
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }, [])

  const goToWebsite = useCallback(() => {
    router.push("/")
  }, [router])

  const toggleCollapse = useCallback(() => {
    setIsCollapsed(prev => !prev)
  }, [])

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev)
  }, [])

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  // Show loading state while session is being determined
  if (status === "loading" || !mounted) {
    return (
      <div className="flex h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="w-8 h-8 bg-white rounded-lg"></div>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render anything while redirecting
  if (status === "unauthenticated" || isRedirecting) {
    return (
      <div className="flex h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="w-8 h-8 bg-white rounded-lg"></div>
          </div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={closeMobileMenu}
          />
        )}

        {/* Full Height Sidebar */}
        <div className="hidden lg:block h-screen">
          <Sidebar isCollapsed={isCollapsed} onToggle={toggleCollapse} />
        </div>

        {/* Main Content Area - Header, Content, Footer */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* App Header - Positioned to the right of sidebar */}
          <AppHeader />
          
          {/* Main Content */}
          <main className="flex-1 overflow-auto bg-gray-50">
            <div key={pathname} className="p-6">
              {children}
            </div>
          </main>
          
          {/* App Footer - Positioned to the right of sidebar */}
          <AppFooter />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
          type="button"
        >
          <Menu className="h-5 w-5 text-gray-600" />
        </button>

        {/* Mobile Sidebar */}
        {mobileMenuOpen && (
          <aside className="fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 shadow-2xl lg:hidden">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-lg text-gray-900">Application</span>
              </div>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                type="button"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
              {navigationItems.filter(item => {
                // Only show Users and Roles to Admin users
                if (item.href === '/users' || item.href === '/roles') {
                  // Handle nested session structure
                  const userRole = session?.session?.user?.role || session?.user?.role
                  return userRole === 'Admin'
                }
                // Show all other items to everyone
                return true
              }).map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMobileMenu}
                      className={cn(
                        "group flex items-center px-3 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 hover:shadow-sm",
                        isActive && "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                      )}
                    >
                      <div className="flex items-center justify-center w-8 h-8 mr-3">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{item.title}</div>
                        <div className="text-xs text-gray-500 group-hover:text-blue-600">
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  </div>
                )
              })}
            </nav>

            {/* Mobile Footer Actions */}
            <div className="p-3 border-t border-gray-200 space-y-2">
              <button
                onClick={() => {
                  goToWebsite()
                  closeMobileMenu()
                }}
                className="group w-full flex items-center px-3 py-3 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200 hover:shadow-sm"
                type="button"
              >
                <div className="flex items-center justify-center w-8 h-8 mr-3">
                  <Globe className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Website Home</div>
                  <div className="text-xs text-gray-500 group-hover:text-green-600">
                    Back to landing page
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  handleSignOut()
                  closeMobileMenu()
                }}
                className="group w-full flex items-center px-3 py-3 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 hover:shadow-sm"
                type="button"
              >
                <div className="flex items-center justify-center w-8 h-8 mr-3">
                  <LogOut className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">Sign Out</div>
                  <div className="text-xs text-gray-500 group-hover:text-red-600">
                    {session?.user?.username || 'User'}
                  </div>
                </div>
              </button>
            </div>
          </aside>
        )}
      </div>
      
      {/* Toast Notifications */}
      <ToastContainerWrapper />
      
      {/* Debug Session - Remove this in production */}
      <DebugSession />
    </ErrorBoundary>
  )
}




