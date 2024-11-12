import { z } from "zod"
import { InferSelectModel } from "drizzle-orm"
import { createInsertSchema } from "drizzle-zod"

import { ingredientSize } from "./schema"

const insertIngredientSizeSchema = createInsertSchema(ingredientSize, {
  price: z.number().positive(),
}).describe("Base Schema for inserting a ingredient-size")

export type InsertIngredientSizeSchema = z.infer<
  typeof insertIngredientSizeSchema
>
export type SelectIngredientSizeSchema = InferSelectModel<typeof ingredientSize>
