import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

import env from "@/lib/env"
import * as schema from "@/db/schema"

const sql = neon(env.DATABASE_URL)
export const db = drizzle({
  client: sql,
  schema,
  logger: true,
})
export type DB = typeof db
