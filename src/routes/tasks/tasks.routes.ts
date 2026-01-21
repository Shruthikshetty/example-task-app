import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatsCodes from "stoker/http-status-codes";

export const list = createRoute({
  tags: ["tasks"],
  path: "/tasks",
  method: "get",
  responses: {
    [HttpStatsCodes.OK]: {
      content: {
        "application/json": {
          schema: z.array(
            z.object({
              name: z.string(),
              done: z.boolean(),
            }),
          ),
        },
      },
      description: "The list of tasks",
    },
  },
});

export type ListRoute = typeof list;
