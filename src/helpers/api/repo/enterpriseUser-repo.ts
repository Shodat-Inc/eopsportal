import getConfig from "next/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import { info } from "console";
import message from "@/util/responseMessage";

const { serverRuntimeConfig } = getConfig();

export const EnterpriseUsersRepo = {
  authenticate,
  create,
};

async function authenticate(data: any) {
  try {
    let { email, password } = data;
    const user = await db.User.scope("withHash").findOne({
      attributes: [
        "id",
        "email",
        "firstName",
        "lastName",
        "password",
        "confirmPassword",
        "enterpriseId",
      ],
      where: { email: email },
    });
    if (!user) {
      return sendResponseData(false, message.error.userNotFound, {});
    }
    if (!bcrypt.compareSync(String(password), String(user.password))) {
      return sendResponseData(false, message.error.incorrectPassword, {});
    }
    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, {
      expiresIn: "7d",
    });

    // remove hash from return value
    const userJson = user.get();
    delete userJson.password;
    const phoneRecord = await db.phoneRecord.findOne({
      where: { userId: user.id },
      attributes: ["phoneNumber"],
    });
    user.dataValues["phoneNumber"] = phoneRecord.phoneNumber;

    // return user and jwt
    return sendResponseData(true, message.success.loginSuccess, {
      ...userJson,
      token,
    });
  } catch (error) {
    loggerError.error("Authentication Error");
    return sendResponseData(false, message.error.error, error);
  }
}

async function create(params: any) {
  loggerInfo.info("Create User", info);
  try {
    // validate
    let user_data = await db.User.findOne({
      where: { email: params.email },
    });
    if (user_data) {
      return sendResponseData(false, message.error.alreadyExist, {});
    }
    if (params.roleId) {
      let role_data = await db.Role.findByPk(params.roleId);
      if (!role_data) {
        return sendResponseData(false, message.error.roleError1, {});
      }
      if (!role_data.isActive) {
        return sendResponseData(false, message.error.roleError2, {});
      }
    }

    const user = new db.User(params);

    // hash password
    if (params.password) {
      user.password = bcrypt.hashSync(params.password, 10);
    }
    // save user  
    const data = await user.save();
    return sendResponseData(true, message.success.userCreated, data);
    } catch (error) {
    loggerError.error("Error in creating user :", error);

    return sendResponseData(false, message.error.cantCreateUser, error);
  }
}
