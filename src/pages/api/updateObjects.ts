import { apiHandler } from "@/helpers/api";
import { valueRepo } from "@/helpers/api/repo/value-repo";
import { loggerError, loggerInfo } from "@/logger";
export default apiHandler({
  put: updateObject,
});
async function updateObject(req: any, res: any) {
  loggerInfo.info("Update value");
  const reqData = req.body;
  if (!reqData) {
    return res.status(400).send({ message: "Update Data is required" });
  }
  try {
    const { deleteValueId, ...restData } = reqData;
    if (deleteValueId) {
      await valueRepo.delete(deleteValueId);
    }
    const updateData = await valueRepo.update(restData.updatedValues);
    return res.status(200).json("Updated successfully");
  } catch (error: any) {
    loggerError.error("error in updateValuse API ", error);
    res.status(error.response.status).json(error);
  }
}
