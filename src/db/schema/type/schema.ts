import { relations } from "drizzle-orm"
import { index, integer, pgTable, varchar } from "drizzle-orm/pg-core"

import { productSizeType } from "@/db/schema/product-size-type/schema"

/**
 * Type Table
 * Represents the types available for products (e.g., Thin, Original for pizzas).
 *
 * Fields:
 * - `id`: Unique identifier for each type.
 * - `name`: Name of the type (e.g., "Thin", "Original").
 */
export const type = pgTable(
  "types",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 256 }).notNull().unique(),
  },
  (table) => [index("types_name_idx").on(table.name)],
)

/**
 * Relationships:
 * - `productsSizesTypes`: Many-to-many relationship with `products`, specifying the pricing for different product sizes and types.
 *   This allows querying the products available in each type.
 */
export const typeRelations = relations(type, ({ many }) => ({
  productsSizesTypes: many(productSizeType),
}))
