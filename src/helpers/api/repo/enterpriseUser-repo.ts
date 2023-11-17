import { loggerError, loggerInfo } from "@/logger";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";
import message from "@/util/responseMessage";

export const EnterpriseUsersRepo = {
  create,
};

/**
 * Asynchronously creates a new enterprise user entry in the database.
 *
 * @param {Object} params - The parameters containing information to save the enterprise user.
 * @returns {Object} - Response object indicating the success or failure of the operation.
 */

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
    const save = await newEnterpriseUser.save();
    return sendResponseData(
      true,
      message.success.enterpriseUserCreated,
      newEnterpriseUser
    );
  } catch (error: any) {
    loggerError.error("Error in User Enterprise Repo");
    return sendResponseData(false, message.error.errorCreateEnterpriseUser, []);
  }
}

