import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";

export const valueRepo = {
  create,
  bulkCreate,
};
async function create(params: any) {
  loggerInfo.info("Create Value Repo:");
  try {
    // validate
    if (!params.classId) {
      return sendResponseData(false, "ClassId Is not provided!", {});
    }
    const AddValues = new db.AddValues(params);
    // save tags
    const data = await AddValues.save();
    return sendResponseData(true, "Value added successfully", data);
  } catch (error) {
    loggerError.error("Error in Value repo", error);
  }
}

async function bulkCreate(params: any[]) {
  loggerInfo.info("Bulk Create Value Repo:");
  try {
    const data = await db.AddValues.bulkCreate(params);
    return sendResponseData(true, "Values added successfully", data);
  } catch (error) {
    loggerError.error("Error in bulk Value repo", error);
  }
}