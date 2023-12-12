import { apiHandler } from "@/helpers/api";
import { ModelRepo } from "@/helpers/api";
export default apiHandler({
  get: handler,
});
async function handler(req: any, res: any) {
  try {
    if (req.method !== "GET") {
      res.status(405).send({ message: "Only GET requests allowed" });
      return;
    }
    const classId = req.query;
    const data = await ModelRepo.getModels(classId);
    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(400).json(error);
  }
}
