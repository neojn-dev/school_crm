import { MetadataRoute } from 'next'
import { db } from '@/lib/db'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  // Get custom robots.txt from SEO settings
  const seoSettings = await db.cmsSeoSettings.findFirst({
    select: { robotsTxt: true }
  })

  // If custom robots.txt is set, parse it
  if (seoSettings?.robotsTxt) {
    // For now, return a default structure
    // In a more advanced implementation, you could parse the custom robots.txt
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      sitemap: `${baseUrl}/sitemap.xml`,
    }
  }

  // Default robots.txt
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
