import { db, errorHandler, jwtMiddleware } from "./index";

export { apiHandler };

function apiHandler(handler: any) {
  return async (req: any, res: any) => {
    const method = req.method.toLowerCase();

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
        "/api/contactSales",
        "/api/enterpriseUserSignIn"
      ];
      const url = req.url.split("?")[0];
      if (!path.includes(url)) {
        const tokenData = req.auth;
        if (tokenData) {
          req.id = tokenData.sub;
          req.role = tokenData.role;
        } else {
          return res.status(405).json({ message: "Unauthorised Operation!!" });
        }
      }
      // if (req.id) {
      //   const validateUser = await db.Role.findOne({
      //     where: { id: req.role },
      //   });
      //   const routes = validateUser.dataValues.routeId;
      //   const valideRoute = await db.Routes.findAll({
      //     where: { id: routes },
      //     raw: true,
      //   });
      //   const paths: any[] = [];
      //   for (let a of valideRoute) {
      //     paths.push(a.routeName);
      //   }
      //   const incomingRoute = req.url;
      //   if (!paths.includes(incomingRoute)) {
      //     return res.status(400).json({ message: "Unauthorized Operation" });
      //   }
      // }
      // route handler
      await handler[method](req, res);
    } catch (err) {
      // global error handler
      errorHandler(err, res);
    }
  };
}
