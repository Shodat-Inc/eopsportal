import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import message from "@/util/responseMessage";

/**
 * Repository for handling role-related operations.
 */
export const roleRepo = {
  create,
  getAllRoles,
  update,
  delete: _delete,
};

/**
 * Asynchronously creates a new role entry in the database.
 *
 * @param {Object} params - The parameters containing information to save the role.
 * @returns {Object} - Response object indicating the success or failure of the operation.
 */
async function create(params: any) {
  // Log the initiation of role creation.
  loggerInfo.info("Role repo");

  try {
    const check = await db.Role.findOne({
      where: { name: params.name }
    })
    if (check) {
      return sendResponseData(false, message.error.roleExist, {});
    }
    // Create a new Role instance using the provided parameters.
    const role = new db.Role(params);

    // Save the new role to the database.
    const data = await role.save();

    // Return a successful response indicating the role was added.
    return sendResponseData(true, message.success.roleAdded, data);
  } catch (error) {
    // Log the error if there's an issue with the role creation.
    loggerError.error("Cant Save Role", error);
    // Return a response indicating the failure of the operation.
    return sendResponseData(false, message.error.error, error);
  }
}

/**
 * Fetches all roles from the database.
 *
 * @returns {Promise<Array<object>>} A promise that resolves with an array of roles.
 */
async function getAllRoles() {
  // Log information about the function execution
  loggerInfo.info("GET all roles");

  try {
    // Fetch all roles from the database
    const roles = await db.Role.findAll({
      attributes: ["id", "name", "isActive", "routeId"]
    });

    // Return the array of roles
    return roles;

  } catch (error) {
    // Log error information in case of an exception during role fetching
    loggerError.error("Error in fetching roles");

    // Return an error response in case of an exception during role fetching
    return sendResponseData(false, "Error in fetching roles", error);
  }
}

/**
 * Updates a role in the database based on the provided parameters.
 *
 * @param {any} params - The parameters containing the role ID and properties to update.
 * @returns {Promise<object>} A promise that resolves with the result of the database operation.
 */
async function update(params: any) {
  try {
    // Find the role in the database based on the provided role ID
    const role = await db.Role.findOne({
      where: { id: params.id }
    });

    // If the role doesn't exist, return an error response
    if (!role) {
      return sendResponseData(false, "No Role Exists", []);
    }

    // Define the properties to update
    const propertiesToUpdate = [
      "name",
      "routeId",
      "isActive"
    ];

    // Update the role properties based on the provided parameters
    propertiesToUpdate.forEach((property) => {
      if (params[property]) {
        role[property] = params[property];
      }
    });

    // Save the updated role data
    const response = await role.save();

    // Return a successful response with the updated role data
    return sendResponseData(true, message.success.roleUpdated, response);

  } catch (error: any) {
    // Return an error response in case of an exception during role updating
    return sendResponseData(false, message.error.errorUpdation, []);
  }
}

/**
 * Deletes a role from the database based on the provided role ID.
 *
 * @param {any} params - The parameters containing the role ID for deletion.
 * @returns {Promise<object>} A promise that resolves with the result of the database operation.
 */
async function _delete(params: any) {
  try {
    // Find the role in the database based on the provided role ID
    const role = await db.Role.findOne({
      where: { id: params.id },
    });

    // If the role doesn't exist, return an error response
    if (!role) {
      return sendResponseData(false, "Role doesn't Exist", []);
    }

    // Delete the role from the database
    await role.destroy();

    // Return a successful response after deleting the role
    return sendResponseData(
      true,
      message.success.deleteRole,
      role.className
    );

  } catch (error: any) {
    // Return an error response in case of an exception during role deletion
    return sendResponseData(false, message.error.errorDeleteRole, error);
  }
}