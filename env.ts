import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";

//set up env's
expand(config());

const EnvSchema = z.object({
  PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z.string().default("debug"),
  NODE_ENV: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace"])
    .default("debug"),
});

// eslint-disable-next-line node/no-process-env
const env = EnvSchema.parse(process.env);

//export type save env
export default env;
