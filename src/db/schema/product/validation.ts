import { z } from "zod"
import { InferSelectModel } from "drizzle-orm"
import { createInsertSchema } from "drizzle-zod"

import { product } from "./schema"

const insertProductSchema = createInsertSchema(product)
  .pick({
    name: true,
    categoryId: true,
  })
  .describe("Base Schema for inserting a product")

export type InsertProductSchema = z.infer<typeof insertProductSchema>
export type SelectProductSchema = InferSelectModel<typeof product>
