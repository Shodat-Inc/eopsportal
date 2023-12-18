import { db, initialize } from "../db";
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
        loggerInfo.info("Saving Response");
        const data = await db.CrackResponse.findOne({
            where: {
                modelObjectImageId: params.modelObjectImageId
            }
        });
        if (data) {
            const modelObjectImage = await db.Image.findByPk(params.modelObjectImageId);
            if (modelObjectImage) {
                modelObjectImage.testRanCount += 1;
                await modelObjectImage.save();
            } else {
                return sendResponseData(false, "ModelObjectImage Id not found", {});
            }
            return sendResponseData(false, "Response is already saved", {});
        }
        const newResponse = new db.CrackResponse(params);
        const save = await newResponse.save();
        return sendResponseData(true, "Response Saved Successfully", save);
    } catch (error: any) {
        loggerError.error("Error in Crack Detection Response Repo", error);
        return sendResponseData(false, "Error in Crack Detection Repo", error);
    }
}

async function getResponse(params: any) {
    try {
        loggerInfo.info("Getting Response")
        if (!params.modelObjectImageId) {
            return sendResponseData(false, "ModelObjectImage ID is not provided in params", {})
        }
        const data = await db.CrackResponse.findAll({
            where: {
                modelObjectImageId: params.modelObjectImageId
            },
            attributes: ["coordinates", "tag", "modelObjectImageId"]
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
