import { apiHandler, modelDataRepo } from "@/helpers/api";
import { loggerInfo } from "@/logger";
export default apiHandler({
  get: handler,
});
async function handler(req: any, res: any) {
  loggerInfo.info("Get Image Urls");
  try {
    if (req.method !== "GET") {
      res.status(405).send("Only POST method allowed");
      return;
    }
    const userId = req.id;
    const modelId = req.query.modelId;
    const type = req.query.type;
    const result = await modelDataRepo.get(modelId, type, userId);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json(error);
  }
}
