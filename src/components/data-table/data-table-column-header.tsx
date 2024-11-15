"use client"

import { SelectIcon } from "@radix-ui/react-select"
import { type Column } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectSeparator,
} from "@/components/ui/select"

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort() && !column.getCanHide()) {
    return <div className={cn(className)}>{title}</div>
  }

  const ascValue = `${column.id}-asc`
  const descValue = `${column.id}-desc`
  const hideValue = `${column.id}-hide`

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Select
        value={
          column.getIsSorted() === "desc"
            ? descValue
            : column.getIsSorted() === "asc"
              ? ascValue
              : undefined
        }
        onValueChange={(value) => {
          if (value === ascValue) column.toggleSorting(false)
          else if (value === descValue) column.toggleSorting(true)
          else if (value === hideValue) column.toggleVisibility(false)
        }}
      >
        <SelectTrigger
          aria-label={
            column.getIsSorted() === "desc"
              ? "Sorted descending. Click to sort ascending."
              : column.getIsSorted() === "asc"
                ? "Sorted ascending. Click to sort descending."
                : "Not sorted. Click to sort ascending."
          }
          className="-ml-4 h-8 w-fit border-none bg-transparent hover:bg-accent hover:text-accent-foreground data-[state=open]:bg-accent [&>svg:last-child]:hidden"
        >
          {title}
          <SelectIcon asChild>
            {column.getCanSort() && column.getIsSorted() === "desc" ? (
              <ArrowDown className="ml-1.5 size-4" aria-hidden="true" />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp className="ml-1.5 size-4" aria-hidden="true" />
            ) : (
              <ChevronsUpDown className="ml-1.5 size-4" aria-hidden="true" />
            )}
          </SelectIcon>
        </SelectTrigger>
        <SelectContent align="start">
          {column.getCanSort() && (
            <>
              <SelectItem value={ascValue}>
                <span className="flex items-center">
                  <ArrowUp
                    className="mr-2 size-3.5 text-muted-foreground/70"
                    aria-hidden="true"
                  />
                  Asc
                </span>
              </SelectItem>
              <SelectItem value={descValue}>
                <span className="flex items-center">
                  <ArrowDown
                    className="mr-2 size-3.5 text-muted-foreground/70"
                    aria-hidden="true"
                  />
                  Desc
                </span>
              </SelectItem>
            </>
          )}
          {column.getCanHide() && (
            <>
              <SelectSeparator />
              <SelectItem value={hideValue}>
                <span className="flex items-center">
                  <EyeOff
                    className="mr-2 size-3.5 text-muted-foreground/70"
                    aria-hidden="true"
                  />
                  Hide
                </span>
              </SelectItem>
            </>
          )}
        </SelectContent>
      </Select>
    </div>
  )
}

// import { Column } from "@tanstack/react-table"
// import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from "lucide-react"

// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// interface DataTableColumnHeaderProps<TData, TValue>
//   extends React.HTMLAttributes<HTMLDivElement> {
//   column: Column<TData, TValue>
//   title: string
// }

// export function DataTableColumnHeader<TData, TValue>({
//   column,
//   title,
//   className,
// }: DataTableColumnHeaderProps<TData, TValue>) {
//   if (!column.getCanSort()) {
//     return <div className={cn(className)}>{title}</div>
//   }

//   return (
//     <div className={cn("flex items-center space-x-2", className)}>
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button
//             variant="ghost"
//             size="sm"
//             className="-ml-3 h-8 data-[state=open]:bg-accent"
//           >
//             <span>{title}</span>
//             {column.getIsSorted() === "desc" ? (
//               <ArrowDown />
//             ) : column.getIsSorted() === "asc" ? (
//               <ArrowUp />
//             ) : (
//               <ChevronsUpDown />
//             )}
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="start">
//           <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
//             <ArrowUp className="h-3.5 w-3.5 text-muted-foreground/70" />
//             Asc
//           </DropdownMenuItem>
//           <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
//             <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/70" />
//             Desc
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
//             <EyeOff className="h-3.5 w-3.5 text-muted-foreground/70" />
//             Hide
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   )
// }
