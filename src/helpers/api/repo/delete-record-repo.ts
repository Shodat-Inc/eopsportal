import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import message from "@/util/responseMessage";

// Repository for deleteRecord-related operations.
export const deleteRecordRepo = {
  create,
};

/**
 * Asynchronously creates a new delete record entry in the database.
 * This function seems to track records that have been deleted by saving them in a 'deleteRecord' table.
 *
 * @param {Object} params - The parameters containing information to save the delete record.
 * @returns {Object} - Response object indicating the success or failure of the operation.
 */
async function create(params: any) {
  // Log the initiation of delete record creation.
  loggerInfo.info("Create Delete Record Repo:");

  try {
    // Validate if a delete record already exists with the provided email.
    let delete_data = await db.deleteRecord.findOne({
      where: { email: params.email },
    });

    // If a record is found with the given email, return an error response.
    if (delete_data) {
      return sendResponseData(false, message.error.deleteDataExist, {});
    }

    // Create a new deleteRecord instance using the provided parameters.
    const deleteData = new db.deleteRecord(params);

    // Save the new delete record to the database.
    const data = await deleteData.save();

    // Return a successful response indicating the delete record was added.
    return sendResponseData(true, message.success.deleteRecordAdded, data);
  } catch (error) {
    // Log the error if there's an issue with the delete record creation.
    loggerError.error("Error in delete repo", error);
    // Return a response indicating the failure of the operation.
    return sendResponseData(false, message.error.error, error);
  }
}
