/**
 * ROOT LAYOUT - Minimal Layout for Public Pages
 * 
 * This layout provides minimal structure for public pages only.
 * Authenticated routes have their own layouts and don't inherit this.
 * 
 * Used by: Public pages (/, /signin, /signup, etc.)
 * Note: Auth and authenticated routes have their own layouts
 */

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { SessionProviderWrapper } from "@/components/providers/session-provider"
import { headers } from 'next/headers'
import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: "School CRM - Modern School Management",
  description: "Streamline your school operations with our comprehensive CRM system. Manage students, staff, academics, and analytics all in one place.",
  keywords: ["school", "crm", "education", "management", "students", "teachers"],
  authors: [{ name: "School CRM" }],
  creator: "School CRM",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "http://localhost:3000",
    title: "School CRM - Modern School Management",
    description: "Streamline your school operations with our comprehensive CRM system.",
    siteName: "School CRM",
  },
  twitter: {
    card: "summary_large_image",
    title: "School CRM - Modern School Management",
    description: "Streamline your school operations with our comprehensive CRM system.",
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
  // Always provide minimal layout for all routes
  // Individual route groups will handle their own layouts
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
