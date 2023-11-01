import { loggerError, loggerInfo } from "@/logger";

export { errorHandler };

function errorHandler(err: any, res: any) {
  loggerInfo.info("Error Handler");
  if (typeof err === "string") {
    // custom application error
    const is404 = err.toLowerCase().endsWith("not found");
    const statusCode = is404 ? 404 : 400;
    return res.status(statusCode).json({ message: err });
  }

  if (err.name === "UnauthorizedError") {
    loggerError.error(err.name);
    // jwt authentication error
    return res.status(401).json({ message: "Invalid Token" });
  }

  // default to 500 server error
  loggerError.error(500);
  return res.status(500).json({ message: err.message });
}
