import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createSelectSchema } from "drizzle-zod";

// task table schema
export const tasks = sqliteTable("tasks", {
  id: integer({ mode: "number" }).notNull().primaryKey({ autoIncrement: true }),
  done: integer({ mode: "boolean" }).notNull().default(false),
  name: text().notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
});

//create zod schema for select tasks
export const selectTasksSchema = createSelectSchema(tasks);
