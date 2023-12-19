import { loggerError, loggerInfo } from "@/logger";
import { db } from "../db";
import sendResponseData from "@/helpers/constant";
import message from "@/util/responseMessage";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import getConfig from "next/config";
import { enterpriseUserMail } from "../constant/nodemailer"
import { inviteEnterpriseUserMail, enterpriseAdminMail } from "../constant/nodemailer"

const { serverRuntimeConfig } = getConfig();

/**
 * Repository for handling operations related to enterprise user data.
 */
export const EnterpriseUsersRepo = {
  authenticate,
  create,
  getAllEnterpriseUser,
  update,
  delete: _delete,
  getEnterpriseUserById,
  updateProfile,
  inviteEnterpriseUser,
  cancelInvite
};

/**
 * Authenticates a user based on provided email and password.
 *
 * @param {any} data - The data containing user credentials for authentication.
 * @returns {Promise<object>} A promise that resolves with the result of the authentication process.
 */

async function authenticate(data: any) {
  try {
    // Destructure email and password from the data
    let { email, password } = data;

    // Find the user in the database based on the provided email
    const user = await db.EnterpriseUser.scope("withHash").findOne({
      attributes: [
        "id",
        "username",
        "password",
        "email",
        "firstName",
        "lastName",
        "roleId",
        "enterpriseId",
      ],
      where: { email: email },
    });

    // If no user is found, return an error response
    if (!user) {
      return sendResponseData(false, message.error.userNotFound, {});
    }

    // Compare the provided password with the hashed password in the database
    if (!bcrypt.compareSync(String(password), String(user.password))) {
      return sendResponseData(false, message.error.incorrectPassword, {});
    }

    // Create a JWT token that is valid for 7 days
    const token = jwt.sign(
      {
        enterpriseUserId: user.id,
        role: user.roleId,
        enterpriseId: user.enterpriseId,
      },
      serverRuntimeConfig.secret,
      {
        expiresIn: "7d",
      }
    );

    // Remove hash from the return value
    const userJson = user.get();
    delete userJson.password;

    // Return user information and JWT token
    return sendResponseData(true, message.success.loginSuccess, {
      ...userJson,
      token,
    });

  } catch (error) {
    // Log error information in case of an exception during authentication
    loggerError.error("Authentication Error", error);

    // Return an error response in case of an exception during authentication
    return sendResponseData(false, message.error.error, error);
  }
}

/**
 * Creates a new enterprise user in the database.
 *
 * @param {any} params - The parameters containing information for creating a new enterprise user.
 * @returns {Promise<object>} A promise that resolves with the result of the database operation.
 */
async function create(params: any) {
  // Log information about the function execution
  loggerInfo.info("Create User Enterprise Repo");

  try {
    // Check if an enterprise user with the same username already exists
    const existingUser = await db.EnterpriseUser.findOne({
      where: { username: params.username },
    });

    // If the user already exists, return an error response
    if (existingUser) {
      return sendResponseData(false, message.error.enterpriseUserExist, []);
    }

    // Create a new instance of EnterpriseUser model with the provided parameters
    const newEnterpriseUser = new db.EnterpriseUser(params);

    //Fetching mail and sending mail to the enterprise user 
    const userMail = newEnterpriseUser.dataValues.email
    enterpriseUserMail(userMail)

    // Hash the password before saving it to the database
    if (params.password) {
      newEnterpriseUser.password = bcrypt.hashSync(params.password, 10);
    }

    // Save the new enterprise user to the database
    const save = await newEnterpriseUser.save();

    // Return a successful response after creating the enterprise user
    return sendResponseData(true, message.success.enterpriseUserCreated, save);

  } catch (error: any) {
    // Log error information in case of an exception during user creation
    loggerError.error("Error in User Enterprise Repo", error);

    // Return an error response in case of an exception during user creation
    return sendResponseData(false, message.error.errorCreateEnterpriseUser, []);
  }
}

/**
 * Retrieves information about all enterprise users from the database.
 *
 * @returns {Promise<Array<object>>} A promise that resolves with an array of retrieved enterprise user data.
 */
async function getAllEnterpriseUser() {
  // Log information about the function execution
  loggerInfo.info("GET all the Enterprise Users");

  // Fetch all enterprise user data from the database using Sequelize findAll method
  return await db.EnterpriseUser.findAll({
    attributes: [
      "username",
      "email",
      "firstName",
      "lastName",
      "parentId",
      "enterpriseId",
      "roleId",
    ],
  });
}

/**
 * Updates information about an enterprise user in the database based on the provided parameters.
 *
 * @param {any} params - The parameters containing information for updating an enterprise user.
 * @returns {Promise<object>} A promise that resolves with the result of the database operation.
 */
// async function update(params: any,reqData:any) {
async function update(params: any, reqAuth: any) {

  try {
    // Find the enterprise user in the database based on the provided ID
    const data = await db.EnterpriseUser.findOne({
      where: { id: reqAuth.enterpriseUserId },
    });

    // If no enterprise user is found, return an error response
    if (!data) {
      return sendResponseData(false, "No Enterprise User Exits", []);
    }

    // Define the properties to update
    const propertiesToUpdate = [
      "username",
      "firstName",
      "lastName",
      "password",
      "enterpriseId",
      "roleId",
    ];

    let newObj: any = {}
    // Update the enterprise user data fields based on the provided parameters
    propertiesToUpdate.forEach((property) => {
      if (params[property]) {
        data[property] = params[property];
      }
    });

    // Save the updated enterprise user data
    const response = await data.save();

    // Return a successful response with the updated enterprise user data
    return sendResponseData(
      true,
      message.success.enterpriseUserUpdated,
      response
    );
  } catch (error: any) {
    // Return an error response in case of an exception during data updating
    return sendResponseData(false, message.error.errorUpdationMessage, []);
  }
}

