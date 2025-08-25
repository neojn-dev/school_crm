import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { CmsPageRenderer } from "@/components/cms/cms-page-renderer"
import type { Metadata } from "next"

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  // Get site settings to find homepage
  const siteSettings = await db.cmsSiteSettings.findFirst({
    include: {
      homepage: {
        select: {
          title: true,
          description: true,
          metaTitle: true,
          metaDescription: true,
          metaKeywords: true,
          ogTitle: true,
          ogDescription: true,
          ogImage: true
        }
      }
    }
  })

  // Get SEO settings for defaults
  const seoSettings = await db.cmsSeoSettings.findFirst()

  const page = siteSettings?.homepage
  const siteName = seoSettings?.siteName || 'Your Website'
  const siteDescription = seoSettings?.siteDescription || 'Welcome to our website'

  if (!page) {
    return {
      title: siteName,
      description: siteDescription
    }
  }

  return {
    title: page.metaTitle || page.title || siteName,
    description: page.metaDescription || page.description || siteDescription,
    keywords: page.metaKeywords || '',
    openGraph: {
      title: page.ogTitle || page.metaTitle || page.title || siteName,
      description: page.ogDescription || page.metaDescription || page.description || siteDescription,
      images: page.ogImage ? [{ url: page.ogImage }] : []
    }
  }
}

export default async function HomePage() {
  // Get site settings to find which page is the homepage
  const siteSettings = await db.cmsSiteSettings.findFirst({
    include: {
      homepage: {
        include: {
          template: { select: { id: true, name: true, structure: true } },
          blocks: {
            include: {
              block: { 
                select: { 
                  id: true, 
                  name: true, 
                  type: true, 
                  component: true,
                  defaultContent: true
                } 
              }
            },
            orderBy: { sortOrder: 'asc' }
          }
        }
      }
    }
  })

  // If no homepage is set, show default content
  if (!siteSettings?.homepage) {
    return (
      <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="text-center max-w-2xl mx-auto p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to Your CMS-Powered Website
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your website is ready! Set up your homepage in the CMS admin panel to get started.
          </p>
          <div className="space-y-4">
            <p className="text-gray-500">
              To set up your homepage:
            </p>
            <ol className="text-left text-gray-600 space-y-2">
              <li>1. Create a page in the CMS admin panel</li>
              <li>2. Go to Site Settings and select it as your homepage</li>
              <li>3. Your custom homepage will appear here</li>
            </ol>
          </div>
        </div>
      </div>
    )
  }

  const page = siteSettings.homepage

  // Check if page is published
  if (!page.isPublished) {
    return (
      <div className="flex items-center justify-center bg-gray-50 py-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Homepage Not Published
          </h1>
          <p className="text-gray-600">
            The homepage is set but not yet published. Please publish it in the CMS admin panel.
          </p>
        </div>
      </div>
    )
  }

  // Parse the content JSON
  let parsedBlocks = []
  if (page.content) {
    try {
      parsedBlocks = JSON.parse(page.content)
    } catch (error) {
      console.error('Error parsing homepage content:', error)
      parsedBlocks = []
    }
  }

  return (
    <CmsPageRenderer 
      page={{
        ...page,
        parsedBlocks
      }}
      isPreview={false}
    />
  )
}
