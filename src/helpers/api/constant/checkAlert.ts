import sendResponseData from "@/helpers/constant";
import { db } from "../db";
import { Sequelize } from "sequelize";
import isGreater from "./isGreater";
import { checkTableName } from "./checkTable";

export async function checkAlert(
  params: any,
  userId: number,
  highestProbability: number,
  tag: string,
  imageId: number,
  responseId: number
) {
  try {
    const data = await db.Image.findAll({
      where: { url: params.image_url },
      include: [
        {
          model: db.ModelData,
          attributes: ["userId", "modelId", "classId", "objectId"],
        },
      ],
    });

    const check = await db.Alert.findAll({
      where: {
        isEnabled: 1,
        userId: userId,
      },
      attributes: ["id", "thresholdValue", "modelObjectImageId", "rangeValue"],
      order: [
        [
          Sequelize.literal(`ABS(thresholdValue - ${highestProbability})`),
          "ASC",
        ], // Order by the absolute difference
      ],
      limit: 1,
      raw: true,
    });

    const alertId = check[0].id;
    if (!check) {
      return sendResponseData(
        false,
        "Alert not found or isEnabled is not true for the given image id.",
        {}
      );
    }

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
    //Calculation To Send Alert
    for (let i of check) {
      const rangeString = isGreater(i.rangeValue);
      const tableName = checkTableName.checkResponseTable(tag);
      const alertTableName = checkTableName.checkAlertTable(tag);

      if (rangeString && highestProbability > i.thresholdValue) {
        console.log("notification Send", i.thresholdValue);
        const raisedAlertRecord = {
          alertId,
          modelObjectImageId: imageId,
          tags: tag,
          userId: formattedData[0].userId,
          modelId: formattedData[0].modelId,
          classId: formattedData[0].classId,
          objectId: formattedData[0].objectId,
          responseId,
          alertTableName,
          tableName,
        };

        // Save the record if it hasn't been created yet
        await db.RaisedAlert.create(raisedAlertRecord);
      }
    }
    return sendResponseData(true, "Alert Send Successfully", []);
  } catch (error) {
    sendResponseData(false, "Error In Sending Alert", []);
  }
}
