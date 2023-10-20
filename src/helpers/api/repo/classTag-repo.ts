import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";

export const classTagRepo = {
  create,
  bulkCreate,
};
async function create(params: any, classId: any) {
  loggerInfo.info("Create Class Tag Repo:");
  if (!classId) {
    loggerError.error("ClassId Is not provided, Tag not saved.");
    return sendResponseData(false, "ClassId Is not provided!", {});
  }
  try {
    // validate
    const tags = new db.classTag(params);
    // save tags
    const data = await tags.save();
    return sendResponseData(true, "Class Tag added successfully", data);
  } catch (error) {
    loggerError.error("Error in class Tag repo", error);
  }
}

async function bulkCreate(params: any[],classId:any) {
  loggerInfo.info("Bulk Create Class Tag Repo:");
  if (!classId) {
    loggerError.error("ClassId Is not provided, Tag not saved.");
    return sendResponseData(false, "ClassId Is not provided!", {});
  }
  try {
    const data = await db.classTag.bulkCreate(params);
    return sendResponseData(true, "Class Tags added successfully", data);
  } catch (error) {
    loggerError.error("Error in bulk class Tag repo", error);
  }
}
