import { apiHandler, usersRepo } from "../../helpers/api";

export default apiHandler({
  post: handler,
});

async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") {
      res.status(405).send({ message: "Only POST requests allowed" });
      return;
    }
    console.log({
      message: "you are here"
    })
    const data = await usersRepo.create(req.body);
    res.send(data);
  } catch (error: any) {
    console.error(error);
    res
      .status(error.response.status)
      .json({ message: error.response.statusText });
  }
}
