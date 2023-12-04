import { db, errorHandler, jwtMiddleware } from "./index";

export { apiHandler };

function apiHandler(handler: any) {
  return async (req: any, res: any) => {
    console.log("reached1");  
    const method = req.method.toLowerCase();

    // check handler supports HTTP method
    if (!handler[method])
      return res.status(405).end(`Method ${req.method} Not Allowed`);

    try {
      // init db if required
      if (!db.initialized) await db.initialize();

      // global middleware
      // const data = await jwtMiddleware(req, res);
      console.log("reached 4");
      const path = [
        "/api/createUsers",
        "/api/signIn",
        "/api/verifyOtp",
        "/api/generateOtp",
        "/api/forgetPassword",
        "/api/updatePassword",
      ];
      const url = req.url.split("?")[0];
      if (!path.includes(url)) {
        console.log("reached 10");
        const tokenData = req.auth;
        console.log(tokenData,"reached11");
        if (tokenData) {
          console.log("reached 2");
          req.id = tokenData.sub;
        } else {
          console.log("reached here");
          return res.status(405).json({ message: "Unauthorised Operation!!" });
        }
      }
      console.log("reached 12");

      // route handler
      console.log(await handler[method](req, res),"_______");
      await handler[method](req, res);
    } catch (err) {
      console.log("reached 3");
      // global error handler
      errorHandler(err, res);
    }
  };
}
