/**
 * AUTHENTICATED APP LAYOUT - Layout for Protected Application Pages
 * 
 * This layout is used for all authenticated/protected pages in the application.
 * It provides:
 * - Beautiful collapsible sidebar navigation
 * - Mobile-responsive design with hamburger menu
 * - User session management
 * - Navigation to app features (Dashboard, My Data, Roles)
 * - Website home and logout functionality
 * 
 * Used by: /dashboard, /mydata, /role1, /role2, /role3, /all-roles
 * Route Group: (authenticated-app)
 */

"use client"

import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
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
  X
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
    description: "Overview and analytics"
  },
  {
    title: "My Data",
    href: "/mydata",
    icon: Database,
    description: "Manage your data entries"
  },
  {
    title: "Role 1",
    href: "/role1",
    icon: Users,
    description: "Access Role 1 features"
  },
  {
    title: "Role 2",
    href: "/role2",
    icon: FileText,
    description: "Access Role 2 features"
  },
  {
    title: "Role 3",
    href: "/role3",
    icon: Settings,
    description: "Access Role 3 features"
  }
]

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session } = useSession()
  const router = useRouter()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" })
  }

  const goToWebsite = () => {
    router.push("/")
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ width: isCollapsed ? 80 : 280 }}
        animate={{ width: isCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative hidden lg:flex flex-col bg-white border-r border-gray-200 shadow-lg"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg text-gray-900">App</span>
            </motion.div>
          )}
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 text-gray-600" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "group flex items-center px-3 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200",
                    "hover:shadow-sm"
                  )}
                >
                  <div className="flex items-center justify-center w-8 h-8 mr-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  {!isCollapsed && (
                    <div className="flex-1">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs text-gray-500 group-hover:text-blue-600">
                        {item.description}
                      </div>
                    </div>
                  )}
                </Link>
              </motion.div>
            )
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-3 border-t border-gray-200 space-y-2">
          {/* Website Home Link */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={goToWebsite}
            className={cn(
              "group w-full flex items-center px-3 py-3 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200",
              "hover:shadow-sm"
            )}
          >
            <div className="flex items-center justify-center w-8 h-8 mr-3">
              <Globe className="h-5 w-5" />
            </div>
            {!isCollapsed && (
              <div className="flex-1">
                <div className="font-medium">Website Home</div>
                <div className="text-xs text-gray-500 group-hover:text-green-600">
                  Back to landing page
                </div>
              </div>
            )}
          </motion.button>

          {/* Logout Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            onClick={handleSignOut}
            className={cn(
              "group w-full flex items-center px-3 py-3 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200",
              "hover:shadow-sm"
            )}
          >
            <div className="flex items-center justify-center w-8 h-8 mr-3">
              <LogOut className="h-5 w-5" />
            </div>
            {!isCollapsed && (
              <div className="flex-1">
                <div className="font-medium">Sign Out</div>
                <div className="text-xs text-gray-500 group-hover:text-red-600">
                  {session?.user?.username || 'User'}
                </div>
              </div>
            )}
          </motion.button>
        </div>
      </motion.aside>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
      >
        <Menu className="h-5 w-5 text-gray-600" />
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 shadow-2xl lg:hidden"
          >
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-lg text-gray-900">Application</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
              {navigationItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="group flex items-center px-3 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 hover:shadow-sm"
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
                  </motion.div>
                )
              })}
            </nav>

            {/* Mobile Footer Actions */}
            <div className="p-3 border-t border-gray-200 space-y-2">
              <button
                onClick={() => {
                  goToWebsite()
                  setMobileMenuOpen(false)
                }}
                className="group w-full flex items-center px-3 py-3 rounded-xl text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200 hover:shadow-sm"
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
                  setMobileMenuOpen(false)
                }}
                className="group w-full flex items-center px-3 py-3 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 hover:shadow-sm"
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
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}




