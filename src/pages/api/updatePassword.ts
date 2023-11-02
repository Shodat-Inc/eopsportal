import { apiHandler } from "@/helpers/api";
import { forgetPasswordRepo } from "@/helpers/api/repo/forget-password-repo";
export default apiHandler({
  post: handler,
});
async function handler(req: any, res: any) {
  try {
    const result = await forgetPasswordRepo.updatePassword(req);
    res.send(result);
  } catch (error: any) {
    res.send(error);
  }
}
