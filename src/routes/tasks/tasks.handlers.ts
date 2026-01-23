import type { AppRouteHandler } from "@/types.js";

import db from "@/db/index.js";

import type { ListRoute } from "./tasks.routes.js";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  // get task from the database
  const tasks = await db.query.tasks.findMany();
  // return the tasks as json
  return c.json(tasks);
};
