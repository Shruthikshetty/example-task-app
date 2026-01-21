import type { Hook } from "@hono/zod-openapi";

// handles the api zod validation errors this will be used as the default hook for zod open api
const errorHandler: Hook<any, any, any, any> = (result, c) => {
  if (!result.success) {
    return c.json({
      success: result.success,
      error: result.error,
    });
  }
};

export default errorHandler;
