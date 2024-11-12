import { relations } from "drizzle-orm"
import { index, integer, pgTable, varchar } from "drizzle-orm/pg-core"

import { product } from "@/db/schema/product/schema"

/**
 * Categories Table
 * Represents different categories of products (e.g., Pizza, Drinks, Snacks) on the menu.
 *
 * Fields:
 * - `id`: Unique identifier for each category.
 * - `name`: The name of the category (e.g., "Pizza"), unique across all categories.
 */
export const category = pgTable(
  "categories",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 256 }).notNull().unique(),
  },
  (table) => [index("categories_name_idx").on(table.name)],
)

/**
 * Relations:
 * - `products`: One-to-many relationship, where each category can have multiple products.
 *   This allows us to query the products that belong to a specific category.
 */
export const categoryRelations = relations(category, ({ many }) => ({
  products: many(product),
}))
