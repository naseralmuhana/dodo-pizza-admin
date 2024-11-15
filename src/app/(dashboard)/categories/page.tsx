import { AppDataTable } from "@/components/app-data-table"
import { columns } from "./columns"
import { db } from "@/db"

export default async function CategoriesPage() {
  const categories = await db.query.category.findMany()
  return (
    <>
      <AppDataTable columns={columns} data={categories} />
    </>
  )
}
