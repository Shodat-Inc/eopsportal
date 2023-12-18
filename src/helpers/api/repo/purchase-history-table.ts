import { loggerError, loggerInfo } from "@/logger";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";
export const purchaseHistoryRepo = {
  getDetails,
};
async function getDetails(params: any) {
  loggerInfo.info("Purchase History Repo");
  try {
    const data = await db.PurchaseHistory.findAll({
      where: { userId: params.userId, subscriptionId: params.subscriptionId },
    });
    if (data.length === 0) {
      return sendResponseData(false, "No Purchase History Data Exists", []);
    }
    return sendResponseData(true, "Data Fetched Successfully", data);
  } catch (error: any) {
    loggerError.error("Error In Purchase History Repo");
    return sendResponseData(false, "Error", error);
  }
}
