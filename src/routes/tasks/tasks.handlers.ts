import type { AppRouteHandler } from "@/types.js";

import type { ListRoute } from "./tasks.routes.js";

export const list: AppRouteHandler<ListRoute> = (c) => {
  return c.json([
    {
      name: "task 1",
      done: false,
    },
    {
      name: "task 2",
      done: false,
    },
  ]);
};
