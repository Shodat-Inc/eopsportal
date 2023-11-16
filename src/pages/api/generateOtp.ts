import { apiHandler } from "@/helpers/api";
import { otpRepo } from "@/helpers/api/repo/otp-repo";
import { generateOTPValidation } from "../../../validateSchema";

export default apiHandler({
  post: postOtp,
});
async function postOtp(req: any, res: any) {
  try {
    const digit = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    const validation = generateOTPValidation(req.body);
    if (validation.error) {
      // Handle validation errors
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validation.error.details.map((detail) => detail.message),
      });
      return;
    }
    const data = {
      email: validation.value.email,
      type: "EMAIL_OTP",
      otp: digit,
    };
    const result = await otpRepo.create(data);
    res.send(result);
  } catch (error: any) {
    res.send(error);
  }
}
