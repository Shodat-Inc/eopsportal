import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";

export const classTagRepo = {
  create,
  bulkCreate,
};
async function create(params: any) {
  loggerInfo.info("Create Class Tag Repo:");
  try {
    // validate
    if (!params.classId) {
      return sendResponseData(false, "ClassId Is not provided!", {});
    }
    const tags = new db.classTag(params);
    // save tags
    const data = await tags.save();
    return sendResponseData(true, "Class Tag added successfully", data);
  } catch (error) {
    loggerError.error("Error in class Tag repo", error);
  }
}

async function bulkCreate(params: any[]) {
  loggerInfo.info("Bulk Create Class Tag Repo:");
  try {
    const data = await db.classTag.bulkCreate(params);
    return sendResponseData(true, "Class Tags added successfully", data);
  } catch (error) {
    loggerError.error("Error in bulk class Tag repo", error);
  }
}