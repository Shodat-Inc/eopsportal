import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";

export const assetRepo = {
  create,
};

async function create(params: any) {
  loggerInfo.info("asset-repo");
  try {
    const asset = new db.Assets(params);
    // save user
    const data = await asset.save();
    return sendResponseData(true, "Asset added successfully", data);
  } catch (error) {
    loggerError.error(error);
    return sendResponseData(false, "error", error);
  }
}
