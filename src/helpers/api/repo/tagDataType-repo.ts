import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import { info } from "console";

export const tagDataTypeRepo = {
  create,
};
async function create(params: any) {
  loggerInfo.info("tagDataType repo", info);
  try {
    const tagDataType = new db.tagDataType(params);
    // save tagDatatype
    const data = await tagDataType.save();
    return sendResponseData(true, "Tag DataType added successfully", data);
  } catch (error) {
    loggerError.error("Cant Save Tag Datatype", error);
    return sendResponseData(false, "error", error);
  }
}
