import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/db"

const verifySchema = z.object({
  token: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = verifySchema.parse(body)

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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    console.log("🔍 Verification attempt with token:", token)

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

    console.log("🔍 Found verification token:", verificationToken ? "YES" : "NO")
    if (verificationToken) {
      console.log("🔍 Token details:", {
        id: verificationToken.id,
        userId: verificationToken.userId,
        expires: verificationToken.expires,
        userEmail: verificationToken.user.email,
        userVerified: verificationToken.user.emailVerified
      })
    }

    if (!verificationToken) {
      console.log("❌ No verification token found for token:", token)
      return NextResponse.json(
        { error: "Invalid or expired verification token" },
        { status: 400 }
      )
    }

    if (verificationToken.expires < new Date()) {
      console.log("❌ Token expired:", verificationToken.expires, "Current time:", new Date())
      return NextResponse.json(
        { error: "Verification token has expired" },
        { status: 400 }
      )
    }

    // Check if user is already verified
    if (verificationToken.user.emailVerified) {
      console.log("❌ User already verified:", verificationToken.user.emailVerified)
      return NextResponse.json(
        { error: "Email is already verified" },
        { status: 400 }
      )
    }

    console.log("✅ Proceeding with verification for user:", verificationToken.userId)

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

    console.log("✅ Verification successful for user:", verificationToken.userId)

    return NextResponse.json({
      message: "Email verified successfully",
    })
  } catch (error) {
    console.error("❌ Verification error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
