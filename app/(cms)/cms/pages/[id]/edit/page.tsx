import { notFound, redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { PageEditClient } from "./page-edit-client"

interface PageEditProps {
  params: Promise<{ id: string }>
}

export default async function PageEditPage({ params }: PageEditProps) {
  const { id } = await params
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    redirect("/signin")
  }

  // Get the page data
  const page = await db.cmsPage.findUnique({
    where: { id },
    include: {
      template: { select: { id: true, name: true } },
      createdByUser: { select: { username: true, firstName: true } },
      updatedByUser: { select: { username: true, firstName: true } },
      blocks: {
        include: {
          block: { select: { id: true, name: true, type: true, component: true } }
        },
        orderBy: { sortOrder: 'asc' }
      }
    }
  })

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
    }
  }

  return (
    <PageEditClient 
      page={{
        ...page,
        parsedBlocks
      }}
    />
  )
}
