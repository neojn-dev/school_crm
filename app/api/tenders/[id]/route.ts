import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const item = await db.tender.findUnique({ where: { id: params.id } })
  return NextResponse.json(item)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json()
  const updated = await db.tender.update({ where: { id: params.id }, data })
  return NextResponse.json(updated)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await db.tender.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}


