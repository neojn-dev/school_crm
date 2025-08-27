import Link from "next/link"
import { db } from "@/lib/db"

export default async function AnnouncementsAdminListPage() {
  const items = await db.announcement.findMany({ orderBy: { createdAt: 'desc' } })
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Announcements</h1>
          <p className="text-gray-600">Create and manage announcements.</p>
        </div>
        <Link href="/cms/announcements/new" className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:shadow-md">New Announcement</Link>
      </div>
      <div className="space-y-3">
        {items.map(a => (
          <div key={a.id} className="rounded-xl border bg-white p-5 flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-900">{a.title}</div>
              <div className="text-sm text-gray-600">{a.isActive ? 'Active' : 'Inactive'} • {new Date(a.createdAt).toLocaleString()}</div>
            </div>
            <Link href={`/cms/announcements/${a.id}/edit`} className="text-blue-600 hover:underline">Edit</Link>
          </div>
        ))}
      </div>
    </div>
  )
}


