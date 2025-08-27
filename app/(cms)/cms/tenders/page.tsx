import Link from "next/link"
import { db } from "@/lib/db"

export default async function TendersAdminListPage() {
  const items = await db.tender.findMany({ orderBy: { createdAt: 'desc' } })
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tenders</h1>
          <p className="text-gray-600">Manage tenders and attachments.</p>
        </div>
        <Link href="/cms/tenders/new" className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:shadow-md">New Tender</Link>
      </div>
      <div className="space-y-3">
        {items.map(t => (
          <div key={t.id} className="rounded-xl border bg-white p-5 flex items-center justify-between">
            <div>
              <div className="font-semibold text-gray-900">{t.title}</div>
              <div className="text-sm text-gray-600">Ref: {t.referenceNo || '—'}</div>
            </div>
            <Link href={`/cms/tenders/${t.id}/edit`} className="text-blue-600 hover:underline">Edit</Link>
          </div>
        ))}
      </div>
    </div>
  )
}


