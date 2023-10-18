import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";

export const deleteRecordRepo = {
  create,
};
async function create(params: any) {
  loggerInfo.info("Create Delete Record Repo:");
  try {
    // validate
    let delete_data = await db.deleteRecord.findOne({
      where: { email: params.email },
    });
    if (delete_data) {
      return sendResponseData(false, "Delete Data already exist", {});
    }
    // save class
    const deleteData = new db.deleteRecord(params);
    console.log(deleteData,)
    const data = await deleteData.save();
    return sendResponseData(true, "Deleted Record added successfully", data);
  } catch (error) {
    loggerError.error("Error in delete repo", error);
    return sendResponseData(false, "error", error);
  }
}