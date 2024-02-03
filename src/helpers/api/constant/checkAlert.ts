import sendResponseData from "@/helpers/constant";
import { getAlertData, getImageData } from "./extractData";
import checkToNotify from "./checkToNotify";

export default async function checkAlert(AlertParams: {
  url: string;
  userId: number;
  response: any;
}) {
  try {
    const tag = AlertParams.response.dataValues.tag;


    const apiResponse = AlertParams.response;

    const userId = AlertParams.userId;

    const data = await getImageData(AlertParams.url);

    if (!data) {
      return sendResponseData(false, "Image Data not found ", {});
    }

    const extData = data[0].dataValues.ModelDatum.dataValues;

    const formattedData = {
      userId: extData.userId,
      modelId: extData.modelId,
      classId: extData.classId,
      objectId: extData.objectId,
    };

    const alertData = await getAlertData(tag, userId);

    if (!alertData) {
      return sendResponseData(
        false,
        "Alert not found or isEnabled is not true for the given user.",
        {}
      );
    }

    const notificationParams = {
      alertData,
      apiResponse,
      tag,
      imageData: formattedData,
    };

    const notification = await checkToNotify(notificationParams);

    return notification;
  } catch (error) {
    return sendResponseData(false, "Error In Sending Alert", []);
  }
}
