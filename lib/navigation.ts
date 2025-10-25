import { 
  LayoutDashboard, 
  Users, 
  UserCheck
} from "lucide-react"

export interface NavigationItem {
  title: string
  href: string
  icon: any
  description: string
  roles?: string[]
}

export const navigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    description: "Analytics and overview",
    roles: ["admin", "teacher", "staff"]
  },
  {
    title: "Users",
    href: "/users",
    icon: Users,
    description: "Manage system users",
    roles: ["admin"]
  },
  {
    title: "Roles",
    href: "/roles",
    icon: UserCheck,
    description: "Manage user roles",
    roles: ["admin"]
  }
]

export function getFilteredNavigationItems(userRole?: string): NavigationItem[] {
  if (!userRole) {
    return navigationItems.filter(item => !item.roles || item.roles.length === 0)
  }
  
  return navigationItems.filter(item => 
    !item.roles || 
    item.roles.length === 0 || 
    item.roles.includes(userRole)
  )
}
