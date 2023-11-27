import { loggerError, loggerInfo } from "@/logger";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";
import sendPasswordResetEmail from "../constant/forgotPasswordMail";
import message from "@/util/responseMessage";

/**
 * Repository for handling forget password operations.
 */
export const forgetPasswordRepo = {
  verifyUser,
  updatePassword,
};

/**
 * Verifies the user and sends a reset token for forget password.
 *
 * @param {any} params - The parameters containing the user email for forget password verification.
 * @returns {Promise<object>} A promise that resolves with the result of the verification process.
 */
async function verifyUser(params: any) {
  try {
    // Log information about the function execution
    loggerInfo.info("verify user");

    // Find the user in the database based on the provided email
    const result = await db.User.findOne({
      where: { email: params.email },
      attributes: ["email"],
    });

    // If the user doesn't exist, return an error response
    if (!result || result.email !== params.email) {
      return sendResponseData(false, message.error.userNotExist, []);
    }

    // Generate a reset token that is valid for 15 minutes
    const token = jwt.sign({ email: result.email }, "Forget Password", {
      expiresIn: "15m",
    });

    // Update the user's reset token and expiration in the database
    await db.User.update(
      {
        resetToken: token,
        resetTokenExpires: new Date(new Date().getTime() + 15 * 60 * 1000),
      },
      {
        where: { email: params.email },
      }
    );

    // Send a password reset email to the user
    sendPasswordResetEmail(params.email, token);

    // Return a successful response after sending the token
    return sendResponseData(true, message.success.tokenSent, result);

  } catch (error: any) {
    // Log error information in case of an exception during forget password verification
    loggerError.error("Error in Forget Password Repo");

    // Return an error response in case of an exception during forget password verification
    return sendResponseData(false, message.error.incorrectMail, error);
  }
}

/**
 * Updates the user's password based on the reset token.
 *
 * @param {any} params - The parameters containing the query and body information for updating the password.
 * @returns {Promise<object>} A promise that resolves with the result of the password update process.
 */
async function updatePassword(params: any) {
  // Log information about the function execution
  loggerInfo.info("Update Password");

  // Find the user in the database based on the provided reset token
  const user = await db.User.findOne({
    where: { resetToken: params.query.token },
  });

  // If no user is found, return an error response
  if (!user) {
    return sendResponseData(false, message.error.invalidToken, []);
  }

  // Verify the reset token
  const verify: any = jwt.verify(params.query.token, "Forget Password");

  // Update the user's password using bcrypt
  const hashedPassword = bcrypt.hashSync(params.body.password, 10);

  // Update the user's password, clear the reset token, and reset token expiration
  await user.update(
    {
      password: hashedPassword,
      resetToken: null, // Clear the reset token
      resetTokenExpires: null, // Clear the token expiration
    },
    { where: { email: verify.email } }
  );

  // Return a successful response after updating the password
  return sendResponseData(true, message.success.passwordUpdated, []);
}

