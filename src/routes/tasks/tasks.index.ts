import { createRouter } from "@/lib/create-app.js";

import * as handlers from "./tasks.handlers.js";
import * as routes from "./tasks.routes.js";

const router = createRouter()
  .openapi(routes.getTasks, handlers.getTasks)
  .openapi(routes.addTask, handlers.addTask);

export default router;
