import { InferSelectModel, InferInsertModel } from "drizzle-orm"

import { productIngredient } from "./schema"

export type InsertProductIngredientSchema = InferInsertModel<
  typeof productIngredient
>
export type SelectProductIngredientSchema = InferSelectModel<
  typeof productIngredient
>
