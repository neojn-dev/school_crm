"use client"

import { useState } from 'react'
import { Button } from './button'
import { 
  Download, 
  FileSpreadsheet, 
  FileText, 
  FileJson,
  ChevronDown 
} from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu'
import * as XLSX from 'xlsx'

interface ExportButtonProps {
  data: any[]
  filename: string
  className?: string
  variant?: 'default' | 'outline' | 'secondary' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
}

export function ExportButton({ 
  data, 
  filename, 
  className = '',
  variant = 'outline',
  size = 'default'
}: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)

  const exportToExcel = async () => {
    if (!data || data.length === 0) {
      alert('No data to export')
      return
    }

    setIsExporting(true)
    try {
      // Create a new workbook
      const wb = XLSX.utils.book_new()
      
      // Convert data to worksheet
      const ws = XLSX.utils.json_to_sheet(data)
      
      // Add the worksheet to the workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Data')
      
      // Generate Excel file and trigger download
      XLSX.writeFile(wb, `${filename}.xlsx`)
    } catch (error) {
      console.error('Export error:', error)
      alert('Failed to export data')
    } finally {
      setIsExporting(false)
    }
  }

  const exportToCSV = async () => {
    if (!data || data.length === 0) {
      alert('No data to export')
      return
    }

    setIsExporting(true)
    try {
      // Convert data to CSV
      const ws = XLSX.utils.json_to_sheet(data)
      const csv = XLSX.utils.sheet_to_csv(ws)
      
      // Create blob and download
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `${filename}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Export error:', error)
      alert('Failed to export data')
    } finally {
      setIsExporting(false)
    }
  }

  const exportToJSON = async () => {
    if (!data || data.length === 0) {
      alert('No data to export')
      return
    }

    setIsExporting(true)
    try {
      // Convert data to JSON string
      const jsonString = JSON.stringify(data, null, 2)
      
      // Create blob and download
      const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `${filename}.json`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Export error:', error)
      alert('Failed to export data')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={variant} 
          size={size}
          className={className}
          disabled={isExporting || !data || data.length === 0}
        >
          <Download className="h-4 w-4 mr-2" />
          {isExporting ? 'Exporting...' : 'Export'}
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={exportToExcel} className="cursor-pointer">
          <FileSpreadsheet className="h-4 w-4 mr-2 text-green-600" />
          Export to Excel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToCSV} className="cursor-pointer">
          <FileText className="h-4 w-4 mr-2 text-blue-600" />
          Export to CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToJSON} className="cursor-pointer">
          <FileJson className="h-4 w-4 mr-2 text-purple-600" />
          Export to JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
