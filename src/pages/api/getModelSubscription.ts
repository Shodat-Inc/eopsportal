import { apiHandler, subscriptionRepo } from "@/helpers/api";
export default apiHandler({ get: handler });
async function handler(req: any, res: any) {
  try {
    if (req.method !== "GET") {
      res.status(405).send("Only GET method is allowed");
      return;
    }
    const userId = req.id;
    const modelId = req.query.modelId;
    const result = await subscriptionRepo.getDetails({ userId, modelId });
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json(error);
  }
}
