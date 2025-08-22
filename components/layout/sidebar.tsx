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
  User,
  Sparkles,
  Rocket,
  Star
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface SidebarProps {
  isCollapsed?: boolean
  onToggle?: () => void
}

const navigationGroups = [
  {
    title: "Dashboard",
    items: [
      { title: "Overview", href: "/pages/all-roles", icon: BarChart3, badge: "New" },
      { title: "My Data", href: "/pages/mydata", icon: Database },
      { title: "Profile", href: "/pages/profile", icon: User },
      { title: "Settings", href: "/pages/settings", icon: Settings }
    ]
  },
  {
    title: "Management",
    items: [
      { title: "Users", href: "/pages/users", icon: Users, badge: "Hot" },
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

const containerVariants = {
  expanded: { width: "16rem" },
  collapsed: { width: "4rem" }
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
}

export function Sidebar({ isCollapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["Dashboard"])
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const toggleGroup = (groupTitle: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupTitle) 
        ? prev.filter(title => title !== groupTitle)
        : [...prev, groupTitle]
    )
  }

  return (
    <motion.div
      variants={containerVariants}
      animate={isCollapsed ? "collapsed" : "expanded"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="flex h-full border-r border-gray-200/50 bg-gradient-to-b from-white to-gray-50/30 backdrop-blur-sm"
    >
      <div className="flex w-full flex-col gap-2">
        {/* Header */}
        <div className="flex h-16 items-center border-b border-gray-200/50 px-3">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3 px-2"
            >
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div className="absolute -inset-1 bg-gradient-primary rounded-xl opacity-20 blur"></div>
              </div>
              <span className="font-bold text-gray-900">Navigation</span>
            </motion.div>
          )}
          {onToggle && (
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="ml-auto h-8 w-8 p-0 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={onToggle}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4 text-gray-600" />
              ) : (
                <ChevronLeft className="h-4 w-4 text-gray-600" />
              )}
            </motion.button>
          )}
        </div>

        {/* Navigation */}
        <div className="flex-1 px-2 overflow-y-auto scrollbar-thin">
          <div className="space-y-2 py-2">
            {/* Home */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Link href="/pages/all-roles">
                <Button
                  variant={pathname === "/pages/all-roles" ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-11 rounded-xl transition-all duration-200 group relative overflow-hidden",
                    isCollapsed && "justify-center px-2"
                  )}
                  onMouseEnter={() => setHoveredItem("home")}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {hoveredItem === "home" && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <Home className="h-5 w-5 transition-transform group-hover:scale-110" />
                  {!isCollapsed && (
                    <span className="font-medium">Home</span>
                  )}
                </Button>
              </Link>
            </motion.div>

            {/* Navigation Groups */}
            {navigationGroups.map((group, groupIndex) => (
              <motion.div
                key={group.title}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                transition={{ duration: 0.3, delay: 0.1 + groupIndex * 0.1 }}
                className="space-y-1"
              >
                {!isCollapsed && (
                  <motion.button
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full justify-between h-8 px-3 text-xs font-semibold text-gray-500 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-100/50"
                    onClick={() => toggleGroup(group.title)}
                  >
                    <span>{group.title}</span>
                    <motion.div
                      animate={{ rotate: expandedGroups.includes(group.title) ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight className="h-3 w-3" />
                    </motion.div>
                  </motion.button>
                )}
                
                <AnimatePresence>
                  {(expandedGroups.includes(group.title) || isCollapsed) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className={cn(
                        "space-y-1 overflow-hidden",
                        !isCollapsed && "ml-4"
                      )}
                    >
                      {group.items.map((item, itemIndex) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href
                        return (
                          <motion.div
                            key={item.href}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: itemIndex * 0.05 }}
                          >
                            <Link href={item.href}>
                              <Button
                                variant={isActive ? "secondary" : "ghost"}
                                className={cn(
                                  "w-full justify-start gap-3 h-10 rounded-xl transition-all duration-200 group relative overflow-hidden",
                                  isCollapsed && "justify-center px-2"
                                )}
                                onMouseEnter={() => setHoveredItem(item.href)}
                                onMouseLeave={() => setHoveredItem(null)}
                                title={isCollapsed ? item.title : undefined}
                              >
                                {hoveredItem === item.href && !isActive && (
                                  <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                  />
                                )}
                                <div className="relative">
                                  <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                                  {item.badge && !isCollapsed && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
                                    />
                                  )}
                                </div>
                                {!isCollapsed && (
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium text-sm">{item.title}</span>
                                    {item.badge && (
                                      <span className="px-2 py-0.5 bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 text-xs font-medium rounded-full">
                                        {item.badge}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </Button>
                            </Link>
                          </motion.div>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {/* Quick Actions */}
            {!isCollapsed && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="pt-4 border-t border-gray-200/50"
              >
                <div className="px-3 py-2">
                  <h3 className="text-xs font-semibold text-gray-500 mb-2">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start gap-2 h-8 text-xs rounded-lg hover:bg-blue-50 hover:text-blue-700"
                    >
                      <Rocket className="h-3 w-3" />
                      <span>New Project</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start gap-2 h-8 text-xs rounded-lg hover:bg-green-50 hover:text-green-700"
                    >
                      <Star className="h-3 w-3" />
                      <span>Favorites</span>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Contact Info */}
            {!isCollapsed && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                transition={{ duration: 0.3, delay: 0.6 }}
                className="pt-4 border-t border-gray-200/50 mt-auto"
              >
                <div className="px-3 py-2">
                  <h3 className="text-xs font-semibold text-gray-500 mb-3">Need Help?</h3>
                  <div className="space-y-2 text-xs text-gray-500">
                    <div className="flex items-center gap-2 hover:text-blue-600 transition-colors cursor-pointer">
                      <Mail className="h-3 w-3" />
                      <span>support@company.com</span>
                    </div>
                    <div className="flex items-center gap-2 hover:text-blue-600 transition-colors cursor-pointer">
                      <Phone className="h-3 w-3" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-2 hover:text-blue-600 transition-colors cursor-pointer">
                      <HelpCircle className="h-3 w-3" />
                      <span>Documentation</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
