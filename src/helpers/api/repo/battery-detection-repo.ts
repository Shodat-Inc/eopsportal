import { loggerError, loggerInfo } from "@/logger";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";
import { error } from "console";
import { batteryDetectionResponse } from "../constant/batteryDetectionResponse";

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

        const apiResponse = batteryDetectionResponse;
        if (!apiResponse) {
            return sendResponseData(false, "Error In External Service", error);
        }

        const formatted: any = {};

        const response = batteryDetectionResponse.response.map(item => {
            const batteryLifeResponse = item.batteryLifeResponse;
            return {
                batteryUtilization: batteryLifeResponse.batteryUtilization,
                remainingCyclesLeft: batteryLifeResponse.remainingCyclesLeft,
                totalCycle: batteryLifeResponse.totalCycle
            };
        });

        // Save the response array in the formatted variable with property name 'BatteryResponse'
        formatted.BatteryResponse = response;

        const tag = batteryDetectionResponse.tag;
        const workData = {
            modelObjectImageId: imageid,
            batteryLifeResponse: formatted,
            tag,
        };

        // Save the response in the BatteryResponse table
        const result = await db.BatteryResponse.create(workData);

        // Increase the count of testRanCount
        const ranCount = await db.Image.findByPk(imageid);
        ranCount.testRanCount += 1;
        await ranCount.save();

        const check = await db.BatteryAlert.findOne({
            where: {
                isEnabled: 1,
                userId: params.userId
            },
            attributes: ["id", "thresholdValue", "modelObjectImageId"]
        });

        if (!check) {
            return sendResponseData(false, "Alert not found or isEnabled is not true for the given image id.", {});
        }

        const { id, modelObjectImageId } = check.dataValues;
        const thresholdValue = check.thresholdValue;

        const batteryResponseArray = result.dataValues.batteryLifeResponse.BatteryResponse;
        for (const battery of batteryResponseArray) {
            const batteryUtilization = parseInt(battery.batteryUtilization);

            // Check if the Battery Utilization is greater than the threshold and no entry has been created yet
            if (batteryUtilization >= thresholdValue) {
                const raisedAlertRecord = {
                    batteryAlertId: id,
                    modelObjectImageId: imageid,
                    tags: tag,
                    userId: formattedData[0].userId,
                    modelId: formattedData[0].modelId,
                    classId: formattedData[0].classId,
                    objectId: formattedData[0].objectId,
                    triggeredProbability: batteryUtilization
                };

                // Save the record if it hasn't been created yet
                await db.RaisedAlert.create(raisedAlertRecord);
            }
        }

        return sendResponseData(true, "Data Saved Successfully", result);

    } catch (error) {
        loggerError.error("Error", error);
        return sendResponseData(false, "Error", error);
    }
}
