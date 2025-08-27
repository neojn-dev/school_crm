"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

export default function EditTenderPage() {
  const { id } = useParams() as { id: string }
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [referenceNo, setReferenceNo] = useState("")
  const [description, setDescription] = useState("")
  const [isActive, setIsActive] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/tenders/${id}`)
      const data = await res.json()
      setTitle(data.title || "")
      setReferenceNo(data.referenceNo || "")
      setDescription(data.description || "")
      setIsActive(!!data.isActive)
      setLoading(false)
    }
    if (id) load()
  }, [id])

  const save = async () => {
    const res = await fetch(`/api/tenders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, referenceNo, description, isActive })
    })
    if (res.ok) router.push('/cms/tenders')
  }

  if (loading) return <div className="p-6">Loading...</div>

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Edit Tender</h1>
      <div className="grid gap-4 max-w-3xl">
        <input className="border rounded-lg p-3" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input className="border rounded-lg p-3" placeholder="Reference Number" value={referenceNo} onChange={e => setReferenceNo(e.target.value)} />
        <textarea className="border rounded-lg p-3 h-64" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <label className="flex items-center gap-2 text-sm text-gray-700"><input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} /> Active</label>
        <div className="flex gap-3">
          <button onClick={save} className="px-5 py-2 rounded-xl bg-blue-600 text-white">Save</button>
          <button onClick={() => router.push('/cms/tenders')} className="px-5 py-2 rounded-xl border">Cancel</button>
        </div>
      </div>
    </div>
  )
}


