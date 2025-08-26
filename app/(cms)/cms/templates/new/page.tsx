import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { TemplateEditor } from "@/components/cms/template-editor"

export default async function NewTemplatePage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user) {
    redirect('/signin')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create New Template</h1>
        <p className="text-gray-600">Build a reusable page template with drag-and-drop blocks</p>
      </div>

      <TemplateEditor />
    </div>
  )
}
