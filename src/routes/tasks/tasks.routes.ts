import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatsCodes from "stoker/http-status-codes";

import { zodNotFoundDocObject } from "@/constants/global.constants.js";
import {
  addTaskSchema,
  patchTasksSchema,
  selectTasksSchema,
} from "@/db/schema.js";
import { AppValidationErrorSchema } from "@/zod-schemas/app-validation-error.schema.js";

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
    [HttpStatsCodes.UNPROCESSABLE_ENTITY]: {
      content: {
        "application/json": {
          schema: AppValidationErrorSchema,
        },
      },
      description: "Validation error response",
    },
  },
});

export const getTaskById = createRoute({
  tags: ["tasks"],
  path: "/tasks/{id}",
  method: "get",
  request: {
    params: z.object({
      id: z.coerce.number().openapi({
        param: {
          name: "id",
          in: "path",
          required: true,
          description: "Task id",
        },
        example: 2,
      }),
    }),
  },
  responses: {
    [HttpStatsCodes.OK]: {
      content: {
        "application/json": {
          schema: selectTasksSchema,
        },
      },
      description: "Requested task",
    },
    [HttpStatsCodes.NOT_FOUND]: zodNotFoundDocObject,
    [HttpStatsCodes.UNPROCESSABLE_ENTITY]: {
      content: {
        "application/json": {
          schema: AppValidationErrorSchema,
        },
      },
      description: "Invalid id",
    },
  },
});

export const updateTask = createRoute({
  tags: ["tasks"],
  path: "/tasks/{id}",
  method: "patch",
  request: {
    params: z.object({
      id: z.coerce.number().openapi({
        param: {
          name: "id",
          in: "path",
          required: true,
          description: "Task id",
        },
        example: 2,
      }),
    }),
    body: {
      required: true,
      content: {
        "application/json": {
          schema: patchTasksSchema,
        },
      },
      description: "Task to update",
    },
  },
  responses: {
    [HttpStatsCodes.OK]: {
      content: {
        "application/json": {
          schema: selectTasksSchema,
        },
      },
      description: "Updated task response",
    },
    [HttpStatsCodes.NOT_FOUND]: zodNotFoundDocObject,
    [HttpStatsCodes.UNPROCESSABLE_ENTITY]: {
      content: {
        "application/json": {
          schema: AppValidationErrorSchema,
        },
      },
      description: "Validation error response",
    },
  },
});

export const deleteTask = createRoute({
  tags: ["tasks"],
  path: "/tasks/{id}",
  method: "delete",
  request: {
    params: z.object({
      id: z.coerce.number().openapi({
        param: {
          name: "id",
          in: "path",
          required: true,
          description: "Task id",
        },
        example: 2,
      }),
    }),
  },
  responses: {
    [HttpStatsCodes.NO_CONTENT]: {
      description: "Task deleted successfully",
    },
    [HttpStatsCodes.NOT_FOUND]: zodNotFoundDocObject,
    [HttpStatsCodes.UNPROCESSABLE_ENTITY]: {
      content: {
        "application/json": {
          schema: AppValidationErrorSchema,
        },
      },
      description: "Validation error response",
    },
  },
});
//export types
export type GetTasksRoute = typeof getTasks;
export type AddTaskRoute = typeof addTask;
export type GetTaskByIdRoute = typeof getTaskById;
export type UpdateTaskRoute = typeof updateTask;
export type DeleteTaskRoute = typeof deleteTask;
