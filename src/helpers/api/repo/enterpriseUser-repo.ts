import { loggerError, loggerInfo } from "@/logger";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";
import message from "@/util/responseMessage";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

export const EnterpriseUsersRepo = {
  authenticate,
  create,
  getAllEnterpriseUser,
  update,
  delete: _delete,
};

/**
 * Asynchronously creates a new enterprise user entry in the database.
 *
 * @param {Object} params - The parameters containing information to save the enterprise user.
 * @returns {Object} - Response object indicating the success or failure of the operation.
 */

async function authenticate(data: any) {
  try {
    let { email, password } = data;
    const user = await db.EnterpriseUser.scope("withHash").findOne({
      attributes: [
        "id",
        "username",
        "password",
        "email",
        "firstName",
        "lastName",
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

  loggerInfo.info("Create User Enterprise Repo");
  try {
    const enterprise = await db.EnterpriseUser.findOne({
      where: { username: params.username },
    });
    if (enterprise) {
      return sendResponseData(false, message.error.enterpriseUserExist, []);
    }
    const newEnterpriseUser = new db.EnterpriseUser(params);
    // hash password
    if (params.password) {
      newEnterpriseUser.password = bcrypt.hashSync(params.password, 10);
    }
    const save = await newEnterpriseUser.save();
    return sendResponseData(
      true,
      message.success.enterpriseUserCreated,
      save
    );
  } catch (error: any) {
    loggerError.error("Error in User Enterprise Repo");
    return sendResponseData(false, message.error.errorCreateEnterpriseUser, []);
  }
}

async function getAllEnterpriseUser() {
  loggerInfo.info("GET all the Enterprise Users");
  return await db.EnterpriseUser.findAll({
    attributes: ["username", "email", "firstName", "lastName", "parentId", "enterpriseId", "roleId"]
  })
}

async function update(params: any) {
  try {
    const data = await db.EnterpriseUser.findOne({
      where: { id: params.id, }
    })
    if (!data) {
      return sendResponseData(false, "No Enterprise User Exits", [])
    }
    data.username = params.username
    data.firstName = params.firstName
    data.lastName = params.lastName
    data.password = params.password
    data.parentId = params.parentId
    data.enterpriseId = params.enterpriseId
    data.roleId = params.roleId
    const response = await data.save()
    return sendResponseData(true, message.success.enterpriseUserUpdated, response)
  } catch (error: any) {
    return sendResponseData(false, message.error.errorUpdationMessage, [])
  }
}

async function _delete(params: any) {
  try {
    const delData = await db.EnterpriseUser.findOne({
      where: { id: params.id },
    });
    if (!delData) {
      return sendResponseData(false, "Enterprise User doesn't Exits", [])
    }
    await delData.destroy();
    return sendResponseData(
      true,
      message.success.enterpriseUserDeleted,
      []
    );
  } catch (error: any) {
    return sendResponseData(false, message.error.errorDeletionEnterpriseUser, error);
  }
}
