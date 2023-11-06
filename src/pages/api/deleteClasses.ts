import { apiHandler, classRepo } from "@/helpers/api";
import { loggerError, loggerInfo } from "@/logger";
export default apiHandler({
  delete: _delete,
});
async function _delete(req: any, res: any) {
  loggerInfo.info("Delete Class");
  try {
    const id = req.query.id;
    const deleteClass = await classRepo.delete(id);
    res.status(200).json(deleteClass);
  } catch (error: any) {
    loggerError.error("error in deleting class");
    res.status(400).json(error);
  }
}
