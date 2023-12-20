import getConfig from "next/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import { info } from "console";
import message from "@/util/responseMessage";

const { serverRuntimeConfig } = getConfig();

/**
 * Repository for handling user-related operations.
 */
export const usersRepo = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

/**
 * Authenticates a user by validating the provided email and password.
 *
 * @param {any} data - The data containing user email and password for authentication.
 * @returns {Promise<object>} A promise that resolves with the authentication result.
 */
async function authenticate(data: any) {
  try {
    // Destructure email and password from the provided data
    let { email, password } = data;

    // Find the user in the database with the provided email and hashed password
    const user = await db.User.scope("withHash").findOne({
      attributes: [
        "id",
        "username",
        "password",
        "email",
        "firstName",
        "lastName",
        "roleId",
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
      { sub: user.id, role: user.roleId },
      serverRuntimeConfig.secret,
      {
        expiresIn: "7d",
      }
    );

    // Remove hash from the return value
    const userJson = user.get();
    delete userJson.password;

    // Fetch the phone record associated with the user
    const phoneRecord = await db.phoneRecord.findOne({
      where: { userId: user.id },
      attributes: ["phoneNumber"],
    });

    // Add phoneNumber to the user data values
    user.dataValues["phoneNumber"] = phoneRecord.phoneNumber;

    // Return a successful response with user information and JWT token
    return sendResponseData(true, message.success.loginSuccess, {
      ...userJson,
      token,
    });

  } catch (error) {
    loggerError.error("Authentication Error", error);
    return sendResponseData(false, message.error.error, error);
  }
}

/**
 * Fetches all users with associated address, phone records, and company records from the database.
 *
 * @returns {Promise<object>} A promise that resolves with the result of fetching all users.
 */
async function getAll() {
  // Log information about the function execution
  loggerInfo.info("GET all users");

  try {
    // Fetch all users from the database with specified attributes
    const result = await db.User.findAll({
      attributes: ["username", "firstName", "lastName", "email"],
      include: [
        {
          // Include address information for each user
          model: db.Address,
          attributes: ["address", "city", "state", "pincode", "primary"],
          include: [
            {
              // Include country code for each address
              model: db.countryCodeModel,
              attributes: [["countryName", "addressCountryCode"]],
            },
          ],
        },
        {
          // Include phone record information for each user
          model: db.phoneRecord,
          attributes: ["phoneNumber", "isPrimary", "isActive"],
          include: [
            {
              // Include country code for each phone record
              model: db.countryCodeModel,
              attributes: [["dialCode", "phoneCountryCode"]],
            },
          ],
        },
        {
          // Include company record information for each user
          model: db.companyRecord,
          attributes: ["companyName", "createdAt", "updatedAt"],
        },
      ],
    });

    // Return a successful response with the fetched users and associated information
    return sendResponseData(true, message.success.userFetched, result);

  } catch (error: any) {
    // Log error information in case of an exception during user fetching
    loggerError.error("Error in fetching users");

    // Return an error response in case of an exception during user fetching
    return sendResponseData(false, message.error.errorFetchingUser, []);
  }
}


/**
 * Fetches a user by ID with associated address, phone records, and company records from the database.
 *
 * @param {any} id - The ID of the user to be fetched.
 * @returns {Promise<object>} A promise that resolves with the result of fetching the user by ID.
 */
async function getById(id: any) {
  try {
    // Fetch a user by ID from the database with specified attributes
    const result = await db.User.findByPk(id, {
      attributes: ["username", "firstName", "lastName", "email"],
      include: [
        {
          // Include address information for the user
          model: db.Address,
          attributes: ["address", "city", "state", "pincode", "primary"],
          include: {
            // Include country code for the address
            model: db.countryCodeModel,
            attributes: [["countryName", "addressCountryCode"]],
          },
        },
        {
          // Include phone record information for the user
          model: db.phoneRecord,
          attributes: ["phoneNumber", "isPrimary", "isActive"],
          include: {
            // Include country code for the phone record
            model: db.countryCodeModel,
            attributes: [["dialCode", "phoneCountryCode"]],
          },
        },
        {
          // Include company record information for the user
          model: db.companyRecord,
          attributes: ["companyName", "createdAt", "updatedAt"],
        },
      ],
    });

    // Return a successful response with the fetched user and associated information
    return sendResponseData(true, message.success.userFetched, result);

  } catch (error: any) {
    // Log error information in case of an exception during user fetching by ID
    loggerError.error("Error in fetching user by ID");

    // Return an error response in case of an exception during user fetching by ID
    return sendResponseData(false, message.error.errorFetchingUserById, []);
  }
}

/**
 * Creates a new user in the database based on the provided parameters.
 *
 * @param {any} params - The parameters for creating a new user.
 * @returns {Promise<object>} A promise that resolves with the result of creating the user.
 */
async function create(params: any, transaction: any) {

  try {
    // Log information about the user creation process
    loggerInfo.info("Create User");

    // Validate if a user with the same email already exists
    let user_data = await db.User.findOne({
      where: { email: params.email },
    }, { transaction });
    if (user_data) {
      return sendResponseData(false, message.error.alreadyExist, {});
    }

    // Validate the provided roleId, if available
    if (params.roleId) {
      // Check if the specified role exists
      let role_data = await db.Role.findByPk(params.roleId, { transaction });
      if (!role_data) {
        return sendResponseData(false, message.error.roleError1, {});
      }

      // Check if the specified role is active
      if (!role_data.isActive) {
        return sendResponseData(false, message.error.roleError2, {});
      }
    }

    // Create a new user instance with the provided parameters
    const user = new db.User(params, { transaction });

    // Hash the user's password before saving to the database
    if (params.password) {
      user.password = bcrypt.hashSync(params.password, 10);
    }

    // Save the user to the database
    const data = await user.save({ transaction });

    // Return a successful response with the created user data
    return sendResponseData(true, message.success.userCreated, data);

  } catch (error) {
    // Log error information in case of an exception during user creation
    loggerError.error("Error in creating user:", error);

    // Return an error response in case of an exception during user creation
    return sendResponseData(false, message.error.cantCreateUser, error);
  }
}

/**
 * Updates user information in the database based on the provided parameters.
 *
 * @param {any} id - The ID of the user to be updated.
 * @param {any} params - The parameters for updating the user.
 * @returns {Promise<object>} A promise that resolves with the updated user information.
 */
async function update(id: any, params: any) {
  try {
    // Log information about the user update process
    loggerInfo.info("Update User Info");

    // Find the user in the database by ID
    const user = await db.User.findByPk(id, {
      include: [db.Address, db.phoneRecord, db.companyRecord],
    });

    // Validate if the user exists
    if (!user) {
      throw "User not found";
    }

    // Check if the provided username is already taken
    if (
      params.username &&
      user.username !== params.username &&
      (await db.User.findOne({ where: { username: params.username } }))
    ) {
      throw 'Username "' + params.username + '" is already taken';
    }

    // Hash the password if provided
    if (params.password) {
      params.hash = bcrypt.hashSync(params.password, 10);
    }

    // Update user properties based on provided parameters
    user.username = params.username || user.username;
    user.email = params.email || user.email;
    user.firstName = params.firstName || user.firstName;
    user.lastName = params.lastName || user.lastName;

    // Update address information if provided
    if (params.address) {
      await db.Address.update({ address: params.address }, { where: { userId: id } });
    }
    if (params.state) {
      await db.Address.update({ state: params.state }, { where: { userId: id } });
    }
    if (params.city) {
      await db.Address.update({ city: params.city }, { where: { userId: id } });
    }
    if (params.pincode) {
      await db.Address.update({ pincode: params.pincode }, { where: { userId: id } });
    }
    if (params.countryId) {
      await db.Address.update({ countryId: params.countryId }, { where: { userId: id } });
    }

    // Update phone record if provided
    if (params.phoneNumber) {
      await db.phoneRecord.update({ phoneNumber: params.phoneNumber }, { where: { userId: id } });
    }

    // Update company record if provided
    if (params.companyName) {
      await db.companyRecord.update({ companyName: params.companyName }, { where: { userId: id } });
    }

    // Save the updated user information
    return await user.save();

  } catch (error) {
    // Log error information in case of an exception during user update
    loggerError.error("Error in updating user:", error);

    // Return an error response in case of an exception during user update
    return sendResponseData(false, message.error.errorUpdation, error);
  }
}

/**
 * Asynchronously delete a user by its ID.
 *
 * @param {number} id - The ID of the user to be deleted.
 * @returns {Promise<void>} - A promise that resolves once the user is deleted.
 * @throws {Error} - Throws an error if the
 **/

async function _delete(id: number) {
  const user = await db.User.findByPk(id);
  if (!user) throw "User not found";

  // delete user
  return await user.destroy();
}

