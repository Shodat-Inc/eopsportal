import { apiHandler } from "@/helpers/api";
import { forgetPasswordRepo } from "@/helpers/api/repo/forget-password-repo";
import { forgetPasswordValidation } from "../../../validateSchema";

export default apiHandler({
  post: handler,
});
async function handler(req: any, res: any) {
  try {
    const data = req.body;
    const validation = forgetPasswordValidation(data);
    if (validation.error) {
      // Handle validation errors
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validation.error.details.map((detail) => detail.message),
      });
      return;
    }
    const verifyUser = await forgetPasswordRepo.verifyUser(validation.value);
    res.send(verifyUser);
  } catch (error: any) {
    res.send(error);
  }
}
