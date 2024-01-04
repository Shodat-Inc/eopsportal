import { loggerInfo } from "@/logger";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";
import { error } from "console";
import { tyreDetection } from "../constant/tyreDetection";


export default async function runTest(params: any) {
  try {
    loggerInfo.info("Run Model Test");
    const imageUrl = { image_url: params.image_url };
    const imageid = params.modelObjectImageId;
    const modelName=params.modelName;
    // const apiResponse = await externalAPI(imageUrl,modelName);
    const apiResponse = tyreDetection;
    if (apiResponse == undefined) {
      return sendResponseData(false, "Error In External Service", error);
    }
    const formatted: any = {};
    for (let i = 0; i < apiResponse.responseCoordinates.length; i++) {
      formatted[`tyreDetectionData:${i + 1}`] =
        apiResponse.responseCoordinates[i];
    }
    const tag = apiResponse.tag;
    const workData = {
      modelObjectImageId: imageid,
      coordinates: formatted,
      tag,
    };
    const result = new db.TyreResponse(workData);
    const saveResponse = await result.save();

    if (saveResponse !== undefined) {
      const ranCount = await db.Image.findByPk(imageid);
      ranCount.testRanCount += 1;
      await ranCount.save();
    } else {
      return sendResponseData(false, "Error In Saving Data", error);
    }

    return sendResponseData(true, "Data Saved Successfully", saveResponse);
  } catch (error) {
    return sendResponseData(false, "Error", error);
  }
}
