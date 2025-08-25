/**
 * ADMIN LAYOUT - Standalone Layout for CMS Admin Panel
 * 
 * This layout provides a complete, independent UI for the CMS admin panel.
 * It includes:
 * - Full-screen admin interface
 * - Admin-specific navigation sidebar
 * - User profile and logout functionality
 * - No inheritance from app layout (prevents double sidebars)
 * 
 * Used by: /admin/*
 * Route Group: (admin)/admin
 */

"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Button } from "@/components/ui/button"
import { LogOut, Home, User } from "lucide-react"
import Link from "next/link"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session } = useSession()
  const router = useRouter()

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push("/signin")
  }

  const handleGoToApp = () => {
    router.push("/dashboard")
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Admin Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Admin Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                CMS Admin Panel
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Content Management System
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Navigation Buttons */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleGoToApp}
                className="flex items-center space-x-2"
              >
                <Home className="h-4 w-4" />
                <span>Go to App</span>
              </Button>
              
              {/* User Info */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {session?.user?.username || 'Admin'}
                  </p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {(session?.user?.username?.[0] || 'A').toUpperCase()}
                  </span>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
        
        {/* Admin Footer */}
        <footer className="bg-white border-t border-gray-200 px-6 py-3 flex-shrink-0">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div>
              © 2024 CMS Admin Panel. All rights reserved.
            </div>
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>System Online</span>
              </span>
              <span>Secure</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
