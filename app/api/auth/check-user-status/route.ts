import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/db"

const checkUserSchema = z.object({
  identifier: z.string().min(1, "Username or email is required"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { identifier } = checkUserSchema.parse(body)

    // Find user by username or email
    const user = await db.user.findFirst({
      where: {
        OR: [
          { username: identifier },
          { email: identifier },
        ],
      },
      select: {
        id: true,
        isActive: true,
        emailVerified: true,
      }
    })

    if (!user) {
      return NextResponse.json({
        exists: false,
        isActive: false,
        emailVerified: false
      })
    }

    return NextResponse.json({
      exists: true,
      isActive: user.isActive,
      emailVerified: !!user.emailVerified
    })
  } catch (error) {
    console.error("Check user status error:", error)
    
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
