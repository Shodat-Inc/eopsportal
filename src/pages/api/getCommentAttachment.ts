import { apiHandler, commentAttachmentRepo } from "@/helpers/api";
import { loggerError, loggerInfo } from "@/logger";


// Default API handler for the GET method to handle retrieval of models.
export default apiHandler({
    get: allhandler,
});

async function allhandler(req: any, res: any) {
    loggerInfo.info("GET Attachment");
    try {
        const data = {
            userId: req.auth.sub,
            params: req.query
        }
        const getAttachment = await commentAttachmentRepo.get(data);

        res.status(200).json({ message: getAttachment });
    } catch (error: any) {
        // If there's an error during the retrieval, log the error and send back a 500 Internal Server Error response with the error message.
        loggerError.error("Cant fetch Attachment", error);
        res.status(500).send({ message: error.message });
    }
}