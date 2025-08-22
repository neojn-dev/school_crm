import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { myDataUpdateSchema } from "@/lib/validations/mydata"
import { z } from "zod"

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    const myData = await db.myData.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!myData) {
      return NextResponse.json(
        { error: "Data not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(myData)
  } catch (error) {
    console.error("GET /api/mydata/[id] error:", error)
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

    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const validatedData = myDataUpdateSchema.parse({
      ...body,
      id: params.id,
    })

    // Check if the record exists and belongs to the user
    const existingData = await db.myData.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!existingData) {
      return NextResponse.json(
        { error: "Data not found" },
        { status: 404 }
      )
    }

    // Convert tags array to JSON string for storage
    const dataToUpdate = {
      ...validatedData,
      tags: validatedData.tags ? JSON.stringify(validatedData.tags) : existingData.tags,
      id: undefined, // Remove id from update data
    }

    const updatedData = await db.myData.update({
      where: { id: params.id },
      data: dataToUpdate,
    })

    return NextResponse.json(updatedData)
  } catch (error) {
    console.error("PUT /api/mydata/[id] error:", error)

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    // Check if the record exists and belongs to the user
    const existingData = await db.myData.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    })

    if (!existingData) {
      return NextResponse.json(
        { error: "Data not found" },
        { status: 404 }
      )
    }

    await db.myData.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: "Data deleted successfully" })
  } catch (error) {
    console.error("DELETE /api/mydata/[id] error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
