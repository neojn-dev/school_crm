import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const siteSettings = await db.cmsSiteSettings.findFirst({
      include: {
        homepage: {
          select: { id: true, title: true, slug: true }
        }
      }
    })

    return NextResponse.json(siteSettings)
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch site settings' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      homepageId,
      siteLogo,
      siteLogoAlt,
      headerStyle,
      showSearch,
      footerText,
      copyrightText,
      showSocialLinks,
      contactEmail,
      contactPhone,
      contactAddress
    } = body

    // Check if site settings already exist
    const existingSettings = await db.cmsSiteSettings.findFirst()

    let siteSettings
    if (existingSettings) {
      // Update existing settings
      siteSettings = await db.cmsSiteSettings.update({
        where: { id: existingSettings.id },
        data: {
          homepageId: homepageId || null,
          siteLogo: siteLogo || null,
          siteLogoAlt: siteLogoAlt || null,
          headerStyle: headerStyle || null,
          showSearch: showSearch || false,
          footerText: footerText || null,
          copyrightText: copyrightText || null,
          showSocialLinks: showSocialLinks !== false,
          contactEmail: contactEmail || null,
          contactPhone: contactPhone || null,
          contactAddress: contactAddress || null,
          updatedBy: session.user.id
        },
        include: {
          homepage: {
            select: { id: true, title: true, slug: true }
          }
        }
      })
    } else {
      // Create new settings
      siteSettings = await db.cmsSiteSettings.create({
        data: {
          homepageId: homepageId || null,
          siteLogo: siteLogo || null,
          siteLogoAlt: siteLogoAlt || null,
          headerStyle: headerStyle || null,
          showSearch: showSearch || false,
          footerText: footerText || null,
          copyrightText: copyrightText || null,
          showSocialLinks: showSocialLinks !== false,
          contactEmail: contactEmail || null,
          contactPhone: contactPhone || null,
          contactAddress: contactAddress || null,
          updatedBy: session.user.id
        },
        include: {
          homepage: {
            select: { id: true, title: true, slug: true }
          }
        }
      })
    }

    return NextResponse.json(siteSettings)
  } catch (error) {
    console.error('Error saving site settings:', error)
    return NextResponse.json(
      { error: 'Failed to save site settings' },
      { status: 500 }
    )
  }
}
