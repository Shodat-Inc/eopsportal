import { loggerError, loggerInfo } from "@/logger";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";
import { error } from "console";
import { crackDetectionResponse } from "../constant/crackDetectionResponse";

export default async function runTest(params: any) {
  try {
    loggerInfo.info("Run Model Test");

    const image_url = { image_url: params.body.image_url };
    const imageid = params.body.modelObjectImageId;

    // Fetch user information from the database
    const data = await db.Image.findAll({
      where: { url: image_url.image_url },
      attributes: [],
      include: [{
        model: db.ModelData,
        attributes: ['userId', 'modelId', 'classId', 'objectId']
      }]
    });

    const formattedData = data.map((item: { ModelDatum: { dataValues: any; }; }) => {
      const modelDatum = item.ModelDatum.dataValues;
      return {
        userId: modelDatum.userId,
        modelId: modelDatum.modelId,
        classId: modelDatum.classId,
        objectId: modelDatum.objectId
      }
    });

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

    // Increase the count of testRanCount
    const ranCount = await db.Image.findByPk(imageid);
    ranCount.testRanCount += 1;
    await ranCount.save();

    const check = await db.Alert.findOne({
      where: {
        isEnabled: 1,
        userId: params.userId
      },
      attributes: ["id", "thresholdValue", "modelObjectImageId"]
    });

    if (!check) {
      console.log("Alert not found or isEnabled is not true for the given image id.");
      return sendResponseData(true, "Data Saved Successfully", result);
    }

    const { id, modelObjectImageId } = check.dataValues;
    const thresholdValue = check.thresholdValue;

    let highestProbability = 0;
    let keyWithHighestProbability = "";

    // Find the highest probability before entering the loop
    for (const key in result.dataValues.coordinates) {
      if (result.dataValues.coordinates.hasOwnProperty(key)) {
        const coordinates = result.dataValues.coordinates[key].responseCoordinates;
        const probability = parseInt(coordinates.probablity);

        if (probability > highestProbability) {
          highestProbability = probability;
          keyWithHighestProbability = key;
        }
      }
    }

    console.log(`Highest probability detected in ${keyWithHighestProbability}. Probability: ${highestProbability}`);

    // Check if the highest probability is greater than the threshold and no entry has been created yet
    if (highestProbability >= thresholdValue) {
      const raisedAlertRecord = {
        alertId: id,
        modelObjectImageId: imageid,
        tags: tag,
        userId: formattedData[0].userId,
        modelId: formattedData[0].modelId,
        classId: formattedData[0].classId,
        objectId: formattedData[0].objectId,
        triggeredProbability: highestProbability
      };

      // Save the record if it hasn't been created yet
      await db.RaisedAlert.create(raisedAlertRecord);
    }

    return sendResponseData(true, "Data Saved Successfully", result);

  } catch (error) {
    loggerError.error("Error", error);
    return sendResponseData(false, "Error", error);
  }
}
