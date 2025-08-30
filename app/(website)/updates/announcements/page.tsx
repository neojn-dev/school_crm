export default async function AnnouncementsPage() {
  const res = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/announcements`, { cache: 'no-store' })
  const items = await res.json()
  return (
    <div className="container-custom py-12">
      <h1 className="text-3xl font-bold mb-6">Announcements</h1>
      <div className="space-y-4">
        {items.map((a: any) => (
          <div key={a.id} className="rounded-xl border bg-white p-6 shadow-sm">
            <div className="font-semibold text-gray-900">{a.title}</div>
            <div className="text-sm text-gray-600 mt-1">{a.body?.slice(0, 140)}...</div>
          </div>
        ))}
      </div>
    </div>
  )
}


