import { apiHandler, classTagRepo } from "@/helpers/api";
import { classRepo } from "@/helpers/api/repo/class-repo";
import { CreateClass } from "@/interface";
import { loggerInfo, loggerError } from "@/logger";
export default apiHandler({
  post: handler,
});

async function handler(req: any, res: any) {
  loggerInfo.info("Class Creation API:");
  try {
    if (req.method !== "POST") {
      res.status(405).send({ message: "Only POST requests allowed" });
      return;
    }
    const reqData: CreateClass = req.body;
    const classData = await classRepo.create(reqData);
    const classId = classData.data.id;
    const tagData = [];
    for (let key of reqData.tags) {
      tagData.push({
        tagName: key.tagName,
        dataTypeId: key.dataTypeId,
        classId: classId,
      });
    }
    const classTags = await classTagRepo.bulkCreate(tagData);
    res.send({ classData, classTags });
  } catch (error: any) {
    loggerError.error("Error in saving class", error);
    res.status(405).json({ message: "Cannot Store Data " });
  }
}
