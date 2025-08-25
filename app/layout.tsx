/**
 * ROOT LAYOUT - CMS-Driven Public Website Layout
 * 
 * This layout provides the structure for the CMS-driven public website.
 * It dynamically loads:
 * - Navigation structure from CMS
 * - Site settings (logo, branding, etc.)
 * - SEO configuration
 * - Footer content and social links
 * 
 * Used by: Public website pages (/, /about, /services, etc.)
 * Note: Auth and admin routes have their own layouts
 */

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { db } from "@/lib/db"
import { CmsWebsiteHeader } from "@/components/cms/cms-website-header"
import { WebsiteFooter } from "@/components/website-components"
import { SessionProviderWrapper } from "@/components/providers/session-provider"
import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: "NextJS Template App",
  description: "A production-ready NextJS template with authentication, data management, and modern UI",
  keywords: ["nextjs", "typescript", "prisma", "tailwind", "shadcn"],
  authors: [{ name: "Template App" }],
  creator: "Template App",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "http://localhost:3000",
    title: "NextJS Template App",
    description: "A production-ready NextJS template with authentication, data management, and modern UI",
    siteName: "NextJS Template App",
  },
  twitter: {
    card: "summary_large_image",
    title: "NextJS Template App",
    description: "A production-ready NextJS template with authentication, data management, and modern UI",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

async function getNavigationData() {
  try {
    // Get navigation items
    const navigationItems = await db.cmsNavigation.findMany({
      where: { isActive: true },
      include: {
        children: {
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' }
        },
        page: {
          select: { slug: true, title: true }
        }
      },
      orderBy: { sortOrder: 'asc' }
    })

    // Get site settings
    const siteSettings = await db.cmsSiteSettings.findFirst()
    
    // Get SEO settings for site name
    const seoSettings = await db.cmsSeoSettings.findFirst()

    // Transform navigation data
    const transformedNavigation = navigationItems
      .filter(item => !item.parentId) // Only top-level items
      .map(item => ({
        id: item.id,
        label: item.label,
        href: item.type === 'page' && item.page ? `/${item.page.slug}` : item.href,
        target: item.target || undefined,
        type: item.type,
        children: item.children?.map(child => ({
          id: child.id,
          label: child.label,
          href: child.type === 'page' && child.page ? `/${child.page.slug}` : child.href,
          target: child.target || undefined,
          type: child.type
        }))
      }))

    return {
      navigation: transformedNavigation,
      siteSettings,
      siteName: seoSettings?.siteName || 'Your Website'
    }
  } catch (error) {
    console.error('Error loading navigation data:', error)
    return {
      navigation: [],
      siteSettings: null,
      siteName: 'Your Website'
    }
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { navigation, siteSettings, siteName } = await getNavigationData()

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <SessionProviderWrapper>
          <div className="min-h-screen flex flex-col">
            <CmsWebsiteHeader 
              navigation={navigation}
              siteSettings={siteSettings || undefined}
              siteName={siteName}
            />
            <main className="flex-1 pt-16 lg:pt-20">
              {children}
            </main>
            <WebsiteFooter />
          </div>
        </SessionProviderWrapper>
      </body>
    </html>
  )
}
