import { OpenAPIHono } from "@hono/zod-openapi";
import { serveEmojiFavicon } from "stoker/middlewares";

import type { AppBindings } from "@/types.js";

import { appLogger } from "@/middleware/app-logger.js";
import errorHandler from "@/middleware/error-handler.js";

export const createRouter = () => {
  // Zod OpenAPI Hono is an extended Hono class that supports OpenAPI. With it, you can validate values and types using Zod and generate OpenAPI Swagger documentation.
  const router = new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook: errorHandler,
  });

  return router;
};

// a function that creates the app with all the middlewares
const createApp = () => {
  // Zod OpenAPI Hono is an extended Hono class that supports OpenAPI. With it, you can validate values and types using Zod and generate OpenAPI Swagger documentation.
  const app = createRouter();

  // serve a favicon
  app.use(serveEmojiFavicon("📝"));

  // app logger
  app.use(appLogger);

  // custom error handler
  app.onError((err, c) => {
    return c.json({
      message: err?.message ?? "Something went wrong",
      statusCode: 500,
    });
  });

  // handle not found
  app.notFound((c) => {
    return c.json({
      message: "route not found",
      statusCode: 404,
    });
  });

  return app;
};

export default createApp;
