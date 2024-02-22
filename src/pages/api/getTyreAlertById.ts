import { apiHandler, tyreAlertRepo } from "@/helpers/api";
import { loggerError, loggerInfo } from "@/logger";

export default apiHandler({
    get: getAlertById,
});

async function getAlertById(req: any, res: any) {
    loggerInfo.info("GET Alert By ID");
    try {
        const reqData = req.query
        const data = await tyreAlertRepo.getTyreAlertById(reqData);
        res.status(200).json({ message: data });
    } catch (error: any) {
        // If there's an error during the retrieval, log the error and send back a 500 Internal Server Error response with the error message.
        loggerError.error("Error in fetching Alert Data", error);
        res.status(500).send({ message: error.message });
    }
}
