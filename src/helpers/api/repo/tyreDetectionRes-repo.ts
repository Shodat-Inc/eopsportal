import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import message from "@/util/responseMessage";

/**
 * Repository for handling Crack Detection Response related operations.
 */
export const tyreDetectionResRepo = {
    getResponse
};

// Define an asynchronous function named getResponse that takes 'params' as a parameter
async function getResponse(params: any) {
    try {
        // Log an information message using the 'loggerInfo' instance
        loggerInfo.info("Getting Response");

        // Check if 'modelObjectImageId' is not provided in the 'params'
        if (!params.modelObjectImageId) {
            // Return an error response if 'modelObjectImageId' is missing
            return sendResponseData(false, message.error.modelObjectImageIdInParams, {});
        }

        // Fetch all TyreResponse records with the given 'modelObjectImageId'
        const data = await db.TyreResponse.findAll({
            where: {
                modelObjectImageId: params.modelObjectImageId
            },
            // Specify the attributes to be included in the response
            attributes: ["response", "tag", "modelObjectImageId"]
        });

        // If no response data is found
        if (!data) {
            // Return an error response indicating that data doesn't exist for the provided id
            return sendResponseData(false, message.error.responseDataNotExist, {});
        }

        // Return a successful response with the fetched data
        return sendResponseData(true, message.success.responseFetched, data);
    } catch (error: any) {
        // Log an error message using the 'loggerError' instance
        loggerError.error("Error in fetching Response", error);

        // Return an error response
        return sendResponseData(false, message.error.errorFetchingResponse, error);
    }
}
