import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import message from "@/util/responseMessage";

/**
 * Repository for handling Crack Detection Response related operations.
 */
export const batteryDetectionResRepo = {
    create,
    getResponse
};

// Define an asynchronous function named create that takes 'params' as a parameter
async function create(params: any) {
    try {
        // Log an information message using the 'loggerInfo' instance
        loggerInfo.info("Saving Response");

        // Check if a CrackResponse with the given 'modelObjectImageId' already exists in the database
        const data = await db.BatteryResponse.findOne({
            where: {
                modelObjectImageId: params.modelObjectImageId
            }
        });

        // If a response already exists for the given 'modelObjectImageId'
        if (data) {
            // Find the Image associated with the response
            const modelObjectImage = await db.Image.findByPk(params.modelObjectImageId);

            // If the Image is found, increment the 'testRanCount' and save it
            if (modelObjectImage) {
                modelObjectImage.testRanCount += 1;
                await modelObjectImage.save();
            } else {

                // If the Image is not found, return an error response
                return sendResponseData(false, message.error.modelObjectImageId, {});
            }
            // Return a response indicating that the response is already saved
            return sendResponseData(false, message.error.responseAlreadySaved, {});
        }

        // If no existing response is found, create a new CrackResponse instance with 'params'
        const newResponse = new db.CrackResponse(params);

        // Save the new response to the database
        const save = await newResponse.save();

        // Return a successful response
        return sendResponseData(true, message.success.responseSaved, save);
    } catch (error: any) {
        // Log an error message using the 'loggerError' instance
        loggerError.error("Error in Crack Detection Response Repo", error);

        // Return an error response
        return sendResponseData(false, message.error.errorCrackDetectionRepo, error);
    }
}

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

        // Fetch all BatteryResponse records with the given 'modelObjectImageId'
        const data = await db.BatteryResponse.findAll({
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
