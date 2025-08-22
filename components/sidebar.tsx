"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  ChevronLeft, 
  ChevronRight,
  Home, 
  Users, 
  Building2, 
  FileText, 
  Settings, 
  BarChart3,
  Mail,
  Phone,
  MapPin,
  Calendar,
  HelpCircle,
  Info,
  Lightbulb,
  Target,
  Award,
  Zap,
  TrendingUp,
  Database,
  Shield,
  User
} from "lucide-react"

interface SidebarProps {
  isCollapsed?: boolean
  onToggle?: () => void
}

const navigationGroups = [
  {
    title: "Dashboard",
    items: [
      { title: "Overview", href: "/pages/all-roles", icon: BarChart3 },
      { title: "My Data", href: "/pages/mydata", icon: Database },
      { title: "Profile", href: "/pages/profile", icon: User },
      { title: "Settings", href: "/pages/settings", icon: Settings }
    ]
  },
  {
    title: "Management",
    items: [
      { title: "Users", href: "/pages/users", icon: Users },
      { title: "Roles", href: "/pages/roles", icon: Shield },
      { title: "Permissions", href: "/pages/permissions", icon: Award },
      { title: "Audit Logs", href: "/pages/audit", icon: FileText }
    ]
  },
  {
    title: "Tools",
    items: [
      { title: "Analytics", href: "/pages/analytics", icon: TrendingUp },
      { title: "Reports", href: "/pages/reports", icon: FileText },
      { title: "Import/Export", href: "/pages/mydata/import", icon: Database },
      { title: "Support", href: "/pages/support", icon: HelpCircle }
    ]
  }
]

export function Sidebar({ isCollapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["Dashboard"])

  const toggleGroup = (groupTitle: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupTitle) 
        ? prev.filter(title => title !== groupTitle)
        : [...prev, groupTitle]
    )
  }

  return (
    <div className={cn(
      "flex h-full border-r bg-gray-50/40 transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex w-full flex-col gap-2">
        {/* Header */}
        <div className="flex h-14 items-center border-b px-2">
          {!isCollapsed && (
            <div className="flex items-center gap-2 px-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">NT</span>
              </div>
              <span className="font-semibold">Dashboard</span>
            </div>
          )}
          {onToggle && (
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto h-8 w-8 p-0"
              onClick={onToggle}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 px-2 overflow-y-auto">
          <div className="space-y-2 py-2">
            {/* Home */}
            <Link href="/pages/all-roles">
              <Button
                variant={pathname === "/pages/all-roles" ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  isCollapsed && "justify-center px-2"
                )}
              >
                <Home className="h-4 w-4" />
                {!isCollapsed && <span>Home</span>}
              </Button>
            </Link>

            {/* Navigation Groups */}
            {navigationGroups.map((group) => (
              <div key={group.title} className="space-y-1">
                {!isCollapsed && (
                  <Button
                    variant="ghost"
                    className="w-full justify-between h-8 px-2 text-xs font-medium text-gray-500 hover:text-gray-700"
                    onClick={() => toggleGroup(group.title)}
                  >
                    <span>{group.title}</span>
                    <ChevronRight className={cn(
                      "h-3 w-3 transition-transform",
                      expandedGroups.includes(group.title) && "rotate-90"
                    )} />
                  </Button>
                )}
                
                {(expandedGroups.includes(group.title) || isCollapsed) && (
                  <div className={cn(
                    "space-y-1",
                    !isCollapsed && "ml-4"
                  )}>
                    {group.items.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link key={item.href} href={item.href}>
                          <Button
                            variant={pathname === item.href ? "secondary" : "ghost"}
                            className={cn(
                              "w-full justify-start gap-2 h-8",
                              isCollapsed && "justify-center px-2"
                            )}
                            title={isCollapsed ? item.title : undefined}
                          >
                            <Icon className="h-4 w-4" />
                            {!isCollapsed && <span className="text-sm">{item.title}</span>}
                          </Button>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}

            {/* Contact Info */}
            {!isCollapsed && (
              <div className="pt-4 border-t mt-4">
                <div className="px-2 py-2 text-xs text-gray-500">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="h-3 w-3" />
                    <span>support@company.com</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="h-3 w-3" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HelpCircle className="h-3 w-3" />
                    <span>Need help?</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
