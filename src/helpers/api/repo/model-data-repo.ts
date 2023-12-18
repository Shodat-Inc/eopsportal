import { loggerError, loggerInfo } from "@/logger";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";

export const modelDataRepo = {
  create,
  get,
  testImageRanCount
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

async function testImageRanCount(params: any) {
  try {
    loggerInfo.info("Test Image Ran Count")
    const data = await db.Image.findOne({
      where: {
        url: params.url
      }
    })
    if (data) {
      await data.update({
        testRanCount: (data.testRanCount || 0) + 1
      });
      loggerInfo.info("Test Image Ran Count updated successfully");
      return sendResponseData(true, "Test Image Ran Count updated successfully", data);
    } else {
      loggerInfo.info("Image not found with the specified URL");
      return sendResponseData(false, "Image not found with the specified URL", {});
    }

  } catch (error: any) {
    loggerError.error("Error in Test Image Ran Count", error)
    return sendResponseData(false, "Error in Test Image Ran Count", error)
  }
}