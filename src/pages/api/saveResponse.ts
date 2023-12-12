import { apiHandler } from "@/helpers/api";
import { responseDataRepo } from "@/helpers/api";
export default apiHandler({
  post: handler,
});
async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") {
      res.status(405).send("Only Post Method Allowed");
      return;
    }
    const data = req.body;
    const result = await responseDataRepo.saveResponse(data);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json(error);
  }
}
