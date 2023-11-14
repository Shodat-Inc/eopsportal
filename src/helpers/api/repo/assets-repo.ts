import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import message from "@/util/responseMessage";

export const assetRepo = {
  create,
};

async function create(params: any) {
  loggerInfo.info("asset-repo");
  try {
    const asset = new db.Assets(params);
    // save user
    const data = await asset.save();
    return sendResponseData(true, message.success.assetAdded, data);
  } catch (error) {
    loggerError.error(error);
    return sendResponseData(false, message.error.error, error);
  }
}
