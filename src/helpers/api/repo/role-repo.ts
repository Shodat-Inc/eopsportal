import { db } from "../db";
import sendResponseData from "../../constant";
import { loggerInfo, loggerError } from "@/logger";
import message from "@/util/responseMessage";

// Repository for role-related operations.
export const roleRepo = {
  create,
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
