import { apiHandler, modelRepo } from "@/helpers/api";
import { loggerError, loggerInfo } from "@/logger";


// Default API handler for the GET method to handle retrieval of models.
export default apiHandler({
    get: allhandler,
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
        // Retrieve all models using the Model Repo.
        const model = await modelRepo.getAllModel();
        // If Models are successfully retrieved, send back a 200 OK response with the Models data.
        res.status(200).json({ message: model });
    } catch (error: any) {
        // If there's an error during the retrieval, log the error and send back a 500 Internal Server Error response with the error message.
        loggerError.error("Cant fetch User(s)", error);
        res.status(500).send({ message: error.message });
    }
}