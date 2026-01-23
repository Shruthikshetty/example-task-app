import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatsCodes from "stoker/http-status-codes";

import { addTaskSchema, selectTasksSchema } from "@/db/schema.js";

export const getTasks = createRoute({
  tags: ["tasks"],
  path: "/tasks",
  method: "get",
  responses: {
    [HttpStatsCodes.OK]: {
      content: {
        "application/json": {
          schema: z.array(selectTasksSchema),
        },
      },
      description: "The list of tasks",
    },
  },
});

export const addTask = createRoute({
  tags: ["tasks"],
  path: "/tasks",
  method: "post",
  request: {
    body: {
      required: true,
      content: {
        "application/json": {
          schema: addTaskSchema,
        },
      },
      description: "Task to add",
    },
  },
  responses: {
    [HttpStatsCodes.OK]: {
      content: {
        "application/json": {
          schema: selectTasksSchema,
        },
      },
      description: "Added task response",
    },
  },
});

//export types
export type GetTasksRoute = typeof getTasks;
export type AddTaskRoute = typeof addTask;
