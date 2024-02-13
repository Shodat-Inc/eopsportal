import { apiHandler, usersRepo } from "@/helpers/api";
import { loggerError } from "@/logger";
import { updateUserValidation } from "../../../validateSchema";

// Default API handler for the PUT method to handle user update operations.
export default apiHandler({
  put: handler,
});

/**
 * Handler function to process the update operation for a user.
 *
 * @param {Object} req - The incoming request object containing the user data to be updated.
 * @param {Object} res - The response object to send back the results.
 */
async function handler(req: any, res: any) {
  try {
    const userId = req.id; // Extract user ID from the request object.

    // Check if user ID is provided. If not, return a bad request response.
    if (!userId) {
      return res.status(400).send({ message: "User ID is required" });
    }

    // Extract update data from the request body.
    const updateData = req.body;
    const validation = updateUserValidation(updateData);
    if (validation.error) {
      // Handle validation errors
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validation.error.details.map((detail) => detail.message),
      });
      return;
    }

    // Attempt to update the user using the usersRepo.
    const updatedUser: any = await usersRepo.update(userId, updateData);

    // If the user could not be updated or was not found, return a not found response.
    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    // If successful, return a success response with the updated user data.
    res.status(200).json(updatedUser);
  } catch (error: any) {
    // If there's an error during the update operation, log the error and return a server error response.
    loggerError.error("Cannot update user", error);
    res.status(500).send({ message: error.message });
  }
}
