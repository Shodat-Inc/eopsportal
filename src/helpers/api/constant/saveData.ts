import { loggerInfo } from "@/logger";
import { db } from "../db";
import { checkAlertTable, checkResponseTable } from "./checkTable";
import sendResponseData from "@/helpers/constant";

export async function saveRaisedAlert(data: any) {
  try {
    loggerInfo.info("Save In Raised Alert Response Table");

    const alertTableName = checkAlertTable(data.tag);

    const tableName = checkResponseTable(data.tag);

    const resultData = {
      modelObjectImageId: data.imageId,
      userId: data.imageData.userId,
      classId: data.imageData.classId,
      objectId: data.imageData.objectId,
      modelId: data.imageData.modelId,
      alertId: data.alertId,
      alertTableName,
      responseId: data.responseId,
      tableName,
    };

    const result = await db.RaisedAlert.create(resultData);

    if (!result) {
      return sendResponseData(false, "Error in Saving Data", []);
    }
    return result;
  } catch (error) {
    return error;
  }
}
