import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import { salesTeamMail } from "../constant/nodemailer";
import message from "@/util/responseMessage";

/**
 * Repository for handling operations related to contacting sales.
 */
export const ContactSalesRepo = {
  create,
};

/**
 * Creates a new contact sales entry in the database.
 *
 * @param {any} params - The parameters containing information for creating a contact sales entry.
 * @returns {Promise<object>} A promise that resolves with the result of the database operation.
 */
async function create(params: any) {
  // Log information about the function execution
  loggerInfo.info("ContactSales");

  try {
    // Check if a contact sales entry with the given email already exists
    const existData = await db.ContactSale.findOne({
      where: { email: params.email },
    });

    // If the entry already exists, return an error response
    if (existData) {
      return sendResponseData(
        false,
        message.error.salesTeamContact,
        []
      );
    }

    // Create a new contact sales entry using Sequelize model
    const SalesData = new db.ContactSale(params);
    const response = await SalesData.save();

    // Send a sales team email notification
    salesTeamMail('kapilsharma@shodat.com', params.email);

    // Return a successful response with the created contact sales entry
    return sendResponseData(true, message.success.salesTeamContact, response);
  } catch (error) {
    // Log error information in case of an exception
    loggerError.error("ContactSales", error);

    // Return an error response in case of an exception
    return sendResponseData(false, message.error.error, error);
  }
}
