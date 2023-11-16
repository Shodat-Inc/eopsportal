import { loggerError, loggerInfo } from "@/logger";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";

export const enterpriseAddressRepo = {
  create,
};
async function create(params: any) {
  try {
    loggerInfo.info("Create Enterprise Address Repo");
    const newAddress = new db.EnterpriseAddress(params);
    const save = await newAddress.save();
    return sendResponseData(true, "Enterprise Address Added Successfully", []);
  } catch (error: any) {
    loggerError.error("Error in Enterprise Address Repo");
    return sendResponseData(false, "Error In Saving Enterprise Address", []);
  }
}
