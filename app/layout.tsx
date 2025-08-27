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
import { WebsiteHeader, WebsiteFooter } from "@/components/website-components"
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

  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <SessionProviderWrapper>
          <div className="min-h-screen flex flex-col">
            <WebsiteHeader />
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
