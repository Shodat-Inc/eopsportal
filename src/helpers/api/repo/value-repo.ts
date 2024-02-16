import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import message from "@/util/responseMessage";

/**
 * Repository for handling value-related operations.
 */
export const valueRepo = {
  create,
  bulkCreate,
  update,
  delete: _delete,
};

/**
 * Asynchronously creates a new value entry in the database.
 *
 * @param {Object} params - The parameters containing information to save the value.
 * @param {any} objectId - The object ID to which the value should be associated.
 * @returns {Object} - Response object indicating the success or failure of the operation.
 */
async function create(params: any, objectId: any) {
  // Log the initiation of value creation.
  loggerInfo.info("Create Value Repo:");

  // Validate the presence of the object ID.
  if (!objectId) {
    loggerError.error("No object Id provided");
    return sendResponseData(false, message.error.objectIdError, {});
  }

  try {
    // Create a new AddValues instance using the provided parameters.
    const AddValues = new db.AddValues(params);

    // Save the new value to the database.
    const data = await AddValues.save();

    // Return a successful response indicating the value was added.
    return sendResponseData(true, message.success.valueAdded, data);
  } catch (error) {
    // Log the error if there's an issue with the value creation.
    loggerError.error("Error in Value repo", error);
  }
}

/**
 * Asynchronously creates multiple value entries in the database.
 *
 * @param {Object[]} params - An array of parameters, each containing information to save a value.
 * @param {any} objectId - The object ID to which the values should be associated.
 * @returns {Object} - Response object indicating the success or failure of the operation.
 */
async function bulkCreate(params: any[], objectId: any, transaction: any) {
  // Log the initiation of bulk value creation.
  loggerInfo.info("Bulk Create Value Repo:");

  // Validate the presence of the object ID.
  if (!objectId) {
    loggerError.error("No Object Id provided");
    return sendResponseData(false, message.error.objectIdError, {});
  }

  try {
    // Create multiple value entries in the database using the provided parameters.
    const data = await db.AddValues.bulkCreate(params, { transaction });

    // Return a successful response indicating the values were added.
    return sendResponseData(true, message.success.valuesAdded, data);
  } catch (error) {
    // Log the error if there's an issue with the bulk value creation.
    loggerError.error("Error in bulk Value repo", error);
  }
}

/**
 * Updates object values for specific tag IDs in the database.
 *
 * @param {any} params - The parameters containing an array of objects with classTagId and values.
 * @returns {Promise<object>} A promise that resolves with the result of the update operation.
 */
async function update(params: any) {
  // Log information about the object value update process
  loggerInfo.info("Update Object Value for specific tag IDs");
  try {
    let updatedData: any = {};
    // Iterate through the provided parameters
    for (let x of params) {
      // Find the object value in the database by classTagId
      const valueData = await db.AddValues.findOne({
        where: { id: x.classTagId },
      });

      // Check if the object value exists
      if (!valueData) {
        return sendResponseData(false, message.error.objectValueNotExist, {});
      }

      // Update the object value with the provided values, if available
      valueData.values = x.values || valueData.values;
      valueData.updatedAt = new Date();

      // Save the updated object value
      valueData.save();
      updatedData[`objectValueId ${x.classTagId}`] = valueData.values;
    }

    // Return a successful response after updating all object values
    return sendResponseData(true, message.success.updated, updatedData);
  } catch (error: any) {
    // Log error information in case of an exception during object value update
    loggerError.error("Error in updating object values");

    // Return an error response in case of an exception during object value update
    return sendResponseData(false, message.error.errorUpdation, error);
  }
}

/**
 * Deletes object values for specific tag IDs in the database.
 *
 * @param {any} params - The parameters containing an array of tag IDs to be deleted.
 * @returns {Promise<object>} A promise that resolves with the result of the delete operation.
 */
async function _delete(params: any) {
  // Log information about the object value deletion process
  loggerInfo.info("Delete Object Value for specific tag IDs");
  
  try {
    // Iterate through the provided tag IDs
    for (let x of params) {
      // Find the object value in the database by tag ID
      const result = await db.AddValues.findByPk(x);

      // Check if the object value exists
      if (result) {
        // If it exists, destroy (delete) the object value
        result.destroy();
      }
    }

    // Return a successful response after deleting all object values
    return sendResponseData(true, message.success.tagDeleted, []);
  } catch (error: any) {
    // Log error information in case of an exception during object value deletion
    loggerError.error("Error in deleting object values");

    // Return an error response in case of an exception during object value deletion
    return sendResponseData(
      false,
      message.error.errorDeletingObjectValues,
      error
    );
  }
}
