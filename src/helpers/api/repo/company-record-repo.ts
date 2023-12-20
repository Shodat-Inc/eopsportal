import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import message from "@/util/responseMessage";

// Repository for CompanyRecord-related operations.
export const CompanyRecordRepo = {
  create,
};

/**
 * Asynchronously creates a new company record entry in the database.
 *
 * @param {Object} params - The parameters containing information to save the company record.
 * @returns {Object} - Response object indicating the success or failure of the operation.
 */
async function create(params: any, transaction: any) {
  // Log the initiation of a company record creation.
  loggerInfo.info("POST api/createUsers Save Company records");

  try {
    // Validate that the userId is provided.
    if (params.userId) {
      // Retrieve the user by its primary key (ID) from the database.
      const user = await db.User.findByPk(params.userId, { transaction });

      // If no user is found with the given ID, return an error response.
      if (!user) {
        return sendResponseData(false, message.error.userNotExist, {});
      }
    } else {
      // If userId isn't provided, return an error response.
      return sendResponseData(false, message.error.idReq, {});
    }

    // Create a new companyRecord instance using the provided parameters.
    const companyRecord = new db.companyRecord(params, { transaction });

    // Save the new company record to the database.
    const data = await companyRecord.save({ transaction });

    // Return a successful response indicating the company record was added.
    return sendResponseData(true, message.success.companyRecordAdded, data);
  } catch (error) {
    // Log the error if saving the company record fails.
    loggerError.error("Cant Save Company Record", error);
    // Return a response indicating the failure of the operation.
    return sendResponseData(false, message.error.error, error);
  }
}
