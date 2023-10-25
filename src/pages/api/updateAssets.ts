import { apiHandler, classRepo, classTagRepo } from "@/helpers/api";
import sendResponseData from "@/helpers/constant";
import { loggerError, loggerInfo } from "@/logger";
export default apiHandler({
  put: updateClass,
});
async function updateClass(req: any, res: any) {
  loggerInfo.info("Update Class and Class Tags");
  const reqData = req.body;
  const resObj = {};
  if (!reqData) {
    return res.status(400).send({ message: "Update Data is required" });
  }
  const { id, className, ...tagData } = reqData;
  try {
    if (className) {
      const res = await classRepo.update({ id, className });
      //  resObj['updatedClass'] = {id:res}
      console.log(res, "====>");
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
