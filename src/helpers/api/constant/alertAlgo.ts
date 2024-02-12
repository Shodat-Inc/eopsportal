import { loggerInfo } from "@/logger";
import { isGreater } from "./isGreater";
import { saveRaisedAlert } from "./saveData";

export async function checkCrackAlert(exportData: {
  apiResponse: any;
  alertData: any;
  tag: any;
  imageData: any;
}) {
  try {
    loggerInfo.info("Validating the Notification CheckPoints For Crack Alerts");

    const outputProbablity: number[] = [];

    const modelObjectImageId =
      exportData.apiResponse.dataValues.modelObjectImageId;

    const responseId = exportData.apiResponse.dataValues.id;

    for (const key in exportData.apiResponse.dataValues.coordinates) {
      const coordinates =
        exportData.apiResponse.dataValues.coordinates[key].responseCoordinates;
      const probability = parseInt(coordinates.probablity);
      outputProbablity.push(probability);
    }

    const dt: any = {
      imageData: exportData.imageData,
      imageId: modelObjectImageId,
      tag: exportData.tag,
      responseId,
    };

    const finalResult = [];

    for (const alert of exportData.alertData) {
      const alertId = alert.id;

      dt.alertId = alertId;

      const rangeValue = alert.rangeValue;

      const thresholdValue = alert.thresholdValue;

      const checkRange = isGreater(rangeValue);

      for (const probability of outputProbablity) {
        if (checkRange) {
          if (probability > thresholdValue) {
            console.log("Notification Send On Threshold", probability);
            const result = await saveRaisedAlert(dt);
            finalResult.push(result);
          }
        } else {
          if (probability < thresholdValue) {
            console.log("Notification Send On Threshold", probability);
            const result = await saveRaisedAlert(dt);
            finalResult.push(result);
          }
        }
      }
      return finalResult;
    }
  } catch (error) {
    return error;
  }
}

export async function checkBatteryAlert(exportData: {
  apiResponse: any;
  alertData: any;
  tag: any;
  imageData: any;
}) {
  try {
    loggerInfo.info(
      "Validating the Notification CheckPoints For Battery Alerts"
    );

    const modelObjectImageId =
      exportData.apiResponse.dataValues.modelObjectImageId;

    const responseId = exportData.apiResponse.dataValues.id;

    const outputProbablity: number[] = [];

    for (const key in exportData.apiResponse.dataValues.response) {
      const coords =
        exportData.apiResponse.dataValues.response[key].batteryLifeResponse;
      const utilization = parseInt(coords.batteryUtilization);
      outputProbablity.push(utilization);
    }

    const dt: any = {
      imageData: exportData.imageData,
      imageId: modelObjectImageId,
      tag: exportData.tag,
      responseId,
    };

    const finalResult = [];

    for (const alert of exportData.alertData) {
      const alertId = alert.id;

      dt.alertId = alertId;

      const rangeValue = alert.rangeValue;

      const thresholdValue = alert.thresholdValue;

      const checkRange = isGreater(rangeValue);

      for (const probability of outputProbablity) {
        if (checkRange) {
          if (probability > thresholdValue) {
            console.log("Notification Send On Threshold", probability);
            const result = await saveRaisedAlert(dt);
            finalResult.push(result);
          }
        } else {
          if (probability < thresholdValue) {
            console.log("Notification Send On Threshold", probability);
            const result = await saveRaisedAlert(dt);
            finalResult.push(result);
          }
        }
      }
      return finalResult;
    }
  } catch (error) {
    return error;
  }
}

export async function checkTyreAlert(exportData: {
  apiResponse: any;
  alertData: any;
  tag: any;
  imageData: any;
}) {
  try {
    loggerInfo.info("Validating the Notification CheckPoints For Tyre Alerts");

    const modelObjectImageId =
      exportData.apiResponse.dataValues.modelObjectImageId;

    const responseId = exportData.apiResponse.dataValues.id;

    const data = exportData.apiResponse.response.tyreDamage.data;
    const outputDistance = data.distance;
    const outputRecommendation = data.recomendation;

    const dt: any = {
      imageData: exportData.imageData,
      imageId: modelObjectImageId,
      tag: exportData.tag,
      responseId,
    };

    const finalResult = [];

    for (const alert of exportData.alertData) {
      const alertId = alert.id;
      dt.alertId = alertId;
      const distance = alert.value;
      const recommendation = alert.recommendation;

      const distanceRange = alert.distanceRange;
      const checkRange = isGreater(distanceRange);

      if (recommendation === outputRecommendation) {
        if (checkRange) {
          if (outputDistance > distance) {
            console.log(
              "Notification Send On Threshold",
              outputDistance,
              "Severity",
              outputRecommendation
            );
            const result = await saveRaisedAlert(dt);
            finalResult.push(result);
          }
        } else {
          if (outputDistance < distance) {
            console.log(
              "Notification Send On Threshold",
              outputDistance,
              "Severity",
              outputRecommendation
            );
            const result = await saveRaisedAlert(dt);
            finalResult.push(result);
          }
        }
      } else {
        if (checkRange) {
          if (outputDistance > distance) {
            console.log(
              "Notification Send On Threshold",
              outputDistance,
              "Severity",
              recommendation
            );
            const result = await saveRaisedAlert(dt);
            finalResult.push(result);
          }
        } else {
          if (outputDistance < distance) {
            console.log(
              "Notification Send On Threshold",
              outputDistance,
              "Severity",
              recommendation
            );
            const result = await saveRaisedAlert(dt);
            finalResult.push(result);
          }
        }
      }

      return finalResult;
    }
  } catch (error) {
    return error;
  }
}
