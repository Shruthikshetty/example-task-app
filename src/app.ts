import createApp from "./lib/create-app.js";
import configureOpenApi from "./lib/open-api-config.js";
import base from "./routes/index.route.js";

//create app
const app = createApp();

//configure open api
configureOpenApi(app);

// all routes go here
const routes = [base];

routes.forEach((route) => {
  app.route("/", route);
});

// export app as default
export default app;
