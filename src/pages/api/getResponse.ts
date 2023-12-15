import { apiHandler, crackDetectionResRepo } from "@/helpers/api";
import { loggerError, loggerInfo } from "@/logger";


// Default API handler for the GET method to handle retrieval of models.
export default apiHandler({
    get: allhandler,
});

/**
 * Handler function to process GET requests for retrieving response.
 *
 * @param {Object} req - The incoming request object which may contain filtering criteria.
 * @param {Object} res - The response object to send back the results.
 */
async function allhandler(req: any, res: any) {
    loggerInfo.info("GET Response");
    try {
        const data = req.query
        // Retrieve response using the Crack Detection Response Repo.
        const response = await crackDetectionResRepo.getResponse(data);
        // If Models are successfully retrieved, send back a 200 OK response with the Response.
        res.status(200).json({ message: response });
    } catch (error: any) {
        // If there's an error during the retrieval, log the error and send back a 500 Internal Server Error response with the error message.
        loggerError.error("Cant fetch User(s)", error);
        res.status(500).send({ message: error.message });
    }
}