import { modelDataRepo, apiHandler } from "@/helpers/api";
import { loggerError, loggerInfo } from "@/logger";
import sendResponseData from "../../helpers/constant";
import message from "@/util/responseMessage";

// Default API handler for the POST method to handle user authentication.
export default apiHandler({
    post: handler,
});

/**
 * Handler function to process user authentication.
 *
 * @param {Object} req - The incoming request object containing user authentication details.
 * @param {Object} res - The response object to send back the results.
 */
async function handler(req: any, res: any) {
    try {
        // Ensure that the method used is POST, otherwise return a 405 Method Not Allowed error.
        if (req.method !== "POST") {
            return res.status(405).send(sendResponseData(false, message.error.postMethodError, []));
        }
        // Log information about the request
        loggerInfo.info("Post Class");

        // Extract data from the request body
        const data = req.body;

        const model = await modelDataRepo.testImageRanCount(data);

        // Send a success response
        res.status(200).json(model);
    } catch (error: any) {
        // Log the error to the console
        loggerError.error("Error in Creating Model", error);

        // Send an error response
        res.status(400).json(error);
    }
}


