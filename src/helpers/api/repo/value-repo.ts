import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";

// Repository for value-related operations.
export const valueRepo = {
  create,
  bulkCreate,
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
    return sendResponseData(false, "Object ID not provided!", {});
  }

  try {
    // Create a new AddValues instance using the provided parameters.
    const AddValues = new db.AddValues(params);

    // Save the new value to the database.
    const data = await AddValues.save();

    // Return a successful response indicating the value was added.
    return sendResponseData(true, "Value added successfully", data);
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
async function bulkCreate(params: any[], objectId: any) {
  // Log the initiation of bulk value creation.
  loggerInfo.info("Bulk Create Value Repo:");

  // Validate the presence of the object ID.
  if (!objectId) {
    loggerError.error("No Object Id provided");
    return sendResponseData(false, "ObjectId is not provided!", {});
  }

  try {
    // Create multiple value entries in the database using the provided parameters.
    const data = await db.AddValues.bulkCreate(params);

    // Return a successful response indicating the values were added.
    return sendResponseData(true, "Values added successfully", data);
  } catch (error) {
    // Log the error if there's an issue with the bulk value creation.
    loggerError.error("Error in bulk Value repo", error);
  }
}
