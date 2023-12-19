import { apiHandler, crackDetectionResRepo } from "@/helpers/api";
import { loggerError, loggerInfo } from "@/logger";
import { saveResponseValidation } from "../../../validateSchema";

// Default API handler for the POST method to handle saving crack detection responses.
export default apiHandler({
    post: allhandler,
});

/**
 * Handler function to process POST requests for saving crack detection responses.
 *
 * @param {Object} req - The incoming request object which may contain crack detection response data.
 * @param {Object} res - The response object to send back the results.
 */
async function allhandler(req: any, res: any) {
    // Log an information message using the 'loggerInfo' instance
    loggerInfo.info("GET Enterprise User");

    try {
        // Extract crack detection response data from the request body
        const reqData = req.body;

        // Validate the request data using the defined schema
        const validation = saveResponseValidation(reqData);

        // Check for validation errors
        if (validation.error) {
            // Handle validation errors by responding with a 400 Bad Request status and the error details
            res.status(400).json({
                success: false,
                message: "Validation error",
                errors: validation.error.details.map((detail) => detail.message),
            });
            return;
        }

        // Create a new crack detection response in the database
        const model = await crackDetectionResRepo.create(validation.value);

        // Respond with a 200 OK status and a success message
        res.status(200).json({ message: model });
    } catch (error: any) {
        // If there's an error during the operation, log the error and send back a 500 Internal Server Error response with the error message
        loggerError.error("Can't fetch User(s)", error);
        res.status(500).send({ message: error.message });
    }
}