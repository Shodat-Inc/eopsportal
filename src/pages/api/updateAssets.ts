import { apiHandler, classRepo, classTagRepo } from "@/helpers/api";
import sendResponseData from "@/helpers/constant";
import { loggerError } from "@/logger";
export default apiHandler({
  put: updateClass,
});
async function updateClass(req: any, res: any) {
  const updateData = req.body;
  if (!updateData) {
    return res.status(400).send({ message: "Update Data is required" });
  }
  try {
    const update: any = await classRepo.update(updateData);
    return res.status(200).send(sendResponseData(true, update.message, update));
  } catch (error: any) {
    loggerError.error("Cannot update class", error);
    res.status(500).send({ message: error.message });
  }
}
