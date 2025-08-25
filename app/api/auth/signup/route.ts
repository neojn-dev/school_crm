import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { db } from "@/lib/db"
import { sendVerificationEmail } from "@/lib/email"
import { generateRandomString } from "@/lib/utils"

const signupSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, username, email, password } = signupSchema.parse(body)

    // Check if user already exists
    const existingUser = await db.user.findFirst({
      where: {
        OR: [
          { username },
          { email },
        ],
      },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this username or email already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12)

    // Find the default "User" role
    const defaultRole = await db.role.findFirst({
      where: { name: "User" }
    })

    if (!defaultRole) {
      return NextResponse.json(
        { error: "Default user role not found. Please contact administrator." },
        { status: 500 }
      )
    }

    // Create user with default "User" role
    const user = await db.user.create({
      data: {
        firstName,
        lastName,
        username,
        email,
        passwordHash,
        roleId: defaultRole.id, // Assign default "User" role
      },
    })

    // Create verification token
    const token = generateRandomString(32)
    
    await db.verificationToken.create({
      data: {
        token,
        userId: user.id,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      },
    })

    // Send verification email
    try {
      await sendVerificationEmail(email, token)
    } catch (error) {
      console.error("Failed to send verification email:", error)
      // Don't fail the signup if email fails
    }

    return NextResponse.json({
      message: "User created successfully. Please check your email to verify your account.",
      userId: user.id,
    })
  } catch (error) {
    console.error("Signup error:", error)
    
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
