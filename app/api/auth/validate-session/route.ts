import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    // Get the current session
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({
        valid: false,
        reason: "NO_SESSION"
      })
    }

    // Check if user still exists and is active
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        isActive: true,
        emailVerified: true,
        role: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    if (!user) {
      return NextResponse.json({
        valid: false,
        reason: "USER_NOT_FOUND"
      })
    }

    if (!user.isActive) {
      return NextResponse.json({
        valid: false,
        reason: "ACCOUNT_DEACTIVATED"
      })
    }

    if (!user.emailVerified) {
      return NextResponse.json({
        valid: false,
        reason: "EMAIL_NOT_VERIFIED"
      })
    }

    // Session is valid
    return NextResponse.json({
      valid: true,
      user: {
        id: user.id,
        role: user.role?.name || 'User',
        roleId: user.role?.id || null
      }
    })
  } catch (error) {
    console.error("Session validation error:", error)
    return NextResponse.json(
      { 
        valid: false, 
        reason: "VALIDATION_ERROR",
        error: "Internal server error" 
      },
      { status: 500 }
    )
  }
}
