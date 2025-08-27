"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function NewBlogPostPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")
  const [saving, setSaving] = useState(false)

  const save = async () => {
    setSaving(true)
    const res = await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, excerpt, content, status: 'draft' })
    })
    if (res.ok) router.push('/cms/blogs')
    setSaving(false)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">New Blog Post</h1>
      <div className="grid gap-4 max-w-3xl">
        <input className="border rounded-lg p-3" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input className="border rounded-lg p-3" placeholder="Excerpt" value={excerpt} onChange={e => setExcerpt(e.target.value)} />
        <textarea className="border rounded-lg p-3 h-64" placeholder="Content (Markdown or HTML)" value={content} onChange={e => setContent(e.target.value)} />
        <div className="flex gap-3">
          <button onClick={save} disabled={saving} className="px-5 py-2 rounded-xl bg-blue-600 text-white disabled:opacity-50">Save Draft</button>
          <button onClick={() => router.push('/cms/blogs')} className="px-5 py-2 rounded-xl border">Cancel</button>
        </div>
      </div>
    </div>
  )
}


