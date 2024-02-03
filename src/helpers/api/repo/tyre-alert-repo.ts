import { loggerError, loggerInfo } from "@/logger";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";

export const tyreAlertRepo = {
  create,
};

async function create(params: any) {
  loggerInfo.info("Post api/createAlerts to create Alerts");

  try {
    const data = await db.TyreAlerts.findOne({
      where: {
        alertName: params.alertName,
      },
    });

    if (data) {
      return sendResponseData(false, "Alert Name already Exists", {});
    }

    const newAlert = new db.TyreAlerts(params);

    const save = await newAlert.save();

    // Return a successful response with the saved data
    return sendResponseData(true, "Alert Created Successfully", save);
  } catch (error) {
    loggerError.error("Error in Alert Repo", error);
    return sendResponseData(false, "Error in Alert Repo", error);
  }
}
