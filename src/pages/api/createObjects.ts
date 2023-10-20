import { apiHandler, objectRepo } from "@/helpers/api";
import { valueRepo } from "@/helpers/api/repo/value-repo";
import { loggerInfo, loggerError } from "@/logger";
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
    const reqData = req.body;
    const objData = await objectRepo.create(reqData);
    const objectId = objData.data.id;
    let valueData = [];
    for (let key of reqData.values) {
      valueData.push({
        objectId: objectId,
        classTagId: key.classTagId,
        values: key.value,
      });
    }
    const value = await valueRepo.bulkCreate(valueData, objectId);

    res.send({ objData, value });
    // res.status(200).json({ message: "Data stored successfully" });
  } catch (error: any) {
    loggerError.error(error);
    res.status(405).json({ message: "Cannot Store Data " });
  }
}
