import { loggerError, loggerInfo } from "@/logger";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";

export const subscriptionRepo = {
  getDetails,
  getModelName
};

async function getDetails(params: any) {
  loggerInfo.info("Subscription Repo");
  try {
    const data = await db.Subscription.findAll({
      where: { userId: params.userId, modelId: params.modelId },
    });
    if (data.length === 0) {
      return sendResponseData(false, "Model's Data doesn't Exists", []);
    }
    return sendResponseData(true, "Data Fetched Successfully", data);
  } catch (error: any) {
    loggerError.error("Error In Subscription Repo");
    return sendResponseData(false, "Error", error);
  }
}

async function getModelName(params: any) {
  try {
    loggerInfo.info("Get Model Name based on User's Subscription")
    const id = await db.Subscription.findOne({
      where: { id: params.subscriptionId }
    })
    if (!id) {
      return sendResponseData(false, "Not subscribed", {})
    }
    const data = await db.Model.findAll({
      attributes: ['modelName'],
      include: [
        {
          model: db.Subscription,
          attributes: [],
          where: {
            userId: params.userId
          },
        },
      ],
    })
    if (!data) {
      return sendResponseData(false, "Data not found", {})
    }
    return sendResponseData(true, "Fetched Model Name based on User's Subscription", data)
  } catch (error: any) {
    loggerError.error("Error in getting Model Name based on Subscription", error)
    return sendResponseData(false, "Error in getting Model Name based on User's Subscription", error)
  }
}
