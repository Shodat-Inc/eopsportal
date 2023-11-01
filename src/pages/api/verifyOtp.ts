import { apiHandler } from "@/helpers/api";
import { otpRepo } from "@/helpers/api/repo/otp-repo";
export default apiHandler({
  post: getOtp,
});

async function getOtp(req: any, res: any) {
  try {
    const result = await otpRepo.verifyOtp(req.body);
    res.send(result);
  } catch (error: any) {
    res.send(error);
  }
}
