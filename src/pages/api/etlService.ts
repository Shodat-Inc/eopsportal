import { apiHandler, imageTableRepo, modelDataRepo } from "@/helpers/api";
import { loggerInfo } from "@/logger";
export default apiHandler({
  post: handler,
});
async function handler(req: any, res: any) {
  loggerInfo.info("Etl Service API");
  try {
    if (req.method !== "POST") {
      res.status(405).send("Only POST method allowed");
      return;
    }
    const data = req.body;
    const { userId, type, classId, objectId, modelId, ...objdata } = data;
    const { url } = objdata;
    const result = await modelDataRepo.create(data);
    const urlData = await imageTableRepo.create({
      url,
      modelDataId: result.data.id,
    });
    return res.status(200).json({ result, urlData });
  } catch (error: any) {
    return res.status(400).json(error);
  }
}
