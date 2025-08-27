"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

export default function EditBlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/blogs/${id}`)
      const data = await res.json()
      setTitle(data.title || "")
      setExcerpt(data.excerpt || "")
      setContent(data.content || "")
      setLoading(false)
    }
    if (id) load()
  }, [id])

  const save = async (status?: string) => {
    const res = await fetch(`/api/blogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, excerpt, content, ...(status ? { status, publishedAt: new Date() } : {}) })
    })
    if (res.ok) router.push('/cms/blogs')
  }

  if (loading) return <div className="p-6">Loading...</div>

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Blog Post</h1>
      <div className="grid gap-4 max-w-3xl">
        <input className="border rounded-lg p-3" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input className="border rounded-lg p-3" placeholder="Excerpt" value={excerpt} onChange={e => setExcerpt(e.target.value)} />
        <textarea className="border rounded-lg p-3 h-64" placeholder="Content (Markdown or HTML)" value={content} onChange={e => setContent(e.target.value)} />
        <div className="flex gap-3">
          <button onClick={() => save()} className="px-5 py-2 rounded-xl bg-blue-600 text-white">Save</button>
          <button onClick={() => save('published')} className="px-5 py-2 rounded-xl bg-green-600 text-white">Publish</button>
          <button onClick={() => router.push('/cms/blogs')} className="px-5 py-2 rounded-xl border">Cancel</button>
        </div>
      </div>
    </div>
  )
}


