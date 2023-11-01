import { apiHandler, objectRepo } from "@/helpers/api";
import { valueRepo } from "@/helpers/api/repo/value-repo";
import { loggerError, loggerInfo } from "@/logger";
export default apiHandler({
  delete: _delete,
});
async function _delete(req: any, res: any) {
  loggerInfo.info("Delete Class");
  try {
    const id = req.query.id;
    const object = await objectRepo.delete(id);
    res.status(200).json("Object Deleted Successfully");
  } catch (error: any) {
    loggerError.error("error in deleting Object");
    res.status(400).json("Error in deleting Object", error);
  }
}
