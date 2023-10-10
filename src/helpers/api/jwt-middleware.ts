import { expressjwt } from "express-jwt";
import util from "util";
import getConfig from "next/config";
import { loggerInfo } from "@/logger";

const { serverRuntimeConfig } = getConfig();

export { jwtMiddleware };

function jwtMiddleware(req: any, res: any) {
  loggerInfo.info("JWT");
  const middleware = expressjwt({
    secret: serverRuntimeConfig.secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      // public routes that don't require authentication
      "/api/createUsers",
      "/api/signIn",
      "/api/assets",
      "/api/createClasses"
    ],
  });

  return util.promisify(middleware)(req, res);
}
