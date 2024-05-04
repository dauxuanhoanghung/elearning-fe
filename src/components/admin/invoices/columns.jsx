import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "originalAmount",
    header: "Original Amount",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "method",
    header: "Method",
  },
  {
    accessorKey: "course",
    header: "Course",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <img
          src={row.original?.course.background}
          className="h-10 w-10 object-cover"
        />
        {row.original?.course.name}
      </div>
    ),
  },
  {
    accessorKey: "user",
    header: "Recipient",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <img
          src={row.original?.user.avatar}
          className="h-10 w-10 rounded-full object-cover"
        />
        {row.original?.user.firstName}
      </div>
    ),
  },
  {
    accessorKey: "payer",
    header: "Payer",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <img
          src={row.original?.user.avatar}
          className="h-10 w-10 rounded-full object-cover"
        />
        {row.original?.user.firstName}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
