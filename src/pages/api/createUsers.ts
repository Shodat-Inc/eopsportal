import { apiHandler, usersRepo } from "../../helpers/api";
import { loggerInfo, loggerError } from "@/logger";
import { NextApiRequest, NextApiResponse } from "next";
import { CreateUser } from "../../interface/createUser.interface";
import { info } from "console";
import { addressRepo } from "@/helpers/api/repo/address-repo";
import { phoneRecordRepo } from "@/helpers/api/repo/phone-record-repo";
import { CompanyRecordRepo } from "@/helpers/api/repo/company-record-repo";
import message from "@/util/responseMessage";
import sendResponseData from "@/helpers/constant";

export default apiHandler({
  post: handler,
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    loggerInfo.info("createUser API:", info);
    if (req.method !== "POST") {
      res.status(405).send(message.error.postMethodError);
      return;
    }
    const reqData: CreateUser = req.body;
    const {
      email,
      firstName,
      lastName,
      password,
      roleId,
      parentId,
      ...objData
    } = reqData;
    const { address, city, state, pincode, countryId, primary, ...recordData } =
      objData;
    //phone record
    const { countryCodeId, phoneNumber, isPrimary, isActive, ...recordData1 } =
      recordData;
    loggerInfo.info(recordData);
    //company record
    const { companyName } = recordData1;
    //user Data
    const username = firstName.concat(lastName);
    const userData = await usersRepo.create({
      username,
      email,
      firstName,
      lastName,
      password,
      roleId,
      parentId,
    });
    if (!userData.success) {
      return res.send(sendResponseData(false, userData.message, []));
    }
    //address data
    const addressData = await addressRepo.create({
      address,
      city,
      state,
      pincode,
      countryId,
      primary,
      userId: userData.data.id,
    });
    //company record
    const companyRecord = await CompanyRecordRepo.create({
      companyName,
      userId: userData.data.id,
    });
    //phone Record
    const phoneRecord = await phoneRecordRepo.create({
      countryCodeId,
      phoneNumber,
      isPrimary,
      isActive,
      userId: userData.data.id,
    });
    return res.send(sendResponseData(true, message.success.userCreated, []));
  } catch (error: any) {
    loggerError.error("error in createUsers API ", error);
    res.status(error.response.status).json(message.error.cantCreateUser);
  }
}
