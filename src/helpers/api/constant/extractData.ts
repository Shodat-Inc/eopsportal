import { loggerInfo } from "@/logger";
import { db } from "../db";
import { checkAlertTable } from "./checkTable";
import sendResponseData from "@/helpers/constant";

export async function getImageData(image_id: number) {
  try {
    loggerInfo.info("Get Image Data");

    const data = await db.Image.findAll({
      where: { id: image_id },
      include: [
        {
          model: db.ModelData,
          attributes: ["userId", "modelId", "classId", "objectId"],
        },
      ],
    });

    if (!data) {
      return sendResponseData(false, "No Image Data", []);
    }

    return data;
  } catch (error) {
    return error;
  }
}
export async function getAlertData(tag: string, userId: number) {
  try {
    loggerInfo.info("Get Alert Data According to the Tag");

    const tableName: any = checkAlertTable(tag);

    const alerts = await db[tableName].findAll({
      where: {
        isEnabled: 1,
        userId: userId,
      },
      raw: true,
    });

    if (!alerts) {
      return "No Alert Data Found";
    }
    return alerts;
  } catch (error) {
    return error;
  }
}
