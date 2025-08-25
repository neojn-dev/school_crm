import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.json(
        { error: "Token is required" },
        { status: 400 }
      )
    }

    // Find verification token
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
      include: { user: true },
    })

    if (!verificationToken) {
      return NextResponse.json(
        { error: "Invalid or expired verification token" },
        { status: 400 }
      )
    }

    if (verificationToken.expires < new Date()) {
      return NextResponse.json(
        { error: "Verification token has expired" },
        { status: 400 }
      )
    }

    // Check if user is already verified
    if (verificationToken.user.emailVerified) {
      return NextResponse.json(
        { error: "Email is already verified" },
        { status: 400 }
      )
    }

    // Update user as verified
    await db.user.update({
      where: { id: verificationToken.userId },
      data: { emailVerified: new Date() },
    })

    // Try to delete the verification token, but don't fail if it doesn't exist
    try {
      await db.verificationToken.delete({
        where: { id: verificationToken.id },
      })
    } catch (deleteError) {
      // Log the error but don't fail the verification
      console.warn("Could not delete verification token:", deleteError)
    }

    return NextResponse.json({
      message: "Email verified successfully",
    })
  } catch (error) {
    console.error("Verification error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
