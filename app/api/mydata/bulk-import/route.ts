import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { z } from "zod"

const bulkImportSchema = z.object({
  data: z.array(z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional().nullable(),
    age: z.number().int().min(0).max(150).optional().nullable(),
    balance: z.number().min(0).optional().nullable(),
    rating: z.number().min(0).max(5).optional().nullable(),
    isActive: z.boolean().default(true),
    category: z.string().refine((val) => ["A", "B", "C"].includes(val), {
      message: "Category must be A, B, or C",
    }),
    dateOnly: z.string().optional().nullable(),
    dateTime: z.string().optional().nullable(),
    timeOnly: z.string().optional().nullable(),
    website: z.string().url().optional().nullable().or(z.literal("")),
    avatarUrl: z.string().url().optional().nullable().or(z.literal("")),
    color: z.string().regex(/^#[0-9A-F]{6}$/i).optional().nullable(),
    tags: z.array(z.string()).default([]),
  }))
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { data: importData } = bulkImportSchema.parse(body)

    // Check for duplicate emails in the batch
    const emails = importData.map(item => item.email).filter(Boolean)
    const uniqueEmails = new Set(emails)
    if (emails.length !== uniqueEmails.size) {
      return NextResponse.json(
        { error: "Duplicate emails found in import data" },
        { status: 400 }
      )
    }

    // Check for existing emails in database
    const existingEmails = await db.myData.findMany({
      where: {
        email: { in: emails },
        userId: session.user.id,
      },
      select: { email: true }
    })

    if (existingEmails.length > 0) {
      return NextResponse.json(
        { 
          error: "Some emails already exist in your data",
          duplicates: existingEmails.map(item => item.email)
        },
        { status: 400 }
      )
    }

    // Transform and prepare data for insertion
    const dataToInsert = importData.map(item => ({
      ...item,
      tags: JSON.stringify(item.tags),
      // Keep dates as strings since schema now expects String
      dateOnly: item.dateOnly || null,
      dateTime: item.dateTime || null,
      phone: item.phone || null,
      age: item.age || null,
      balance: item.balance || null,
      rating: item.rating || null,
      website: item.website || null,
      avatarUrl: item.avatarUrl || null,
      color: item.color || null,
      userId: session.user.id,
    }))

    // Insert data in batches to avoid timeout
    const batchSize = 50
    const results = []
    
    for (let i = 0; i < dataToInsert.length; i += batchSize) {
      const batch = dataToInsert.slice(i, i + batchSize)
      const batchResult = await db.myData.createMany({
        data: batch,
      })
      results.push(batchResult)
    }

    const totalCreated = results.reduce((sum, result) => sum + result.count, 0)

    return NextResponse.json({
      message: `Successfully imported ${totalCreated} records`,
      imported: totalCreated,
      total: importData.length,
    })
  } catch (error) {
    console.error("Bulk import error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          error: "Invalid data format", 
          details: error.errors.map(err => ({
            path: err.path.join('.'),
            message: err.message,
          }))
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
