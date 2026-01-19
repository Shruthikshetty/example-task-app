import createApp from "./lib/create-app.js";

const app = createApp();

// base route
app.get("/", (c) => {
  return c.text("example task app");
});

export default app;
