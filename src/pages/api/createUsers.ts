import { apiHandler, db, usersRepo } from "../../helpers/api";
import { loggerInfo, loggerError } from "@/logger";
import { NextApiRequest, NextApiResponse } from "next";
import { info } from "console";
import { phoneRecordRepo } from "@/helpers/api/repo/phone-record-repo";
import { CompanyRecordRepo } from "@/helpers/api/repo/company-record-repo";
import message from "@/util/responseMessage";
import sendResponseData from "@/helpers/constant";
import { createUserValidation } from "../../../validateSchema";

export default apiHandler({
  post: handler,
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    loggerInfo.info("createUser API:", info);

    // Check if the request method is POST
    if (req.method !== "POST") {
      res.status(405).send(message.error.postMethodError);
      return;
    }
    const reqData = req.body;

    // Extract data from the request body
    const { email, firstName, lastName, password, roleId, ...objData } =
      reqData;
    const username = firstName.concat(lastName);

    // Validate the request data
    const validation = createUserValidation(reqData);
    if (validation.error) {
      // Handle validation errors
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validation.error.details.map((detail) => detail.message),
      });
      return;
    }

    // Extract data for phone record
    const { countryCodeId, phoneNumber, companyName } = objData;
    // Extract data for company record

    await db.sequelize.transaction(async (transaction: any) => {

      // Create user data
      const userData = await usersRepo.create({
        username,
        email,
        firstName,
        lastName,
        password,
        roleId,
      }, transaction);

      if (!userData.success) {
        return res.send(sendResponseData(false, userData.message, []));
      }

      // Create company record
      const companyRecord = await CompanyRecordRepo.create({
        companyName,
        userId: userData.data.id,
      }, transaction);

      // Create phone record
      const phoneRecord = await phoneRecordRepo.create({
        countryCodeId,
        phoneNumber,
        userId: userData.data.id,
      }, transaction);

      // Send success response
      return res
        .status(200)
        .json(sendResponseData(true, message.success.userCreated, []));
    })
  } catch (error: any) {
    // Handle errors
    loggerError.error("error in createUsers API ", error);
    res.status(error.response.status).json(message.error.cantCreateUser);
  }
}
