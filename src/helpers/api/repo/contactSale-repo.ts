import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import {salesTeamMail} from "../constant/nodemailer";


// Repository for CompanyRecord-related operations.
export const ContactSalesRepo = {
  create,
};

async function create(params: any) {
  loggerInfo.info("ContactSales");

  try {
    const existData = await db.ContactSale.findOne({
      where: { email: params.email },
    });
    if (existData) {
      return sendResponseData(
        false,
        "Please Wait Sales Team will contact Soon,pls wait",
        []
      );
    }
    const SalesData = new db.ContactSale(params);
    const response = await SalesData.save();
    salesTeamMail('kapilsharma@shodat.com',params.email)
    return sendResponseData(true, "Sales Team will contact you soon", response);
  } catch (error) {
    loggerError.error("ContactSales", error);

    return sendResponseData(false, "error", error);
  }
}
