import { MetadataRoute } from 'next'
import { db } from '@/lib/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  // Get all published pages
  const publishedPages = await db.cmsPage.findMany({
    where: {
      isPublished: true,
      layout: 'public'
    },
    select: {
      slug: true,
      updatedAt: true
    }
  })

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    }
  ]

  // Dynamic CMS pages
  const dynamicRoutes: MetadataRoute.Sitemap = publishedPages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: new Date(page.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...dynamicRoutes]
}