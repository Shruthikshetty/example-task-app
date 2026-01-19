import { createRoute, z } from "@hono/zod-openapi";

import { createRouter } from "@/lib/create-app.js";

// create our base route "/"
const router = createRouter().openapi(
  createRoute({
    method: "get",
    path: "/",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.object({
              message: z.string(),
              statusCode: z.number(),
            }),
          },
        },
        description: "example task api index route",
      },
    },
  }),
  (c) => {
    return c.json(
      {
        message: "example task index route",
        statusCode: 200,
      },
      200,
    );
  },
);

export default router;
