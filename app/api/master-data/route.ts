import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { masterDataCreateSchema, masterDataUpdateSchema } from "@/lib/validations/master-data"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user?.id
    if (!userId) {
      return NextResponse.json({ error: "User ID not found in session" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    const category = searchParams.get("category") || ""
    const fieldType = searchParams.get("fieldType") || ""
    const isActive = searchParams.get("isActive") || ""

    const skip = (page - 1) * limit

    // Build where clause for user's master data
    const where: any = {
      userId: userId,
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    if (category) {
      where.category = category
    }

    if (fieldType) {
      where.fieldType = fieldType
    }

    if (isActive !== "") {
      where.isActive = isActive === "true"
    }

    // Get total count
    const total = await prisma.masterData.count({ where })

    // Get data with pagination
    const masterData = await prisma.masterData.findMany({
      where,
      skip,
      take: limit,
      orderBy: [
        { sortOrder: "asc" },
        { createdAt: "desc" }
      ],
    })

    return NextResponse.json({
      data: masterData,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error("Error fetching master data:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user?.id
    if (!userId) {
      return NextResponse.json({ error: "User ID not found in session" }, { status: 401 })
    }

    const body = await request.json()
    
    // Validate input
    const validatedData = masterDataCreateSchema.parse(body)
    
    // Convert array fields to JSON strings for database storage
    const dataForDb = {
      ...validatedData,
      userId: userId,
      // Convert arrays to JSON strings
      multiSelect: validatedData.multiSelect ? JSON.stringify(validatedData.multiSelect) : null,
      checkboxGroup: validatedData.checkboxGroup ? JSON.stringify(validatedData.checkboxGroup) : null,
      tagsField: validatedData.tagsField ? JSON.stringify(validatedData.tagsField) : null,
      multiInputField: validatedData.multiInputField ? JSON.stringify(validatedData.multiInputField) : null,
    }
    
    const masterData = await prisma.masterData.create({
      data: dataForDb
    })

    return NextResponse.json(masterData, { status: 201 })
  } catch (error) {
    console.error("Error creating master data:", error)
    
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

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user?.id
    if (!userId) {
      return NextResponse.json({ error: "User ID not found in session" }, { status: 401 })
    }

    const body = await request.json()
    
    // Validate input
    const validatedData = masterDataUpdateSchema.parse(body)
    
    // Check if master data exists and belongs to user
    const existingMasterData = await prisma.masterData.findFirst({
      where: {
        id: validatedData.id,
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
      where: { id: validatedData.id },
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

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user?.id
    if (!userId) {
      return NextResponse.json({ error: "User ID not found in session" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "Master data ID is required" },
        { status: 400 }
      )
    }

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
