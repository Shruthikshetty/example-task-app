import { OpenAPIHono } from "@hono/zod-openapi";

import { appLogger } from "./middleware/app-logger.js";

// Zod OpenAPI Hono is an extended Hono class that supports OpenAPI. With it, you can validate values and types using Zod and generate OpenAPI Swagger documentation.
const app = new OpenAPIHono();

// base route
app.get("/", (c) => {
  return c.text("example task app");
});

// app logger TODO :- change with pino its lightweight and fast with better options
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

export default app;
