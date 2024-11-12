import { relations } from "drizzle-orm"
import { index, integer, pgTable, text, varchar } from "drizzle-orm/pg-core"

import { ingredientSize } from "@/db/schema/ingredient-size/schema"
import { productIngredient } from "@/db/schema/product-ingredient/schema"

/**
 * Ingredients Table
 * Stores details about the ingredients available for products such as pizzas, drinks, etc.
 * Ingredients can be base items or optional extras.
 *
 * Fields:
 * - `id`: Unique identifier for each ingredient.
 * - `name`: Name of the ingredient (e.g., "Cheese", "Chicken").
 * - `imageUrl`: A URL linking to an image of the ingredient.
 */
export const ingredient = pgTable(
  "ingredients",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 256 }).notNull().unique(),
    imageUrl: text("image_url").notNull(),
  },
  (table) => [index("ingredients_name_idx").on(table.name)],
)

/**
 * Relations:
 * - `ingredientsSizes`: Many-to-many relationship with `sizes`, which specifies the size-specific pricing for ingredients.
 * - `productsIngredients`: Many-to-many relationship with `products`, linking each ingredient to a specific product, allowing both base and extra ingredients to be added to products.
 */
export const ingredientRelations = relations(ingredient, ({ many }) => ({
  ingredientsSizes: many(ingredientSize),
  productsIngredients: many(productIngredient),
}))
