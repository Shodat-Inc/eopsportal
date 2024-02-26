// Import necessary modules and utilities.
import { apiHandler, db, objectRepo } from "@/helpers/api";
import { valueRepo } from "@/helpers/api/repo/value-repo";
import { loggerInfo, loggerError } from "@/logger";
import { createObjectValidation } from "../../../validateSchema";

// Define the default API handler for the POST method to handle object creation.
export default apiHandler({
  post: handler,
});

/**
 * Handler function to process the object creation request.
 *
 * @param {Object} req - The incoming request object containing data for the object and its associated values.
 * @param {Object} res - The response object to send back the results.
 */
async function handler(req: any, res: any) {
  // Log the initiation of the object creation API.
  loggerInfo.info("POST api/createObjects");

  try {
    // Validate that the request method is POST. If not, return an error response.
    if (req.method !== "POST") {
      res.status(405).send({ message: "Only POST requests allowed" });
      return;
    }

    // Extract the object data from the request.
    const reqData = req.body;
    const validation = createObjectValidation(reqData);
    if (validation.error) {
      // Handle validation errors
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validation.error.details.map((detail) => detail.message),
      });
      return;
    }

    await db.sequelize.transaction(async (transaction: any) => {
      // Create a new object entry using the provided data.
      const objectId = await objectRepo.create(validation.value, transaction);

      if ('objData' in objectId && 'value' in objectId) {
        const { objData, value } = objectId;
        res.send({ objData, value });
      } else {
        // Handle the case when the result is of the form { success: boolean; message: string; data: any; }
        const { success, message, data } = objectId;
        if (success) {
          res.send({ objData: data });
        } else {
          res.status(404).json({ message });
        }
      }
    });
  } catch (error: any) {
    // If there's an error during the object and value creation process, log the error and send back an error response.
    loggerError.error(error);
    res.status(405).json({ message: "Cannot Store Data " });
  }
}
