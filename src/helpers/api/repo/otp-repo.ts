import sendResponseData from "@/helpers/constant";
import { db } from "../db";
import { loggerError, loggerInfo } from "@/logger";
import { sendVerificationEmail } from "../constant/nodemailer";
import message from "@/util/responseMessage";

/**
 * Repository for handling OTP generation and verification.
 */
export const otpRepo = {
  create,
  verifyOtp,
};

/**
 * Generates and sends an OTP to the provided email.
 *
 * @param {any} params - The parameters containing the email and OTP for OTP generation.
 * @returns {Promise<object>} A promise that resolves with the result of the OTP generation process.
 */
async function create(params: any) {
  // Log information about the function execution
  loggerInfo.info("Generate otp");

  try {
    // Check if the email already exists in the database
    const findEmail = await db.otpVerify.findOne({
      where: { email: params.email },
    });

    // If the email exists, update the existing OTP and resend
    if (findEmail) {
      // Update the existing OTP in the database
      let resendOtp = await db.otpVerify.update(
        {
          otp: params.otp,
        },
        { where: { email: params.email } }
      );

      // Send the verification email with the updated OTP
      sendVerificationEmail(params.email, params.otp);

      // Return a successful response after resending the OTP
      return sendResponseData(
        true,
        message.success.resendOtp,
        resendOtp
      );
    }

    // If the email doesn't exist, create a new OTP record in the database
    const result = new db.otpVerify(params);
    const data = await result.save();

    // Send the verification email with the OTP
    sendVerificationEmail(params.email, params.otp);

    // Return a successful response after generating and sending the OTP
    return sendResponseData(true, message.success.otpSent, []);

  } catch (error: any) {
    // Log error information in case of an exception during OTP generation
    loggerError.error("Error in Generate OTP repo");

    // Return an error response in case of an exception during OTP generation
    return sendResponseData(false, message.error.errorService, error);
  }
}

/**
 * Verifies the provided OTP for the given email.
 *
 * @param {any} params - The parameters containing the email and OTP for OTP verification.
 * @returns {Promise<object>} A promise that resolves with the result of the OTP verification process.
 */
async function verifyOtp(params: any) {
  // Log information about the function execution
  loggerInfo.info("Verify otp");

  try {
    // Find the OTP record in the database based on the provided email
    const findEmail = await db.otpVerify.findOne({
      where: { email: params.email },
      attributes: ["otp"],
    });

    // If the OTP matches the one stored in the database, update isVerified to true
    if (params.otp === findEmail?.dataValues.otp) {
      // Update the isVerified flag in the database
      await db.otpVerify.update(
        {
          isVerified: true,
        },
        { where: { email: params.email } }
      );

      // Return a successful response after verifying the OTP
      return sendResponseData(true, message.success.otpVerified, findEmail?.otp);
    }

    // Return an error response if the provided OTP is invalid
    return sendResponseData(false, message.error.invalidOtp, []);

  } catch (error: any) {
    // Log error information in case of an exception during OTP verification
    loggerError.error("Error in Verify OTP repo");

    // Return an error response in case of an exception during OTP verification
    return sendResponseData(false, message.error.errorService, error);
  }
}
