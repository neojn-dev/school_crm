"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  FileText, 
  Image, 
  Settings,
  PlusCircle,
  ChevronRight,
  Home,
  Megaphone
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigationSections = [
  {
    title: "Content",
    items: [
      { name: "Dashboard", href: "/cms", icon: LayoutDashboard, description: "Overview and quick stats" },
      { name: "Blogs", href: "/cms/blogs", icon: FileText, description: "Create and edit blog posts" },
      { name: "Announcements", href: "/cms/announcements", icon: Megaphone, description: "Manage announcements" },
      { name: "Tenders", href: "/cms/tenders", icon: FileText, description: "Manage tenders and files" },
    ]
  },
  {
    title: "Assets",
    items: [
      { name: "Media Library", href: "/cms/media", icon: Image, description: "Images and file uploads" }
    ]
  }
]

const quickActions = [
  { name: "New Blog", href: "/cms/blogs/new", icon: PlusCircle, color: "bg-blue-500" },
  { name: "New Announcement", href: "/cms/announcements/new", icon: Megaphone, color: "bg-purple-500" },
  { name: "New Tender", href: "/cms/tenders/new", icon: FileText, color: "bg-orange-500" },
  { name: "View Site", href: "/", icon: Home, color: "bg-green-500", external: true }
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-72 bg-white border-r border-gray-200 flex-shrink-0 shadow-sm flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link href="/cms" className="flex items-center space-x-3 group hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
            <LayoutDashboard className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">CMS Admin</h2>
            <p className="text-sm text-gray-500">Content Management</p>
          </div>
        </Link>
      </div>
      
      {/* Quick Actions */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 gap-2">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              href={action.href}
              {...(action.external && { target: "_blank", rel: "noopener noreferrer" })}
              className="group flex items-center p-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200"
            >
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mr-3", action.color)}>
                <action.icon className="h-4 w-4 text-white" />
              </div>
              <span className="flex-1">{action.name}</span>
              <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-8">
          {navigationSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href || 
                    (item.href !== "/cms" && pathname.startsWith(item.href))
                  
                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "group flex items-center p-3 text-sm font-medium rounded-lg transition-all duration-200",
                          isActive
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 border border-transparent hover:border-gray-200"
                        )}
                        title={item.description}
                      >
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center mr-3 transition-colors",
                          isActive
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                        )}>
                          <item.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="block truncate">{item.name}</span>
                          <span className="block text-xs text-gray-500 truncate mt-0.5">
                            {item.description}
                          </span>
                        </div>
                        {isActive && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>
      
      {/* System Status */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">System Online</p>
              <p className="text-xs text-gray-500">All services running</p>
            </div>
          </div>
          <div className="text-xs text-gray-400">
            v2.1.0
          </div>
        </div>
      </div>
    </div>
  )
}
