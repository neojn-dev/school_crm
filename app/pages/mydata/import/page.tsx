"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { 
  Upload, 
  Download, 
  FileSpreadsheet, 
  AlertCircle, 
  CheckCircle, 
  X,
  ArrowLeft,
  Settings
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import * as XLSX from "xlsx"

interface ImportData {
  [key: string]: any
}

interface ValidationError {
  row: number
  column: string
  error: string
}

interface ColumnMapping {
  [csvColumn: string]: string
}

const EXPECTED_COLUMNS = [
  { key: 'title', label: 'Title', required: true },
  { key: 'description', label: 'Description', required: true },
  { key: 'name', label: 'Name', required: true },
  { key: 'email', label: 'Email', required: true },
  { key: 'phone', label: 'Phone', required: false },
  { key: 'age', label: 'Age', required: false },
  { key: 'balance', label: 'Balance', required: false },
  { key: 'rating', label: 'Rating', required: false },
  { key: 'isActive', label: 'Is Active', required: false },
  { key: 'category', label: 'Category', required: true },
  { key: 'dateOnly', label: 'Date Only', required: false },
  { key: 'dateTime', label: 'Date Time', required: false },
  { key: 'timeOnly', label: 'Time Only', required: false },
  { key: 'website', label: 'Website', required: false },
  { key: 'avatarUrl', label: 'Avatar URL', required: false },
  { key: 'color', label: 'Color', required: false },
  { key: 'tags', label: 'Tags', required: false },
]

