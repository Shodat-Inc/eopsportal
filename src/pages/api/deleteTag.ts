import { apiHandler, classTagRepo } from "@/helpers/api";
import { loggerError, loggerInfo } from "@/logger";
export default apiHandler({
  delete: _delete,
});
async function _delete(req: any, res: any) {
  loggerInfo.info("Delete Class");
  try {
    const id = req.query.id;
    const tag = await classTagRepo.delete(id);
    res.status(200).json("Class Tag Deleted Successfully");
  } catch (error: any) {
    loggerError.error("error in deleting Class Tag");
    res.status(400).json("Error in deleting Class Tag", error);
  }
}
