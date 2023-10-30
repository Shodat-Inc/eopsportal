import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";

// Repository for tagDataType-related operations.
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
    return sendResponseData(true, "Tag DataType added successfully", data);
  } catch (error) {
    // Log the error if there's an issue with the tagDataType creation.
    loggerError.error("Cant Save Tag Datatype", error);
    // Return a response indicating the failure of the operation.
    return sendResponseData(false, "error", error);
  }
}

async function get(){
  loggerInfo.info("Get All Tag DataTypes");
  try {
    const result = await db.tagDataType.findAll();
    console.log(result, "------------");
    return sendResponseData(true, "Tag Data Type Fetched Successfully", result);
  } catch (error: any) {
    return sendResponseData(false, "Cant Fetch Tag datatype", []);
  }
}
