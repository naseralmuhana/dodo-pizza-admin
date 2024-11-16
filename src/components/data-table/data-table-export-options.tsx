import { ChevronsUpDown, Download } from "lucide-react"
import Link from "next/link"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const availableFormats = ["xlsx", "csv", "txt", "json", "html"]

interface DataTableExportOptions {}

export function DataTableExportOptions({}: DataTableExportOptions) {
  const lowerCaseTableName = "categories".toLowerCase()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="ml-auto flex h-8">
          <Download />
          Export
          <ChevronsUpDown className="shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableFormats.map((format) => (
          <Link
            key={format}
            href={`/api/tables/${lowerCaseTableName}?format=${format}`}
          >
            <DropdownMenuItem className="cursor-pointer capitalize">
              {format}
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
