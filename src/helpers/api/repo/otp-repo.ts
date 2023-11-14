import sendResponseData from "@/helpers/constant";
import { db } from "../db";
import { loggerError, loggerInfo } from "@/logger";
import {sendVerificationEmail} from "../constant/nodemailer";
import message from "@/util/responseMessage";

export const otpRepo = {
  create,
  verifyOtp,
};

async function create(params: any) {
  loggerInfo.info("Generate otp");
  try {
    const findEmail = await db.otpVerify.findOne({
      where: { email: params.email },
    });
    if (findEmail) {
      let resendOtp = await db.otpVerify.update(
        {
          otp: params.otp,
        },
        { where: { email: params.email } }
      );
      sendVerificationEmail(params.email, params.otp);
      return sendResponseData(
        true,
        message.success.resendOtp,
        resendOtp
      );
    }
    const result = new db.otpVerify(params);
    const data = await result.save();
    sendVerificationEmail(params.email, params.otp);

    return sendResponseData(true, message.success.otpSent, []);
  } catch (error: any) {
    loggerError.error("Error in Generate OTP repo");
    return sendResponseData(false, message.error.errorService, error);
  }
}

async function verifyOtp(params: any) {
  loggerInfo.info("Verify otp");
  const findEmail = await db.otpVerify.findOne({
    where: { email: params.email },
    attibutes: ["otp"],
  });
  if (params.otp === findEmail.dataValues.otp) {
    await db.otpVerify.update(
      {
        isVerified: true,
      },
      { where: { email: params.email } }
    );
    return sendResponseData(true, message.success.otpVerified, findEmail.otp);
  }
  return sendResponseData(false, message.error.invalidOtp, []);
}
