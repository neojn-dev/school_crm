import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { CmsPageRenderer } from "@/components/cms/cms-page-renderer"
import type { Metadata } from "next"

// Generate metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams.slug.join('/')
  
  // Get the page from database
  const page = await db.cmsPage.findFirst({
    where: { 
      slug,
      isPublished: true 
    },
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
  })

  // Get SEO settings for defaults
  const seoSettings = await db.cmsSeoSettings.findFirst()
  const siteName = seoSettings?.siteName || 'Your Website'

  if (!page) {
    return {
      title: `Page Not Found - ${siteName}`,
      description: 'The requested page could not be found.'
    }
  }

  return {
    title: page.metaTitle || page.title || siteName,
    description: page.metaDescription || page.description || 'Page description',
    keywords: page.metaKeywords || '',
    openGraph: {
      title: page.ogTitle || page.metaTitle || page.title || siteName,
      description: page.ogDescription || page.metaDescription || page.description || 'Page description',
      images: page.ogImage ? [{ url: page.ogImage }] : []
    }
  }
}

export default async function DynamicPage({ 
  params 
}: { 
  params: Promise<{ slug: string[] }>
}) {
  const resolvedParams = await params
  const slug = resolvedParams.slug.join('/')
  
  // Get the page from database
  const page = await db.cmsPage.findFirst({
    where: { 
      slug,
      isPublished: true 
    },
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
  })

  // If page not found, return 404
  if (!page) {
    notFound()
  }

  // Parse the content JSON
  let parsedBlocks = []
  if (page.content) {
    try {
      parsedBlocks = JSON.parse(page.content)
    } catch (error) {
      console.error('Error parsing page content:', error)
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

// Generate static params for all published pages
export async function generateStaticParams() {
  try {
    const pages = await db.cmsPage.findMany({
      where: { isPublished: true },
      select: { slug: true }
    })

    return pages.map((page) => ({
      slug: page.slug.split('/')
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}
