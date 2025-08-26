import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { SeoSettingsClient } from "./seo-settings-client"

export default async function SeoSettingsPage() {
  const session = await getServerSession(authOptions)
  
  // Get SEO settings
  const seoSettings = await db.cmsSeoSettings.findFirst({
    include: {
      updatedByUser: { select: { username: true, firstName: true } }
    }
  })

  // Get published pages for sitemap preview
  const publishedPages = await db.cmsPage.findMany({
    where: { 
      isPublished: true,
      layout: 'public'
    },
    select: {
      id: true,
      title: true,
      slug: true,
      updatedAt: true,
      metaTitle: true,
      metaDescription: true
    },
    orderBy: { updatedAt: 'desc' }
  })

  return (
    <SeoSettingsClient 
      initialSettings={seoSettings}
      publishedPages={publishedPages}
    />
  )
}
