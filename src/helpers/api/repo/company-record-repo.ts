import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";

export const CompanyRecordRepo = {
  create,
};
async function create(params: any) {
  loggerInfo.info("POST api/createUsers Save Company records");
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
    const companyRecord = new db.companyRecord(params);
    // save company record
    const data = await companyRecord.save();

    return sendResponseData(true, "Company Record added successfully", data);
  } catch (error) {
    loggerError.error("Cant Save Company Record", error);
    return sendResponseData(false, "error", error);
  }
}
