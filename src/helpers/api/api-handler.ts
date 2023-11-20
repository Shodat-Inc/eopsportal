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

      if (req.id) {
        let flag = true;
        const data = await db.EnterpriseUser.findOne({
          include: [
            {
              model: db.Role,
              attributes: ["routeId"],
              where: { id: req.id },
            },
          ],
        });
        const routeId = data?.Role?.routeId; // Use optional chaining to avoid errors if data or Role is undefined
        if (!routeId) {
          return res.status(500).json({ message: "Invalid data structure" });
        }

        const routeArray = await db.Routes.findAll({
          attributes: ["routeName"],
          where: { id: routeId },
          raw: true,
        });

        const incomingURL = req.url;
        for (const route of routeArray) {
          console.log(routeArray, incomingURL);
          if (route.routeName === incomingURL) {
            flag = false;
            break;
          }
        }
        if (flag) {
          // return false;
          return res.status(500).json({ message: "Operation Unauthrized!!" });
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
