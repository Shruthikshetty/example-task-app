import createApp from "./lib/create-app.js";
import configureOpenApi from "./lib/open-api-config.js";
import base from "./routes/index.route.js";
import tasks from "./routes/tasks/tasks.index.js";
//create app
const app = createApp();

//configure open api
configureOpenApi(app);

// all routes go here
const routes = [base, tasks];

routes.forEach((route) => {
  app.route("/", route);
});

// export app as default
export default app;
