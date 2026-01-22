import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// task table schema
export const tasks = sqliteTable("tasks", {
  id: integer({ mode: "number" }).notNull().primaryKey({ autoIncrement: true }),
  done: integer({ mode: "boolean" }).notNull(),
  name: text().notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`),

  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(unixepoch())`)
    .$onUpdate(() => new Date()),
});
