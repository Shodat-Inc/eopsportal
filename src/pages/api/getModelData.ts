import { apiHandler } from "@/helpers/api";
import { modelDataRepo } from "@/helpers/api";
export default apiHandler({
  get: handler,
});
async function handler(req: any, res: any) {
  try {
    const data = req.query;
    const result = await modelDataRepo.getData(data);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json(error);
  }
}
