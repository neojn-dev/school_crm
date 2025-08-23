import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { formLibraryUpdateSchema } from "@/lib/validations/form-library"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = params

    const formLibrary = await prisma.formLibrary.findFirst({
      where: {
        id,
        userId: session.user.id,
      }
    })

    if (!formLibrary) {
      return NextResponse.json(
        { error: "Form library not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(formLibrary)
  } catch (error) {
    console.error("Error fetching form library:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = params
    const body = await request.json()
    
    // Validate input
    const validatedData = formLibraryUpdateSchema.parse({
      ...body,
      id
    })
    
    // Check if form library exists and belongs to user
    const existingFormLibrary = await prisma.formLibrary.findFirst({
      where: {
        id,
        userId: session.user.id,
      }
    })

    if (!existingFormLibrary) {
      return NextResponse.json(
        { error: "Form library not found" },
        { status: 404 }
      )
    }

    // Update form library
    const updatedFormLibrary = await prisma.formLibrary.update({
      where: { id },
      data: {
        ...validatedData,
        updatedAt: new Date(),
      }
    })

    return NextResponse.json(updatedFormLibrary)
  } catch (error) {
    console.error("Error updating form library:", error)
    
    if (error instanceof Error && error.message.includes("validation")) {
      return NextResponse.json(
        { error: "Validation error", details: error.message },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = params

    // Check if form library exists and belongs to user
    const existingFormLibrary = await prisma.formLibrary.findFirst({
      where: {
        id,
        userId: session.user.id,
      }
    })

    if (!existingFormLibrary) {
      return NextResponse.json(
        { error: "Form library not found" },
        { status: 404 }
      )
    }

    // Delete form library
    await prisma.formLibrary.delete({
      where: { id }
    })

    return NextResponse.json({ message: "Form library deleted successfully" })
  } catch (error) {
    console.error("Error deleting form library:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
