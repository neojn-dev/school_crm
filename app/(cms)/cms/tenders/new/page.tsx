"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function NewTenderPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [referenceNo, setReferenceNo] = useState("")
  const [description, setDescription] = useState("")

  const save = async () => {
    const res = await fetch('/api/tenders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, referenceNo, description, isActive: true })
    })
    if (res.ok) router.push('/cms/tenders')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">New Tender</h1>
      <div className="grid gap-4 max-w-3xl">
        <input className="border rounded-lg p-3" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input className="border rounded-lg p-3" placeholder="Reference Number" value={referenceNo} onChange={e => setReferenceNo(e.target.value)} />
        <textarea className="border rounded-lg p-3 h-64" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <div className="flex gap-3">
          <button onClick={save} className="px-5 py-2 rounded-xl bg-blue-600 text-white">Save</button>
          <button onClick={() => router.push('/cms/tenders')} className="px-5 py-2 rounded-xl border">Cancel</button>
        </div>
      </div>
    </div>
  )
}


