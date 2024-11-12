import { sql, Table } from "drizzle-orm"

import { db, DB } from "@/db"
import * as schema from "@/db/schema"
import * as data from "@/db/schema/data"
import { seedTable, stringifyPrice } from "./helper"

/**
 * Resets a table by truncating its data, resetting its primary key sequence,
 * and cascading deletions to maintain referential integrity.
 * @param db - The database instance.
 * @param table - The table to reset.
 */
const resetTable = async (db: DB, table: Table) => {
  return db.execute(sql`truncate table ${table} restart identity cascade`)
}

/**
 * Main function to reset all tables and seed them with initial data.
 * Resets tables in dependency order to avoid foreign key issues.
 */
async function main() {
  console.log("Starting database reset and seed...")

  const tablesInOrder = [
    schema.category,
    schema.size,
    schema.type,
    schema.ingredient,
    schema.product,
    schema.productSizeType,
    schema.productIngredient,
    schema.ingredientSize,
  ]

  // Reset each table
  for (const table of tablesInOrder) {
    await resetTable(db, table)
  }

  console.log("All tables reset successfully.\n")

  await seedTable({
    db,
    table: schema.category,
    data: data.categories,
    tableName: "category",
  })
  await seedTable({
    db,
    table: schema.size,
    data: data.sizes,
    tableName: "size",
  })
  await seedTable({
    db,
    table: schema.type,
    data: data.types,
    tableName: "type",
  })
  await seedTable({
    db,
    table: schema.ingredient,
    data: data.ingredients,
    tableName: "ingredient",
  })
  await seedTable({
    db,
    table: schema.product,
    data: data.products,
    tableName: "product",
  })
  // Only apply stringifyPrice to data that needs it (data with prices)
  await seedTable({
    db,
    table: schema.productSizeType,
    data: stringifyPrice(data.productsSizesTypes),
    tableName: "category",
  })
  await seedTable({
    db,
    table: schema.productIngredient,
    data: data.productsIngredients,
    tableName: "category",
  })
  // Only apply stringifyPrice to data that needs it (data with prices)
  await seedTable({
    db,
    table: schema.ingredientSize,
    data: stringifyPrice(data.ingredientsSizes),
    tableName: "category",
  })
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(async () => {
    console.log("Seeding done!")
    process.exit(0)
  })
