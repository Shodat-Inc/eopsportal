import { apiHandler, objectRepo } from "@/helpers/api";
import { loggerInfo,loggerError } from "@/logger";
export default apiHandler({
  post: handler,
});

async function handler(req: any, res: any) {
  loggerInfo.info("POST api/createObjects");
  try {
    if (req.method !== "POST") {
      res.status(405).send({ message: "Only POST requests allowed" });
      return;
    }
    const data = await objectRepo.create(req.body);

    res.send(data);
    // res.status(200).json({ message: "Data stored successfully" });
  } catch (error: any) {
    loggerError.error(error);
    res.status(405).json({ message: "Cannot Store Data " });
  }
}
