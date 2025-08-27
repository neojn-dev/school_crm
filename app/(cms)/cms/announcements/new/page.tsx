"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewAnnouncementPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [saving, setSaving] = useState(false)

  const save = async () => {
    setSaving(true)
    const res = await fetch('/api/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, isActive: true })
    })
    if (res.ok) router.push('/cms/announcements')
    setSaving(false)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">New Announcement</h1>
      <div className="grid gap-4 max-w-3xl">
        <input className="border rounded-lg p-3" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea className="border rounded-lg p-3 h-64" placeholder="Body" value={body} onChange={e => setBody(e.target.value)} />
        <div className="flex gap-3">
          <button onClick={save} disabled={saving} className="px-5 py-2 rounded-xl bg-blue-600 text-white disabled:opacity-50">Save</button>
          <button onClick={() => router.push('/cms/announcements')} className="px-5 py-2 rounded-xl border">Cancel</button>
        </div>
      </div>
    </div>
  )
}


