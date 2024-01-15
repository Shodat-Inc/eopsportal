import { loggerInfo } from "@/logger";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";

import externalAPI from "@/util/externalAPI";
import { error } from "console";
import { crackDetectionResponse } from "../constant/crackDetectionResponse";

export default async function runTest(params: any) {
  try {
    loggerInfo.info("Run Model Test");
    const image_url = { image_url: params.image_url };
    const imageid = params.modelObjectImageId;
    const modelName=params.modelName;
    // const apiResponse = await externalAPI(imageUrl,modelName);
    const apiResponse = crackDetectionResponse;
    if (apiResponse == undefined) {
      return sendResponseData(false, "Error In External Service", error);
    }
    const formatted: any = {};
    for (let i = 0; i < apiResponse.coordinates.length; i++) {
      formatted[`crackAreaCoordinates${i + 1}`] = apiResponse.coordinates[i];
    }
    const tag = apiResponse.tag;
    const workData = {
      modelObjectImageId: imageid,
      coordinates: formatted,
      tag,
    };
    const result = new db.CrackResponse(workData);
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
