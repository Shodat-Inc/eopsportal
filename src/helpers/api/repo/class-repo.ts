import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";

export const classRepo = {
  create,
};
async function create(params: any) {
  loggerInfo.info("Create Class Repo:");
  try {
    // validate
    let class_data = await db.AddClasses.findOne({
      where: { className: params.className },
    });
    if (class_data) {
      return sendResponseData(false, "Class already exist", {});
    }
    // save class
    const classes = new db.AddClasses(params);
    const data = await classes.save();
    return sendResponseData(true, "Class added successfully", data);
  } catch (error) {
    loggerError.error("Error in class repo", error);
    return sendResponseData(false, "error", error);
  }
}
