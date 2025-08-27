import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const items = await db.tender.findMany({ 
      where: { isActive: true }, 
      orderBy: { publishedAt: "desc" },
      include: {
        attachments: true
      }
    })
    return NextResponse.json(items)
  } catch (error) {
    console.error('Error fetching tenders:', error)
    return NextResponse.json({ error: 'Failed to fetch tenders' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const created = await db.tender.create({ 
      data: {
        ...data,
        isActive: data.isActive ?? true
      }
    })
    return NextResponse.json(created)
  } catch (error) {
    console.error('Error creating tender:', error)
    return NextResponse.json({ error: 'Failed to create tender' }, { status: 500 })
  }
}
