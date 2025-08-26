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
    href: "/cms",
    icon: LayoutDashboard,
  },
  {
    name: "Pages",
    href: "/cms/pages",
    icon: FileText,
  },
  {
    name: "Navigation",
    href: "/cms/navigation",
    icon: Menu,
  },
  {
    name: "Site Settings",
    href: "/cms/site-settings",
    icon: Globe,
  },
  {
    name: "Templates",
    href: "/cms/templates",
    icon: Layers,
  },
  {
    name: "Content Blocks",
    href: "/cms/blocks",
    icon: PlusCircle,
  },
  {
    name: "Media Library",
    href: "/cms/media",
    icon: Image,
  },
  {
    name: "SEO Settings",
    href: "/cms/seo",
    icon: Search,
  },
  {
    name: "Analytics",
    href: "/cms/analytics",
    icon: BarChart3,
  },
  {
    name: "Settings",
    href: "/cms/settings",
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-48 bg-gray-900 text-white flex-shrink-0">
      {/* Logo */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
            <LayoutDashboard className="h-4 w-4 text-white" />
          </div>
          <div>
            <h2 className="text-base font-bold">CMS</h2>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="mt-6">
        <div className="px-3">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== "/cms" && pathname.startsWith(item.href))
              
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                      isActive
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4 flex-shrink-0" />
                    <span className="truncate">{item.name}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
      
      {/* Quick Actions */}
      <div className="mt-6 px-3">
        <h3 className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Quick
        </h3>
        <div className="mt-2 space-y-1">
          <Link
            href="/cms/pages/new"
            className="flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white transition-colors"
          >
            <PlusCircle className="mr-2 h-4 w-4 flex-shrink-0" />
            <span className="truncate">New Page</span>
          </Link>
          <Link
            href="/cms/templates/new"
            className="flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white transition-colors"
          >
            <Layers className="mr-2 h-4 w-4 flex-shrink-0" />
            <span className="truncate">Template</span>
          </Link>
        </div>
      </div>
      
      {/* System Status */}
      <div className="mt-auto p-3 border-t border-gray-700">
        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
          <span className="truncate">Online</span>
        </div>
      </div>
    </div>
  )
}
