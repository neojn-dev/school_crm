import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import Link from "next/link"

export default async function PagesManagement() {
  const session = await getServerSession(authOptions)
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pages</h1>
          <p className="text-gray-600">General pages are now code-driven. Use Blogs, Announcements, and Tenders for CMS content.</p>
        </div>
        <Link href="/cms" className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:shadow-md">Back to CMS</Link>
      </div>
    </div>
  )
}
