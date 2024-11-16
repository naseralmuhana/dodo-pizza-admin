"use client"

import { Row } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { useEffect, useState } from "react"

import { IconButton } from "@/components/icon-button"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useIsMobile } from "@/hooks/use-mobile"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row
}: DataTableRowActionsProps<TData>) {
  const isMobile = useIsMobile()
  const [hideExtraComponent, setHideExtraComponent] = useState(false)

  useEffect(() => {
    // Remove the hidden component based on `isMobile` after mount
    setHideExtraComponent(true)
  }, [isMobile])

  return (
    <>
      {!hideExtraComponent || isMobile ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted sm:hidden"
            >
              <MoreHorizontal />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
      {!hideExtraComponent || !isMobile ? (
        <div className="hidden items-center gap-x-2 sm:flex">
          <IconButton
            tooltipContent="edit"
            iconName="Edit"
            className="text-info"
          />
          <IconButton
            tooltipContent="delete"
            iconName="Trash"
            className="text-destructive"
          />
        </div>
      ) : null}
    </>
  )
}
