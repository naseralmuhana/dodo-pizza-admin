import { boolean, integer, pgTable, primaryKey } from "drizzle-orm/pg-core"
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm"

import { product } from "@/db/schema/product/schema"
import { ingredient } from "@/db/schema/ingredient/schema"

/**
 * Product Ingredients Table
 * Links products with ingredients, where each product can have base ingredients and extra ingredients (which may cost more).
 *
 * Composite Primary Key:
 * - `productId`, `ingredientId`, and `isBase`: The combination of product ID, ingredient ID, and whether the ingredient is a base or optional extra forms a unique identifier, including `isBase` in the composite key ensures that:
 *   - **Base ingredients** are not duplicated for the same product. Each base ingredient is recorded only once per product.
 *   - **Extra ingredients** are also not duplicated for the same product. If an ingredient is selected as an extra, it will only appear once per product as an extra.
 *   - **The same ingredient can be both a base and an extra**, but in separate records. This is possible because `isBase` distinguishes whether the ingredient is a mandatory base or an optional extra, and both scenarios are allowed without conflict.
 *
 * Fields:
 * - `productId`: Reference to the `product` table.
 * - `ingredientId`: Reference to the `ingredient` table.
 * - `isBase`: Boolean flag indicating if the ingredient is a base (false) or an extra (true).
 */

export const productIngredient = pgTable(
  "products_ingredients",
  {
    productId: integer("product_id")
      .references(() => product.id, {
        onDelete: "cascade",
      })
      .notNull(),
    ingredientId: integer("ingredient_id")
      .references(() => ingredient.id, { onDelete: "cascade" })
      .notNull(),
    isBase: boolean("is_base").notNull().default(false),
  },
  (table) => [
    primaryKey({
      columns: [table.productId, table.ingredientId, table.isBase],
    }),
  ],
)

/**
 * Relations:
 * - `product`: Many-to-one relationship, linking each product-ingredient pair to a specific product.
 * - `ingredient`: Many-to-one relationship, linking each product-ingredient pair to a specific ingredient.
 */
export const productIngredientRelations = relations(
  productIngredient,
  ({ one }) => ({
    product: one(product, {
      fields: [productIngredient.productId],
      references: [product.id],
    }),
    ingredient: one(ingredient, {
      fields: [productIngredient.ingredientId],
      references: [ingredient.id],
    }),
  }),
)
