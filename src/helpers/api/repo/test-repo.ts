import { loggerError, loggerInfo } from "@/logger";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";
import { error } from "console";
import { crackDetectionResponse } from "../constant/crackDetectionResponse";
import { checkAlert } from "../constant/checkAlert";

export default async function runTest(params: any) {
  try {
    loggerInfo.info("Run Model Test");

    const image_url = { image_url: params.body.image_url };
    const imageid = params.body.modelObjectImageId;
    const userId = params.userId;

    const apiResponse = crackDetectionResponse;
    if (!apiResponse) {
      return sendResponseData(false, "Error In External Service", error);
    }

    const formatted: any = {};
    apiResponse.coordinates.forEach((coord, index) => {
      formatted[`crackAreaCoordinates${index + 1}`] = coord;
    });

    const tag = apiResponse.tag;
    const workData = {
      modelObjectImageId: imageid,
      coordinates: formatted,
      tag,
    };

    // Save the response in the CrackResponse table
    const result = await db.CrackResponse.create(workData);
    const responseId = result.dataValues.id;

    if (!result) {
      return sendResponseData(false, "Error In Saving Data", []);
    }
    // Increase the count of testRanCount
    const ranCount = await db.Image.findByPk(imageid);
    ranCount.testRanCount += 1;
    await ranCount.save();

    let highestProbability = 0;
    let keyWithHighestProbability = "";

    for (const key in result.dataValues.coordinates) {
      if (result.dataValues.coordinates.hasOwnProperty(key)) {
        const coordinates =
          result.dataValues.coordinates[key].responseCoordinates;
        const probability = parseInt(coordinates.probablity);

        if (probability > highestProbability) {
          highestProbability = probability;
          keyWithHighestProbability = key;
        }
      }
    }
    checkAlert(image_url, userId, highestProbability, tag, imageid, responseId);
    return sendResponseData(true, "Data Saved Successfully", result);
  } catch (error) {
    loggerError.error("Error", error);
    return sendResponseData(false, "Error", error);
  }
}
