import { sql } from "drizzle-orm";
import { testClient } from "hono/testing";
import { execSync } from "node:child_process";
import fs from "node:fs";
import {
  afterAll,
  beforeAll,
  describe,
  expect,
  expectTypeOf,
  it,
} from "vitest";

import db from "@/db/index.js";
import createApp, { createTestApp } from "@/lib/create-app.js";

import router from "./tasks.index.js";

describe("tasks list", () => {
  beforeAll(async () => {
    execSync("bun drizzle-kit push");
  });

  afterAll(async () => {
    //clean up db
    const tableNames = ["tasks"];

    for (const table of tableNames) {
      await db.run(sql.raw(`DELETE FROM ${table}`));
    }
  });

  it("post /tasks creates a task", async () => {
    const client = testClient(createApp().route("/", router));
    const response = await client.tasks.$post({
      json: {
        name: "test",
        done: false,
      },
    });
    expect(response.status).toBe(200);
    if (response.status === 200) {
      const json = await response.json();
      expect(json.name).toBe("test");
      expect(json.done).toBe(false);
    }
  });

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

  it("validates adding a new task", async () => {
    const client = testClient(createApp().route("/", router));
    const response = await client.tasks.$post({
      //@ts-expect-error name is required
      json: {
        done: false,
      },
    });
    expect(response.status).toBe(422);
  });
});
