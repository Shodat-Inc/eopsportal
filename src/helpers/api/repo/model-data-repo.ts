import { loggerError, loggerInfo } from "@/logger";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";
export const modelDataRepo = {
  create,
  get,
};
async function create(params: any) {
  try {
    loggerInfo.info("Model Data Entry");
    const data = new db.ModelData(params);
    const result = await data.save();
    return sendResponseData(true, "Data Added Successfuly", result);
  } catch (error: any) {
    loggerError.error("Error In ModelDataRepo");
    return sendResponseData(false, "Error in saving Data", error);
  }
}
async function get(modelId: any, type: any, userId: any) {
  loggerInfo.info("Get Images");
  try {
    const data = await db.Image.findAll({
      attributes: ["url"],
      include: [
        {
          model: db.ModelData,
          where: { modelId: modelId, type: type, userId: userId },
          attributes: ["id", "type", "createdAt"],
        },
      ],
    });
    if (data.length === 0) {
      return sendResponseData(false, "No data Found", []);
    }
    return sendResponseData(true, "Data Fetched Successfully", data);
  } catch (error: any) {
    loggerError.error("Error");
    return sendResponseData(false, "Error In data Fetching", error);
  }
}
