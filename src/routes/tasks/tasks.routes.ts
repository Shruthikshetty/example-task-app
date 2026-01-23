import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatsCodes from "stoker/http-status-codes";

import { selectTasksSchema } from "@/db/schema.js";

export const list = createRoute({
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

export type ListRoute = typeof list;
