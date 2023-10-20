import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import { error } from "console";

export const valueRepo = {
  create,
  bulkCreate,
};
async function create(params: any, objectId: any) {
  loggerInfo.info("Create Value Repo:");
  if (!objectId) {
    loggerError.error("No object Id provided", error);
    return sendResponseData(false, "Object ID not provided!", {});
  }
  try {
    const AddValues = new db.AddValues(params);
    // save tags
    const data = await AddValues.save();
    return sendResponseData(true, "Value added successfully", data);
  } catch (error) {
    loggerError.error("Error in Value repo", error);
  }
}

async function bulkCreate(params: any[], objectId:any) {
  loggerInfo.info("Bulk Create Value Repo:");
  if (!objectId) {
    loggerError.error("No Object Id provided", error);
    return sendResponseData(false, "ObjectId is not provided!", {});
  }
  try {
    const data = await db.AddValues.bulkCreate(params);
    return sendResponseData(true, "Values added successfully", data);
  } catch (error) {
    loggerError.error("Error in bulk Value repo", error);
  }
}
