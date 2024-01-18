import { apiHandler } from "@/helpers/api";
import { valueRepo } from "@/helpers/api/repo/value-repo";
import { loggerError, loggerInfo } from "@/logger";
import { updateObjectValidation } from "../../../validateSchema";

// Export the API handler with the updateObject function.
export default apiHandler({
  put: updateObject,
});

/**
 * Handler for updating an object value.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
async function updateObject(req: any, res: any) {
  // Log information about the operation.
  loggerInfo.info("Update value");

  // Extract data from the request body.
  const reqData = req.body;

  // Validate the request data.
  const validation = updateObjectValidation(reqData);
  if (validation.error) {
    // Handle validation errors.
    res.status(400).json({
      success: false,
      message: "Validation error",
      errors: validation.error.details.map((detail) => detail.message),
    });
    return;
  }

  try {
    // Extract relevant data from validated values.
    const { deleteValueId, ...restData } = validation.value;

    // Delete the value with the specified ID if provided.
    if (deleteValueId) {
      await valueRepo.delete(deleteValueId);
    }

    // Update the remaining values.
    const updateData = await valueRepo.update(restData.updatedValues);

    // Send a success response.
    return res.status(200).json(updateData);
  } catch (error: any) {
    // Log an error if the update fails.
    loggerError.error("Error in updateValues API", error);

    // Send an error response.
    res.status(error.response.status).json(error);
  }
}
