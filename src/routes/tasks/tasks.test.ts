import { testClient } from "hono/testing";
import { describe, expectTypeOf, it } from "vitest";

import createApp, { createTestApp } from "@/lib/create-app.js";

import router from "./tasks.index.js";

describe("tasks list", () => {
  it("responds with list of tasks", async () => {
    const testRouter = createTestApp(router);
    const response = await testRouter.request("/tasks");
    const result = await response.json();
    //@ts-expect-error toBeArray is not defined
    expectTypeOf(result).toBeArray();
  });

  it("responds with list of tasks test client", async () => {
    const client = testClient(createApp().route("/", router));
    const response = await client.tasks.$get();
    const result = await response.json();
    expectTypeOf(result).toBeArray();
  });
});
