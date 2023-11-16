import { loggerError, loggerInfo } from "@/logger";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";

export const enterpriseRepo = {
  create,
};
async function create(params: any) {
  try {
    loggerInfo.info("Create Enterprise Repo");
    const enterprise = await db.Enterprise.findOne({
      where: { enterpriseName: params.enterpriseName },
    });
    if (enterprise) {
      return sendResponseData(false, "Enterprise Already Exists", []);
    }
    const newEnterprise = new db.Enterprise(params);
    const save = await newEnterprise.save();
    return sendResponseData(
      true,
      "Enterprise Created Successfully",
      newEnterprise
    );
  } catch (error: any) {
    loggerError.error("Error in Enterprise Repo");
    return sendResponseData(false, "Error In Creating Enterprise", []);
  }
}
