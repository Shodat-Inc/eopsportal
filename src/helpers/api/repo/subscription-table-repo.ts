import { loggerError, loggerInfo } from "@/logger";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";
export const subscriptionRepo = {
  getDetails,
};
async function getDetails(params: any) {
  loggerInfo.info("Subscription Repo");
  try {
    const data = await db.Subscription.findAll({
      where: { userId: params.userId, modelId: params.modelId },
    });
    if (data.length === 0) {
      return sendResponseData(false, "No Model Data Exists", []);
    }
    return sendResponseData(true, "Data Fetched Successfully", data);
  } catch (error: any) {
    loggerError.error("Error In Subscription Repo");
    return sendResponseData(false, "Error", error);
  }
}
