import { z } from "zod"
import { createInsertSchema } from "drizzle-zod"
import { InferSelectModel } from "drizzle-orm"

import { productSizeType } from "./schema"

const insertProductSizeTypeSchema = createInsertSchema(productSizeType, {
  price: z.number().positive(),
}).describe("Schema for inserting a product size and type")

export type InsertProductSizeTypeSchema = z.infer<
  typeof insertProductSizeTypeSchema
>
export type SelectProductSizeTypeSchema = InferSelectModel<
  typeof productSizeType
>
