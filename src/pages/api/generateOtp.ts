import { apiHandler } from "@/helpers/api";
import { otpRepo } from "@/helpers/api/repo/otp-repo";
export default apiHandler({
  post: postOtp,
});
async function postOtp(req: any, res: any) {
  try {
    const digit = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
    const data = {
      email: req.body.email,
      type: "EMAIL_OTP",
      otp: digit,
    };
    const result = await otpRepo.create(data);
    res.send(result);
  } catch (error: any) {
    res.send(error);
  }
}
