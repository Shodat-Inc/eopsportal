import winston from "winston";

const { combine, timestamp, json } = winston.format;

const baseLoggerConfig = {
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({ filename: "app.log" }),
    new winston.transports.Console(),
  ],
};

const loggerInfo = winston.createLogger({
  ...baseLoggerConfig,
  level: "info",
});

const loggerError = winston.createLogger({
  ...baseLoggerConfig,
  level: "error",
});

export { loggerInfo, loggerError };
