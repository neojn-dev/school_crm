import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { masterDataUpdateSchema } from "@/lib/validations/master-data"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const userId = session.user?.id
    if (!userId) {
      return NextResponse.json({ error: "User ID not found in session" }, { status: 401 })
    }

    const { id } = await params

    const masterData = await prisma.masterData.findFirst({
      where: {
        id,
        userId: userId,
      }
    })

    if (!masterData) {
      return NextResponse.json(
        { error: "Master data not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(masterData)
  } catch (error) {
    console.error("Error fetching master data:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const userId = session.user?.id
    if (!userId) {
      return NextResponse.json({ error: "User ID not found in session" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    
    // Validate input
    const validatedData = masterDataUpdateSchema.parse({
      ...body,
      id
    })
    
    // Check if master data exists and belongs to user
    const existingMasterData = await prisma.masterData.findFirst({
      where: {
        id,
        userId: userId,
      }
    })

    if (!existingMasterData) {
      return NextResponse.json(
        { error: "Master data not found" },
        { status: 404 }
      )
    }

    // Convert array fields to JSON strings for database storage
    const dataForDb = {
      ...validatedData,
      updatedAt: new Date(),
      // Convert arrays to JSON strings
      multiSelect: validatedData.multiSelect ? JSON.stringify(validatedData.multiSelect) : undefined,
      checkboxGroup: validatedData.checkboxGroup ? JSON.stringify(validatedData.checkboxGroup) : undefined,
      tagsField: validatedData.tagsField ? JSON.stringify(validatedData.tagsField) : undefined,
      multiInputField: validatedData.multiInputField ? JSON.stringify(validatedData.multiInputField) : undefined,
    }

    // Update master data
    const updatedMasterData = await prisma.masterData.update({
      where: { id },
      data: dataForDb
    })

    return NextResponse.json(updatedMasterData)
  } catch (error) {
    console.error("Error updating master data:", error)
    
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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    const userId = session.user?.id
    if (!userId) {
      return NextResponse.json({ error: "User ID not found in session" }, { status: 401 })
    }

    const { id } = await params

    // Check if master data exists and belongs to user
    const existingMasterData = await prisma.masterData.findFirst({
      where: {
        id,
        userId: userId,
      }
    })

    if (!existingMasterData) {
      return NextResponse.json(
        { error: "Master data not found" },
        { status: 404 }
      )
    }

    // Delete master data
    await prisma.masterData.delete({
      where: { id }
    })

    return NextResponse.json({ message: "Master data deleted successfully" })
  } catch (error) {
    console.error("Error deleting master data:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
