import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import { info } from "console";

export const roleRepo = {
  create,
};
async function create(params: any) {
  loggerInfo.info("Role repo", info);
  try {
    const role = new db.Role(params);
    // save role
    const data = await role.save();
    return sendResponseData(true, "Role added successfully", data);
  } catch (error) {
    loggerError.error("Cant Save Role", error);
    return sendResponseData(false, "error", error);
  }
}
