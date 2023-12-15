import { apiHandler, modelRepo } from "@/helpers/api";
import { loggerError, loggerInfo } from "@/logger";
import { updateModelValidation } from "../../../validateSchema";


// Default API handler to handle updation of models.
export default apiHandler({
    put: allhandler,
});

/**
 * Handler function to process UPDATE requests for updating models.
 *
 * @param {Object} req - The incoming request object which may contain filtering criteria.
 * @param {Object} res - The response object to send back the results.
 */
async function allhandler(req: any, res: any) {
    try {
        // Log information about the request
        loggerInfo.info("Post Class");

        //Extract data from query params
        const reqData = req.query

        // Extract data from the request body
        const data = req.body;

        // Validate the data using a validation module
        const validation = updateModelValidation(data);

        // Check for validation errors
        if (validation.error) {
            // Handle validation errors
            res.status(400).json({
                success: false,
                message: "Validation error",
                errors: validation.error.details.map((detail) => detail.message),
            });
            return;
        }

        // Create a model using the model repository
        const model = await modelRepo.update(reqData, validation.value);

        // Send a success response
        res.status(200).json(model);
    } catch (error: any) {
        // Log the error to the console
        loggerError.error("Error in Creating Model", error);

        // Send an error response
        res.status(400).json(error);
    }
}