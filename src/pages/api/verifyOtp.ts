import { apiHandler } from "@/helpers/api";
import { otpRepo } from "@/helpers/api/repo/otp-repo";
import { verifyOTPValidation } from "../../../validateSchema";

// Export the API handler with the handler function for POST requests.
export default apiHandler({
  post: getOtp,
});

/**
 * Handler for verifying an OTP (One-Time Password).
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
async function getOtp(req: any, res: any) {
  try {
    // Validate the request data for OTP verification.
    const validation = verifyOTPValidation(req.body);
    if (validation.error) {
      // Handle validation errors.
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validation.error.details.map((detail) => detail.message),
      });
      return;
    }

    // Perform OTP verification using the validated data.
    const result = await otpRepo.verifyOtp(validation.value);

    // Send the result of the OTP verification.
    res.send(result);
  } catch (error: any) {
    // Send an error response if an exception occurs.
    res.send(error);
  }
}
