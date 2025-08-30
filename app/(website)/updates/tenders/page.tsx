export default async function TendersPage() {
  const res = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/tenders`, { cache: 'no-store' })
  const items = await res.json()
  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-6">Tenders</h1>
      <div className="space-y-4">
        {items.map((t: any) => (
          <div key={t.id} className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="font-semibold text-gray-900">{t.title}</div>
            <div className="text-sm text-gray-600 mt-1">Ref: {t.referenceNo || '—'}</div>
          </div>
        ))}
      </div>
    </div>
  )
}


