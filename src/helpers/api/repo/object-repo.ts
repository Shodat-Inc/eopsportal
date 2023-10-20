import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import { error, info } from "console";

export const objectRepo = {
  create,
};
async function create(params: any) {
  loggerInfo.info("Object Repo", info);
  if (!params.classId) {
    loggerError.error("No Class id Provided", error);
    return sendResponseData(false, "No Class ID", {});
  }
  try {
    const object = new db.object(params);
   // save object
    const data = await object.save();
    return sendResponseData(true, "Object added successfully", data);
  } catch (error) {
    loggerError.error("Error in Object Repo", error);
    return sendResponseData(false, "error", error);
  }
}