/**
 * Deletes an enterprise user from the database based on the provided parameters.
 *
 * @param {any} params - The parameters containing information for deleting an enterprise user.
 * @returns {Promise<object>} A promise that resolves with the result of the database operation.
 */
async function _delete(params: any) {
  try {
    // Find the enterprise user in the database based on the provided ID
    const delData = await db.EnterpriseUser.findOne({
      where: { id: params.id },
    });

    // If no enterprise user is found, return an error response
    if (!delData) {
      return sendResponseData(false, "Enterprise User doesn't Exist", []);
    }

    // Delete the enterprise user data from the database
    await delData.destroy();

    // Return a successful response after deleting the enterprise user
    return sendResponseData(true, message.success.enterpriseUserDeleted, []);

  } catch (error: any) {
    // Return an error response in case of an exception during data deletion
    return sendResponseData(
      false,
      message.error.errorDeletionEnterpriseUser,
      error
    );
  }
}

/**
 * Retrieves information about an enterprise user based on the provided ID.
 *
 * @param {Object} params - The parameters object containing the user ID.
 * @returns {Promise<Object>} A promise that resolves to the response data.
 */
async function getEnterpriseUserById(params: any) {
  try {
    // Log information about the operation.
    loggerInfo.info("Get Enterprise User by ID");

    // Check if the ID is provided in the parameters.
    if (!params.id) {
      // Return a response indicating that the ID is not provided.
      return sendResponseData(false, message.error.idNotProvided, []);
    }

    // Find the enterprise user in the database based on the provided ID.
    const data = await db.EnterpriseUser.findOne({
      where: { id: params.id },
      attributes: ["username", "email", "firstName", "lastName", "enterpriseId", "roleId"]
    });

    // Check if the user data is available.
    if (!data) {
      // Return a response indicating that the enterprise user doesn't exist.
      return sendResponseData(false, message.error.enterpriseUserNotExist, []);
    }

    // Return a successful response with the fetched enterprise user data.
    return sendResponseData(true, message.success.enterpriseUserFetched, data);
  } catch (error: any) {
    // Log an error message if an exception occurs during the operation.
    loggerError.error("Error in enterprise user repo", error);

    // Return an error response with details about the encountered error.
    return sendResponseData(false, message.error.errorFetchingEnterpriseUser, error);
  }
}

async function updateProfile(params: any, reqData: any) {
  try {
    loggerInfo.info("Updating Enterprise User profile while viewing data")
    const data = await db.EnterpriseUser.findOne({
      where: { id: params.enterpriseUserId },
    })
    const profileToUpdate = [
      "username",
      "firstName",
      "lastName"
    ];
    profileToUpdate.forEach((property) => {
      if (reqData[property]) {
        data[property] = reqData[property]
      }
    })
    const response = await data.save();

    return sendResponseData(true, message.success.profileUpdated, response)
  } catch (error: any) {
    loggerError.error("Error in Enterprise user repo", error)
    return sendResponseData(false, message.error.errorUpdatingData, error)
  }
}

async function inviteEnterpriseUser(params: any, reqData: any) {
  try {
    loggerError.info("Inviting Enterprise User");
    if (reqData.role !== 4) {
      return sendResponseData(false, message.error.enterpriseAdminAccess, {});
    }
    // To identify that the user sending invitation is Admin
    const adminData = await db.EnterpriseUser.findOne({
      where: { roleId: reqData.role }
    });

    if (!adminData) {
      return sendResponseData(false, message.error.apologiesEnterpriseAdminAccess, adminData);
    }

    const [invite, created] = await db.Invite.findOrCreate({
      where: { email: params.email },
      defaults: {
        ...params,
        enterpriseId: reqData.enterpriseId
      }
    });

    // If the email already existed, update the record
    if (!created) {
      await invite.update({
        ...params,
        enterpriseId: reqData.enterpriseId
      });
    }
    inviteEnterpriseUserMail(params.email)
    return sendResponseData(true, message.success.emailSent, invite);

  } catch (error: any) {
    loggerError.error("Error in inviting Enterprise User", error);
    return sendResponseData(false, message.error.errorInvitingUser, {});
  }
}

async function cancelInvite(params: any, reqData: any) {
  try {
    loggerInfo.info("Cancel Invite of Enterprise User")
    //check if the enterprise user email exist in invite table
    const user = await db.Invite.findOne({
      where: { email: params.email },
    });
    if (!user) {
      return sendResponseData(false, message.error.userNotFoundForMail, {});
    }

    // check if the enterprise user exist in enterpriseUser table too
    const check = await db.EnterpriseUser.findOne({
      where: { email: user.dataValues.email }
    })

    //fetching admin email
    const adminMail = await db.EnterpriseUser.findOne({
      where: { id: reqData.enterpriseUserId }
    })

    if (check) {
      //send mail to admin 
      enterpriseAdminMail(adminMail.dataValues.email, check.dataValues.email)
      return sendResponseData(true, message.success.emailSentAdmin, {})
    } else {
      const res = await user.update(
        {
          email: null,
          userRole: null,
          status: null,
        },
        {
          where: { email: params.email },
        })
      return sendResponseData(true, message.success.invitationCanceled, res)
    }
  } catch (error: any) {
    loggerError.error("Error in Inviting Enterprise User")
    return sendResponseData(false, message.error.errorCancelInvite, error.message)
  }
}
