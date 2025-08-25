/**
 * ADMIN ROUTE GROUP LAYOUT
 * 
 * This layout provides the base structure for admin routes without inheriting
 * from the authenticated app layout. This prevents double sidebars and gives
 * the admin panel its own independent UI structure.
 */

import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export default async function AdminRouteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if user is authenticated
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    redirect("/signin")
  }

  // Check if user has admin role/permissions
  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: { role: true }
  })

  // For now, we'll check if the user has any role (later we can make this more specific)
  // In a real app, you'd check for specific admin permissions
  if (!user || !user.role) {
    redirect("/dashboard")
  }

  // Return children without any additional layout wrapper
  // The admin layout will be handled by the admin/layout.tsx
  return <>{children}</>
}

export const metadata = {
  title: 'Admin Panel - CMS Management',
  description: 'Administrative interface for content management',
}
