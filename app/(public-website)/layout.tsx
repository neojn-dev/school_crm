/**
 * PUBLIC WEBSITE LAYOUT - Layout for Public Marketing Pages
 * 
 * This layout is used for public-facing marketing and informational pages.
 * It provides:
 * - Professional header with company branding and navigation
 * - Comprehensive footer with company info, links, and social media
 * - Rich structure for content pages
 * 
 * Used by: /company/*, /services/*, /resources/*
 * Route Group: (public-website)
 */

import { WebsiteHeader, WebsiteFooter } from "@/components/website-components"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <WebsiteHeader />
      <main className="flex-1 pt-16 lg:pt-20">
        {children}
      </main>
      <WebsiteFooter />
    </div>
  )
}

export const metadata = {
  title: 'CompanyName - Public Website',
  description: 'Explore our company, services, and resources',
}
