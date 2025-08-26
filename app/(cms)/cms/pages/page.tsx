import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { PagesClient } from "./pages-client"

export default async function PagesManagement() {
  const session = await getServerSession(authOptions)
  
  // Get all pages with related data
  const pages = await db.cmsPage.findMany({
    include: {
      template: { select: { name: true } },
      createdByUser: { select: { username: true, firstName: true } },
      updatedByUser: { select: { username: true, firstName: true } },
      _count: { select: { blocks: true } }
    },
    orderBy: { updatedAt: 'desc' }
  })

  return <PagesClient initialPages={pages} />
}
