import { InferSelectModel, InferInsertModel } from "drizzle-orm"

import { type } from "./schema"

export type InsertTypeSchema = InferInsertModel<typeof type>
export type SelectTypeSchema = InferSelectModel<typeof type>
