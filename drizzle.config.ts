import { defineConfig } from "drizzle-kit";

// @ts-expect-error - drizzle-kit needs .ts, but main tsconfig is NodeNext
import env from "./env.ts";

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    url: env.DATABASE_URL,
    token: env.DATABASE_AUTH_TOKEN,
  },
});
