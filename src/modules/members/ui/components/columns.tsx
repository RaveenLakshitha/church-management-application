import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { JsonValue } from '@/generated/prisma/runtime/library'

export type Member = {
  id: number
  email: string | null
  state: string | null
  member_tags: JsonValue
  additional_info: JsonValue | null
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

export const columns: ColumnDef<Member>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: 'Name',
    accessorFn: (row) => `${row.first_name || ''} ${row.middle_name || ''} ${row.last_name || ''}`.trim(),
    id: 'name',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="rounded-sm">
          <AvatarImage src={row.original.profile_photo || ''} alt={`${row.original.first_name || 'N/A'} ${row.original.last_name || ''}`.trim()} />
          <AvatarFallback className="text-xs">
            {`${row.original.first_name?.[0] || ''}${row.original.last_name?.[0] || ''}`.toUpperCase() || 'N/A'}
          </AvatarFallback>
        </Avatar>
        <div className="font-medium">{row.getValue('name') || 'N/A'}</div>
      </div>
    ),
    meta: {
      filterVariant: 'text',
    },
  },
  {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    accessorKey: 'email',
    cell: ({ row }) => <div className="lowercase">{row.getValue('email') || 'N/A'}</div>,
    meta: {
      filterVariant: 'text',
    },
  },
  {
    header: 'Membership Status',
    accessorKey: 'membership_status',
    cell: ({ row }) => {
      const status = row.getValue('membership_status') as string
      const styles = {
        Active: 'bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5',
        Inactive: 'bg-destructive/10 [a&]:hover:bg-destructive/5 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive',
        Suspended: 'bg-amber-600/10 text-amber-600 focus-visible:ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-400 dark:focus-visible:ring-amber-400/40 [a&]:hover:bg-amber-600/5 dark:[a&]:hover:bg-amber-400/5',
      }[status] || 'bg-gray-600/10 text-gray-600'
      return (
        <Badge className={cn('rounded-full border-none focus-visible:outline-none', styles)}>
          {status || 'N/A'}
        </Badge>
      )
    },
    meta: {
      filterVariant: 'select',
    },
    enableSorting: false,
  },
  {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created At
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    accessorKey: 'created_at',
    cell: ({ row }) => {
      const date = row.getValue('created_at') as Date | null
      return <div>{date ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(date) : 'N/A'}</div>
    },
    meta: {
      filterVariant: 'range',
    },
    sortingFn: 'datetime',
  },
  {
    header: 'Mobile Number',
    accessorKey: 'mobile_number',
    cell: ({ row }) => <div>{row.getValue('mobile_number') || 'N/A'}</div>,
    meta: {
      filterVariant: 'text',
    },
    enableSorting: false,
  }
]