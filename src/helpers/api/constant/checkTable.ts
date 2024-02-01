const responseTableName: any = {
  Crack: "CrackDetectionResponses",
  BatteryDetection: "BatteryDetectionResponses",
  TyreDetection: "TyreDetectionResponses",
};

const alertTableName: any = {
  Crack: "CrackAlerts",
  BatteryDetection: "BatteryDetectionResponses",
  TyreDetection: "TyreDetectionResponses",
};

export const checkTableName = {
  checkResponseTable,
  checkAlertTable,
};

export function checkResponseTable(tag: string) {
  for (let key in responseTableName) {
    if (key === tag) {
      return responseTableName[key];
    }
  }
  return undefined;
}

export function checkAlertTable(tag: string) {
  for (let key in alertTableName) {
    if (key === tag) {
      return alertTableName[key];
    }
  }
  return undefined;
}
