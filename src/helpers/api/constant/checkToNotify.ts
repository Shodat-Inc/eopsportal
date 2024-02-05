import * as alert from "./alertAlgo";
export default async function checkToNotify(notificationParams: {
  alertData: any;
  apiResponse: any;
  tag: any;
  imageData: any;
}) {
  const obj: any = {
    Crack: alert.checkCrackAlert,
    Battery: alert.checkBatteryAlert,
    Tyre: alert.checkTyreAlert,
  };
  const tag: any = notificationParams.tag;
  if (obj[tag]) {
    const result = await obj[tag](notificationParams);
    return result;
  }
  return null;
}
