import { OpenAPIHono } from "@hono/zod-openapi";
import { config } from "dotenv";
import { expand } from "dotenv-expand";

import type { AppBindings } from "./types.js";

import { appLogger } from "./middleware/app-logger.js";

//set up env's
expand(config());

// Zod OpenAPI Hono is an extended Hono class that supports OpenAPI. With it, you can validate values and types using Zod and generate OpenAPI Swagger documentation.
const app = new OpenAPIHono<AppBindings>();

// base route
app.get("/", (c) => {
  return c.text("example task app");
});

// app logger
app.use(appLogger);

// example route
app.get("/example", (c) => {
  // c.var.logger.info("example route");
  return c.json({ message: "example route" });
});

app.get("/example-error", () => {
  throw new Error("example error");
});

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
