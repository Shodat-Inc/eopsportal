const responseTableName: any = {
  Crack: "CrackDetectionResponses",
  Battery: "BatteryDetectionResponses",
  Tyre: "TyreDetectionResponses",
};

const alertTableName: any = {
  Crack: "CrackAlert",
  Battery: "BatteryAlert",
  Tyre: "TyreAlerts",
};


export function checkResponseTable(tag: string) {
  return responseTableName[tag];
}

export function checkAlertTable(tag: string) {
  return alertTableName[tag];
}