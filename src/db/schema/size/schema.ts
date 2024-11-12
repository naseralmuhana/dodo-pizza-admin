import { relations } from "drizzle-orm"
import { index, integer, pgTable, varchar } from "drizzle-orm/pg-core"

import { ingredientSize } from "@/db/schema/ingredient-size/schema"
import { productSizeType } from "@/db/schema/product-size-type/schema"

/**
 * Size Table
 * Represents the sizes available for products (e.g., Small, Medium, Large for pizzas).
 *
 * Fields:
 * - `id`: Unique identifier for each size.
 * - `name`: Name of the size (e.g., "Small", "Medium", "Large").
 */
export const size = pgTable(
  "sizes",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 256 }).notNull().unique(),
  },
  (table) => [index("sizes_name_idx").on(table.name)],
)

/**
 * Relations:
 * - `productsSizesTypes`: Many-to-many relationship with `products`, specifying the pricing for different product sizes and types.
 *   This allows querying the products available in each size.
 */
export const sizeRelations = relations(size, ({ many }) => ({
  ingredientsSizes: many(ingredientSize),
  productsSizesTypes: many(productSizeType),
}))
