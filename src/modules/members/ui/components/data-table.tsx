// data-table.tsx
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
} from "@tanstack/react-table"
import { ChevronDown, SearchIcon, Eye } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Define JsonValue type
type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }

// Define Member type
export type Member = {
  id: number
  email: string | null
  state: string | null
  mobile_number: string | null
  member_id: string
  first_name: string | null
  middle_name: string | null
  last_name: string | null
  gender: string | null
  birthday: Date | null
  address: string | null
  address_line_1: string | null
  address_line_2: string | null
  city: string | null
  zip_code: string | null
  membership_status: string
  profile_photo: string | null
  qr_code: string | null
  created_at: Date
  updated_at: Date
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  title?: string
  onRowClick?: (row: TData) => void // Add onRowClick prop
}

export function DataTable<TData, TValue>({ columns, data, title, onRowClick }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "email", desc: false },
  ])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  // Custom global filter function
  const globalFilterFn = (row: any, columnId: string, filterValue: string) => {
    const searchValue = filterValue.toLowerCase()
    const searchableColumns = [
      "name",
      "email",
      "mobile_number",
      "membership_status",
      "created_at",
    ]

    return searchableColumns.some((column) => {
      const value = row.getValue(column)
      if (!value) return false

      if (column === "created_at") {
        return new Date(value).toLocaleDateString().toLowerCase().includes(searchValue)
      }
      return String(value).toLowerCase().includes(searchValue)
    })
  }

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    enableSortingRemoval: false,
  })

  return (
    <div className="w-full space-y-6 p-8 bg-background min-h-screen">
      {/* Header Section */}
      <div className="space-y-4">
        {/* Controls Section */}
        <div className="flex flex-col sm:flex-row gap-3 p-4 bg-background/70 backdrop-blur-sm rounded-xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
          {/* Global Search Input */}
          <div className="relative flex-1 max-w-md">
            <Input
              className="peer ps-10 h-9 bg-background/80 border-slate-300/50 dark:border-slate-600/50 rounded-lg shadow-sm focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 transition-all duration-200 placeholder:text-slate-400"
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search across all columns..."
              type="text"
            />
            <div className="text-slate-400 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
              <SearchIcon size={16} />
            </div>
          </div>
          
          {/* Column Visibility Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="h-9 px-4 bg-background/80 border-slate-300/50 dark:border-slate-600/50 rounded-lg hover:bg-background/90 transition-all duration-200 shadow-sm"
              >
                <Eye className="mr-2 h-4 w-4" />
                View Options
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-background/95 backdrop-blur-sm border-slate-200/50 dark:border-slate-700/50 rounded-xl shadow-xl">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize hover:bg-background/90 rounded-lg mx-1"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-background/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow 
                key={headerGroup.id} 
                className="bg-background/80 border-b border-slate-200/50 dark:border-slate-600/50 hover:bg-background/90 transition-colors"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead 
                    key={header.id} 
                    className="text-slate-700 dark:text-slate-300 font-semibold py-4 px-6"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow 
                  key={row.id} 
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b border-slate-200/30 dark:border-slate-700/30 hover:bg-background/90 transition-all duration-200 group cursor-pointer"
                  onClick={() => onRowClick && onRowClick(row.original)} // Add onClick handler
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell 
                      key={cell.id} 
                      className="py-4 px-6 text-slate-600 dark:text-slate-300"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell 
                  colSpan={columns.length} 
                  className="h-32 text-center text-slate-500 dark:text-slate-400"
                >
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-background/80 flex items-center justify-center">
                      <SearchIcon className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="font-medium">No results found</p>
                      <p className="text-sm text-slate-400 dark:text-slate-500">Try adjusting your search criteria</p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col space-y-4 p-6 bg-background/70 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Rows per page</p>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value))
                }}
                className="h-10 w-20 rounded-lg border border-slate-300/50 dark:border-slate-600/50 bg-background/80 px-3 py-1 text-sm text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-slate-500/20 focus:border-slate-500 transition-all"
              >
                {[5, 10, 20, 30, 40].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center justify-center text-sm font-medium text-slate-700 dark:text-slate-300 bg-background/80 px-4 py-2 rounded-lg order-2 sm:order-1">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 order-1 sm:order-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="h-10 px-3 sm:px-4 bg-background/80 border-slate-300/50 dark:border-slate-600/50 rounded-lg hover:bg-background/90 disabled:opacity-50 transition-all duration-200 text-xs sm:text-sm"
            >
              First
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-10 px-3 sm:px-4 bg-background/80 border-slate-300/50 dark:border-slate-600/50 rounded-lg hover:bg-background/90 disabled:opacity-50 transition-all duration-200 text-xs sm:text-sm"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-10 px-3 sm:px-4 bg-background/80 border-slate-300/50 dark:border-slate-600/50 rounded-lg hover:bg-background/90 disabled:opacity-50 transition-all duration-200 text-xs sm:text-sm"
            >
              Next
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="h-10 px-3 sm:px-4 bg-background/80 border-slate-300/50 dark:border-slate-600/50 rounded-lg hover:bg-background/90 disabled:opacity-50 transition-all duration-200 text-xs sm:text-sm"
            >
              Last
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}