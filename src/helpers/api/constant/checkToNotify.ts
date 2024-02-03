import {
  checkBatteryAlert,
  checkCrackAlert,
  checkTyreAlert,
} from "./alertAlgo";

export default async function checkToNotify(notificationParams: {
  alertData: any;
  apiResponse: any;
  tag: any;
  imageData: any;
}) {
  const tag = notificationParams.tag;

  if (tag === "Crack") {
    const result = await checkCrackAlert(notificationParams);
    return result;
  }
  if (tag === "Battery") {
    const result = await checkBatteryAlert(notificationParams);
    return result;
  }
  if (tag === "Tyre") {
    const result = await checkTyreAlert(notificationParams);
    return result;
  }
}
