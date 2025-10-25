"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  BarChart3,
  LogOut,
  Globe,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from "lucide-react"
import { getFilteredNavigationItems } from "@/lib/navigation"

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const { data: session } = useSession()
  const pathname = usePathname()

  return (
    <aside className={cn(
      "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-full",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg text-gray-900">School CRM</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="p-2 hover:bg-gray-100"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
        {getFilteredNavigationItems(session?.user?.role).map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <div key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "group flex items-center px-3 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 hover:shadow-sm",
                  isActive && "bg-blue-50 text-blue-700 border-r-2 border-blue-600",
                  isCollapsed && "justify-center"
                )}
                title={isCollapsed ? item.title : undefined}
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
            </div>
          )
        })}
      </nav>
    </aside>
  )
}

export function AppHeader() {
  const { data: session } = useSession()

  const handleSignOut = useCallback(async () => {
    try {
      await signOut({ callbackUrl: "/" })
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }, [])

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">School CRM</h1>
          <p className="text-sm text-gray-600">Student and Staff Management System</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              {session?.user?.username || 'User'}
            </p>
            <p className="text-xs text-gray-500">
              {session?.user?.role || 'Staff'}
            </p>
          </div>
          
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {(session?.user?.username?.[0] || 'U').toUpperCase()}
            </span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
            title="Sign Out"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}

export function AppFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div>
          © 2024 School CRM. All rights reserved.
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
  )
}

// Export aliases for compatibility
export const WebsiteHeader = AppHeader
export const WebsiteFooter = AppFooter
