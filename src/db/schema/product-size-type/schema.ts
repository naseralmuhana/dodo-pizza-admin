import {
  decimal,
  integer,
  pgTable,
  primaryKey,
  text,
} from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"

import { product } from "@/db/schema/product/schema"
import { size } from "@/db/schema/size/schema"
import { type } from "@/db/schema/type/schema"

/**
 * Product Size and Type Table
 * Manages pricing and other attributes specific to different product sizes and types (e.g., pizza sizes: small, medium, large; pizza types: thin, original).
 *
 * Composite Primary Key:
 * - `productId`, `sizeId`, and `typeId`: This combination uniquely identifies each size/type pricing for a product.
 *
 * Fields:
 * - `productId`: Reference to the `product` table.
 * - `sizeId`: Reference to the `size` table.
 * - `typeId`: Reference to the `type` table.
 * - `price`: The price for the product of a specific size and type.
 * - `imageUrl`: A URL linking to an image of the product.
 */
export const productSizeType = pgTable(
  "products_sizes_types",
  {
    productId: integer("product_id")
      .references(() => product.id, {
        onDelete: "cascade",
      })
      .notNull(),
    sizeId: integer("size_id")
      .references(() => size.id, { onDelete: "cascade" })
      .notNull(),
    typeId: integer("type_id")
      .references(() => type.id, { onDelete: "cascade" })
      .notNull(),
    price: decimal("price", { precision: 5, scale: 2 }).notNull(),
    imageUrl: text("image_url").notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.productId, table.sizeId, table.typeId] }),
  ],
)

/**
 * Relations:
 * - `product`: Many-to-one relationship, linking each size/type pricing to a specific product.
 * - `size`: Many-to-one relationship, linking each size/type pricing to a specific size.
 * - `type`: Many-to-one relationship, linking each size/type pricing to a specific type.
 */
export const productSizeTypeRelations = relations(
  productSizeType,
  ({ one }) => ({
    product: one(product, {
      fields: [productSizeType.productId],
      references: [product.id],
    }),
    size: one(size, {
      fields: [productSizeType.sizeId],
      references: [size.id],
    }),
    type: one(type, {
      fields: [productSizeType.typeId],
      references: [type.id],
    }),
  }),
)
