import { apiHandler } from "@/helpers/api";
import { forgetPasswordRepo } from "@/helpers/api/repo/forget-password-repo";
export default apiHandler({
  post: handler,
});
async function handler(req: any, res: any) {
  try {
    const data = req.body;
    const verifyUser = await forgetPasswordRepo.verifyUser(data);
    res.send(verifyUser);
  } catch (error: any) {
    res.send(error);
  }
}
