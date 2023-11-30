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
    loggerError.error("Error in bulk class Tag repo");
    return sendResponseData(false,message.error.errorBulkClassTag, error)
  }
}

/**
 * Retrieves class tags based on the given ID from the database.
 *
 * @param {any} id - The ID used to filter class tags.
 * @returns {Promise<object>} A promise that resolves with the result of the database query.
 */
async function getClassTags(id: any) {
  try {
    // Fetch class tags from the database using Sequelize findAll method
    const result = await db.classTag.findAll({
      where: { id },
    });
    // Return successful response with fetched class tags
    return sendResponseData(true, message.success.fetchClassTag, result);
  } catch (error: any) {
    // Return error response if there's an issue with fetching class tags
    return sendResponseData(false, message.error.fetchClassTag, error);
  }
}

/**
 * Retrieves parent join tags from the database based on the given parameters.
 *
 * @param {any} params - The parameters used to filter parent join tags.
 * @returns {Promise<object>} A promise that resolves with the result of the database query.
 */
async function getParentJoinTags(params: any) {
  // Log information about the function execution
  loggerInfo.info("get parent join tags");

  try {
    // Fetch parent join tag from the database using Sequelize findOne method
    const result = await db.classTag.findOne({
      where: { id: params },
      attributes: ["tagName"],
    });

    // Return the result of the database query
    return result;
  } catch (error: any) {
    // Return any errors encountered during the database query
    return error;
  }
}

/**
 * Deletes a class tag from the database based on the given ID.
 *
 * @param {any} id - The ID of the class tag to be deleted.
 * @returns {Promise<number>} A promise that resolves with the number of rows deleted.
 */
async function _delete(id: any) {
  // Delete the class tag from the database using Sequelize destroy method
  // The 'where' clause specifies the condition for deletion based on the provided ID
  return await db.classTag.destroy({
    where: {
      id: id,
    },
  });
}

