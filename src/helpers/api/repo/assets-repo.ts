import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import message from "@/util/responseMessage";

// Object to manage assets-related database operations.
export const assetRepo = {
  create,
};

/**
 *
 * @param {Object} params - The parameters containing information to save the assets.
 * @returns {Object} - Response object indicating the success or failure of the operation.
 */

async function create(params: any) {
  // Logging the initiation of an asset creation.
  loggerInfo.info("asset-repo");
  try {
    const asset = new db.Assets(params);
    // save asset
    const data = await asset.save();
    return sendResponseData(true, message.success.assetAdded, data);
  } catch (error) {
    loggerError.error("Error in asset repo",error);
    return sendResponseData(false, message.error.error, error);
  }
}
