import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import message from "@/util/responseMessage";

// Repository for classTag-related operations.
export const classTagRepo = {
  create,
  bulkCreate,
  delete: _delete,
  getClassTags,
  getParentJoinTags,
};

/**
 * Asynchronously creates a new class tag entry in the database.
 *
 * @param {Object} params - The parameters containing information to save the class tag.
 * @param {any} classId - The class ID to which the tag should be associated.
 * @returns {Object} - Response object indicating the success or failure of the operation.
 */
async function create(params: any, classId: any) {
  // Log the initiation of class tag creation.
  loggerInfo.info("Create Class Tag Repo:");

  // Validate classId presence.
  if (!classId) {
    loggerError.error("ClassId Is not provided, Tag not saved.");
    return sendResponseData(false, message.error.classIdError, {});
  }

  try {
    // Create a new classTag instance using the provided parameters.
    const tags = new db.classTag(params);

    // Save the new class tag to the database.
    const data = await tags.save();
    return sendResponseData(true, message.success.classTag, data);
  } catch (error) {
    // Log the error if there's an issue with the class tag creation.
    loggerError.error(message.error.errorClassTag, error);
  }
}

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
    return sendResponseData(false, message.error.classIdError, {});
  }

  try {
    // Create multiple class tag entries in the database using the provided parameters.
    const data = await db.classTag.bulkCreate(params);
    return sendResponseData(true, message.success.classTag, data);
  } catch (error) {
    // Log the error if there's an issue with the bulk class tag creation.
    loggerError.error(message.error.errorBulkClassTag, error);
  }
}

//get classTags
async function getClassTags(id: any) {
  try {
    const result = await db.classTag.findAll({
      where: { id },
    });
    return sendResponseData(true, message.success.fetchClassTag, result);
  } catch (error: any) {
    return sendResponseData(false, message.error.fetchClassTag, error);
  }
}

//get parent join tags
async function getParentJoinTags(params: any) {
  loggerInfo.info("get parent join tags");
  try {
    const result = await db.classTag.findOne({
      where: { id: params },
      attributes: ["tagName"],
    });
    return result;
  } catch (error: any) {
    return error;
  }
}

//delete class tag
async function _delete(id: any) {
  // delete class tag
  return await db.classTag.destroy({
    where: {
      id: id,
    },
  });
}
