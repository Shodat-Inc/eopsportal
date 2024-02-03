import { loggerError, loggerInfo } from "@/logger";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";
import { batteryDetectionResponse } from "../constant/batteryDetectionResponse";
import checkAlert from "../constant/checkAlert";

export default async function runTest(params: any) {
  try {
    loggerInfo.info("Run Battery Model Test");

    const image_url = params.body.image_url;
    const imageid = params.body.modelObjectImageId;
    const userId = params.userId;

    const apiResponse = batteryDetectionResponse;
    const formattedData: any = {};

    apiResponse.response.forEach((resp, index) => {
      formattedData[`BatteryTestResponse${index + 1}`] = resp;
    });

    const tag = apiResponse.tag;
    const workData = {
      modelObjectImageId: imageid,
      response: formattedData,
      tag,
    };

    const result = await db.BatteryResponse.create(workData);

    if (!result) {
      return sendResponseData(false, "Error In Saving Data", []);
    }

    const responseId = result.dataValues.id;

    // Increase the count of testRanCount

    const ranCount = await db.Image.findByPk(imageid);
    ranCount.testRanCount += 1;
    await ranCount.save();

    const AlertParams = {
      url: image_url,
      userId,
      response: result,
    };

    const notification = await checkAlert(AlertParams);

    return sendResponseData(true, "Data Saved Successfully", {
      result,
      notification,
    });
  } catch (error) {
    loggerError.error("Error", error);
    return sendResponseData(false, "Error", error);
  }
}
