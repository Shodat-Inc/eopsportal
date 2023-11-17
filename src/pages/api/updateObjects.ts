import { apiHandler } from "@/helpers/api";
import { valueRepo } from "@/helpers/api/repo/value-repo";
import { loggerError, loggerInfo } from "@/logger";
import { updateObjectValidation } from "../../../validateSchema";

export default apiHandler({
  put: updateObject,
});
async function updateObject(req: any, res: any) {
  loggerInfo.info("Update value");
  const reqData = req.body;
  // if (!reqData) {
  //   return res.status(400).send({ message: "Update Data is required" });
  // }
  const validation = updateObjectValidation(reqData);
    if (validation.error) {
      // Handle validation errors
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validation.error.details.map((detail) => detail.message),
      });
      return;
    }

  try {
    const { deleteValueId, ...restData } = validation.value;
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
