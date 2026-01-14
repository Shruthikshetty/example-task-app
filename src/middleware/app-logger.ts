import { pinoLogger } from "hono-pino";

// config for pino logger
export const appLogger = pinoLogger({
  pino: {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:standard",
        singleLine: true,
        // VERIFICATION: 'ignore' hides the bulky default objects from the console
        ignore: "pid,hostname",
      },
    },
  },
  http: {
    reqId: () => crypto.randomUUID(),
    onReqBindings: (c) => ({
      req: {
        url: c.req.url,
      },
    }),
    onResBindings: (c) => ({
      res: {
        status: c.res.status,
      },
    }),
  },
});
