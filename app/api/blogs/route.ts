import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

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
        },
        attachments: {
          select: {
            id: true,
            filename: true,
            url: true,
            mimeType: true,
            altText: true,
            caption: true
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
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await req.json()
    
    // Parse JSON fields
    const tags = typeof data.tags === 'string' ? JSON.parse(data.tags) : data.tags || []
    const metaKeywords = typeof data.metaKeywords === 'string' ? JSON.parse(data.metaKeywords) : data.metaKeywords || []
    
    // Handle dates
    const publishedAt = data.status === 'published' && data.publishedAt 
      ? new Date(data.publishedAt) 
      : data.status === 'published' 
        ? new Date() 
        : null
    
    const scheduledAt = data.scheduledAt ? new Date(data.scheduledAt) : null

    const created = await db.blogPost.create({ 
      data: {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage,
        headerImage: data.headerImage,
        layout: data.layout || 'default',
        status: data.status || 'draft',
        featured: data.featured || false,
        category: data.category,
        tags: JSON.stringify(tags),
        publishedAt,
        scheduledAt,
        
        // SEO fields
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        metaKeywords: JSON.stringify(metaKeywords),
        canonicalUrl: data.canonicalUrl,
        
        // Social media fields
        ogTitle: data.ogTitle,
        ogDescription: data.ogDescription,
        ogImage: data.ogImage,
        twitterCard: data.twitterCard || 'summary',
        
        // Author and tracking
        authorId: data.authorId || session.user.id,
        createdBy: session.user.id,
        updatedBy: session.user.id
      }
    })
    
    return NextResponse.json(created)
  } catch (error) {
    console.error('Error creating blog post:', error)
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await req.json()
    const { id, ...updateData } = data
    
    if (!id) {
      return NextResponse.json({ error: 'Blog post ID is required' }, { status: 400 })
    }
    
    // Parse JSON fields
    const tags = typeof updateData.tags === 'string' ? JSON.parse(updateData.tags) : updateData.tags || []
    const metaKeywords = typeof updateData.metaKeywords === 'string' ? JSON.parse(updateData.metaKeywords) : updateData.metaKeywords || []
    
    // Handle dates
    const publishedAt = updateData.status === 'published' && updateData.publishedAt 
      ? new Date(updateData.publishedAt) 
      : updateData.status === 'published' 
        ? new Date() 
        : null
    
    const scheduledAt = updateData.scheduledAt ? new Date(updateData.scheduledAt) : null

    const updated = await db.blogPost.update({
      where: { id },
      data: {
        title: updateData.title,
        slug: updateData.slug,
        excerpt: updateData.excerpt,
        content: updateData.content,
        coverImage: updateData.coverImage,
        headerImage: updateData.headerImage,
        layout: updateData.layout,
        status: updateData.status,
        featured: updateData.featured,
        category: updateData.category,
        tags: JSON.stringify(tags),
        publishedAt,
        scheduledAt,
        
        // SEO fields
        metaTitle: updateData.metaTitle,
        metaDescription: updateData.metaDescription,
        metaKeywords: JSON.stringify(metaKeywords),
        canonicalUrl: updateData.canonicalUrl,
        
        // Social media fields
        ogTitle: updateData.ogTitle,
        ogDescription: updateData.ogDescription,
        ogImage: updateData.ogImage,
        twitterCard: updateData.twitterCard,
        
        // Tracking
        updatedBy: session.user.id
      }
    })
    
    return NextResponse.json(updated)
  } catch (error) {
    console.error('Error updating blog post:', error)
    return NextResponse.json({ error: 'Failed to update blog post' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Blog post ID is required' }, { status: 400 })
    }

    await db.blogPost.delete({
      where: { id }
    })
    
    return NextResponse.json({ message: 'Blog post deleted successfully' })
  } catch (error) {
    console.error('Error deleting blog post:', error)
    return NextResponse.json({ error: 'Failed to delete blog post' }, { status: 500 })
  }
}
