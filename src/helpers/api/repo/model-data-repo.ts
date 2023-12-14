import sendResponseData from "@/helpers/constant";
import { db } from "../db";
export const modelDataRepo = {
  saveData,
  getData,
};
async function saveData(params: any) {
  try {
    const data = await db.ModelData.findOne({
      where: { objectId: params.objectId },
    });
    if (data) {
      data.url = params.url;
      const result = await data.save(data.url);
      return sendResponseData(true, "Updated Successfully", result);
    }
    const result = new db.ModelData(params);
    const save = await result.save();
    return sendResponseData(true, "Data Saved Successfully", save);
  } catch (error: any) {
    return sendResponseData(false, "Error In Service", error);
  }
}
async function getData(params: any) {
  try {
    const data = await db.ModelData.findOne({
      where: { objectId: params.objectId, type: params.type },
      raw: true,
    });
    if (!data) {
      return sendResponseData(false, "No data Found", data);
    }
    return sendResponseData(true, "Data Fetched SuccessFully", data);
  } catch (error: any) {
    return sendResponseData(false, "Error", error);
  }
}
