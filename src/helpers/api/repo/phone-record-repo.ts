import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import message from "@/util/responseMessage";

/**
 * Repository for handling phoneRecord-related operations.
 */
export const phoneRecordRepo = {
  create,
};

/**
 * Asynchronously creates a new phone record entry in the database.
 *
 * @param {Object} params - The parameters containing information to save the phone record.
 * @returns {Object} - Response object indicating the success or failure of the operation.
 */
async function create(params: any) {
  // Log the initiation of phone record creation.
  loggerInfo.info("POST api/createUsers Save Phone records");

  try {
    // Validate that the userId is provided.
    if (params.userId) {
      // Retrieve the user by its primary key (ID) from the database.
      const user = await db.User.findByPk(params.userId);

      // If no user is found with the given ID, return an error response.
      if (!user) {
        return sendResponseData(false, message.error.userNotExist, {});
      }
    } else {
      // If userId isn't provided, return an error response.
      return sendResponseData(false, message.error.idReq, {});
    }

    // Create a new phoneRecord instance using the provided parameters.
    const phoneRecord = new db.phoneRecord(params);

    // Save the new phone record to the database.
    const data = await phoneRecord.save();

    // Return a successful response indicating the phone record was added.
    return sendResponseData(true, message.success.phoneRecordAdded, data);
  } catch (error) {
    // Log the error if there's an issue with the phone record creation.
    loggerError.error("Cant Save Phone Record", error);
    // Return a response indicating the failure of the operation.
    return sendResponseData(false, message.error.error, error);
  }
}
