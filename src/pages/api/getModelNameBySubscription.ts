import { apiHandler, subscriptionRepo } from "@/helpers/api";
import { loggerError, loggerInfo } from "@/logger";

// Export the default API handler for the GET method
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
    // Log an information message using the 'loggerInfo' instance
    loggerInfo.info("GET Response");

    try {
        // Extract the user ID and subscription ID from the request
        const userId = req.id;
        const subscriptionId = req.query.subscriptionId;

        // Retrieve model names based on the user's subscription
        const response = await subscriptionRepo.getModelName({ userId, subscriptionId });

        // If models are successfully retrieved, send back a 200 OK response with the response data
        res.status(200).json({ message: response });
    } catch (error: any) {
        // If there's an error during the retrieval, log the error and send back a 500 Internal Server Error response with the error message
        loggerError.error("Can't fetch User(s)", error);
        res.status(500).send({ message: error.message });
    }
}