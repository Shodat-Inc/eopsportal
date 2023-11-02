import { loggerError, loggerInfo } from "@/logger";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";
import sendPasswordResetEmail from "../constant/forgotPasswordMail";

export const forgetPasswordRepo = {
  verifyUser,
  updatePassword,
};
async function verifyUser(params: any) {
  try {
    loggerInfo.info("verify user");
    const result = await db.User.findOne({
      where: { email: params.email },
      attributes: ["email"],
    });
    if (result.email !== params.email) {
      return sendResponseData(false, "User Doesn't Exist", []);
    }
    const token = jwt.sign({ email: result.email }, "Forget Password", {
      expiresIn: "15m",
    });
    await db.User.update(
      {
        resetToken: token,
        resetTokenExpires: new Date(new Date().getTime() + 15 * 60 * 1000),
      },
      {
        where: { email: params.email },
      }
    );
    sendPasswordResetEmail(params.email, token);
    return sendResponseData(true, "Token Send", result);
  } catch (error: any) {
    loggerError.error("Error in Forget Password Repo");
    return sendResponseData(false, "Error in Service", error);
  }
}

async function updatePassword(params: any) {
  loggerInfo.info("Update Password");
  const user = await db.User.findOne({
    where: { resetToken: params.query.token },
  });

  if (!user) {
    return sendResponseData(false, "Invalid token", []);
  }
  const verify: any = jwt.verify(params.query.token, "Forget Password");

  // For example, you can update the user's password like this:
  const password = bcrypt.hashSync(params.body.password, 10);
  console.log(password, params.body.password);
  await user.update(
    {
      password: password,
      resetToken: null, // Clear the reset token
      resetTokenExpires: null, // Clear the token expiration
    },
    { where: { email: verify.email } }
  );

  return sendResponseData(true, "Password updated successfully", []);
}
