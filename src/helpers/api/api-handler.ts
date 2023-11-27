import { db, errorHandler, jwtMiddleware } from "./index";
import NextCors from 'nextjs-cors';



export { apiHandler };

function apiHandler(handler: any) {
  return async (req: any, res: any) => {
    const method = req.method.toLowerCase();
    console.log(method,"method====>");
    await NextCors(req, res, {
      // Options
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      origin: '*',
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
      credentials: true, // If your requests include credentials
   });

    // check handler supports HTTP method
    if (!handler[method])
      return res.status(405).end(`Method ${req.method} Not Allowed`);

    try {
      // init db if required
      if (!db.initialized) await db.initialize();
      // global middleware
      const data = await jwtMiddleware(req, res);

      const path = [
        "/api/createUsers",
        "/api/signIn",
        "/api/verifyOtp",
        "/api/generateOtp",
        "/api/forgetPassword",
        "/api/updatePassword",
        "/api/createEnterprise",
        "/api/createEnterpriseUser",
        "/api/createRole",
        "/api/getRoles",
        "/api/updateRole",
        "/api/deleteRole",
      ];
      const url = req.url.split("?")[0];
      if (!path.includes(url)) {
        const tokenData = req.auth;
        if (tokenData) {
          req.id = tokenData.sub;
        } else {
          return res.status(405).json({ message: "Unauthorised Operation!!" });
        }
      }
      // route handler
      await handler[method](req, res);
    } catch (err) {
      // global error handler
      errorHandler(err, res);
    }
  };
}
