import { InferSelectModel, InferInsertModel } from "drizzle-orm"

import { ingredient } from "./schema"

export type InsertIngredientSchema = InferInsertModel<typeof ingredient>
export type SelectIngredientSchema = InferSelectModel<typeof ingredient>
