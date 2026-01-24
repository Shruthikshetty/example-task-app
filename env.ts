/* eslint-disable node/no-process-env */
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import path from "node:path";
import { z } from "zod";

//set up env's
expand(
  config({
    path: path.resolve(
      process.cwd(),
      process.env.NODE_ENV === "test" ? ".env.test" : ".env",
    ),
  }),
);

const EnvSchema = z
  .object({
    PORT: z.coerce.number().default(3000),
    NODE_ENV: z.string().default("development"),
    LOG_LEVEL: z
      .enum(["fatal", "error", "warn", "info", "debug", "trace"])
      .default("debug"),
    DATABASE_URL: z.url(),
    DATABASE_AUTH_TOKEN: z.string().optional(),
  })
  .superRefine((input, ctx) => {
    if (input.NODE_ENV === "production") {
      ctx.addIssue({
        code: "invalid_type",
        expected: "string",
        received: "undefined",
        message: "DATABASE_AUTH_TOKEN is required in production",
        path: ["DATABASE_AUTH_TOKEN"],
      });
    }
  });

type ENV = z.infer<typeof EnvSchema>;

let tempEnv: ENV;

try {
  tempEnv = EnvSchema.parse(process.env);
} catch (err) {
  const error = err as z.ZodError;
  console.error("Invalid environment variables: ", z.flattenError(error));
  //exist the app in case of error
  process.exit(1);
}

const env = tempEnv;
//export type save env
export default env;
