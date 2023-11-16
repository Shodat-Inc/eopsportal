import { apiHandler, usersRepo } from "@/helpers/api";
import { deleteRecordRepo } from "@/helpers/api/repo/delete-record-repo";
import { loggerError } from "@/logger";
import { deleteUserValidation } from "../../../validateSchema";


// Default API handler for the POST method to handle user deletion.
export default apiHandler({
  post: _delete,
});

/**
 * Handler function to process the user deletion request.
 *
 * @param {Object} req - The incoming request object containing user ID and other data.
 * @param {Object} res - The response object to send back the results.
 */
async function _delete(req: any, res: any) {
  try {
    const id = req.id;  // Extract user ID from the request.

    // Check if user ID is provided. If not, return a bad request response.
    if (!id) {
      return res
        .status(400)
        .send({ message: "User ID is required for deletion." });
    }

    // Fetch user data for the provided ID.
    const user = await usersRepo.getById(id);
    const data = req.body;
    const validation = deleteUserValidation(data);

    if (validation.error) {
      // Handle validation errors
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validation.error.details.map((detail) => detail.message),
      });
      return;
    }

    // If no user is found for the given ID, send back a 404 Not Found response.
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Delete the user using the provided ID.
    await usersRepo.delete(id);
    
    await deleteRecordRepo.create({
      email: validation.value.email,
      userId: id,
      deleteAction: validation.value.deleteAction,
      message: validation.value.message,
      reasonId: validation.value.reasonId,
    });

    // Send a success response indicating that the user was deleted.
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error: any) {
    // If there's an error during the delete operation, log the error and send back a 500 Internal Server Error response.
    loggerError.error("Can't delete user", error);
    res.status(500).send({ message: error.message });
  }
}
