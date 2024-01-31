import sendResponseData from "@/helpers/constant";
import { db } from "../db";
import { Op, Sequelize } from "sequelize";
import checkRange from "./checkRange";

export async function checkAlert(
  params: any,
  userId: number,
  result: any,
  highestProbability: number
) {
  const data = await db.Image.findAll({
    where: { url: params.image_url },
    include: [
      {
        model: db.ModelData,
        attributes: ["userId", "modelId", "classId", "objectId"],
      },
    ],
  });

  const formattedData = data.map(
    (item: { ModelDatum: { dataValues: any } }) => {
      const modelDatum = item.ModelDatum.dataValues;
      return {
        userId: modelDatum.userId,
        modelId: modelDatum.modelId,
        classId: modelDatum.classId,
        objectId: modelDatum.objectId,
      };
    }
  );
  const check = await db.Alert.findAll({
    where: {
      isEnabled: 1,
      userId: userId,
    },
    attributes: ["id", "thresholdValue", "modelObjectImageId", "rangeValue"],
    raw: true,
  });
  if (!check) {
    return sendResponseData(
      false,
      "Alert not found or isEnabled is not true for the given image id.",
      {}
    );
  }

  //Calculation To Send Alert

  let flag = false;
  for (let i of check) {
    const rangeString = checkRange(i.rangeValue);
    if (rangeString) {
      if (highestProbability > i.thresholdValue) {
        console.log("notification Send", i.thresholdValue);
      }
    } else {
      if (highestProbability < i.thresholdValue) {
        console.log("Less than Notification send", i.thresholdValue);
      }
    }
  }

  // Check if the highest probability is greater than the threshold and no entry has been created yet
  //   if (highestProbability >= thresholdValue) {
  //     const raisedAlertRecord = {
  //       crackAlertId: id,
  //       modelObjectImageId: params.imageid,
  //       //   tags: tag,
  //       userId: formattedData[0].userId,
  //       modelId: formattedData[0].modelId,
  //       classId: formattedData[0].classId,
  //       objectId: formattedData[0].objectId,
  //       triggeredProbability: highestProbability,
  //     };

  //     // Save the record if it hasn't been created yet
  //     await db.RaisedAlert.create(raisedAlertRecord);
  //   }
}
