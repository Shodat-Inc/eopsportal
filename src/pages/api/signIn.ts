import path from "path";
import { apiHandler, usersRepo } from "../../helpers/api";
import sendResponseData from "../../helpers/constant";

const dataFilePath = path.join(process.cwd(), "json/users.json");

export default apiHandler({
  post: handler,
});

async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") {
      res.status(405).send({ message: "Only POST requests allowed" });
      return;
    }
    const data = await usersRepo.authenticate(req.body);
    res.send(data);
  } catch (error: any) {
    console.error(error);
    res
      .status(error.response.status)
      .json({ message: error.response.statusText });
  }
}
