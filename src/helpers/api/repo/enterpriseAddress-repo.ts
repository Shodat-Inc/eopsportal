import { loggerError, loggerInfo } from "@/logger";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";
import message from "@/util/responseMessage";

/**
 * Repository for handling operations related to enterprise addresses.
 */
export const enterpriseAddressRepo = {
  create,
};

/**
 * Creates a new enterprise address entry in the database.
 *
 * @param {any} params - The parameters containing information for creating an enterprise address entry.
 * @returns {Promise<object>} A promise that resolves with the result of the database operation.
 */
async function create(params: any, transaction: any) {
  try {
    // Log information about the function execution
    loggerInfo.info("Create Enterprise Address Repo");

    // Create a new enterprise address entry using Sequelize model
    const newAddress = new db.EnterpriseAddress(params, { transaction });
    const save = await newAddress.save({ transaction });

    // Return a successful response after saving the enterprise address
    return sendResponseData(true, message.success.enterpriseAddress, []);

  } catch (error: any) {
    // Log error information in case of an exception
    loggerError.error("Error in Enterprise Address Repo");

    // Return an error response in case of an exception during enterprise address creation
    return sendResponseData(false, message.error.errorSavingEnterpriseAddress, []);
  }
}

