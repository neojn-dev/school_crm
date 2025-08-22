import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/db"

const verifyResetTokenSchema = z.object({
  token: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = verifyResetTokenSchema.parse(body)

    if (!token) {
      return NextResponse.json(
        { error: "Token is required" },
        { status: 400 }
      )
    }

    // Find the password reset token
    const resetToken = await db.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    })

    if (!resetToken) {
      return NextResponse.json(
        { error: "Invalid reset token" },
        { status: 400 }
      )
    }

    // Check if token has expired
    if (resetToken.expires < new Date()) {
      return NextResponse.json(
        { error: "Reset token has expired" },
        { status: 400 }
      )
    }

    // Check if user exists and is active
    if (!resetToken.user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 400 }
      )
    }

    return NextResponse.json({
      message: "Reset token is valid",
      userId: resetToken.userId,
    })
  } catch (error) {
    console.error("Verify reset token error:", error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid input", details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

