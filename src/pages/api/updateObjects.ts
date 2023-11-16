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
  console.log(validation,"==validation")
  console.log(validation.error,"==validation.error")
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
      console.log(deleteValueId,"==ppp")
      await valueRepo.delete(deleteValueId);
    }
    const updateData = await valueRepo.update(restData.updatedValues);
    console.log(updateData,"==updateData")
    return res.status(200).json("Updated successfully");
  } catch (error: any) {
    loggerError.error("error in updateValuse API ", error);
    res.status(error.response.status).json(error);
  }
}
