import { apiHandler } from "@/helpers/api";
import { otpRepo } from "@/helpers/api/repo/otp-repo";
import { verifyOTPValidation } from "../../../validateSchema";

export default apiHandler({
  post: getOtp,
});

async function getOtp(req: any, res: any) {
  try {
    const validation = verifyOTPValidation(req.body);
    if (validation.error) {
      // Handle validation errors
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validation.error.details.map((detail) => detail.message),
      });
      return;
    }
    const result = await otpRepo.verifyOtp(validation.value);
    res.send(result);
  } catch (error: any) {
    res.send(error);
  }
}
