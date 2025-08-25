"use client"

import { useSession } from "next-auth/react"

export function DebugSession() {
  const { data: session, status } = useSession()
  
  if (status === "loading") return <div>Loading session...</div>
  
  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-md overflow-auto max-h-64 z-50">
      <h3 className="font-bold mb-2">Debug Session</h3>
      <div>Status: {status}</div>
      <div>Session: {JSON.stringify(session, null, 2)}</div>
    </div>
  )
}
