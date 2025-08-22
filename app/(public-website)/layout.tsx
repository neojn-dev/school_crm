/**
 * PUBLIC WEBSITE LAYOUT - Layout for Public Marketing Pages
 * 
 * This layout is used for public-facing marketing and informational pages.
 * It provides:
 * - Simple header with company branding
 * - Clean footer with copyright
 * - Minimal structure for content pages
 * 
 * Used by: /company/*, /services/*, /resources/*
 * Route Group: (public-website)
 * 
 * Note: Currently not used since we have a unified home page approach,
 * but kept for future public pages expansion.
 */

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">Our Platform</h1>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-gray-50 border-t">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          <p>&copy; 2024 Our Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export const metadata = {
  title: 'Our Platform - Public Website',
  description: 'Explore our company, services, and resources',
}
