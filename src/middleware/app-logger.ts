import { pinoLogger } from "hono-pino";

// config for pino logger
export const appLogger = pinoLogger({
  pino: {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:standard", // clearer timestamp
      },
    },
    formatters: {
      level: (label) => {
        return {
          level: label,
        };
      },
      log: (object: any) => {
        // if success (status < 400), reduce log verbsity
        if (object.res && object.res.status < 400) {
          // keep only method and url from req
          if (object.req) {
            object.req = {
              method: object.req.method,
              url: object.req.url,
            };
          }
          // keep only status from res
          if (object.res) {
            object.res = {
              status: object.res.status,
            };
          }
        }
        return object;
      },
    },
  },
  http: {
    reqId: () => crypto.randomUUID(),
  },
});
