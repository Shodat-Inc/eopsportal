import { db, errorHandler, jwtMiddleware } from "./index";

export { apiHandler };

function apiHandler(handler: any) {
  return async (req: any, res: any) => {
    console.log("apihandler=======");
    const method = req.method.toLowerCase();
    console.log(req.url, "====kfk");
    // check handler supports HTTP method
    if (!handler[method])
      return res.status(405).end(`Method ${req.method} Not Allowed`);

    try {
      // init db if required
      if (!db.initialized) await db.initialize();

      // global middleware
      const data = await jwtMiddleware(req, res);

      const path = ["/api/createUsers", "/api/signIn", "/api/getUsers"];
      if (!path.includes(req.url)) {
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
