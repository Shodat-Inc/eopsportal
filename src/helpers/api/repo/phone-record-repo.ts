import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";

export const phoneRecordRepo = {
  create,
};
async function create(params: any) {
  loggerInfo.info("POST api/createUsers Save Phone records");
  try {
    // validate
    if (params.userId) {
      const user = await db.User.findByPk(params.userId);
      if (!user) {
        return sendResponseData(false, "User doesn't exist", {});
      }
    } else {
      return sendResponseData(false, "UserId not provided", {});
    }
    const phoneRecord = new db.phoneRecord(params);
    // save phone record
    const data = await phoneRecord.save();

    return sendResponseData(true, "Phone Record added successfully", data);
  } catch (error) {
    loggerError.error("Cant Save Phone Record", error);
    return sendResponseData(false, "error", error);
  }
}
