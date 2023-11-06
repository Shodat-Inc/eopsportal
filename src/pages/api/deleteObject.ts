import { apiHandler, objectRepo } from "@/helpers/api";
import { loggerError, loggerInfo } from "@/logger";
export default apiHandler({
  delete: _delete,
});
async function _delete(req: any, res: any) {
  loggerInfo.info("Delete Class");
  try {
    const id = req.query.id;
    const object = await objectRepo.delete(id);
    res.status(200).json(object)
  } catch (error: any) {
    loggerError.error("error in deleting Object");
    res.status(400).json(error);
  }
}
