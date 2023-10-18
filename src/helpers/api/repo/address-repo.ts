import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";

export const addressRepo = {
  create,
};
async function create(params: any) {
  loggerInfo.info(`POST api/createUsers Save Address`);
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
    const address = new db.Address(params);
    // save address
    const data = await address.save();

    return sendResponseData(true, "Address added successfully", data);
  } catch (error) {
    loggerError.error("Cant Save Address", error);
    return sendResponseData(false, "error", error);
  }
}
