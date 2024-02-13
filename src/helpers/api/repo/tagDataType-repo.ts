import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import message from "@/util/responseMessage";
import { paginateQuery } from "../constant/pagination";

/**
 * Repository for handling tagDataType-related operations.
 */
export const tagDataTypeRepo = {
  create,
  get,
};

/**
 * Asynchronously creates a new tagDataType entry in the database.
 *
 * @param {Object} params - The parameters containing information to save the tagDataType.
 * @returns {Object} - Response object indicating the success or failure of the operation.
 */
async function create(params: any) {
  // Log the initiation of tagDataType creation.
  loggerInfo.info("tagDataType repo");

  try {
    // Create a new tagDataType instance using the provided parameters.
    const tagDataType = new db.tagDataType(params);

    // Save the new tagDataType to the database.
    const data = await tagDataType.save();

    // Return a successful response indicating the tagDataType was added.
    return sendResponseData(true, message.success.tagDatatypeAdded, data);
  } catch (error) {
    // Log the error if there's an issue with the tagDataType creation.
    loggerError.error("Cant Save Tag Datatype", error);
    // Return a response indicating the failure of the operation.
    return sendResponseData(false, message.error.error, error);
  }
}

/**
 * Fetches all Tag DataTypes from the database.
 *
 * @returns {Promise<object>} A promise that resolves with the result of the Tag DataTypes fetching process.
 */
async function get(params: any) {
  // Log information about the function execution
  loggerInfo.info("Get All Tag DataTypes");

  try {
    const page = params.query.page || 1; // Default to page 1 if not provided
    const pageSize = params.query.pageSize || 10; // Default page size to 10 if not provided

    // Fetch all Tag DataTypes from the database
    const result = await paginateQuery(db.tagDataType, page, pageSize, {})

    // Return a successful response with the fetched Tag DataTypes
    return sendResponseData(true, message.success.tagDataTypeFetched, result);

  } catch (error: any) {
    // Log error information in case of an exception during Tag DataTypes fetching
    loggerError.error("Error in fetching Tag DataTypes");

    // Return an error response in case of an exception during Tag DataTypes fetching
    return sendResponseData(false, message.error.unableFetchTagDataType, []);
  }
}
