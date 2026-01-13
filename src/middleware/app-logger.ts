import { pinoLogger } from "hono-pino";
import PinoPretty from "pino-pretty";

// config for pino logger
export const appLogger = pinoLogger({
  pino: PinoPretty({
    colorize: true,
  }),
  http: {
    reqId: () => crypto.randomUUID(),
  },
});
