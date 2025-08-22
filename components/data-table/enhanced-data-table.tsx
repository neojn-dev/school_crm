"use client"

import { useState } from "react"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { 
  ChevronDown, 
  Search, 
  Settings2, 
  Download, 
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  X,
  Plus
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
}

interface FilterState {
  title: string
  name: string
  email: string
  category: string
  isActive: string
  ageRange: [number, number]
  balanceRange: [number, number]
  ratingRange: [number, number]
  dateFrom: string
  dateTo: string
  tags: string[]
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
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState("")
  const [density, setDensity] = useState<"comfortable" | "compact" | "normal">("normal")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    title: "",
    name: "",
    email: "",
    category: "all",
    isActive: "all",
    ageRange: [18, 80],
    balanceRange: [0, 10000],
    ratingRange: [1, 5],
    dateFrom: "",
    dateTo: "",
    tags: []
  })

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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      pagination: pagination ? {
        pageIndex: pagination.pageIndex,
        pageSize: pagination?.pageSize || 10,
      } : undefined,
    },
    pageCount: pagination?.pageCount ?? -1,
    manualPagination: !!pagination,
  })

  const handlePaginationChange = (newPagination: { pageIndex: number; pageSize: number }) => {
    if (onPaginationChange) {
      onPaginationChange(newPagination)
    }
  }

  const densityClasses = {
    comfortable: "py-4",
    normal: "py-2",
    compact: "py-1"
  }

  const applyFilters = () => {
    const newColumnFilters: ColumnFiltersState = []
    
    // Apply text filters
    if (filters.title) {
      newColumnFilters.push({ id: "title", value: filters.title })
    }
    if (filters.name) {
      newColumnFilters.push({ id: "name", value: filters.name })
    }
    if (filters.email) {
      newColumnFilters.push({ id: "email", value: filters.email })
    }
    
    // Apply dropdown filters
    if (filters.category && filters.category !== "all") {
      newColumnFilters.push({ id: "category", value: filters.category })
    }
    if (filters.isActive && filters.isActive !== "all") {
      newColumnFilters.push({ id: "isActive", value: filters.isActive })
    }
    
    // Apply range filters
    if (filters.ageRange[0] !== 18 || filters.ageRange[1] !== 80) {
      newColumnFilters.push({ id: "age", value: filters.ageRange })
    }
    if (filters.balanceRange[0] !== 0 || filters.balanceRange[1] !== 10000) {
      newColumnFilters.push({ id: "balance", value: filters.balanceRange })
    }
    if (filters.ratingRange[0] !== 1 || filters.ratingRange[1] !== 5) {
      newColumnFilters.push({ id: "rating", value: filters.ratingRange })
    }
    
    // Apply date filters
    if (filters.dateFrom || filters.dateTo) {
      newColumnFilters.push({ id: "createdAt", value: { from: filters.dateFrom, to: filters.dateTo } })
    }
    
    setColumnFilters(newColumnFilters)
    setShowFilters(false)
  }

  const clearAllFilters = () => {
    setFilters({
      title: "",
      name: "",
      email: "",
      category: "all",
      isActive: "all",
      ageRange: [18, 80],
      balanceRange: [0, 10000],
      ratingRange: [1, 5],
      dateFrom: "",
      dateTo: "",
      tags: []
    })
    setGlobalFilter("")
    setColumnFilters([])
  }

  const activeFiltersCount = Object.values(filters).filter(value => {
    if (Array.isArray(value)) {
      return value[0] !== (value === filters.ageRange ? 18 : value === filters.balanceRange ? 0 : 1) || 
             value[1] !== (value === filters.ageRange ? 80 : value === filters.balanceRange ? 10000 : 5)
    }
    return value !== "" && value !== "all"
  }).length + (globalFilter ? 1 : 0)

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

          {/* Add Filters Button */}
          <Dialog open={showFilters} onOpenChange={setShowFilters}>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Add Filters</span>
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Advanced Filters</DialogTitle>
                <DialogDescription>
                  Set specific criteria to filter your data
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Basic Text Filters */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title-filter">Title</Label>
                    <Input
                      id="title-filter"
                      placeholder="Filter by title..."
                      value={filters.title}
                      onChange={(e) => setFilters(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name-filter">Name</Label>
                    <Input
                      id="name-filter"
                      placeholder="Filter by name..."
                      value={filters.name}
                      onChange={(e) => setFilters(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-filter">Email</Label>
                    <Input
                      id="email-filter"
                      placeholder="Filter by email..."
                      value={filters.email}
                      onChange={(e) => setFilters(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category-filter">Category</Label>
                    <Select value={filters.category || "all"} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value === "all" ? "" : value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="A">Category A</SelectItem>
                        <SelectItem value="B">Category B</SelectItem>
                        <SelectItem value="C">Category C</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Status and Rating */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status-filter">Status</Label>
                    <Select value={filters.isActive || "all"} onValueChange={(value) => setFilters(prev => ({ ...prev, isActive: value === "all" ? "" : value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="true">Active</SelectItem>
                        <SelectItem value="false">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Rating Range</Label>
                    <div className="px-2">
                      <Slider
                        value={filters.ratingRange}
                        onValueChange={(value) => setFilters(prev => ({ ...prev, ratingRange: value as [number, number] }))}
                        max={5}
                        min={1}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>{filters.ratingRange[0]}</span>
                        <span>{filters.ratingRange[1]}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Age and Balance Ranges */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Age Range</Label>
                    <div className="px-2">
                      <Slider
                        value={filters.ageRange}
                        onValueChange={(value) => setFilters(prev => ({ ...prev, ageRange: value as [number, number] }))}
                        max={80}
                        min={18}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>{filters.ageRange[0]} years</span>
                        <span>{filters.ageRange[1]} years</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Balance Range</Label>
                    <div className="px-2">
                      <Slider
                        value={filters.balanceRange}
                        onValueChange={(value) => setFilters(prev => ({ ...prev, balanceRange: value as [number, number] }))}
                        max={10000}
                        min={0}
                        step={100}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>${filters.balanceRange[0]}</span>
                        <span>${filters.balanceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date-from">Date From</Label>
                    <Input
                      id="date-from"
                      type="date"
                      value={filters.dateFrom}
                      onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date-to">Date To</Label>
                    <Input
                      id="date-to"
                      type="date"
                      value={filters.dateTo}
                      onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                    />
                  </div>
                </div>

                {/* Filter Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <Button variant="outline" onClick={clearAllFilters}>
                    <X className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => setShowFilters(false)}>
                      Cancel
                    </Button>
                    <Button onClick={applyFilters}>
                      Apply Filters
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={densityClasses[density]}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={densityClasses[density]}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {isLoading ? "Loading..." : "No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-2">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
          {pagination && (
            <span className="ml-4">
              Page {pagination.pageIndex + 1} of {pagination.pageCount} ({pagination.total} total)
            </span>
          )}
        </div>

        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${pagination?.pageSize || table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                const pageSize = Number(value)
                if (pagination && onPaginationChange) {
                  handlePaginationChange({ pageIndex: 0, pageSize })
                } else {
                  table.setPageSize(pageSize)
                }
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
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
                  handlePaginationChange({ pageIndex: 0, pageSize: pagination?.pageSize || 10 })
                } else {
                  table.setPageIndex(0)
                }
              }}
              disabled={pagination ? pagination.pageIndex === 0 : !table.getCanPreviousPage()}
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
                    pageIndex: pagination.pageIndex - 1, 
                    pageSize: pagination?.pageSize || 10
                  })
                } else {
                  table.previousPage()
                }
              }}
              disabled={pagination ? pagination.pageIndex === 0 : !table.getCanPreviousPage()}
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
                    pageIndex: pagination.pageIndex + 1, 
                    pageSize: pagination?.pageSize || 10
                  })
                } else {
                  table.nextPage()
                }
              }}
              disabled={pagination ? pagination.pageIndex >= pagination.pageCount - 1 : !table.getCanNextPage()}
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
                    pageIndex: pagination.pageCount - 1, 
                    pageSize: pagination?.pageSize || 10
                  })
                } else {
                  table.setPageIndex(table.getPageCount() - 1)
                }
              }}
              disabled={pagination ? pagination.pageIndex >= pagination.pageCount - 1 : !table.getCanNextPage()}
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
