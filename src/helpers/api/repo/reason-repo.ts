import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import { info } from "console";

export const reasonRepo = {
  create,
};
async function create(params: any) {
  loggerInfo.info("Reason repo", info);
  try {
    const reason = new db.Reason(params);
    // save role
    const data = await reason.save();
    return sendResponseData(true, "Reason added successfully", data);
  } catch (error) {
    loggerError.error("Cant Save Reason", error);
    return sendResponseData(false, "error", error);
  }
}
