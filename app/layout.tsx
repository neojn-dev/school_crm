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
import { HierarchicalWebsiteHeader } from "@/components/cms/hierarchical-website-header-v2"
import { WebsiteFooter } from "@/components/website-components"
import { SessionProviderWrapper } from "@/components/providers/session-provider"
import { headers } from 'next/headers'
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
    // Get all navigation items (we'll build hierarchy manually)
    const navigationItems = await db.cmsNavigation.findMany({
      where: { isActive: true },
      include: {
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

    // Build hierarchical navigation structure (up to 4 levels)
    const buildHierarchy = (items: any[], parentId: string | null = null): any[] => {
      return items
        .filter(item => item.parentId === parentId)
        .map(item => ({
          id: item.id,
          label: item.label,
          href: item.type === 'page' && item.page ? `/${item.page.slug}` : item.href,
          target: item.target || undefined,
          type: item.type,
          isActive: item.isActive,
          children: buildHierarchy(items, item.id)
        }))
        .sort((a, b) => {
          const aItem = items.find(i => i.id === a.id)
          const bItem = items.find(i => i.id === b.id)
          return (aItem?.sortOrder || 0) - (bItem?.sortOrder || 0)
        })
    }

    const transformedNavigation = buildHierarchy(navigationItems)

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
  const headersList = await headers()
  const isCmsRoute = headersList.get('x-is-cms-route') === 'true'

  if (isCmsRoute) {
    // CMS routes get minimal layout
    return (
      <html lang="en">
        <body className={inter.className} suppressHydrationWarning>
          <SessionProviderWrapper>
            {children}
          </SessionProviderWrapper>
        </body>
      </html>
    )
  }

  // Regular website routes get full layout
  const { navigation, siteSettings, siteName } = await getNavigationData()

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <SessionProviderWrapper>
          <div className="min-h-screen flex flex-col">
            <HierarchicalWebsiteHeader 
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
