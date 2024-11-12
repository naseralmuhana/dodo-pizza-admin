import { decimal, integer, pgTable, primaryKey } from "drizzle-orm/pg-core"

import { ingredient } from "@/db/schema/ingredient/schema"
import { size } from "@/db/schema/size/schema"
import { relations } from "drizzle-orm"

/**
 * Ingredient Sizes Table
 * Stores the prices of ingredients based on different product sizes (e.g., an ingredient may cost more for a large pizza compared to a small pizza).
 *
 * Composite Primary Key:
 * - `ingredientId` and `sizeId`: Together form a unique identifier, ensuring that each ingredient can have a different price for each size.
 *
 * Fields:
 * - `ingredientId`: Reference to the `ingredient` table.
 * - `sizeId`: Reference to the `size` table.
 * - `price`: The price of the ingredient for a specific size.
 */

export const ingredientSize = pgTable(
  "ingredients_sizes",
  {
    ingredientId: integer("ingredient_id")
      .references(() => ingredient.id, { onDelete: "cascade" })
      .notNull(),
    sizeId: integer("size_id")
      .references(() => size.id, { onDelete: "cascade" })
      .notNull(),
    price: decimal("price", { precision: 5, scale: 2 }).notNull(),
  },
  (table) => [primaryKey({ columns: [table.ingredientId, table.sizeId] })],
)

/**
 * Relations:
 * - `ingredient`: Many-to-one relationship, linking each size-price pair to a specific ingredient.
 * - `size`: Many-to-one relationship, linking each size-price pair to a specific size.
 */
export const ingredientSizeRelations = relations(ingredientSize, ({ one }) => ({
  ingredient: one(ingredient, {
    fields: [ingredientSize.ingredientId],
    references: [ingredient.id],
  }),
  size: one(size, {
    fields: [ingredientSize.sizeId],
    references: [size.id],
  }),
}))
