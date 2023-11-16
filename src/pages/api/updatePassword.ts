import { apiHandler } from "@/helpers/api";
import { forgetPasswordRepo } from "@/helpers/api/repo/forget-password-repo";
import { updatePasswordValidation } from "../../../validateSchema";

export default apiHandler({
  post: handler,
});
async function handler(req: any, res: any) {
  try {
    // console.log(req,"===req")
    const validation = updatePasswordValidation(req.body);
    if (validation.error) {
      // Handle validation errors
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validation.error.details.map((detail) => detail.message),
      });
      return;
    }
    const result = await forgetPasswordRepo.updatePassword(req);
    res.send(result);
  } catch (error: any) {
    res.send(error);
  }
}
