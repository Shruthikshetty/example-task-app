import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";

//set up env's
expand(config());

const EnvSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.string().default("development"),
  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace"])
    .default("debug"),
});

type ENV = z.infer<typeof EnvSchema>;

let tempEnv: ENV;

try {
  // eslint-disable-next-line node/no-process-env
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
