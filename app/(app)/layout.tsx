"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  Menu, 
  X, 
  Home, 
  Users, 
  Database, 
  Shield, 
  UserCheck,
  Settings,
  LogOut
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { signOut } from "next-auth/react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

const sidebarItems = [
  {
    title: "Role 1",
    href: "/app/role1",
    icon: Shield,
    allowedRoles: ["ROLE1"]
  },
  {
    title: "Role 2", 
    href: "/app/role2",
    icon: Users,
    allowedRoles: ["ROLE2"]
  },
  {
    title: "Role 3",
    href: "/app/role3", 
    icon: Database,
    allowedRoles: ["ROLE3"]
  },
  {
    title: "All Roles",
    href: "/app/all-roles",
    icon: UserCheck,
    allowedRoles: ["ROLE1", "ROLE2", "ROLE3"]
  },
  {
    title: "My Data",
    href: "/app/mydata",
    icon: Settings,
    allowedRoles: ["ROLE1", "ROLE2", "ROLE3"]
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
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (status === "unauthenticated") {
    router.push("/auth/signin")
    return null
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" })
  }

  const filteredSidebarItems = sidebarItems.filter(item => 
    item.allowedRoles.includes(session?.user.role as string)
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div 
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg"
            >
              <SidebarContent 
                items={filteredSidebarItems}
                session={session}
                pathname={pathname}
                onSignOut={handleSignOut}
                onItemClick={() => setSidebarOpen(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
          <SidebarContent 
            items={filteredSidebarItems}
            session={session}
            pathname={pathname}
            onSignOut={handleSignOut}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top header */}
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200">
          <button
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex-1 px-4 flex justify-between items-center">
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-gray-900">
                Dashboard
              </h1>
            </div>
            
            <div className="ml-4 flex items-center md:ml-6">
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">
                    {session?.user.username}
                  </p>
                  <p className="text-xs text-gray-500">
                    {session?.user.role}
                  </p>
                </div>
                <Avatar>
                  <AvatarFallback className="bg-primary text-white">
                    {session?.user.username?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function SidebarContent({ 
  items, 
  session, 
  pathname, 
  onSignOut, 
  onItemClick 
}: {
  items: typeof sidebarItems
  session: any
  pathname: string
  onSignOut: () => void
  onItemClick?: () => void
}) {
  return (
    <>
      <div className="flex items-center h-16 flex-shrink-0 px-4 bg-primary">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-primary font-bold text-sm">NT</span>
          </div>
          <span className="font-bold text-xl text-white">Template</span>
        </Link>
      </div>
      
      <div className="flex-1 flex flex-col overflow-y-auto">
        <nav className="flex-1 px-2 py-4 bg-white space-y-1">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onItemClick}
                className={cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Icon
                  className={cn(
                    "mr-3 flex-shrink-0 h-5 w-5",
                    isActive
                      ? "text-white"
                      : "text-gray-400 group-hover:text-gray-500"
                  )}
                />
                {item.title}
              </Link>
            )
          })}
        </nav>
        
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <div className="flex-shrink-0 w-full group block">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-white text-xs">
                    {session?.user.username?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-700 group-hover:text-gray-900">
                    {session?.user.username}
                  </p>
                  <p className="text-xs text-gray-500">
                    {session?.user.role}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onSignOut}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
