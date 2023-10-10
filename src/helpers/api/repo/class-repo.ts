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
    const classes = new db.AddClasses(params);
    // save class
    const data = await classes.save();
    return sendResponseData(true, "Class added successfully", data);
  } catch (error) {
    console.log(error);
    loggerError.error("Error in class repo", error);
    return sendResponseData(false, "error", error);
  }
}
