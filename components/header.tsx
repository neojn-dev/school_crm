"use client"

import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings, 
  ChevronDown,
  Info,
  Target,
  Users,
  Award,
  Lightbulb,
  Zap,
  Building2,
  BarChart3,
  FileText,
  TrendingUp,
  Calendar,
  HelpCircle
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Navigation groups for public pages
const navigationGroups = [
  {
    title: "Company",
    items: [
      { title: "About Us", href: "/company/about", icon: Info },
      { title: "Our Mission", href: "/company/mission", icon: Target },
      { title: "Leadership", href: "/company/leadership", icon: Users },
      { title: "Careers", href: "/company/careers", icon: Award }
    ]
  },
  {
    title: "Services",
    items: [
      { title: "What We Do", href: "/services/overview", icon: Lightbulb },
      { title: "Solutions", href: "/services/solutions", icon: Zap },
      { title: "Industries", href: "/services/industries", icon: Building2 },
      { title: "Case Studies", href: "/services/case-studies", icon: BarChart3 }
    ]
  },
  {
    title: "Resources",
    items: [
      { title: "Blog", href: "/resources/blog", icon: FileText },
      { title: "News", href: "/resources/news", icon: TrendingUp },
      { title: "Events", href: "/resources/events", icon: Calendar },
      { title: "Support", href: "/resources/support", icon: HelpCircle }
    ]
  }
]

export function Header() {
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" })
  }

  const handleDropdownToggle = (groupTitle: string) => {
    setActiveDropdown(activeDropdown === groupTitle ? null : groupTitle)
  }

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">NT</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Template</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
            
            {/* Multi-layered Navigation Groups */}
            {navigationGroups.map((group) => (
              <div key={group.title} className="relative">
                <Button
                  variant="ghost"
                  className="text-gray-600 hover:text-gray-900 transition-colors p-0 h-auto font-normal"
                  onClick={() => handleDropdownToggle(group.title)}
                  onMouseEnter={() => setActiveDropdown(group.title)}
                >
                  {group.title}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
                
                <AnimatePresence>
                  {activeDropdown === group.title && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50"
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      {group.items.map((item) => {
                        const Icon = item.icon
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <Icon className="mr-3 h-4 w-4" />
                            {item.title}
                          </Link>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-white">
                        {session.user.username?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {session.user.username}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user.email}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        Role: {session.user.role}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/app/all-roles" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/app/mydata" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>My Data</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-600 focus:text-red-600"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Button variant="ghost" asChild>
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 py-4"
            >
              <nav className="flex flex-col space-y-4">
                <Link 
                  href="/" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                
                {/* Mobile Navigation Groups */}
                {navigationGroups.map((group) => (
                  <div key={group.title} className="space-y-2">
                    <div className="text-sm font-medium text-gray-900 border-b border-gray-200 pb-2">
                      {group.title}
                    </div>
                    {group.items.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors ml-4"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Icon className="mr-2 h-4 w-4" />
                          {item.title}
                        </Link>
                      )
                    })}
                  </div>
                ))}
                
                {!session && (
                  <>
                    <Link 
                      href="/auth/signin" 
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link 
                      href="/auth/signup" 
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
