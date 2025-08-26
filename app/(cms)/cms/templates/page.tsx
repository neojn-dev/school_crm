import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { TemplatesClient } from "./templates-client"

export default async function TemplatesManagement() {
  const session = await getServerSession(authOptions)
  
  // Get all templates with related data
  const templates = await db.cmsTemplate.findMany({
    include: {
      createdByUser: { select: { username: true, firstName: true } },
      updatedByUser: { select: { username: true, firstName: true } },
      _count: { select: { pages: true } }
    },
    orderBy: { updatedAt: 'desc' }
  })

  return <TemplatesClient templates={templates} />
}
