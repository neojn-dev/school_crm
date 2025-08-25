import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { z } from "zod"

const seoSettingsSchema = z.object({
  siteName: z.string().optional(),
  siteDescription: z.string().optional(),
  defaultOgImage: z.string().optional(),
  googleAnalyticsId: z.string().optional(),
  googleTagManagerId: z.string().optional(),
  facebookPixelId: z.string().optional(),
  twitterHandle: z.string().optional(),
  facebookUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  robotsTxt: z.string().optional(),
  customHead: z.string().optional(),
})

// GET /api/cms/seo - Get SEO settings
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const seoSettings = await db.cmsSeoSettings.findFirst({
      include: {
        updatedByUser: { select: { id: true, username: true, firstName: true } }
      }
    })

    return NextResponse.json({ seoSettings })
  } catch (error) {
    console.error("Error fetching SEO settings:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// POST /api/cms/seo - Update SEO settings
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const data = seoSettingsSchema.parse(body)

    // Check if settings exist
    const existingSettings = await db.cmsSeoSettings.findFirst()

    let seoSettings
    if (existingSettings) {
      // Update existing settings
      seoSettings = await db.cmsSeoSettings.update({
        where: { id: existingSettings.id },
        data: {
          ...data,
          updatedBy: session.user.id
        },
        include: {
          updatedByUser: { select: { id: true, username: true, firstName: true } }
        }
      })
    } else {
      // Create new settings
      seoSettings = await db.cmsSeoSettings.create({
        data: {
          ...data,
          updatedBy: session.user.id
        },
        include: {
          updatedByUser: { select: { id: true, username: true, firstName: true } }
        }
      })
    }

    return NextResponse.json({ seoSettings })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Error updating SEO settings:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
