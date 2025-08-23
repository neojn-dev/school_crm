"use client"

import { useState, useEffect } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { 
  ChevronDown, 
  Search, 
  Settings2, 
  Download, 
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey?: string
  onRefresh?: () => void
  onExport?: (format: 'csv' | 'excel') => void
  isLoading?: boolean
  pagination?: {
    pageIndex: number
    pageSize: number
    pageCount: number
    total: number
  }
  onPaginationChange?: (pagination: { pageIndex: number; pageSize: number }) => void
  onEdit?: (id: string) => void
  onDelete?: (id: string) => Promise<void>
  searchPlaceholder?: string
  exportData?: () => void
  loading?: boolean
  meta?: Record<string, any>
}



export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  onRefresh,
  onExport,
  isLoading = false,
  pagination,
  onPaginationChange,
  onEdit,
  onDelete,
  searchPlaceholder,
  exportData,
  loading,
  meta,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState("")
  const [density, setDensity] = useState<"comfortable" | "compact" | "normal">("normal")
  const [tableReady, setTableReady] = useState(false)

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    meta,
    initialState: {
      pagination: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      pagination: pagination ? {
        pageIndex: pagination.pageIndex || 0,
        pageSize: pagination.pageSize || 10,
      } : {
        pageIndex: 0,
        pageSize: 10,
      },
    },
    pageCount: pagination?.pageCount ?? -1,
    manualPagination: !!pagination,
  })
  


  // Ensure table is ready before using its methods
  useEffect(() => {
    if (table && data && data.length > 0) {
      // Small delay to ensure table is fully initialized
      const timer = setTimeout(() => {
        setTableReady(true)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [table, data])

  const handlePaginationChange = (newPagination: { pageIndex: number; pageSize: number }) => {
    if (onPaginationChange) {
      onPaginationChange(newPagination)
    }
  }

  // Helper function to safely get current page size
  const getCurrentPageSize = () => {
    try {
      if (pagination?.pageSize !== undefined) {
        return pagination.pageSize
      }
      if (tableReady) {
        const tableState = table.getState()
        if (tableState?.pagination?.pageSize !== undefined) {
          return tableState.pagination.pageSize
        }
      }
      return 10
    } catch {
      return 10
    }
  }

  // Helper function to safely get current page index
  const getCurrentPageIndex = () => {
    try {
      if (pagination?.pageIndex !== undefined) {
        return pagination.pageIndex
      }
      if (tableReady) {
        const tableState = table.getState()
        if (tableState?.pagination?.pageIndex !== undefined) {
          return tableState.pagination.pageIndex
        }
      }
      return 0
    } catch {
      return 0
    }
  }

  // Helper function to safely get current page count
  const getCurrentPageCount = () => {
    try {
      if (pagination?.pageCount !== undefined) {
        return pagination.pageCount
      }
      if (tableReady) {
        const pageCount = table.getPageCount()
        if (pageCount !== undefined && pageCount > 0) {
          return pageCount
        }
      }
      return 1
    } catch {
      return 1
    }
  }

  // Helper function to check if table is ready
  const isTableReady = () => {
    try {
      return table && typeof table.getState === 'function' && typeof table.getPageCount === 'function'
    } catch {
      return false
    }
  }

  // Safe wrapper for table.getCanPreviousPage()
  const safeGetCanPreviousPage = () => {
    try {
      if (tableReady) {
        return table.getCanPreviousPage()
      }
      return false
    } catch {
      return false
    }
  }

  // Safe wrapper for table.getCanNextPage()
  const safeGetCanNextPage = () => {
    try {
      if (tableReady) {
        return table.getCanNextPage()
      }
      return false
    } catch {
      return false
    }
  }

  // Safe wrapper for table row model access
  const safeGetRowModel = () => {
    try {
      if (tableReady) {
        return table.getRowModel()
      }
      return { rows: [] }
    } catch {
      return { rows: [] }
    }
  }

  // Safe wrapper for filtered row model access
  const safeGetFilteredRowModel = () => {
    try {
      if (tableReady) {
        return table.getFilteredRowModel()
      }
      return { rows: [] }
    } catch {
      return { rows: [] }
    }
  }

  // Safe wrapper for filtered selected row model access
  const safeGetFilteredSelectedRowModel = () => {
    try {
      if (tableReady) {
        return table.getFilteredSelectedRowModel()
      }
      return { rows: [] }
    } catch {
      return { rows: [] }
    }
  }

  const densityClasses = {
    comfortable: "py-4",
    normal: "py-2",
    compact: "py-1"
  }



  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          {/* Global Search */}
          <div className="relative max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder || "Search all columns..."}
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(String(event.target.value))}
              className="pl-8"
            />
          </div>



          {/* Selected Count */}
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <Badge variant="secondary">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected
            </Badge>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {/* Density Control */}
          <Select value={density} onValueChange={(value: any) => setDensity(value)}>
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="comfortable">Comfortable</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="compact">Compact</SelectItem>
            </SelectContent>
          </Select>

          {/* Column Visibility */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                <Settings2 className="mr-2 h-4 w-4" />
                View
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Export */}
          {onExport && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuCheckboxItem onClick={() => onExport('csv')}>
                  Export as CSV
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem onClick={() => onExport('excel')}>
                  Export as Excel
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Refresh */}
          {onRefresh && (
            <Button variant="outline" onClick={onRefresh} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {(() => {
              if (isLoading || loading) {
                return (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      Loading...
                    </TableCell>
                  </TableRow>
                )
              }
              
              // Use proper React Table rendering when table is available
              if (table && table.getRowModel && typeof table.getRowModel === 'function') {
                try {
                  const rowModel = table.getRowModel()
                  if (rowModel && rowModel.rows && rowModel.rows.length > 0) {
                    return rowModel.rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected && row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells && row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} className={densityClasses[density]}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  }
                } catch (error) {
                  console.warn('Error getting row model:', error)
                }
              }
              

              
              // Fallback for when table is not ready but we have data
              if (data && data.length > 0) {
                return data.map((item: any, index: number) => (
                  <TableRow key={item.id || index}>
                    {columns.map((column, colIndex) => (
                      <TableCell key={colIndex} className={densityClasses[density]}>
                        <span>{item[(column as any).accessorKey] || ''}</span>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              }
              
              return (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )
            })()}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {safeGetFilteredSelectedRowModel().rows.length} of{" "}
          {safeGetFilteredRowModel().rows.length} row(s) selected.
          {pagination && (
            <span className="ml-4">
              Page {getCurrentPageIndex() + 1} of {getCurrentPageCount()} ({pagination.total || safeGetFilteredRowModel().rows.length} total)
            </span>
          )}
        </div>

        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${getCurrentPageSize()}`}
              onValueChange={(value) => {
                const pageSize = Number(value)
                if (pagination && onPaginationChange) {
                  handlePaginationChange({ pageIndex: 0, pageSize })
                } else if (isTableReady()) {
                  table.setPageSize(pageSize)
                }
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={getCurrentPageSize()} />
              </SelectTrigger>
              <SelectContent side="top">
                {[5, 10, 20, 50, 100].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => {
                if (pagination && onPaginationChange) {
                  handlePaginationChange({ pageIndex: 0, pageSize: getCurrentPageSize() })
                } else if (isTableReady()) {
                  table.setPageIndex(0)
                }
              }}
              disabled={pagination ? getCurrentPageIndex() === 0 : !safeGetCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => {
                if (pagination && onPaginationChange) {
                  handlePaginationChange({ 
                    pageIndex: getCurrentPageIndex() - 1, 
                    pageSize: getCurrentPageSize()
                  })
                } else if (isTableReady()) {
                  table.previousPage()
                }
              }}
              disabled={pagination ? getCurrentPageIndex() === 0 : !safeGetCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => {
                if (pagination && onPaginationChange) {
                  handlePaginationChange({ 
                    pageIndex: getCurrentPageIndex() + 1, 
                    pageSize: getCurrentPageSize()
                  })
                } else if (isTableReady()) {
                  table.nextPage()
                }
              }}
              disabled={pagination ? getCurrentPageIndex() >= getCurrentPageCount() - 1 : !safeGetCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => {
                if (pagination && onPaginationChange) {
                  handlePaginationChange({ 
                    pageIndex: getCurrentPageCount() - 1, 
                    pageSize: getCurrentPageSize()
                  })
                } else if (isTableReady()) {
                  table.setPageIndex(table.getPageCount() - 1)
                }
              }}
              disabled={pagination ? getCurrentPageIndex() >= getCurrentPageCount() - 1 : !safeGetCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
