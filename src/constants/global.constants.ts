import { z } from "zod";

// defines a openapi doc object for zod not found error
export const zodNotFoundDocObject = {
  content: {
    "application/json": {
      schema: z
        .object({
          message: z.string(),
        })
        .openapi({
          example: {
            message: "Not found",
          },
        }),
    },
  },
  description: "Not found error response",
};
