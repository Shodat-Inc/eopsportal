import { loggerError, loggerInfo } from "@/logger";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";
import message from "@/util/responseMessage";

/**
 * Repository for handling Subscription related operations.
 */
export const subscriptionRepo = {
  getDetails,
  getModelName
};

async function getDetails(params: any) {
  // Log an information message using the 'loggerInfo' instance
  loggerInfo.info("Subscription Repo");

  try {
    // Fetch all Subscription records with specific conditions
    const data = await db.Subscription.findAll({
      where: { userId: params.userId, modelId: params.modelId },
    });

    // If no data is found, return an error response
    if (data.length === 0) {
      return sendResponseData(false, message.error.modelDataNotExist, []);
    }

    // Return a successful response with the fetched data
    return sendResponseData(true, message.success.dataFetched, data);
  } catch (error: any) {
    // Log an error message using the 'loggerError' instance
    loggerError.error("Error In Subscription Repo");

    // Return an error response
    return sendResponseData(false, message.error.error, error);
  }
}

async function getModelName(params: any) {
  try {
    // Log an information message using the 'loggerInfo' instance
    loggerInfo.info("Get Model Name based on User's Subscription");

    // Find the Subscription with the specified 'subscriptionId' in the database
    const id = await db.Subscription.findOne({
      where: { id: params.subscriptionId }
    });

    // If no Subscription is found with the specified 'subscriptionId', return an error response
    if (!id) {
      return sendResponseData(false, "Not subscribed", {});
    }

    // Fetch all Model records with specific attributes based on the user's subscription
    const data = await db.Model.findAll({
      attributes: ['modelName'],
      include: [
        {
          // Specify the association with the Subscription model
          model: db.Subscription,
          attributes: [],
          // Define conditions for the association
          where: {
            userId: params.userId
          },
        },
      ],
    });

    // If no data is found, return an error response
    if (!data) {
      return sendResponseData(false, "Data not found", {});
    }

    // Return a successful response with the fetched Model names based on the user's subscription
    return sendResponseData(true, message.success.modelNameBasedOnSubscription, data);
  } catch (error: any) {
    // Log an error message using the 'loggerError' instance
    loggerError.error("Error in getting Model Name based on Subscription", error);

    // Return an error response
    return sendResponseData(false, message.error.errorModelNameBasedOnSubscription, error);
  }
}
