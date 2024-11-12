import { InferSelectModel, InferInsertModel } from "drizzle-orm"

import { size } from "./schema"

export type InsertSizeSchema = InferInsertModel<typeof size>
export type SelectSizeSchema = InferSelectModel<typeof size>
