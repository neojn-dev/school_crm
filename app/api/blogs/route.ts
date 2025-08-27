import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const items = await db.blogPost.findMany({ 
      where: { status: "published" }, 
      orderBy: { publishedAt: "desc" },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true
          }
        }
      }
    })
    return NextResponse.json(items)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const created = await db.blogPost.create({ 
      data: {
        ...data,
        status: data.status || "draft"
      }
    })
    return NextResponse.json(created)
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 })
  }
}
