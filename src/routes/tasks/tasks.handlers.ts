import { eq } from "drizzle-orm";
import * as HttpStatsCodes from "stoker/http-status-codes";

import type { AppRouteHandler } from "@/types.js";

import db from "@/db/index.js";
import { tasks } from "@/db/schema.js";

import type {
  AddTaskRoute,
  GetTaskByIdRoute,
  GetTasksRoute,
  UpdateTaskRoute,
} from "./tasks.routes.js";

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
  return c.json(addedTask, HttpStatsCodes.OK);
};

export const getTaskById: AppRouteHandler<GetTaskByIdRoute> = async (c) => {
  // get id from req
  const { id } = c.req.valid("param");
  // get the task by id
  const task = await db.query.tasks.findFirst({
    where: (tasks, operators) => operators.eq(tasks.id, id),
  });

  // in case task not found
  if (!task) return c.json({ message: "Not found" }, HttpStatsCodes.NOT_FOUND);
  // return the task as json
  return c.json(task, HttpStatsCodes.OK);
};

export const updateTask: AppRouteHandler<UpdateTaskRoute> = async (c) => {
  // get id from req
  const { id } = c.req.valid("param");
  // get the updated task data
  const updatedTaskData = c.req.valid("json");
  // update the task
  const [task] = await db
    .update(tasks)
    .set(updatedTaskData)
    .where(eq(tasks.id, id))
    .returning();
  // in case there is no task found
  if (!task) {
    return c.json({ message: "Not found" }, HttpStatsCodes.NOT_FOUND);
  }
  // return the updated task as json
  return c.json(task, HttpStatsCodes.OK);
};
