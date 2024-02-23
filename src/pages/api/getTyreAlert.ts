import { apiHandler, tyreAlertRepo } from "@/helpers/api";
import { loggerError, loggerInfo } from "@/logger";


// Default API handler for the GET method to handle retrieval of alerts.
export default apiHandler({
    get: allhandler,
});

/**
 * Handler function to process GET requests for retrieving alerts.
 *
 * @param {Object} req - The incoming request object which may contain filtering criteria.
 * @param {Object} res - The response object to send back the results.
 */
async function allhandler(req: any, res: any) {
    loggerInfo.info("GET All Alerts");
    try {
        const alert = await tyreAlertRepo.getAllAlert(req);
        res.status(200).json({ message: alert });
    } catch (error: any) {
        // If there's an error during the retrieval, log the error and send back a 500 Internal Server Error response with the error message.
        loggerError.error("Cant fetch Tyre Alert(s)", error);
        res.status(500).send({ message: error.message });
    }
}