// Dépendances
import * as winstom from "winston";

enum CodeWinstomLevels {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  HTTP = 3,
  VERBOSE = 4,
  DEBUG = 5,
  SILLY = 6,
}

const winstomLevelName = {
  error: "error",
  warn: "warn",
  info: "info",
  http: "http",
  verbose: "verbose",
  debug: "debug",
  silly: "silly",
};

export const logger: winstom.Logger = winstom.createLogger({
  level: winstomLevelName.info,
  format: winstom.format.json(),
  transports: [
    new winstom.transports.Console(),
    new winstom.transports.File({
      filename: "../logs/info.log",
    }),
  ],
});
