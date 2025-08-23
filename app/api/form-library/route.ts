import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { formLibraryCreateSchema, formLibraryUpdateSchema } from "@/lib/validations/form-library"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    const category = searchParams.get("category") || ""
    const fieldType = searchParams.get("fieldType") || ""
    const isActive = searchParams.get("isActive") || ""

    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {
      userId: session.user.id,
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
    const total = await prisma.formLibrary.count({ where })

    // Get data with pagination
    const formLibraries = await prisma.formLibrary.findMany({
      where,
      skip,
      take: limit,
      orderBy: [
        { sortOrder: "asc" },
        { createdAt: "desc" }
      ],
    })

    return NextResponse.json({
      data: formLibraries,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error("Error fetching form libraries:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    
    // Validate input
    const validatedData = formLibraryCreateSchema.parse(body)
    
    // Create form library
    const formLibrary = await prisma.formLibrary.create({
      data: {
        ...validatedData,
        userId: session.user.id,
      }
    })

    return NextResponse.json(formLibrary, { status: 201 })
  } catch (error) {
    console.error("Error creating form library:", error)
    
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
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    
    // Validate input
    const validatedData = formLibraryUpdateSchema.parse(body)
    
    // Check if form library exists and belongs to user
    const existingFormLibrary = await prisma.formLibrary.findFirst({
      where: {
        id: validatedData.id,
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
      where: { id: validatedData.id },
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

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "Form library ID is required" },
        { status: 400 }
      )
    }

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
