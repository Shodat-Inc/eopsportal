import { apiHandler, attachmentRepo } from "@/helpers/api";
import { loggerError, loggerInfo } from "@/logger";

// Define DELETE API endpoint using apiHandler
export default apiHandler({
    delete: _delete,
});

// Define the _delete function to handle the DELETE request
async function _delete(req: any, res: any) {
    loggerInfo.info("Delete Attachment");

    try {
        // Extract the 'id' parameter from the request params
        const reqParams = req.query;
        const reqAuth = req.auth

        const commentDel = await attachmentRepo.delete(reqParams, reqAuth);

        // Send a success response with the result of the delete operation
        res.status(200).json({ message: commentDel });
    } catch (error: any) {
        // Handle errors, log the error, and send an error response
        loggerError.error("Error in deleting Comment", error);
        res.status(400).json("Error in deleting Comment", error);
    }
}
