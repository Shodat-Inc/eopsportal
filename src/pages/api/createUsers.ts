import { apiHandler, usersRepo } from "../../helpers/api";
import { loggerInfo, loggerError } from "@/logger";
import { NextApiRequest, NextApiResponse } from "next";
import { CreateUser } from "../../interface/createUser.interface";
import { info } from "console";
import { addressRepo } from "@/helpers/api/repo/address-repo";
export default apiHandler({
  post: handler,
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    loggerInfo.info("reateUser API:", info);
    if (req.method !== "POST") {
      res.status(405).send({ message: "Only POST requests allowed" });
      return;
    }
    const reqData: CreateUser = req.body;
    const {
      username,
      emailAddress,
      firstName,
      lastName,
      companyName,
      countryCode,
      phoneNumber,
      password,
      terms,
      roleId,
      ...objData
    } = reqData;
    const { address, city, state, pincode, country } = objData;
    //user Data
    const userData = await usersRepo.create({
      username,
      emailAddress,
      firstName,
      lastName,
      companyName,
      countryCode,
      phoneNumber,
      password,
      terms,
      roleId,
    });
    //address data
    const addressData = await addressRepo.create({
      address,
      city,
      state,
      pincode,
      country,
      userId: userData.data.id,
    });
    res.send({ userData, addressData });
  } catch (error: any) {
    loggerError.error("error in createUsers API ", error);
    res
      .status(error.response.status)
      .json({ message: error.response.statusText });
  }
}
