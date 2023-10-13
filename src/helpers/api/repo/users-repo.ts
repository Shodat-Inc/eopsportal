import getConfig from "next/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import { info } from "console";

const { serverRuntimeConfig } = getConfig();

export const usersRepo = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function authenticate(data: any) {
  try {
    let { username, password } = data;
    const user = await db.User.scope("withHash").findOne({
      where: { username },
    });
    if (!user) {
      return sendResponseData(false, "User not found", {});
    }
    if (!bcrypt.compareSync(String(password), String(user.password))) {
      return sendResponseData(false, "password is incorrect", {});
    }
    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, serverRuntimeConfig.secret, {
      expiresIn: "7d",
    });
    // remove hash from return value
    const userJson = user.get();
    delete userJson.hash;

    // return user and jwt
    return sendResponseData(true, "Login successfully", { ...userJson, token });
  } catch (error) {
    loggerError.error("Authentication Error");
    return sendResponseData(false, "error", error);
  }
}

async function getAll() {
  loggerInfo.info(`POST api/getUser`);
  return await db.User.findAll();
}

async function getById(id: any) {
  return await db.User.findByPk(id);
}

async function create(params: any) {
  loggerInfo.info("User Repo ", info);
  try {
    // validate
    let user_data = await db.User.findOne({
      where: { username: params.username },
    });
    if (user_data) {
      return sendResponseData(false, "User already exist", {});
    }
    //if role id is set to false or if roleid isnt in table
    if (params.roleId) {
      let role_data = await db.Role.findByPk(params.roleId);
      if (!role_data) {
        return sendResponseData(false, "Role does not exist!", {});
      }
      if (!role_data.isActive) {
        return sendResponseData(false, "Role is not active", {});
      }
    }

    const user = new db.User(params);

    // hash password
    if (params.password) {
      user.password = bcrypt.hashSync(params.password, 10);
    }
    //hash contact number
    // if (params.phoneNumber) {
    //   user.phoneNumber = bcrypt.hashSync(params.phoneNumber);
    // }
    // save user
    const data = await user.save();
    return sendResponseData(true, "User added successfully", data);
  } catch (error) {
    loggerError.error("Error in creating user :", error);

    return sendResponseData(false, "error", error);
  }
}

async function update(id: any, params: any) {
  const user = await db.User.findByPk(id);

  // validate
  if (!user) throw "User not found";
  if (
    user.username !== params.username &&
    (await db.User.findOne({ where: { username: params.username } }))
  ) {
    throw 'Username "' + params.username + '" is already taken';
  }

  // hash password if it was entered
  if (params.password) {
    params.hash = bcrypt.hashSync(params.password, 10);
  }

  // copy params properties to user
  Object.assign(user, params);

  await user.save();
}

async function _delete(id: number) {
  const user = await db.User.findByPk(id);
  if (!user) throw "User not found";

  // delete user
  await user.destroy();
}
