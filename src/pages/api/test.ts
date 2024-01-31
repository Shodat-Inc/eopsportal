import { apiHandler } from "@/helpers/api";
import { loggerInfo } from "@/logger";
import repoName from "@/util/checkRepo";
// { } index
export default apiHandler({
  post: handler,
});
async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json("ONLY POST METHOD IS ALLOWED");
  }
  try {
    loggerInfo.info("Test The Model");
    const data = { body: req.body, userId: req.auth.sub };
    const importRepo: any = await repoName(data.body.modelName, req.auth);
    const result = await importRepo.default(data);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}
