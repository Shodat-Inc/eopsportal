import { apiHandler } from "@/helpers/api";
import { otpRepo } from "@/helpers/api/repo/otp-repo";
import { generateOTPValidation } from "../../../validateSchema";

// Define POST API endpoint using apiHandler
export default apiHandler({
  post: postOtp,
});

// Define the handler function to handle the POST request
async function postOtp(req: any, res: any) {
  try {
    // Generate a random 5-digit OTP
    const digit = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;

    // Validate the request body using generateOTPValidation
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

    // Prepare data for OTP creation
    const data = {
      email: validation.value.email,
      type: "EMAIL_OTP",
      otp: digit,
    };

    // Create OTP using otpRepo
    const result = await otpRepo.create(data);

    // Send the response
    res.send(result);
  } catch (error: any) {
    // Handle errors and send an error response
    res.send(error);
  }
}

