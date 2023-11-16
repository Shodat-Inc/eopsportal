import { apiHandler, classRepo, classTagRepo } from "@/helpers/api";
import sendResponseData from "@/helpers/constant";
import { loggerError, loggerInfo } from "@/logger";
import { updateClassValidation } from "../../../validateSchema";

export default apiHandler({
  put: updateClass,
});
async function updateClass(req: any, res: any) {
  loggerInfo.info("Update Class and Class Tags");
  const reqData = req.body;
  if (!reqData) {
    return res.status(400).send({ message: "Update Data is required" });
  }
  const validation = updateClassValidation(reqData);
    if (validation.error) {
      // Handle validation errors
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validation.error.details.map((detail) => detail.message),
      });
      return;
    }
  
  const { id, className, ...tagData } = validation.value;
  try {
    if (className) {
      const res = await classRepo.update({ id, className });
      //  resObj['updatedClass'] = {id:res}
    }
    const { deleteTagId, addTag } = tagData;
    if (deleteTagId) {
      await classTagRepo.delete(deleteTagId);
    }
    if (addTag) {
      addTag.forEach((ele: any) => {
        ele.classId = id;
      });
      await classTagRepo.bulkCreate(addTag, id);
    }
    return res
      .status(200)
      .send(sendResponseData(true, "Class updated successfully", {}));
  } catch (error: any) {
    loggerError.error("Cannot update class", error);
    res.status(500).send({ message: error.message });
  }
}
