import { loggerError, loggerInfo } from "@/logger";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";
import message from "@/util/responseMessage";

/**
 * Repository for handling Purchase History related operations.
 */
export const purchaseHistoryRepo = {
  getDetails,
};

async function getDetails(params: any) {
  // Log an information message using the 'loggerInfo' instance
  loggerInfo.info("Purchase History Repo");

  try {
    // Fetch all PurchaseHistory records with specific conditions
    const data = await db.PurchaseHistory.findAll({
      where: { userId: params.userId, subscriptionId: params.subscriptionId },
    });

    // If no data is found, return an error response
    if (data.length === 0) {
      return sendResponseData(false, message.error.purchaseHistoryDataNotExist, []);
    }

    // Return a successful response with the fetched data
    return sendResponseData(true, message.success.dataFetched, data);
  } catch (error: any) {
    // Log an error message using the 'loggerError' instance
    loggerError.error("Error In Purchase History Repo");

    // Return an error response
    return sendResponseData(false, message.error.error, error);
  }
}
