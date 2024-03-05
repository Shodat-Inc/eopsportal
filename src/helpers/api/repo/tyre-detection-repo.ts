import { loggerInfo } from "@/logger";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";
import { error } from "console";
import { tyreDetection } from "../constant/tyreDetection";
import checkAlert from "../constant/checkAlert";

export default async function runTest(params: any) {
  try {
    loggerInfo.info("Run Model Test");
    const image_url = params.body.image_url;
    const imageid = params.body.modelObjectImageId;
    const userId = params.userId;

    const modelName = params.body.modelName;
    // const apiResponse = await externalAPI(imageUrl,modelName);
    const apiResponse = tyreDetection;
    if (!apiResponse) {
      return sendResponseData(false, "Error In External Service", error);
    }

    const tag = apiResponse.tag;
    const workData = {
      modelObjectImageId: imageid,
      response: apiResponse,
      tag,
    };
    const result = new db.TyreResponse(workData);
    const saveResponse = await result.save();

    if (!saveResponse) {
      return sendResponseData(false, "Error In Saving Data", error);
    }
    saveResponse.dataValues.image_url = image_url;
    const ranCount = await db.Image.findByPk(imageid);
    ranCount.testRanCount += 1;
    await ranCount.save();

    const AlertParams = {
      userId,
      response: result,
    };

    const raisedAlert = await checkAlert(AlertParams);

    return sendResponseData(true, "Data Saved Successfully", {
      saveResponse,
      raisedAlert,
    });
  } catch (error) {
    return sendResponseData(false, "Error", error);
  }
}
