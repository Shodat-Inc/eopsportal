// Import necessary modules and utilities.
import { apiHandler, objectRepo } from "@/helpers/api";
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


    // Create a new object entry using the provided data.
    const objData = await objectRepo.create(validation.value);
    const objectId = objData.data.id;

    // Create an array to store values for the object.
    let valueData = [];

    // Populate the value data from the request.
    for (let key of reqData.values) {
      valueData.push({
        objectId: objectId,
        classTagId: key.classTagId,
        values: key.value,
      });
    }

    // Bulk create values using the populated value data.
    const value = await valueRepo.bulkCreate(valueData, objectId);

    // Send back a successful response with the object and value data.
    res.send({ objData, value });

    // Alternate response could be sent back to confirm data storage.
    // res.status(200).json({ message: "Data stored successfully" });
  } catch (error: any) {
    // If there's an error during the object and value creation process, log the error and send back an error response.
    loggerError.error(error);
    res.status(405).json({ message: "Cannot Store Data " });
  }
}
