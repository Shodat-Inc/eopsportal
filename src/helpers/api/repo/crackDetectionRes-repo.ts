import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";

/**
 * Repository for handling Model related operations.
 */
export const crackDetectionResRepo = {
    create,
    getResponse
};

async function create(params: any) {
    try {
        loggerInfo.info("Saving Response")
        const data = await db.CrackResponse.findOne({
            where: {
                imageId: params.imageId
            }
        })
        if (data) {
            return sendResponseData(false, "Response is already saved", {})
        }
        const newResponse = new db.CrackResponse(params)
        const save = await newResponse.save()
        return sendResponseData(true, "Response Saved Successfully", save)
    } catch (error: any) {
        loggerError.error("Error in Crack Detection Response Repo", error)
        return sendResponseData(false, "Error in Crack Detection Repo", error)
    }
}

async function getResponse(params: any) {
    try {
        loggerInfo.info("Getting Response")
        if (!params.imageId) {
            return sendResponseData(false, "Image ID is not provided in params", {})
        }
        const data = await db.CrackResponse.findAll({
            where: {
                imageId: params.imageId
            },
            attributes: ["coordinates", "predictions", "thresholdValue", "tag", "probability"]
        })
        if (!data) {
            return sendResponseData(false, "Response data doesn't exist with provided id", {})
        }
        return sendResponseData(true, "Response Fetched Successfully", data)
    } catch (error: any) {
        loggerError.error("Error in fetching Response", error)
        return sendResponseData(false, "Error in fetching Response", error)
    }

}
