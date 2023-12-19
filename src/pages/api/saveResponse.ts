import { apiHandler, crackDetectionResRepo } from "@/helpers/api";
import { loggerError, loggerInfo } from "@/logger";
import { saveResponseValidation } from "../../../validateSchema"

// Default API handler for the GET method to handle retrieval of models.
export default apiHandler({
    post: allhandler,
});

/**
 * Handler function to process GET requests for retrieving models.
 *
 * @param {Object} req - The incoming request object which may contain filtering criteria.
 * @param {Object} res - The response object to send back the results.
 */
async function allhandler(req: any, res: any) {
    loggerInfo.info("GET Enterprise User");
    try {
        const reqData = req.body
        const validation = saveResponseValidation(reqData);

        //Check for validation errors
        if (validation.error) {
            // Handle validation errors
            res.status(400).json({
                success: false,
                message: "Validation error",
                errors: validation.error.details.map((detail) => detail.message),
            });
            return;
        }

        const model = await crackDetectionResRepo.create(validation.value);
        res.status(200).json({ message: model });
    } catch (error: any) {
        // If there's an error during the retrieval, log the error and send back a 500 Internal Server Error response with the error message.
        loggerError.error("Cant fetch User(s)", error);
        res.status(500).send({ message: error.message });
    }

}