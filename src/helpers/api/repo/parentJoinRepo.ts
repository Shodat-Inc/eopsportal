import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";

// Repository for classTag-related operations.
export const parentJoinKeyRepo = {
  bulkCreate,
};

/**
 * Asynchronously creates multiple class tag entries in the database.
 *
 * @param {Object[]} params - An array of parameters, each containing information to save a class tag.
 * @param {any} classId - The class ID to which the tags should be associated.
 * @returns {Object} - Response object indicating the success or failure of the operation.
 */
async function bulkCreate(params: any[], classId: any) {
  // Log the initiation of bulk class tag creation.
  loggerInfo.info("Bulk Create Class Tag Repo:");

  // Validate classId presence.
  if (!classId) {
    loggerError.error("ClassId Is not provided, Tag not saved.");
    return sendResponseData(false, "ClassId Is not provided!", {});
  }

  try {
    // Create multiple class tag entries in the database using the provided parameters.
    const data = await db.parentJoinKey.bulkCreate(params);
    return sendResponseData(true, "Class Tags added successfully", data);
  } catch (error) {
    // Log the error if there's an issue with the bulk class tag creation.
    loggerError.error("Error in bulk class Tag repo", error);
  }
}
