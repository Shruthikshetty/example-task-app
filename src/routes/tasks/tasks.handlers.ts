import type { AppRouteHandler } from "@/types.js";

import db from "@/db/index.js";
import { tasks } from "@/db/schema.js";

import type { AddTaskRoute, GetTasksRoute } from "./tasks.routes.js";

export const getTasks: AppRouteHandler<GetTasksRoute> = async (c) => {
  // get task from the database
  const tasks = await db.query.tasks.findMany();
  // return the tasks as json
  return c.json(tasks);
};

export const addTask: AppRouteHandler<AddTaskRoute> = async (c) => {
  // get the new task
  const newTask = c.req.valid("json");
  // insert the new task
  const [addedTask] = await db.insert(tasks).values(newTask).returning();
  // return the tasks as json
  return c.json(addedTask);
};
