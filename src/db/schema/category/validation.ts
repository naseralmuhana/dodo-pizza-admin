import { InferSelectModel, InferInsertModel } from "drizzle-orm"

import { category } from "./schema"

export type InsertCategorySchema = InferInsertModel<typeof category>
export type SelectCategorySchema = InferSelectModel<typeof category>
