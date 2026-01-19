import type { AppOpenApi } from "@/types.js";

import packageJson from "../../package.json" with { type: "json" };

const configureOpenApi = (app: AppOpenApi) => {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJson.version,
      title: "example task api",
    },
  });
};

export default configureOpenApi;
