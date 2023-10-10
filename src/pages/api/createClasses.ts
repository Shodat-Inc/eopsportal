import { apiHandler } from "@/helpers/api";
import { classRepo } from "@/helpers/api/repo/class-repo";
import { CreateClass } from "@/interface";
import { loggerInfo, loggerError } from "@/logger";
export default apiHandler({
  post: handler,
});

async function handler(req: any, res: any) {
  loggerInfo.info("Class Creation API: ");
  try {
    if (req.method !== "POST") {
      res.status(405).send({ message: "Only POST requests allowed" });
      return;
    }
    const reqData: CreateClass = req.body;
    const data = await classRepo.create(req.body);

    res.send(data);
  } catch (error: any) {
    loggerError.error("Error in saving class", error);
    res.status(405).json({ message: "Cannot Store Data " });
  }
}
