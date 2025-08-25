import { 
  BarChart3,
  Users, 
  Stethoscope,
  Wrench,
  Scale,
  Layers,
  UserCog,
  Shield
} from "lucide-react"
import { LucideIcon } from "lucide-react"

export interface NavigationItem {
  title: string
  href: string
  icon: LucideIcon
  description: string
  color?: string
  activeColor?: string
  iconBg?: string
  activeIconBg?: string
  textColor?: string
  hoverBg?: string
}

export const navigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
    description: "Overview and analytics",
    color: "from-blue-100 to-blue-200",
    activeColor: "from-blue-200 to-blue-300",
    iconBg: "bg-blue-50",
    activeIconBg: "bg-blue-100",
    textColor: "text-blue-700",
    hoverBg: "hover:bg-blue-50/80"
  },
  {
    title: "Teachers",
    href: "/teachers",
    icon: Users,
    description: "Manage teacher records",
    color: "from-emerald-100 to-emerald-200",
    activeColor: "from-emerald-200 to-emerald-300",
    iconBg: "bg-emerald-50",
    activeIconBg: "bg-emerald-100",
    textColor: "text-emerald-700",
    hoverBg: "hover:bg-emerald-50/80"
  },
  {
    title: "Doctors",
    href: "/doctors",
    icon: Stethoscope,
    description: "Manage doctor records",
    color: "from-rose-100 to-rose-200",
    activeColor: "from-rose-200 to-rose-300",
    iconBg: "bg-rose-50",
    activeIconBg: "bg-rose-100",
    textColor: "text-rose-700",
    hoverBg: "hover:bg-rose-50/80"
  },
  {
    title: "Engineers",
    href: "/engineers",
    icon: Wrench,
    description: "Manage engineer records",
    color: "from-amber-100 to-amber-200",
    activeColor: "from-amber-200 to-amber-300",
    iconBg: "bg-amber-50",
    activeIconBg: "bg-amber-100",
    textColor: "text-amber-700",
    hoverBg: "hover:bg-amber-50/80"
  },
  {
    title: "Lawyers",
    href: "/lawyers",
    icon: Scale,
    description: "Manage lawyer records",
    color: "from-purple-100 to-purple-200",
    activeColor: "from-purple-200 to-purple-300",
    iconBg: "bg-purple-50",
    activeIconBg: "bg-purple-100",
    textColor: "text-purple-700",
    hoverBg: "hover:bg-purple-50/80"
  },
  {
    title: "Master Data",
    href: "/master-data",
    icon: Layers,
    description: "Comprehensive form data management",
    color: "from-slate-100 to-slate-200",
    activeColor: "from-slate-200 to-slate-300",
    iconBg: "bg-slate-50",
    activeIconBg: "bg-slate-100",
    textColor: "text-slate-700",
    hoverBg: "hover:bg-slate-50/80"
  },
  {
    title: "Users",
    href: "/users",
    icon: UserCog,
    description: "Manage system users",
    color: "from-cyan-100 to-cyan-200",
    activeColor: "from-cyan-200 to-cyan-300",
    iconBg: "bg-cyan-50",
    activeIconBg: "bg-cyan-100",
    textColor: "text-cyan-700",
    hoverBg: "hover:bg-cyan-50/80"
  },
  {
    title: "Roles",
    href: "/roles",
    icon: Shield,
    description: "Manage user roles and permissions",
    color: "from-orange-100 to-orange-200",
    activeColor: "from-orange-200 to-orange-300",
    iconBg: "bg-orange-50",
    activeIconBg: "bg-orange-100",
    textColor: "text-orange-700",
    hoverBg: "hover:bg-orange-50/80"
  }
]

/**
 * Filter navigation items based on user role
 * @param userRole - The current user's role
 * @returns Filtered navigation items
 */
export function getFilteredNavigationItems(userRole?: string): NavigationItem[] {
  return navigationItems.filter(item => {
    // Only show Users and Roles to Admin users
    if (item.href === '/users' || item.href === '/roles') {
      return userRole === 'Admin'
    }
    // Show all other items to everyone
    return true
  })
}
