import { apiHandler } from "@/helpers/api";
import { forgetPasswordRepo } from "@/helpers/api/repo/forget-password-repo";
import { updatePasswordValidation } from "../../../validateSchema";


// Export the API handler with the handler function for POST requests.
export default apiHandler({
  post: handler,
});

/**
 * Handler for updating a password.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
async function handler(req: any, res: any) {
  try {
    // Validate the request data for updating the password.
    const validation = updatePasswordValidation(req.body);
    if (validation.error) {
      // Handle validation errors.
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validation.error.details.map((detail) => detail.message),
      });
      return;
    }

    // Perform the password update using the validated data.
    const result = await forgetPasswordRepo.updatePassword(req);

    // Send the result of the password update.
    res.send(result);
  } catch (error: any) {
    // Send an error response if an exception occurs.
    res.send(error);
  }
}
