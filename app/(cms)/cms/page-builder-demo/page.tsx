"use client"

import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import Link from "next/link"

export default function PageBuilderDemo() {
  // Redirect to the main CMS pages since DragDropPageBuilder is now the main page builder
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <Eye className="h-10 w-10 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Page Builder Moved
        </h1>
        <p className="text-gray-600 mb-8">
          The drag-and-drop page builder is now integrated into the main CMS pages. 
          You can access it when creating or editing pages.
        </p>
        <div className="space-y-3">
          <Link href="/cms/pages">
            <Button className="w-full">
              Go to CMS Pages
            </Button>
          </Link>
          <Link href="/cms/pages/new">
            <Button variant="outline" className="w-full">
              Create New Page
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
