import { relations } from "drizzle-orm"
import {
  index,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"

import { category } from "@/db/schema/category/schema"
import { productIngredient } from "@/db/schema/product-ingredient/schema"
import { productSizeType } from "@/db/schema/product-size-type/schema"

/**
 * Products Table
 * Represents the different products (e.g., pizzas, drinks) available for sale in the restaurant.
 * Each product belongs to a specific category.
 *
 * Fields:
 * - `id`: Unique identifier for each product.
 * - `name`: Name of the product (e.g., "Chicken BBQ Pizza").
 * - `categoryId`: Reference to the category to which the product belongs (e.g., Pizza, Drinks).
 * - `createdAt`: Timestamp for when the product was created.
 * - `updatedAt`: Timestamp for when the product was last updated.
 */

export const product = pgTable(
  "products",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 256 }).notNull().unique(),
    categoryId: integer()
      .references(() => category.id, { onDelete: "restrict" })
      .notNull(),
    createdAt: timestamp("created_at", { precision: 2 }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { precision: 2, mode: "date" })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [index("products_name_idx").on(table.name)],
)

/**
 * Relations:
 * - `category`: Many-to-one relationship, linking each product to a specific category (e.g., Pizza, Drinks).
 * - `productsIngredients`: Many-to-many relationship with `ingredients`, specifying the ingredients included in the product (both base and optional extra ingredients).
 * - `productsSizesTypes`: Many-to-many relationship with `sizes` and `types`, allowing querying for specific size and type pricing for each product.
 */
export const productRelations = relations(product, ({ one, many }) => ({
  category: one(category, {
    fields: [product.categoryId],
    references: [category.id],
  }),
  productsIngredients: many(productIngredient),
  productsSizesTypes: many(productSizeType),
}))
