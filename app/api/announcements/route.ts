import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const items = await db.announcement.findMany({ 
      where: { isActive: true }, 
      orderBy: { createdAt: "desc" },
      include: {
        attachments: true
      }
    })
    return NextResponse.json(items)
  } catch (error) {
    console.error('Error fetching announcements:', error)
    return NextResponse.json({ error: 'Failed to fetch announcements' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const created = await db.announcement.create({ 
      data: {
        ...data,
        isActive: data.isActive ?? true
      }
    })
    return NextResponse.json(created)
  } catch (error) {
    console.error('Error creating announcement:', error)
    return NextResponse.json({ error: 'Failed to create announcement' }, { status: 500 })
  }
}
