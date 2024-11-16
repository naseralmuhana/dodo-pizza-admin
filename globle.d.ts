import { TableMeta } from "@tanstack/react-table"

declare module "@tanstack/react-table" {
  interface TableMeta<TData> {
    tableName: string
  }
}
