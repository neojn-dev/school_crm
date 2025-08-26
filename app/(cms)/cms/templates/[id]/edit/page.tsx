import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { db } from "@/lib/db"
import { TemplateEditor } from "@/components/cms/template-editor"

interface EditTemplatePageProps {
  params: { id: string }
}

export default async function EditTemplatePage({ params }: EditTemplatePageProps) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/signin')
  }

  // Get template data
  const template = await db.cmsTemplate.findUnique({
    where: { id: params.id },
    include: {
      createdByUser: { select: { username: true, firstName: true } },
      updatedByUser: { select: { username: true, firstName: true } }
    }
  })

  if (!template) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Edit Template: {template.name}</h1>
        <p className="text-gray-600">Modify your page template structure and blocks</p>
      </div>

      <TemplateEditor template={template} />
    </div>
  )
}
