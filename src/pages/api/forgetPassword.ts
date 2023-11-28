import { apiHandler } from "@/helpers/api";
import { forgetPasswordRepo } from "@/helpers/api/repo/forget-password-repo";
import { forgetPasswordValidation } from "../../../validateSchema";

// Define POST API endpoint using apiHandler
export default apiHandler({
  post: handler,
});

// Define the handler function to handle the POST request
async function handler(req: any, res: any) {
  try {
    // Extract data from the request body
    const data = req.body;

    // Validate the data using forgetPasswordValidation
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

    // Verify the user using forgetPasswordRepo.verifyUser
    const verifyUser = await forgetPasswordRepo.verifyUser(validation.value);

    // Send the response based on the result of verification
    res.send(verifyUser);
  } catch (error: any) {
    // Handle errors and send an error response
    res.send(error);
  }
}
