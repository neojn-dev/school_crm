"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  FileText, 
  Layers, 
  Image, 
  Settings, 
  Search,
  PlusCircle,
  BarChart3,
  Menu,
  Globe
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Pages",
    href: "/admin/cms/pages",
    icon: FileText,
  },
  {
    name: "Navigation",
    href: "/admin/cms/navigation",
    icon: Menu,
  },
  {
    name: "Site Settings",
    href: "/admin/cms/site-settings",
    icon: Globe,
  },
  {
    name: "Templates",
    href: "/admin/cms/templates",
    icon: Layers,
  },
  {
    name: "Content Blocks",
    href: "/admin/cms/blocks",
    icon: PlusCircle,
  },
  {
    name: "Media Library",
    href: "/admin/cms/media",
    icon: Image,
  },
  {
    name: "SEO Settings",
    href: "/admin/cms/seo",
    icon: Search,
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-gray-900 text-white flex-shrink-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold">CMS Admin</h2>
            <p className="text-xs text-gray-400">Content Management</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="mt-6">
        <div className="px-3">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/admin" && pathname.startsWith(item.href))
              
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
      
      {/* Quick Actions */}
      <div className="mt-8 px-3">
        <h3 className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Quick Actions
        </h3>
        <div className="mt-2 space-y-1">
          <Link
            href="/admin/cms/pages/new"
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white transition-colors"
          >
            <PlusCircle className="mr-3 h-4 w-4" />
            New Page
          </Link>
          <Link
            href="/admin/cms/templates/new"
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white transition-colors"
          >
            <Layers className="mr-3 h-4 w-4" />
            New Template
          </Link>
        </div>
      </div>
      
      {/* System Status */}
      <div className="mt-auto p-3 border-t border-gray-700">
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>System Online</span>
        </div>
      </div>
    </div>
  )
}