export default function ImportPage() {
  const { data: session } = useSession()
  const [file, setFile] = useState<File | null>(null)
  const [data, setData] = useState<ImportData[]>([])
  const [headers, setHeaders] = useState<string[]>([])
  const [columnMapping, setColumnMapping] = useState<ColumnMapping>({})
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [importProgress, setImportProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState<'upload' | 'preview' | 'mapping' | 'validate' | 'import'>('upload')

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0]
    if (!uploadedFile) return

    // Validate file type
    const allowedTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ]

    if (!allowedTypes.includes(uploadedFile.type) && !uploadedFile.name.endsWith('.csv')) {
      toast.error('Please upload a valid Excel (.xlsx) or CSV file')
      return
    }

    setFile(uploadedFile)
    setIsProcessing(true)

    try {
      const arrayBuffer = await uploadedFile.arrayBuffer()
      let workbook: XLSX.WorkBook

      if (uploadedFile.name.endsWith('.csv')) {
        const text = new TextDecoder().decode(arrayBuffer)
        workbook = XLSX.read(text, { type: 'string' })
      } else {
        workbook = XLSX.read(arrayBuffer, { type: 'array' })
      }

      const sheetName = workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[]

      if (jsonData.length === 0) {
        toast.error('The file appears to be empty')
        return
      }

      const fileHeaders = jsonData[0] as string[]
      const fileData = jsonData.slice(1).map((row, index) => {
        const rowData: ImportData = { _rowIndex: index + 2 }
        fileHeaders.forEach((header, colIndex) => {
          rowData[header] = row[colIndex] || ''
        })
        return rowData
      })

      setHeaders(fileHeaders)
      setData(fileData)
      
      // Auto-map columns with similar names
      const autoMapping: ColumnMapping = {}
      EXPECTED_COLUMNS.forEach(expectedCol => {
        const matchingHeader = fileHeaders.find(header => 
          header.toLowerCase().includes(expectedCol.key.toLowerCase()) ||
          expectedCol.label.toLowerCase().includes(header.toLowerCase())
        )
        if (matchingHeader) {
          autoMapping[matchingHeader] = expectedCol.key
        }
      })
      setColumnMapping(autoMapping)

      setCurrentStep('preview')
      toast.success(`Loaded ${fileData.length} rows from ${uploadedFile.name}`)
    } catch (error) {
      toast.error('Failed to parse the file. Please check the format.')
      console.error('File parsing error:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const validateData = () => {
    const errors: ValidationError[] = []
    
    data.forEach((row, index) => {
      // Check required fields
      EXPECTED_COLUMNS.filter(col => col.required).forEach(col => {
        const mappedColumn = Object.keys(columnMapping).find(key => columnMapping[key] === col.key)
        if (!mappedColumn || !row[mappedColumn]) {
          errors.push({
            row: index + 1,
            column: col.label,
            error: `${col.label} is required`
          })
        }
      })

      // Validate email format
      const emailColumn = Object.keys(columnMapping).find(key => columnMapping[key] === 'email')
      if (emailColumn && row[emailColumn]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(row[emailColumn])) {
          errors.push({
            row: index + 1,
            column: 'Email',
            error: 'Invalid email format'
          })
        }
      }

      // Validate category
      const categoryColumn = Object.keys(columnMapping).find(key => columnMapping[key] === 'category')
      if (categoryColumn && row[categoryColumn]) {
        if (!['A', 'B', 'C'].includes(row[categoryColumn])) {
          errors.push({
            row: index + 1,
            column: 'Category',
            error: 'Category must be A, B, or C'
          })
        }
      }

      // Validate numeric fields
      const numericFields = ['age', 'balance', 'rating']
      numericFields.forEach(field => {
        const column = Object.keys(columnMapping).find(key => columnMapping[key] === field)
        if (column && row[column] && isNaN(Number(row[column]))) {
          errors.push({
            row: index + 1,
            column: field,
            error: `${field} must be a number`
          })
        }
      })
    })

    setValidationErrors(errors)
    setCurrentStep('validate')
    
    if (errors.length === 0) {
      toast.success('All data is valid and ready for import!')
    } else {
      toast.error(`Found ${errors.length} validation errors`)
    }
  }

  const handleImport = async () => {
    if (validationErrors.length > 0) {
      toast.error('Please fix validation errors before importing')
      return
    }

    setIsProcessing(true)
    setImportProgress(0)

    try {
      // Transform data according to column mapping
      const transformedData = data.map(row => {
        const transformed: any = {}
        
        Object.entries(columnMapping).forEach(([csvColumn, dbColumn]) => {
          let value = row[csvColumn]
          
          // Transform specific fields
          switch (dbColumn) {
            case 'isActive':
              transformed[dbColumn] = ['true', '1', 'yes', 'active'].includes(String(value).toLowerCase())
              break
            case 'age':
            case 'balance':
            case 'rating':
              transformed[dbColumn] = value ? Number(value) : null
              break
            case 'tags':
              transformed[dbColumn] = value ? value.split(',').map((t: string) => t.trim()) : []
              break
            default:
              transformed[dbColumn] = value || null
          }
        })

        return transformed
      })

      // Send data in batches
      const batchSize = 10
      const batches = []
      for (let i = 0; i < transformedData.length; i += batchSize) {
        batches.push(transformedData.slice(i, i + batchSize))
      }

      let imported = 0
      for (const batch of batches) {
        const response = await fetch('/api/mydata/bulk-import', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: batch })
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.error || 'Import failed')
        }

        imported += batch.length
        setImportProgress((imported / transformedData.length) * 100)
      }

      toast.success(`Successfully imported ${imported} records!`)
      setCurrentStep('import')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Import failed')
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadTemplate = () => {
    const templateData = [
      EXPECTED_COLUMNS.map(col => col.label),
      [
        'Sample Product',
        'This is a sample product description',
        'John Doe',
        'john@example.com',
        '+1-555-0123',
        '30',
        '1250.50',
        '4.5',
        'true',
        'A',
        '2024-01-15',
        '2024-01-15T14:30:00',
        '14:30',
        'https://example.com',
        'https://example.com/avatar.jpg',
        '#3B82F6',
        'important, sample, demo'
      ]
    ]

    const worksheet = XLSX.utils.aoa_to_sheet(templateData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Template')
    XLSX.writeFile(workbook, 'mydata-import-template.xlsx')
    toast.success('Template downloaded!')
  }

  if (currentStep === 'import') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6"
      >
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Import Successful!</h1>
          <p className="text-gray-600 mb-8">
            Your data has been successfully imported into the system.
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild>
              <Link href="/pages/mydata/list">View Data Table</Link>
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Import More Data
            </Button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-4 mb-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/pages/mydata">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Bulk Import</h1>
          <p className="mt-2 text-gray-600">
            Import data from Excel or CSV files with preview and validation
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={downloadTemplate}>
            <Download className="mr-2 h-4 w-4" />
            Download Template
          </Button>
        </div>
      </div>

      {/* Progress Steps */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            {['upload', 'preview', 'mapping', 'validate'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${['upload', 'preview', 'mapping', 'validate'].indexOf(currentStep) >= index 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-500'}
                `}>
                  {index + 1}
                </div>
                <span className={`ml-2 text-sm ${
                  ['upload', 'preview', 'mapping', 'validate'].indexOf(currentStep) >= index 
                    ? 'text-primary font-medium' 
                    : 'text-gray-500'
                }`}>
                  {step.charAt(0).toUpperCase() + step.slice(1)}
                </span>
                {index < 3 && <div className="w-12 h-px bg-gray-300 mx-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs value={currentStep} className="space-y-6">
        {/* Upload Tab */}
        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Upload File</span>
              </CardTitle>
              <CardDescription>
                Upload an Excel (.xlsx) or CSV file containing your data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="file-upload">Choose File</Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileUpload}
                  disabled={isProcessing}
                />
              </div>
              
              {isProcessing && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p>Processing file...</p>
                </div>
              )}

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">File Requirements:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Excel (.xlsx) or CSV format</li>
                  <li>• First row should contain column headers</li>
                  <li>• Required columns: Title, Description, Name, Email, Category</li>
                  <li>• Maximum 1000 rows per import</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preview Tab */}
        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileSpreadsheet className="h-5 w-5" />
                  <span>Data Preview</span>
                </div>
                <Button onClick={() => setCurrentStep('mapping')}>
                  Continue to Mapping
                </Button>
              </CardTitle>
              <CardDescription>
                Preview of the first 5 rows from your file
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {headers.map(header => (
                        <TableHead key={header}>{header}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.slice(0, 5).map((row, index) => (
                      <TableRow key={index}>
                        {headers.map(header => (
                          <TableCell key={header} className="max-w-[200px] truncate">
                            {String(row[header] || '')}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Showing 5 of {data.length} rows
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Mapping Tab */}
        <TabsContent value="mapping" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Column Mapping</span>
                </div>
                <Button onClick={validateData}>
                  Validate Data
                </Button>
              </CardTitle>
              <CardDescription>
                Map your file columns to the expected database fields
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EXPECTED_COLUMNS.map(col => (
                  <div key={col.key} className="space-y-2">
                    <Label className="flex items-center space-x-2">
                      <span>{col.label}</span>
                      {col.required && <Badge variant="destructive" className="text-xs">Required</Badge>}
                    </Label>
                    <Select
                      value={Object.keys(columnMapping).find(key => columnMapping[key] === col.key) || ''}
                      onValueChange={(value) => {
                        const newMapping = { ...columnMapping }
                        // Remove old mapping
                        Object.keys(newMapping).forEach(key => {
                          if (newMapping[key] === col.key) {
                            delete newMapping[key]
                          }
                        })
                        // Add new mapping
                        if (value) {
                          newMapping[value] = col.key
                        }
                        setColumnMapping(newMapping)
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select column" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">-- Not mapped --</SelectItem>
                        {headers.map(header => (
                          <SelectItem key={header} value={header}>
                            {header}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Validation Tab */}
        <TabsContent value="validate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {validationErrors.length === 0 ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  )}
                  <span>Validation Results</span>
                </div>
                {validationErrors.length === 0 && (
                  <Button onClick={handleImport} disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Importing...
                      </>
                    ) : (
                      'Start Import'
                    )}
                  </Button>
                )}
              </CardTitle>
              <CardDescription>
                {validationErrors.length === 0 
                  ? 'All data is valid and ready for import'
                  : `Found ${validationErrors.length} validation errors that need to be fixed`
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isProcessing && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Import Progress</span>
                    <span className="text-sm text-gray-500">{Math.round(importProgress)}%</span>
                  </div>
                  <Progress value={importProgress} />
                </div>
              )}

              {validationErrors.length > 0 && (
                <div className="space-y-4">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-medium text-red-900 mb-2">Validation Errors:</h4>
                    <div className="max-h-60 overflow-y-auto">
                      {validationErrors.map((error, index) => (
                        <div key={index} className="text-sm text-red-800 py-1">
                          Row {error.row}, {error.column}: {error.error}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => setCurrentStep('mapping')}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Mapping
                  </Button>
                </div>
              )}

              {validationErrors.length === 0 && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Ready to Import:</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• {data.length} rows will be imported</li>
                    <li>• All required fields are present</li>
                    <li>• Data format validation passed</li>
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
