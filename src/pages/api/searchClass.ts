import { apiHandler, db } from "@/helpers/api";
import { generalizedSearch } from "@/helpers/api/search/search";
import { loggerError, loggerInfo } from "@/logger";

export default apiHandler({
  get: search,
});
async function search(req: any, res: any) {
  loggerInfo.info("Search Class");
  try {
    const query = req.query.className;
    const field = ["className"];
    const result = await generalizedSearch(db.AddClasses, field, query);
    return res.status(200).json(result);
  } catch (error: any) {
    loggerError.error("Error in searching class");
    return res.status(400).json(error);
  }
}
