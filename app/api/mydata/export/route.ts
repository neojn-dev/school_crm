import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import * as XLSX from "xlsx"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const format = searchParams.get("format") || "csv"
    const search = searchParams.get("search") || ""
    const category = searchParams.get("category")

    const where = {
      userId: session.user.id,
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' as const } },
          { description: { contains: search, mode: 'insensitive' as const } },
          { name: { contains: search, mode: 'insensitive' as const } },
          { email: { contains: search, mode: 'insensitive' as const } },
        ],
      }),
      ...(category && { category }),
    }

    const data = await db.myData.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
    })

    // Transform data for export
    const exportData = data.map(item => ({
      ID: item.id,
      Title: item.title,
      Description: item.description,
      Name: item.name,
      Email: item.email,
      Phone: item.phone || '',
      Age: item.age || '',
      Balance: item.balance || '',
      Rating: item.rating || '',
      'Is Active': item.isActive ? 'Yes' : 'No',
      Category: item.category,
      'Date Only': item.dateOnly || '',
      'Date Time': item.dateTime || '',
      'Time Only': item.timeOnly || '',
      Website: item.website || '',
      'Avatar URL': item.avatarUrl || '',
      Color: item.color || '',
      Tags: item.tags ? JSON.parse(item.tags).join(', ') : '',
      'File Path': item.filePath || '',
      'Created At': item.createdAt.toISOString(),
      'Updated At': item.updatedAt.toISOString(),
    }))

    if (format === 'excel') {
      // Create Excel file
      const worksheet = XLSX.utils.json_to_sheet(exportData)
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, "MyData")
      
      const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })
      
      return new NextResponse(excelBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': 'attachment; filename=mydata-export.xlsx',
        },
      })
    } else {
      // Create CSV file
      const worksheet = XLSX.utils.json_to_sheet(exportData)
      const csvContent = XLSX.utils.sheet_to_csv(worksheet)
      
      return new NextResponse(csvContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': 'attachment; filename=mydata-export.csv',
        },
      })
    }
  } catch (error) {
    console.error("Export error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
