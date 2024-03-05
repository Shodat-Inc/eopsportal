import { apiHandler, raisedAlertRepo } from "@/helpers/api";
import { loggerError, loggerInfo } from "@/logger";

export default apiHandler({
    get: allhandler,
});

async function allhandler(req: any, res: any) {
    loggerInfo.info("GET Enterprise User");
    try {
        const data = await raisedAlertRepo.get(req);
        res.status(200).json({ message: data });
    } catch (error: any) {
        // If there's an error during the retrieval, log the error and send back a 500 Internal Server Error response with the error message.
        loggerError.error("Can't fetch Raised Alert", error);
        res.status(500).send({ message: error.message });
    }
}