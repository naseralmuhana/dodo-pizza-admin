import { Check, ChevronsUpDown, Settings2 } from "lucide-react"
import { type Table as TanstackTable } from "@tanstack/react-table"

import { cn, toTitleCase } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"

interface DataTableViewOptionsProps<TData> {
  table: TanstackTable<TData>
}

export function DataTableViewOptions<TData>({
  table
}: DataTableViewOptionsProps<TData>) {
  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          aria-label="Toggle columns"
          role="combobox"
          size="sm"
          className="ml-auto h-8"
        >
          <Settings2 />
          View
          <ChevronsUpDown className="shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="end">
        <Command>
          <CommandInput placeholder="Search columns..." />
          <CommandList>
            <CommandEmpty>No columns found.</CommandEmpty>
            <CommandGroup>
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <CommandItem
                      key={column.id}
                      onSelect={() =>
                        column.toggleVisibility(!column.getIsVisible())
                      }
                    >
                      <span className="truncate">{toTitleCase(column.id)}</span>
                      <Check
                        className={cn(
                          "ml-auto",
                          column.getIsVisible() ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  )
                })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
