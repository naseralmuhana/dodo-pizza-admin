"use client"

import type { ColumnDef } from "@tanstack/react-table"

import { DataTable } from "@/components/data-table"
import { useDataTable } from "@/hooks/use-data-table"
import { DataTableToolbar } from "./data-table/data-table-toolbar"

interface AppDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export const AppDataTable = <TData, TValue>({
  columns,
  data,
}: AppDataTableProps<TData, TValue>) => {
  const { table } = useDataTable({ columns, data })
  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} />
    </DataTable>
  )
}
